declare module 'fft.js' {
  class FFT {
    constructor(size: number)
    size: number
    /** Compute forward FFT. Output arrays must be pre-allocated with length = size. */
    realTransform(output: Float32Array, input: Float32Array): void
    /** Compute inverse FFT. Output array must be pre-allocated with length = size. */
    inverseTransform(output: Float32Array, input: Float32Array): void
    /** Interleave real/imag arrays into a single complex array [re0, im0, re1, im1, ...] */
    toComplexArray(input: Float32Array, storage?: Float32Array): Float32Array
    /** Extract real components from a complex array */
    fromComplexArray(complex: Float32Array, storage?: Float32Array): Float32Array
    /** Create a complex array buffer of the correct size */
    createComplexArray(): Float32Array
    /** Complete the spectrum from half-spectrum produced by realTransform */
    completeSpectrum(spectrum: Float32Array): void
  }
  export = FFT
}
