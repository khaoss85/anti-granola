import { useEffect, useRef } from 'react'
import { useActivityLog } from '../hooks/useActivityLog'
import type { ActivityLogEntry } from '../../shared/types'

const severityColors: Record<ActivityLogEntry['severity'], string> = {
  info: 'bg-blue-400',
  warning: 'bg-yellow-400',
  threat: 'bg-red-400',
  success: 'bg-green-400',
}

function formatTime(timestamp: number): string {
  const d = new Date(timestamp)
  return d.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

export function ActivityLog() {
  const entries = useActivityLog((s) => s.entries)
  const clearLog = useActivityLog((s) => s.clearLog)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [entries])

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-300">Activity Log</h2>
        {entries.length > 0 && (
          <button
            onClick={clearLog}
            className="text-xs text-gray-500 transition-colors hover:text-gray-400"
          >
            Clear
          </button>
        )}
      </div>

      {/* Entries */}
      <div
        ref={scrollRef}
        className="scrollbar-thin flex-1 space-y-1 overflow-y-auto"
      >
        {entries.length > 0 ? (
          entries.map((entry) => (
            <div
              key={entry.id}
              className="flex items-start gap-2 rounded px-2 py-1.5 hover:bg-gray-800/50"
            >
              <span className="mt-1.5 flex-shrink-0">
                <span className={`inline-block h-1.5 w-1.5 rounded-full ${severityColors[entry.severity]}`} />
              </span>
              <span className="flex-shrink-0 font-mono text-[11px] text-gray-600">
                {formatTime(entry.timestamp)}
              </span>
              <span className="text-xs text-gray-400">{entry.message}</span>
            </div>
          ))
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-sm text-gray-600">No activity yet</span>
          </div>
        )}
      </div>
    </div>
  )
}
