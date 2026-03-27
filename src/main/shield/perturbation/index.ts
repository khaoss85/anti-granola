/**
 * Perturbation Engine - stub for Phase 3.
 * Will contain psychoacoustic masking + phoneme confusion generators.
 */
export interface PerturbationEngine {
  process(audioBuffer: Float32Array): Float32Array
  setLevel(level: number): void
}
