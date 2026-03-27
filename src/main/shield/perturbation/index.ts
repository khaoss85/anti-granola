import { ShieldLevel } from '../../../shared/types'
import { FFT_SIZE, SAMPLE_RATE } from '../../../shared/constants'
import { FFTProcessor } from './fft-processor'
import { VAD } from './vad'
import { PsychoacousticMasker } from './psychoacoustic'
import { PhonemeGenerator } from './phoneme-generator'

export interface PerturbationEngine {
  process(audioBuffer: Float32Array): Float32Array
  setLevel(level: number): void
}

interface LevelConfig {
  psychoacousticGain: number
  phonemeGain: number
  phonemeEnabled: boolean
}

const LEVEL_CONFIGS: Record<ShieldLevel, LevelConfig> = {
  [ShieldLevel.Stealth]: { psychoacousticGain: 0.3, phonemeGain: 0, phonemeEnabled: false },
  [ShieldLevel.Moderate]: { psychoacousticGain: 0.5, phonemeGain: 0.15, phonemeEnabled: true },
  [ShieldLevel.Strong]: { psychoacousticGain: 0.7, phonemeGain: 0.4, phonemeEnabled: true },
  [ShieldLevel.Maximum]: { psychoacousticGain: 1.0, phonemeGain: 0.8, phonemeEnabled: true },
}

export class PerturbationEngineImpl implements PerturbationEngine {
  private readonly fftProcessor: FFTProcessor
  private readonly vad: VAD
  private readonly masker: PsychoacousticMasker
  private readonly phonemeGen: PhonemeGenerator
  private config: LevelConfig

  constructor(level: ShieldLevel, sampleRate = SAMPLE_RATE, fftSize = FFT_SIZE) {
    this.fftProcessor = new FFTProcessor(fftSize)
    this.vad = new VAD(sampleRate)
    this.masker = new PsychoacousticMasker(sampleRate, fftSize)
    this.phonemeGen = new PhonemeGenerator(sampleRate)
    this.config = LEVEL_CONFIGS[level]
    this.applyConfig()
  }

  process(input: Float32Array): Float32Array {
    // Skip processing during silence to save CPU
    if (!this.vad.isVoiceActive(input)) {
      return input
    }

    // FFT forward
    const { real, imag } = this.fftProcessor.forward(input)
    const magnitude = this.fftProcessor.getMagnitude(real, imag)

    // Generate psychoacoustic masking noise
    const maskingNoise = this.masker.generate(magnitude)

    // Mix: input + masking noise
    const output = new Float32Array(input.length)
    for (let i = 0; i < input.length; i++) {
      output[i] = input[i] + maskingNoise[i % maskingNoise.length]
    }

    // Add phoneme confusion if enabled
    if (this.config.phonemeEnabled) {
      const phonemes = this.phonemeGen.generate(input.length)
      for (let i = 0; i < input.length; i++) {
        output[i] += phonemes[i]
      }
    }

    // Soft clip to prevent distortion
    for (let i = 0; i < output.length; i++) {
      output[i] = Math.tanh(output[i])
    }

    return output
  }

  setLevel(level: number): void {
    const shieldLevel = level as ShieldLevel
    if (shieldLevel in LEVEL_CONFIGS) {
      this.config = LEVEL_CONFIGS[shieldLevel]
      this.applyConfig()
    }
  }

  private applyConfig(): void {
    this.masker.setGain(this.config.psychoacousticGain)
    this.phonemeGen.setGain(this.config.phonemeGain)
  }
}
