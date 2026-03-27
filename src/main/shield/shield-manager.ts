import { EventEmitter } from 'events'
import type { ShieldState } from '../../shared/types'
import { ShieldLevel } from '../../shared/types'

/**
 * ShieldManager - stub for Phase 2.
 * Will orchestrate the audio pipeline and perturbation engine.
 */
export class ShieldManager extends EventEmitter {
  private state: ShieldState = {
    isActive: false,
    level: ShieldLevel.Moderate,
    latencyMs: 0,
    inputDevice: '',
    outputDevice: '',
  }

  getState(): ShieldState {
    return { ...this.state }
  }

  async activate(level: ShieldLevel): Promise<void> {
    // Phase 2: Start audio pipeline + perturbation engine
    this.state = { ...this.state, isActive: true, level }
    this.emit('state-change', this.getState())
  }

  async deactivate(): Promise<void> {
    // Phase 2: Stop audio pipeline
    this.state = { ...this.state, isActive: false, latencyMs: 0 }
    this.emit('state-change', this.getState())
  }

  setLevel(level: ShieldLevel): void {
    this.state = { ...this.state, level }
    this.emit('state-change', this.getState())
  }
}
