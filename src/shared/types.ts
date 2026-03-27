export enum ShieldLevel {
  Stealth = 1,
  Moderate = 2,
  Strong = 3,
  Maximum = 4,
}

export type ThreatLevel = 'none' | 'probable' | 'confirmed'

export interface ThreatInfo {
  name: string
  type: 'process' | 'network' | 'both'
  confidence: number
  details: string
  detectedAt: number
}

export interface DetectionState {
  isScanning: boolean
  threats: ThreatInfo[]
  score: number
  level: ThreatLevel
}

export interface ShieldState {
  isActive: boolean
  level: ShieldLevel
  latencyMs: number
  inputDevice: string
  outputDevice: string
}

export interface AudioDeviceInfo {
  id: number
  name: string
  type: 'input' | 'output'
  maxChannels: number
  defaultSampleRate: number
  isDefault: boolean
}

export interface ActivityLogEntry {
  id: string
  timestamp: number
  type: 'detection' | 'shield' | 'system' | 'error'
  message: string
  severity: 'info' | 'warning' | 'threat' | 'success'
}

export interface AppSettings {
  autoStart: boolean
  autoShield: boolean
  defaultLevel: ShieldLevel
  inputDeviceId: number | null
  outputDeviceId: number | null
  showNotifications: boolean
}

export interface ProcessMatch {
  signatureName: string
  processName: string
  pid: number
  score: number
}

export interface NetworkMatch {
  signatureName: string
  endpoint: string
  remoteAddr: string
  localPort: number
  processName: string | null
  score: number
}

export interface ToolSignature {
  name: string
  processNames: string[]
  bundleIds: string[]
  networkEndpoints: string[]
  processScore: number
  networkScore: number
}
