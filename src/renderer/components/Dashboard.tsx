import { useEffect } from 'react'
import { useDetection } from '../hooks/useDetection'
import { useShield } from '../hooks/useShield'
import { useSettings } from '../hooks/useSettings'
import { DetectionStatus } from './DetectionStatus'
import { ShieldControls } from './ShieldControls'
import { ActivityLog } from './ActivityLog'
import { AudioMeter } from './AudioMeter'
import { Settings } from './Settings'

function StatusDot() {
  const isScanning = useDetection((s) => s.isScanning)
  const level = useDetection((s) => s.level)
  const shieldActive = useShield((s) => s.isActive)

  let color = 'bg-gray-500'
  if (level === 'confirmed') {
    color = 'bg-red-500'
  } else if (level === 'probable') {
    color = 'bg-yellow-500'
  } else if (shieldActive) {
    color = 'bg-green-500'
  } else if (isScanning) {
    color = 'bg-blue-500'
  }

  return (
    <span className={`inline-block h-2.5 w-2.5 rounded-full ${color}`} />
  )
}

export function Dashboard() {
  const loadSettings = useSettings((s) => s.loadSettings)

  useEffect(() => {
    loadSettings()
  }, [loadSettings])

  return (
    <div className="flex h-screen flex-col overflow-hidden p-4">
      {/* Header */}
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold tracking-wider text-white">
            NULLIFY
          </h1>
          <StatusDot />
        </div>
        <span className="text-xs text-gray-500">v0.2.0</span>
      </header>

      {/* Main content */}
      <div className="flex min-h-0 flex-1 gap-4">
        {/* Left column - 2/3 */}
        <div className="flex w-2/3 flex-col gap-4">
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
            <DetectionStatus />
          </div>
          <div className="min-h-0 flex-1 rounded-xl border border-gray-800 bg-gray-900 p-4">
            <ActivityLog />
          </div>
        </div>

        {/* Right column - 1/3 */}
        <div className="flex w-1/3 flex-col gap-4">
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
            <ShieldControls />
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
            <AudioMeter />
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-4">
            <Settings />
          </div>
        </div>
      </div>
    </div>
  )
}
