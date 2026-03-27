import type {
  DetectionState,
  ShieldState,
  ShieldLevel,
  AppSettings,
  AudioDeviceInfo,
  ActivityLogEntry,
} from '../shared/types'

type Unsubscribe = () => void

interface ElectronAPI {
  detection: {
    start: () => Promise<void>
    stop: () => Promise<void>
    getStatus: () => Promise<DetectionState>
    onStateChanged: (callback: (state: DetectionState) => void) => Unsubscribe
  }
  shield: {
    activate: (level: ShieldLevel) => Promise<void>
    deactivate: () => Promise<void>
    setLevel: (level: ShieldLevel) => Promise<void>
    getStatus: () => Promise<ShieldState>
    onStateChanged: (callback: (state: ShieldState) => void) => Unsubscribe
  }
  settings: {
    get: () => Promise<AppSettings>
    set: (settings: Partial<AppSettings>) => Promise<void>
    reset: () => Promise<void>
  }
  audio: {
    getDevices: () => Promise<AudioDeviceInfo[]>
    onMeterData: (callback: (data: { input: number; output: number }) => void) => Unsubscribe
  }
  activity: {
    onLogEntry: (callback: (entry: ActivityLogEntry) => void) => Unsubscribe
  }
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI
  }
}
