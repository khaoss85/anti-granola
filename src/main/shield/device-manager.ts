import naudiodon from 'naudiodon'
import type { AudioDeviceInfo } from '../../shared/types'

const VIRTUAL_DEVICE_KEYWORDS = ['blackhole', 'vb-cable', 'vb-audio', 'virtual']

export class DeviceManager {
  getDevices(): AudioDeviceInfo[] {
    const rawDevices = naudiodon.getDevices()
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
    // Prefer CoreAudio on macOS
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
