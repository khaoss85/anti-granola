import { useDetection } from '../hooks/useDetection'
import type { ThreatInfo } from '../../shared/types'

function ThreatBadge({ level }: { level: string }) {
  const config: Record<string, { label: string; classes: string }> = {
    none: { label: 'CLEAR', classes: 'bg-green-500/15 text-green-400 border-green-500/30' },
    probable: { label: 'PROBABLE THREAT', classes: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30' },
    confirmed: { label: 'CONFIRMED THREAT', classes: 'bg-red-500/15 text-red-400 border-red-500/30' },
  }
  const { label, classes } = config[level] ?? config.none

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${classes}`}>
      {label}
    </span>
  )
}

function ThreatTypeIcon({ type }: { type: ThreatInfo['type'] }) {
  if (type === 'process') {
    return (
      <svg className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    )
  }
  if (type === 'network') {
    return (
      <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  }
  return (
    <svg className="h-4 w-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  )
}

function ThreatCard({ threat }: { threat: ThreatInfo }) {
  const time = new Date(threat.detectedAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  const typeLabel = threat.type === 'both' ? 'Process + Network' : threat.type === 'process' ? 'Process' : 'Network'

  return (
    <div className="rounded-lg bg-gray-800 p-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <ThreatTypeIcon type={threat.type} />
          <span className="text-sm font-medium text-white">{threat.name}</span>
        </div>
        <span className="text-xs text-gray-500">{time}</span>
      </div>
      <div className="mt-2 flex items-center gap-3">
        <span className="text-xs text-gray-400">{typeLabel}</span>
        <span className="text-xs text-gray-500">|</span>
        <span className="text-xs text-gray-400">
          Confidence: {Math.round(threat.confidence)}%
        </span>
      </div>
    </div>
  )
}

export function DetectionStatus() {
  const { isScanning, threats, score, level, startScanning, stopScanning } = useDetection()

  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-gray-300">Detection</h2>
          {isScanning && (
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <ThreatBadge level={level} />
          <button
            onClick={isScanning ? stopScanning : startScanning}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              isScanning
                ? 'bg-red-500/15 text-red-400 hover:bg-red-500/25'
                : 'bg-blue-500/15 text-blue-400 hover:bg-blue-500/25'
            }`}
          >
            {isScanning ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>

      {/* Score */}
      <div className="mb-4">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs text-gray-500">Threat Score</span>
          <span className="text-xs font-mono text-gray-400">{score}/150+</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-800">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              score >= 150 ? 'bg-red-500' : score >= 80 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${Math.min((score / 150) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Threat list */}
      {threats.length > 0 ? (
        <div className="flex flex-col gap-2">
          {threats.map((threat, i) => (
            <ThreatCard key={`${threat.name}-${i}`} threat={threat} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-gray-600">
          <svg className="mb-2 h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          <span className="text-sm">No threats detected</span>
        </div>
      )}
    </div>
  )
}
