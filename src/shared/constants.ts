import { ShieldLevel } from './types'

// Detection thresholds
export const DETECTION_THRESHOLD_PROBABLE = 80
export const DETECTION_THRESHOLD_CONFIRMED = 150

// Detection scores (fallback when not specified in signatures)
export const SCORE_NETWORK_MATCH = 85

// Detection scan intervals (ms)
export const PROCESS_SCAN_INTERVAL = 5000
export const NETWORK_SCAN_INTERVAL = 3000

// Audio constants
export const SAMPLE_RATE = 48000
export const CHANNELS = 1
export const BIT_DEPTH = 16
export const FFT_SIZE = 1024
export const BUFFER_SIZE = 1024
export const LATENCY_TARGET_MS = 50

// Shield level descriptions
export const SHIELD_LEVEL_INFO: Record<ShieldLevel, { label: string; description: string }> = {
  [ShieldLevel.Stealth]: {
    label: 'Stealth',
    description: 'Psychoacoustic masking only. Imperceptible. +15-25% WER.',
  },
  [ShieldLevel.Moderate]: {
    label: 'Moderate',
    description: 'Masking + light phonemes. Faint hum. +40-60% WER.',
  },
  [ShieldLevel.Strong]: {
    label: 'Strong',
    description: 'Masking + full phonemes. Noticeable background noise. +70-90% WER.',
  },
  [ShieldLevel.Maximum]: {
    label: 'Maximum',
    description: 'Everything maxed. Audible distortion. Transcription unusable.',
  },
}

// App metadata
export const APP_NAME = 'Anti Granola'
export const APP_VERSION = '0.1.0'
