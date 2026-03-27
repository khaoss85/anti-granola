/**
 * Energy-based Voice Activity Detection.
 * Low-latency, no ML dependency. Uses RMS with adaptive noise floor.
 */
export class VAD {
  private noiseFloor = 0.001
  private readonly noiseAttack = 0.001  // Slow rise — adapts to ambient noise slowly
  private readonly noiseDecay = 0.05    // Fast fall — reacts quickly when noise drops
  private readonly speechThreshold = 3.0 // Signal must be 3x above noise floor
  private readonly hangoverMs: number
  private hangoverSamples = 0
  private hangoverRemaining = 0

  constructor(sampleRate: number, hangoverMs = 300) {
    this.hangoverMs = hangoverMs
    this.hangoverSamples = Math.floor((sampleRate * hangoverMs) / 1000)
  }

  /** Returns true if voice activity is detected in this frame. */
  isVoiceActive(frame: Float32Array): boolean {
    const rms = this.computeRMS(frame)

    // Update adaptive noise floor
    if (rms < this.noiseFloor) {
      // Signal below floor — drop floor quickly
      this.noiseFloor += (rms - this.noiseFloor) * this.noiseDecay
    } else if (rms < this.noiseFloor * this.speechThreshold) {
      // Signal in noise range — raise floor slowly
      this.noiseFloor += (rms - this.noiseFloor) * this.noiseAttack
    }

    // Clamp noise floor to avoid zero
    this.noiseFloor = Math.max(this.noiseFloor, 1e-6)

    const isSpeech = rms > this.noiseFloor * this.speechThreshold

    if (isSpeech) {
      this.hangoverRemaining = this.hangoverSamples
      return true
    }

    // Hangover: keep active for a bit after speech ends
    if (this.hangoverRemaining > 0) {
      this.hangoverRemaining -= frame.length
      return true
    }

    return false
  }

  private computeRMS(frame: Float32Array): number {
    let sum = 0
    for (let i = 0; i < frame.length; i++) {
      sum += frame[i] * frame[i]
    }
    return Math.sqrt(sum / frame.length)
  }
}
