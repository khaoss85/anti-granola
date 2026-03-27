import { EventEmitter } from 'events'
import { execFile } from 'child_process'
import dns from 'dns'
import { promisify } from 'util'
import { NetworkMatch, ToolSignature } from '../../shared/types'
import { NETWORK_SCAN_INTERVAL, SCORE_NETWORK_MATCH } from '../../shared/constants'
import signatures from './signatures.json'

const execFileAsync = promisify(execFile)
const dnsReverse = promisify(dns.reverse)

interface DnsCacheEntry {
  hostname: string | null
  expiry: number
}

interface ParsedConnection {
  processName: string | null
  remoteAddr: string
  remoteHost: string | null
  localPort: number
}

const DNS_CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export class NetworkDetector extends EventEmitter {
  private interval: ReturnType<typeof setInterval> | null = null
  private scanIntervalMs: number
  private signatures: ToolSignature[]
  private dnsCache: Map<string, DnsCacheEntry> = new Map()
  private hadMatches = false

  constructor(scanInterval: number = NETWORK_SCAN_INTERVAL) {
    super()
    this.scanIntervalMs = scanInterval
    this.signatures = signatures as ToolSignature[]
  }

  start(): void {
    if (this.interval) return
    this.scan().catch((err) => this.emit('error', err))
    this.interval = setInterval(() => this.scan(), this.scanIntervalMs)
  }

  stop(): void {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  async scan(): Promise<void> {
    try {
      const connections = await this.getConnections()
      const matches = await this.matchConnections(connections)

      if (matches.length > 0) {
        this.hadMatches = true
        this.emit('match', matches)
      } else if (this.hadMatches) {
        this.hadMatches = false
        this.emit('clear')
      }
    } catch (err) {
      this.emit('error', err)
    }
  }

  private async getConnections(): Promise<ParsedConnection[]> {
    if (process.platform === 'darwin' || process.platform === 'linux') {
      return this.parseLsof()
    } else if (process.platform === 'win32') {
      return this.parseNetstat()
    }
    return []
  }

  private async parseLsof(): Promise<ParsedConnection[]> {
    try {
      const { stdout } = await execFileAsync('lsof', ['-i', '-n', '-P'], {
        timeout: 10000,
      })
      return this.parseLsofOutput(stdout)
    } catch (err: unknown) {
      // lsof may fail with permission errors when not run as root;
      // it still returns partial results on stderr/stdout in some cases
      if (err && typeof err === 'object' && 'stdout' in err) {
        const stdout = (err as { stdout: string }).stdout
        if (stdout) {
          return this.parseLsofOutput(stdout)
        }
      }
      throw err
    }
  }

  private parseLsofOutput(stdout: string): ParsedConnection[] {
    const connections: ParsedConnection[] = []
    const lines = stdout.split('\n')

    for (const line of lines) {
      // Skip header and non-TCP/UDP lines
      if (!line || line.startsWith('COMMAND')) continue

      // lsof output format:
      // COMMAND  PID  USER  FD  TYPE  DEVICE  SIZE/OFF  NODE  NAME
      // e.g.: "chrome   1234  user  50u  IPv4  ...  TCP 127.0.0.1:54321->142.250.80.46:443 (ESTABLISHED)"
      const parts = line.split(/\s+/)
      if (parts.length < 9) continue

      const processName = parts[0]

      // Look for TCP connections with -> indicating remote connection
      const nameField = parts.slice(8).join(' ')
      const tcpMatch = nameField.match(
        /TCP\s+[\w.*:]+:(\d+)->([^:]+):(\d+)\s*\((\w+)\)/
      )
      if (!tcpMatch) continue

      const localPort = parseInt(tcpMatch[1], 10)
      const remoteAddr = tcpMatch[2]

      // Only interested in ESTABLISHED or similar active connections
      const state = tcpMatch[4]
      if (state !== 'ESTABLISHED' && state !== 'CLOSE_WAIT') continue

      connections.push({
        processName,
        remoteAddr,
        remoteHost: null,
        localPort,
      })
    }

    return connections
  }

  private async parseNetstat(): Promise<ParsedConnection[]> {
    try {
      const { stdout } = await execFileAsync('netstat', ['-b', '-n'], {
        timeout: 10000,
      })
      return this.parseNetstatOutput(stdout)
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'stdout' in err) {
        const stdout = (err as { stdout: string }).stdout
        if (stdout) {
          return this.parseNetstatOutput(stdout)
        }
      }
      throw err
    }
  }

  private parseNetstatOutput(stdout: string): ParsedConnection[] {
    const connections: ParsedConnection[] = []
    const lines = stdout.split('\n')

    // netstat -b on Windows shows process name AFTER the connection line:
    //   TCP    192.168.1.5:54321    142.250.80.46:443    ESTABLISHED
    //  [chrome.exe]
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      const connMatch = line.match(
        /^\s*TCP\s+[\d.]+:(\d+)\s+([\d.]+):(\d+)\s+(ESTABLISHED|CLOSE_WAIT)/
      )
      if (!connMatch) continue

      // Look ahead for process name on the next line
      let processName: string | null = null
      if (i + 1 < lines.length) {
        const procMatch = lines[i + 1].match(/^\s*\[(.+)\]/)
        if (procMatch) {
          processName = procMatch[1].replace(/\.exe$/i, '')
          i++ // skip the process line
        }
      }

      connections.push({
        processName,
        remoteAddr: connMatch[2],
        remoteHost: null,
        localPort: parseInt(connMatch[1], 10),
      })
    }

    return connections
  }

  private async matchConnections(
    connections: ParsedConnection[]
  ): Promise<NetworkMatch[]> {
    const matches: NetworkMatch[] = []

    // Collect all unique remote addresses for DNS resolution
    const uniqueAddrs = [...new Set(connections.map((c) => c.remoteAddr))]

    // Resolve all IPs to hostnames in parallel
    await Promise.all(
      uniqueAddrs.map((addr) => this.resolveHostname(addr))
    )

    for (const conn of connections) {
      const hostname = await this.getCachedHostname(conn.remoteAddr)

      for (const sig of this.signatures) {
        for (const endpoint of sig.networkEndpoints) {
          if (this.matchesEndpoint(conn.remoteAddr, hostname, endpoint)) {
            matches.push({
              signatureName: sig.name,
              endpoint,
              remoteAddr: conn.remoteAddr,
              localPort: conn.localPort,
              processName: conn.processName,
              score: sig.networkScore ?? SCORE_NETWORK_MATCH,
            })
          }
        }
      }
    }

    return matches
  }

  private matchesEndpoint(
    addr: string,
    hostname: string | null,
    pattern: string
  ): boolean {
    // Direct IP match
    if (addr === pattern) return true

    if (!hostname) return false

    // Exact hostname match
    if (hostname === pattern) return true

    // Wildcard matching for patterns like *.stt.speech.microsoft.com
    // or transcribestreaming.*.amazonaws.com
    if (pattern.includes('*')) {
      const regex = new RegExp(
        '^' +
          pattern
            .replace(/\./g, '\\.')
            .replace(/\*/g, '[^.]+') +
          '$'
      )
      return regex.test(hostname)
    }

    return false
  }

  private async resolveHostname(addr: string): Promise<string | null> {
    // Check cache first
    const cached = this.dnsCache.get(addr)
    if (cached && cached.expiry > Date.now()) {
      return cached.hostname
    }

    // Skip private/loopback addresses
    if (
      addr.startsWith('127.') ||
      addr.startsWith('10.') ||
      addr.startsWith('192.168.') ||
      addr === '::1' ||
      addr === '0.0.0.0'
    ) {
      this.dnsCache.set(addr, { hostname: null, expiry: Date.now() + DNS_CACHE_TTL })
      return null
    }

    try {
      const hostnames = await dnsReverse(addr)
      const hostname = hostnames.length > 0 ? hostnames[0] : null
      this.dnsCache.set(addr, {
        hostname,
        expiry: Date.now() + DNS_CACHE_TTL,
      })
      return hostname
    } catch {
      // DNS reverse lookup failures are common, cache the miss
      this.dnsCache.set(addr, {
        hostname: null,
        expiry: Date.now() + DNS_CACHE_TTL,
      })
      return null
    }
  }

  private async getCachedHostname(addr: string): Promise<string | null> {
    const cached = this.dnsCache.get(addr)
    if (cached) return cached.hostname
    return this.resolveHostname(addr)
  }
}
