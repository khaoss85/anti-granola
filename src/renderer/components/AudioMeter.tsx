import { useState, useEffect } from 'react'
import { useShield } from '../hooks/useShield'

function MeterBar({ label, value }: { label: string; value: number }) {
  const pct = Math.max(0, Math.min(100, value * 100))

  let barColor = 'bg-green-500'
  if (pct > 80) barColor = 'bg-red-500'
  else if (pct > 60) barColor = 'bg-yellow-500'

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative h-28 w-6 overflow-hidden rounded-full bg-gray-800">
        <div
          className={`absolute bottom-0 w-full rounded-full transition-all duration-150 ${barColor}`}
          style={{ height: `${pct}%` }}
        />
      </div>
      <span className="text-[10px] text-gray-500">{label}</span>
    </div>
  )
}

export function AudioMeter() {
  const isActive = useShield((s) => s.isActive)
  const [meter, setMeter] = useState({ input: 0, output: 0 })

  useEffect(() => {
    if (!isActive) {
      setMeter({ input: 0, output: 0 })
      return
    }

    const api = window.electronAPI
    if (!api) return

    const unsubscribe = api.audio.onMeterData((data) => setMeter(data))
    return () => unsubscribe()
  }, [isActive])

  return (
    <div>
      <h2 className="mb-4 text-sm font-semibold text-gray-300">Audio</h2>

      {isActive ? (
        <div className="flex items-center justify-center gap-8">
          <MeterBar label="Input" value={meter.input} />
          <MeterBar label="Output" value={meter.output} />
        </div>
      ) : (
        <div className="flex items-center justify-center py-6">
          <span className="text-xs text-gray-600">Activate shield to monitor audio</span>
        </div>
      )}
    </div>
  )
}
