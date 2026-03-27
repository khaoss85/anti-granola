import { EventEmitter } from 'events'
import type { ShieldState } from '../../shared/types'
import { ShieldLevel } from '../../shared/types'
import { SAMPLE_RATE, CHANNELS, BUFFER_SIZE } from '../../shared/constants'
import { DeviceManager } from './device-manager'
import { AudioPipeline } from './audio-pipeline'
import { PerturbationEngineImpl } from './perturbation'

export class ShieldManager extends EventEmitter {
  private state: ShieldState = {
    isActive: false,
    level: ShieldLevel.Moderate,
    latencyMs: 0,
    inputDevice: '',
    outputDevice: '',
  }

  private readonly deviceManager: DeviceManager
  private pipeline: AudioPipeline | null = null
  private perturbationEngine: PerturbationEngineImpl | null = null

  constructor() {
    super()
    this.deviceManager = new DeviceManager()
  }

  getDeviceManager(): DeviceManager {
    return this.deviceManager
  }

  getState(): ShieldState {
    return { ...this.state }
  }

  async activate(level: ShieldLevel, inputDeviceId?: number, outputDeviceId?: number): Promise<void> {
    if (this.pipeline?.isRunning()) {
      await this.deactivate()
    }

    // Resolve devices
    let inputId = inputDeviceId
    let outputId = outputDeviceId

    if (inputId == null) {
      const defaultInput = this.deviceManager.findDefaultInput()
      if (!defaultInput) throw new Error('No input audio device found')
      inputId = defaultInput.id
    }

    if (outputId == null) {
      const virtualOutput = this.deviceManager.findVirtualOutput()
      if (!virtualOutput) throw new Error('No virtual audio output device found (install BlackHole or VB-Cable)')
      outputId = virtualOutput.id
    }

    // Look up device names for display
    const devices = this.deviceManager.getDevices()
    const inputDevice = devices.find((d) => d.id === inputId && d.type === 'input')
    const outputDevice = devices.find((d) => d.id === outputId && d.type === 'output')

    // Create perturbation engine
    this.perturbationEngine = new PerturbationEngineImpl(level)

    // Create and configure pipeline
    this.pipeline = new AudioPipeline()
    this.pipeline.setPerturbationEngine(this.perturbationEngine)

    // Forward meter data and errors
    this.pipeline.on('meter-data', (data) => {
      this.state = { ...this.state, latencyMs: Math.round(data.latencyMs * 100) / 100 }
      this.emit('meter-data', data)
    })

    this.pipeline.on('error', (err) => {
      this.emit('error', err)
    })

    // Start the pipeline
    await this.pipeline.start({
      inputDeviceId: inputId,
      outputDeviceId: outputId,
      sampleRate: SAMPLE_RATE,
      channels: CHANNELS,
      bufferSize: BUFFER_SIZE,
    })

    this.state = {
      isActive: true,
      level,
      latencyMs: 0,
      inputDevice: inputDevice?.name ?? `Device ${inputId}`,
      outputDevice: outputDevice?.name ?? `Device ${outputId}`,
    }
    this.emit('state-change', this.getState())
  }

  async deactivate(): Promise<void> {
    if (this.pipeline) {
      await this.pipeline.stop()
      this.pipeline.removeAllListeners()
      this.pipeline = null
    }
    this.perturbationEngine = null

    this.state = {
      ...this.state,
      isActive: false,
      latencyMs: 0,
      inputDevice: '',
      outputDevice: '',
    }
    this.emit('state-change', this.getState())
  }

  setLevel(level: ShieldLevel): void {
    this.state = { ...this.state, level }
    this.perturbationEngine?.setLevel(level)
    this.emit('state-change', this.getState())
  }
}
