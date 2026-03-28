import { systemPreferences } from 'electron'
import { execFileSync } from 'child_process'
import type { AudioDeviceInfo } from '../../shared/types'

const VIRTUAL_DEVICE_KEYWORDS = ['blackhole', 'vb-cable', 'vb-audio', 'virtual']

/** Returns true if microphone access is granted (or not macOS). */
function hasMicrophoneAccess(): boolean {
  if (process.platform !== 'darwin') return true
  return systemPreferences.getMediaAccessStatus('microphone') === 'granted'
}

/**
 * Run naudiodon.getDevices() in an isolated child process.
 * PortAudio can SIGSEGV (null-pointer in native code) which kills the host
 * process — running it in a child means only the child dies and we gracefully
 * return an empty array.
 */
function getRawDevicesSafe(): Array<{
  id: number
  name: string
  maxInputChannels: number
  maxOutputChannels: number
  defaultSampleRate: number
  hostAPIName: string
}> {
  try {
    // Resolve the naudiodon entry from the main process (asar-aware)
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const resolvedPath = require.resolve('naudiodon')
    // Native .node binaries live in app.asar.unpacked when packaged
    const modulePath = resolvedPath.replace(/\.asar([/\\])/, '.asar.unpacked$1')

    const script = [
      'try {',
      `  var n = require(${JSON.stringify(modulePath)});`,
      '  var d = n.getDevices();',
      '  process.stdout.write(JSON.stringify(d));',
      '} catch(e) { process.stdout.write("[]"); }',
    ].join('\n')

    const stdout = execFileSync(process.execPath, ['-e', script], {
      env: { ...process.env, ELECTRON_RUN_AS_NODE: '1' },
      timeout: 5000,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    })

    const parsed = JSON.parse(stdout.trim())
    return Array.isArray(parsed) ? parsed : []
  } catch {
    // Child crashed (SIGSEGV), timed out, or JSON parse failed — safe fallback
    return []
  }
}

export class DeviceManager {
  getDevices(): AudioDeviceInfo[] {
    if (!hasMicrophoneAccess()) {
      return []
    }

    const rawDevices = getRawDevicesSafe()
    const devices: AudioDeviceInfo[] = []

    for (const d of rawDevices) {
      if (d.maxInputChannels > 0) {
        devices.push({
          id: d.id,
          name: d.name,
          type: 'input',
          maxChannels: d.maxInputChannels,
          defaultSampleRate: d.defaultSampleRate,
          isDefault: d.defaultSampleRate > 0 && d.id === this.getDefaultInputId(rawDevices),
        })
      }
      if (d.maxOutputChannels > 0) {
        devices.push({
          id: d.id,
          name: d.name,
          type: 'output',
          maxChannels: d.maxOutputChannels,
          defaultSampleRate: d.defaultSampleRate,
          isDefault: d.defaultSampleRate > 0 && d.id === this.getDefaultOutputId(rawDevices),
        })
      }
    }

    return devices
  }

  findVirtualOutput(): AudioDeviceInfo | null {
    const devices = this.getDevices()
    return (
      devices.find(
        (d) =>
          d.type === 'output' &&
          VIRTUAL_DEVICE_KEYWORDS.some((kw) => d.name.toLowerCase().includes(kw))
      ) ?? null
    )
  }

  findDefaultInput(): AudioDeviceInfo | null {
    const devices = this.getDevices()
    return devices.find((d) => d.type === 'input' && d.isDefault) ?? null
  }

  private getDefaultInputId(
    rawDevices: Array<{ id: number; maxInputChannels: number; hostAPIName: string }>
  ): number {
    const coreAudio = rawDevices.find(
      (d) => d.maxInputChannels > 0 && d.hostAPIName === 'Core Audio'
    )
    return coreAudio?.id ?? rawDevices.find((d) => d.maxInputChannels > 0)?.id ?? -1
  }

  private getDefaultOutputId(
    rawDevices: Array<{ id: number; maxOutputChannels: number; hostAPIName: string }>
  ): number {
    const coreAudio = rawDevices.find(
      (d) => d.maxOutputChannels > 0 && d.hostAPIName === 'Core Audio'
    )
    return coreAudio?.id ?? rawDevices.find((d) => d.maxOutputChannels > 0)?.id ?? -1
  }
}
