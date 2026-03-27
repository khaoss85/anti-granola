import { EventEmitter } from 'events'
import type { AudioPipelineConfig } from './types'

/**
 * AudioPipeline - stub for Phase 2.
 * Will handle mic → perturbation → virtual device routing.
 */
export class AudioPipeline extends EventEmitter {
  private config: AudioPipelineConfig | null = null
  private running = false

  async start(config: AudioPipelineConfig): Promise<void> {
    this.config = config
    this.running = true
    // Phase 2: Initialize naudiodon streams
  }

  async stop(): Promise<void> {
    this.running = false
    this.config = null
    // Phase 2: Close naudiodon streams
  }

  isRunning(): boolean {
    return this.running
  }
}
