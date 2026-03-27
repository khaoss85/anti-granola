import FFT from 'fft.js'

export class FFTProcessor {
  private fft: FFT
  private readonly size: number
  private readonly window: Float32Array
  // Pre-allocated buffers for zero-GC processing
  private readonly windowed: Float32Array
  private readonly complexOut: Float32Array
  private readonly complexIn: Float32Array
  private readonly timeOut: Float32Array

  constructor(size: number) {
    this.size = size
    this.fft = new FFT(size)
    this.window = this.createHanningWindow(size)
    this.windowed = new Float32Array(size)
    this.complexOut = this.fft.createComplexArray()
    this.complexIn = this.fft.createComplexArray()
    this.timeOut = new Float32Array(size)
  }

  forward(signal: Float32Array): { real: Float32Array; imag: Float32Array } {
    // Apply Hanning window
    for (let i = 0; i < this.size; i++) {
      this.windowed[i] = signal[i] * this.window[i]
    }

    this.fft.realTransform(this.complexOut, this.windowed)
    this.fft.completeSpectrum(this.complexOut)

    // Extract real and imaginary parts
    const halfSize = this.size / 2 + 1
    const real = new Float32Array(halfSize)
    const imag = new Float32Array(halfSize)
    for (let i = 0; i < halfSize; i++) {
      real[i] = this.complexOut[i * 2]
      imag[i] = this.complexOut[i * 2 + 1]
    }
    return { real, imag }
  }

  inverse(real: Float32Array, imag: Float32Array): Float32Array {
    const halfSize = this.size / 2 + 1

    // Pack into complex array with conjugate symmetry
    for (let i = 0; i < halfSize; i++) {
      this.complexIn[i * 2] = real[i]
      this.complexIn[i * 2 + 1] = imag[i]
    }
    for (let i = halfSize; i < this.size; i++) {
      const mirror = this.size - i
      this.complexIn[i * 2] = real[mirror]
      this.complexIn[i * 2 + 1] = -imag[mirror]
    }

    this.fft.inverseTransform(this.timeOut, this.complexIn)

    // Output is interleaved complex — take real parts
    const output = new Float32Array(this.size)
    for (let i = 0; i < this.size; i++) {
      output[i] = this.timeOut[i * 2]
    }
    return output
  }

  getMagnitude(real: Float32Array, imag: Float32Array): Float32Array {
    const mag = new Float32Array(real.length)
    for (let i = 0; i < real.length; i++) {
      mag[i] = Math.sqrt(real[i] * real[i] + imag[i] * imag[i])
    }
    return mag
  }

  getSize(): number {
    return this.size
  }

  private createHanningWindow(size: number): Float32Array {
    const w = new Float32Array(size)
    for (let i = 0; i < size; i++) {
      w[i] = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (size - 1)))
    }
    return w
  }
}
