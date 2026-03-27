/**
 * Phoneme confusion generator via formant synthesis.
 * Generates synthetic phoneme fragments using additive synthesis (F1/F2/F3).
 * Injected at very low amplitude to confuse ASR without being perceptible.
 */

// Confusable phoneme pairs with formant frequencies [F1, F2, F3] in Hz
const PHONEME_PAIRS: Array<{
  name: string
  a: [number, number, number]
  b: [number, number, number]
}> = [
  { name: 's/ʃ', a: [350, 4500, 7500], b: [300, 2500, 3500] },   // /s/ ↔ /ʃ/
  { name: 'b/p', a: [250, 1100, 2400], b: [250, 1050, 2350] },    // /b/ ↔ /p/
  { name: 'd/t', a: [300, 1700, 2600], b: [300, 1750, 2700] },    // /d/ ↔ /t/
  { name: 'ɪ/iː', a: [400, 2000, 2550], b: [280, 2250, 2900] },  // /ɪ/ ↔ /iː/
  { name: 'æ/ɛ', a: [700, 1800, 2500], b: [550, 1800, 2500] },   // /æ/ ↔ /ɛ/
]

export class PhonemeGenerator {
  private readonly sampleRate: number
  private gain = 0.15
  private phase: [number, number, number] = [0, 0, 0] // Continuous phase for each formant
  private currentPair = 0
  private currentPhoneme: 'a' | 'b' = 'a'
  private samplesUntilSwitch: number
  private readonly minSwitchSamples: number
  private readonly maxSwitchSamples: number

  constructor(sampleRate: number) {
    this.sampleRate = sampleRate
    // Switch phoneme every 50-200ms
    this.minSwitchSamples = Math.floor(sampleRate * 0.05)
    this.maxSwitchSamples = Math.floor(sampleRate * 0.2)
    this.samplesUntilSwitch = this.randomSwitchInterval()
    this.currentPair = Math.floor(Math.random() * PHONEME_PAIRS.length)
  }

  setGain(gain: number): void {
    this.gain = gain
  }

  /** Generate a phoneme fragment of the given length. */
  generate(length: number): Float32Array {
    const output = new Float32Array(length)
    let offset = 0

    while (offset < length) {
      const chunk = Math.min(this.samplesUntilSwitch, length - offset)
      const pair = PHONEME_PAIRS[this.currentPair]
      const formants = this.currentPhoneme === 'a' ? pair.a : pair.b

      this.synthesizeFormants(output, offset, chunk, formants)

      offset += chunk
      this.samplesUntilSwitch -= chunk

      if (this.samplesUntilSwitch <= 0) {
        this.switchPhoneme()
      }
    }

    // Apply gain
    for (let i = 0; i < length; i++) {
      output[i] *= this.gain
    }

    return output
  }

  /**
   * Additive synthesis: 3 sine waves at formant frequencies.
   * F1 is loudest, F2 slightly quieter, F3 quietest.
   */
  private synthesizeFormants(
    output: Float32Array,
    offset: number,
    count: number,
    formants: [number, number, number]
  ): void {
    const amplitudes = [0.5, 0.35, 0.15] // F1 > F2 > F3
    const twoPiOverSr = (2 * Math.PI) / this.sampleRate

    for (let i = 0; i < count; i++) {
      let sample = 0
      for (let f = 0; f < 3; f++) {
        sample += amplitudes[f] * Math.sin(this.phase[f])
        this.phase[f] += formants[f] * twoPiOverSr
        // Wrap phase to avoid precision loss
        if (this.phase[f] > 2 * Math.PI) {
          this.phase[f] -= 2 * Math.PI
        }
      }
      output[offset + i] += sample
    }
  }

  private switchPhoneme(): void {
    // Randomly pick new pair and phoneme variant
    this.currentPair = Math.floor(Math.random() * PHONEME_PAIRS.length)
    this.currentPhoneme = Math.random() < 0.5 ? 'a' : 'b'
    this.samplesUntilSwitch = this.randomSwitchInterval()
  }

  private randomSwitchInterval(): number {
    return (
      this.minSwitchSamples +
      Math.floor(Math.random() * (this.maxSwitchSamples - this.minSwitchSamples))
    )
  }
}
