export interface AudioPipelineConfig {
  inputDeviceId: number
  outputDeviceId: number
  sampleRate: number
  channels: number
  bufferSize: number
}

export interface PerturbationConfig {
  level: number
  psychoacousticEnabled: boolean
  phonemeConfusionEnabled: boolean
  psychoacousticGain: number
  phonemeGain: number
}
