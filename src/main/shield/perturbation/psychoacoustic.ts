/**
 * Psychoacoustic masking noise generator.
 * Generates shaped noise that sits just below the human masking threshold
 * but disrupts ASR Mel filterbank features.
 */

// Bark scale critical band edges (Hz) — 24 bands from 0 to ~15.5 kHz
const BARK_EDGES = [
  0, 100, 200, 300, 400, 510, 630, 770, 920, 1080, 1270, 1480, 1720, 2000, 2320, 2700, 3150,
  3700, 4400, 5300, 6400, 7700, 9500, 12000, 15500,
]

export class PsychoacousticMasker {
  private readonly sampleRate: number
  private readonly fftSize: number
  private readonly bandBins: Array<[number, number]> // [startBin, endBin] per band
  private gain = 0.3

  constructor(sampleRate: number, fftSize: number) {
    this.sampleRate = sampleRate
    this.fftSize = fftSize
    this.bandBins = this.computeBandBins()
  }

  setGain(gain: number): void {
    this.gain = gain
  }

  /**
   * Generate masking noise shaped to the spectrum.
   * Returns a time-domain noise signal of length fftSize.
   */
  generate(magnitude: Float32Array): Float32Array {
    const halfSize = this.fftSize / 2 + 1
    const bandEnergy = this.computeBandEnergy(magnitude)
    const spreadEnergy = this.applySpreadingFunction(bandEnergy)
    const maskingThreshold = this.computeMaskingThreshold(spreadEnergy)

    // Generate noise spectrum shaped to sit just below masking threshold
    const noiseReal = new Float32Array(halfSize)
    const noiseImag = new Float32Array(halfSize)

    for (let band = 0; band < BARK_EDGES.length - 1; band++) {
      const [startBin, endBin] = this.bandBins[band]
      const threshold = maskingThreshold[band]

      for (let bin = startBin; bin < endBin && bin < halfSize; bin++) {
        // Random phase noise at the masking threshold level
        const phase = Math.random() * 2 * Math.PI
        const amp = threshold * this.gain
        noiseReal[bin] = amp * Math.cos(phase)
        noiseImag[bin] = amp * Math.sin(phase)
      }
    }

    // IFFT to time domain (simplified: use random phase overlap-add)
    // For real-time, we approximate with band-filtered noise
    return this.synthesizeNoise(noiseReal, noiseImag)
  }

  private computeBandBins(): Array<[number, number]> {
    const binHz = this.sampleRate / this.fftSize
    const bands: Array<[number, number]> = []
    for (let i = 0; i < BARK_EDGES.length - 1; i++) {
      const startBin = Math.floor(BARK_EDGES[i] / binHz)
      const endBin = Math.min(Math.ceil(BARK_EDGES[i + 1] / binHz), this.fftSize / 2 + 1)
      bands.push([startBin, endBin])
    }
    return bands
  }

  private computeBandEnergy(magnitude: Float32Array): Float32Array {
    const energy = new Float32Array(BARK_EDGES.length - 1)
    for (let band = 0; band < energy.length; band++) {
      const [startBin, endBin] = this.bandBins[band]
      let sum = 0
      const binCount = endBin - startBin
      for (let bin = startBin; bin < endBin && bin < magnitude.length; bin++) {
        sum += magnitude[bin] * magnitude[bin]
      }
      energy[band] = binCount > 0 ? sum / binCount : 0
    }
    return energy
  }

  /**
   * Spreading function: each masker spreads energy to adjacent critical bands.
   * Simplified triangular spreading on Bark scale.
   */
  private applySpreadingFunction(bandEnergy: Float32Array): Float32Array {
    const spread = new Float32Array(bandEnergy.length)
    for (let i = 0; i < bandEnergy.length; i++) {
      const e = bandEnergy[i]
      if (e <= 0) continue

      // Center band gets full energy
      spread[i] += e

      // Upper slope: ~25 dB/Bark (steep)
      for (let j = i + 1; j < bandEnergy.length && j <= i + 3; j++) {
        const dist = j - i
        spread[j] += e * Math.pow(10, (-25 * dist) / 10)
      }

      // Lower slope: ~10 dB/Bark (gentle)
      for (let j = i - 1; j >= 0 && j >= i - 3; j--) {
        const dist = i - j
        spread[j] += e * Math.pow(10, (-10 * dist) / 10)
      }
    }
    return spread
  }

  /**
   * Masking threshold: offset below the spread energy.
   * Typical offset is ~14.5 + (band index) dB below the masker.
   * We stay just below this so the noise is near-inaudible.
   */
  private computeMaskingThreshold(spreadEnergy: Float32Array): Float32Array {
    const threshold = new Float32Array(spreadEnergy.length)
    for (let i = 0; i < spreadEnergy.length; i++) {
      // Offset in dB below the masker (increases with band — higher frequencies are easier to mask)
      const offsetDb = 14.5 + i * 0.4
      const linearOffset = Math.pow(10, -offsetDb / 20)
      threshold[i] = Math.sqrt(spreadEnergy[i]) * linearOffset
    }
    return threshold
  }

  /**
   * Approximate IFFT using overlap-add of band-filtered noise.
   * For real-time performance, this is faster than a full IFFT.
   */
  private synthesizeNoise(noiseReal: Float32Array, noiseImag: Float32Array): Float32Array {
    const output = new Float32Array(this.fftSize)
    const halfSize = this.fftSize / 2 + 1

    // Synthesize via sum of cosines with random phases
    for (let bin = 1; bin < halfSize; bin++) {
      const amp = Math.sqrt(noiseReal[bin] * noiseReal[bin] + noiseImag[bin] * noiseImag[bin])
      if (amp < 1e-10) continue
      const phase = Math.atan2(noiseImag[bin], noiseReal[bin])
      const freq = (2 * Math.PI * bin) / this.fftSize
      for (let n = 0; n < this.fftSize; n++) {
        output[n] += amp * Math.cos(freq * n + phase)
      }
    }

    // Normalize to prevent clipping
    let maxAbs = 0
    for (let i = 0; i < output.length; i++) {
      const abs = Math.abs(output[i])
      if (abs > maxAbs) maxAbs = abs
    }
    if (maxAbs > 0) {
      const scale = 1.0 / maxAbs
      for (let i = 0; i < output.length; i++) {
        output[i] *= scale
      }
    }

    return output
  }
}
