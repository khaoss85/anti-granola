import { EventEmitter } from 'events'
import naudiodon from 'naudiodon'
import type { IoStreamRead, IoStreamWrite } from 'naudiodon'
import type { AudioPipelineConfig } from './types'
import type { PerturbationEngine } from './perturbation'

export class AudioPipeline extends EventEmitter {
  private config: AudioPipelineConfig | null = null
  private running = false
  private inputStream: IoStreamRead | null = null
  private outputStream: IoStreamWrite | null = null
  private perturbationEngine: PerturbationEngine | null = null

  setPerturbationEngine(engine: PerturbationEngine): void {
    this.perturbationEngine = engine
  }

  async start(config: AudioPipelineConfig): Promise<void> {
    if (this.running) {
      await this.stop()
    }

    this.config = config

    this.inputStream = naudiodon.AudioIO({
      inOptions: {
        deviceId: config.inputDeviceId,
        sampleRate: config.sampleRate,
        channelCount: config.channels,
        sampleFormat: naudiodon.SampleFormatFloat32,
        framesPerBuffer: config.bufferSize,
        closeOnError: false,
      },
    })

    this.outputStream = naudiodon.AudioIO({
      outOptions: {
        deviceId: config.outputDeviceId,
        sampleRate: config.sampleRate,
        channelCount: config.channels,
        sampleFormat: naudiodon.SampleFormatFloat32,
        framesPerBuffer: config.bufferSize,
        closeOnError: false,
      },
    })

    // Process audio data from input and write to output
    this.inputStream.on('data', (buf: Buffer) => {
      if (!this.running) return

      const startTime = performance.now()

      // Convert Buffer to Float32Array
      const input = new Float32Array(buf.buffer, buf.byteOffset, buf.length / 4)

      // Compute input RMS for metering
      const inputRms = computeRMS(input)

      // Apply perturbation
      let output: Float32Array
      if (this.perturbationEngine) {
        output = this.perturbationEngine.process(input)
      } else {
        output = input
      }

      // Compute output RMS for metering
      const outputRms = computeRMS(output)

      // Convert back to Buffer and write to output
      const outBuf = Buffer.from(output.buffer, output.byteOffset, output.byteLength)
      this.outputStream?.write(outBuf)

      const latencyMs = performance.now() - startTime

      // Emit meter data for the UI (shape must match renderer's { input, output })
      this.emit('meter-data', {
        input: inputRms,
        output: outputRms,
        latencyMs,
      })
    })

    this.inputStream.on('error', (err: Error) => {
      this.emit('error', { source: 'input', error: err })
    })

    this.outputStream.on('error', (err: Error) => {
      this.emit('error', { source: 'output', error: err })
    })

    // Start both streams
    this.outputStream.start()
    this.inputStream.start()
    this.running = true
  }

  async stop(): Promise<void> {
    this.running = false

    // Remove listeners before quitting to prevent leaks
    this.inputStream?.removeAllListeners()
    this.outputStream?.removeAllListeners()

    await Promise.all([
      new Promise<void>((resolve) => {
        if (this.inputStream) {
          this.inputStream.quit(() => resolve())
        } else {
          resolve()
        }
      }),
      new Promise<void>((resolve) => {
        if (this.outputStream) {
          this.outputStream.quit(() => resolve())
        } else {
          resolve()
        }
      }),
    ])

    this.inputStream = null
    this.outputStream = null
    this.config = null
  }

  isRunning(): boolean {
    return this.running
  }
}

function computeRMS(buffer: Float32Array): number {
  let sum = 0
  for (let i = 0; i < buffer.length; i++) {
    sum += buffer[i] * buffer[i]
  }
  return Math.sqrt(sum / buffer.length)
}
