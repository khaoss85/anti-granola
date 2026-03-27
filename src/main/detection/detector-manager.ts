import { EventEmitter } from 'events'
import { ProcessDetector } from './process-detector'
import { NetworkDetector } from './network-detector'
import type {
  DetectionState,
  ThreatInfo,
  ThreatLevel,
  ProcessMatch,
  NetworkMatch,
} from '../../shared/types'
import {
  DETECTION_THRESHOLD_PROBABLE,
  DETECTION_THRESHOLD_CONFIRMED,
} from '../../shared/constants'

export class DetectorManager extends EventEmitter {
  private processDetector: ProcessDetector
  private networkDetector: NetworkDetector
  private state: DetectionState = {
    isScanning: false,
    threats: [],
    score: 0,
    level: 'none',
  }

  private processMatches: Map<string, ProcessMatch> = new Map()
  private networkMatches: Map<string, NetworkMatch> = new Map()

  constructor() {
    super()
    this.processDetector = new ProcessDetector()
    this.networkDetector = new NetworkDetector()

    this.processDetector.on('match', (matches: ProcessMatch[]) => {
      this.processMatches.clear()
      for (const m of matches) {
        this.processMatches.set(`${m.signatureName}:${m.pid}`, m)
      }
      this.recalculate()
    })

    this.processDetector.on('clear', () => {
      this.processMatches.clear()
      this.recalculate()
    })

    this.processDetector.on('error', (err) => {
      this.emit('error', { source: 'process-detector', error: err })
    })

    this.networkDetector.on('match', (matches: NetworkMatch[]) => {
      this.networkMatches.clear()
      for (const m of matches) {
        const key = `${m.signatureName}:${m.endpoint}`
        this.networkMatches.set(key, m)
      }
      this.recalculate()
    })

    this.networkDetector.on('clear', () => {
      this.networkMatches.clear()
      this.recalculate()
    })

    this.networkDetector.on('error', (err) => {
      this.emit('error', { source: 'network-detector', error: err })
    })
  }

  start(): void {
    this.processDetector.start()
    this.networkDetector.start()
    this.updateState({ isScanning: true })
  }

  stop(): void {
    this.processDetector.stop()
    this.networkDetector.stop()
    this.processMatches.clear()
    this.networkMatches.clear()
    this.updateState({
      isScanning: false,
      threats: [],
      score: 0,
      level: 'none',
    })
  }

  getState(): DetectionState {
    return { ...this.state }
  }

  private recalculate(): void {
    const threatMap = new Map<string, ThreatInfo>()
    let totalScore = 0

    // Process matches - deduplicate by signatureName, keep score once per tool
    const processScoreCounted = new Set<string>()
    for (const [_key, match] of this.processMatches) {
      const sigName = match.signatureName
      const existing = threatMap.get(sigName)
      if (existing) {
        existing.details += `, PID ${match.pid}`
      } else {
        threatMap.set(sigName, {
          name: match.signatureName,
          type: 'process',
          confidence: match.score,
          details: `Process "${match.processName}" (PID ${match.pid})`,
          detectedAt: Date.now(),
        })
      }
      // Count score once per unique tool
      if (!processScoreCounted.has(sigName)) {
        totalScore += match.score
        processScoreCounted.add(sigName)
      }
    }

    // Network matches
    for (const [key, match] of this.networkMatches) {
      const sigName = match.signatureName
      const existing = threatMap.get(sigName)
      if (existing) {
        existing.type = 'both'
        existing.confidence = Math.min(100, existing.confidence + match.score)
        existing.details += ` + Network → ${match.endpoint}`
      } else {
        threatMap.set(sigName, {
          name: match.signatureName,
          type: 'network',
          confidence: match.score,
          details: `Connection to ${match.endpoint} (${match.remoteAddr})`,
          detectedAt: Date.now(),
        })
      }
      totalScore += match.score
    }

    const threats = Array.from(threatMap.values())
    let level: ThreatLevel = 'none'
    if (totalScore >= DETECTION_THRESHOLD_CONFIRMED) {
      level = 'confirmed'
    } else if (totalScore >= DETECTION_THRESHOLD_PROBABLE) {
      level = 'probable'
    }

    const previousLevel = this.state.level
    this.updateState({ threats, score: totalScore, level })

    // Emit specific events
    if (level !== 'none' && previousLevel === 'none') {
      this.emit('threat-detected', { threats, score: totalScore, level })
    } else if (level === 'none' && previousLevel !== 'none') {
      this.emit('threat-cleared')
    }
  }

  private updateState(partial: Partial<DetectionState>): void {
    const previous = { ...this.state }
    this.state = { ...this.state, ...partial }

    const changed =
      previous.level !== this.state.level ||
      previous.score !== this.state.score ||
      previous.isScanning !== this.state.isScanning ||
      previous.threats.length !== this.state.threats.length

    if (changed) {
      this.emit('state-change', this.getState())
    }
  }
}
