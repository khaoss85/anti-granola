import { EventEmitter } from 'events'
import { execFile } from 'child_process'
import { promisify } from 'util'
import type { ProcessMatch, ToolSignature } from '../../shared/types'
import type { ProcessInfo } from './types'
import { PROCESS_SCAN_INTERVAL } from '../../shared/constants'
import signatures from './signatures.json'

const execFileAsync = promisify(execFile)

export class ProcessDetector extends EventEmitter {
  private interval: ReturnType<typeof setInterval> | null = null
  private scanIntervalMs: number
  private signatures: ToolSignature[]
  private previousMatches: Map<string, ProcessMatch> = new Map()

  constructor(scanInterval: number = PROCESS_SCAN_INTERVAL) {
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
    this.previousMatches.clear()
  }

  async scan(): Promise<void> {
    try {
      const processes = await this.getRunningProcesses()
      const matches = this.matchProcesses(processes)

      const matchKey = (m: ProcessMatch) => `${m.signatureName}:${m.pid}`
      const currentKeys = new Set(matches.map(matchKey))
      const previousKeys = new Set(this.previousMatches.keys())

      const hasChanges =
        currentKeys.size !== previousKeys.size ||
        [...currentKeys].some((k) => !previousKeys.has(k))

      if (matches.length > 0) {
        if (hasChanges) {
          this.emit('match', matches)
        }
      } else if (this.previousMatches.size > 0) {
        this.emit('clear')
      }

      this.previousMatches.clear()
      for (const m of matches) {
        this.previousMatches.set(matchKey(m), m)
      }
    } catch (err) {
      this.emit('error', err)
    }
  }

  private async getRunningProcesses(): Promise<ProcessInfo[]> {
    if (process.platform === 'win32') {
      return this.getWindowsProcesses()
    }
    return this.getMacLinuxProcesses()
  }

  private async getMacLinuxProcesses(): Promise<ProcessInfo[]> {
    const { stdout } = await execFileAsync('ps', ['aux'])
    const lines = stdout.split('\n')
    const processes: ProcessInfo[] = []

    // Skip header line
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      // ps aux columns: USER PID %CPU %MEM VSZ RSS TT STAT STARTED TIME COMMAND
      const parts = line.split(/\s+/)
      if (parts.length < 11) continue

      const user = parts[0]
      const pid = parseInt(parts[1], 10)
      const command = parts.slice(10).join(' ')
      // Extract the process name from the command path
      const commandBase = command.split('/').pop()?.split(' ')[0] ?? command
      const name = commandBase.replace(/^-/, '')

      if (isNaN(pid)) continue

      processes.push({ name, pid, user, command })
    }

    return processes
  }

  private async getWindowsProcesses(): Promise<ProcessInfo[]> {
    const { stdout } = await execFileAsync('tasklist', ['/FO', 'CSV', '/NH'])
    const lines = stdout.split('\n')
    const processes: ProcessInfo[] = []

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed) continue

      // CSV format: "Image Name","PID","Session Name","Session#","Mem Usage"
      const match = trimmed.match(/"([^"]+)","(\d+)"/)
      if (!match) continue

      const rawName = match[1]
      const pid = parseInt(match[2], 10)
      const name = rawName.replace(/\.exe$/i, '')

      if (isNaN(pid)) continue

      processes.push({ name, pid, user: '', command: rawName })
    }

    return processes
  }

  private matchProcesses(processes: ProcessInfo[]): ProcessMatch[] {
    const matches: ProcessMatch[] = []

    for (const proc of processes) {
      for (const sig of this.signatures) {
        for (const sigName of sig.processNames) {
          if (this.nameMatches(proc.name, sigName)) {
            matches.push({
              signatureName: sig.name,
              processName: proc.name,
              pid: proc.pid,
              score: sig.processScore,
            })
          }
        }
      }
    }

    return matches
  }

  private nameMatches(processName: string, signatureName: string): boolean {
    const procLower = processName.toLowerCase()
    const sigLower = signatureName.toLowerCase()

    if (sigLower.includes('*')) {
      const pattern = sigLower.replace(/\*/g, '.*')
      return new RegExp(`^${pattern}$`).test(procLower)
    }

    return procLower === sigLower
  }
}
