import { useState, useEffect } from 'react'
import { useSettings } from '../hooks/useSettings'
import { ShieldLevel } from '../../shared/types'
import type { AudioDeviceInfo } from '../../shared/types'
import { SHIELD_LEVEL_INFO } from '../../shared/constants'

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between py-1.5">
      <span className="text-xs text-gray-400">{label}</span>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
          checked ? 'bg-green-600' : 'bg-gray-700'
        }`}
      >
        <span
          className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform ${
            checked ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </button>
    </label>
  )
}

export function Settings() {
  const [open, setOpen] = useState(false)
  const [devices, setDevices] = useState<AudioDeviceInfo[]>([])
  const {
    isLoaded,
    autoStart,
    autoShield,
    showNotifications,
    defaultLevel,
    inputDeviceId,
    outputDeviceId,
    updateSetting,
  } = useSettings()

  useEffect(() => {
    const api = window.electronAPI
    if (api) {
      api.audio.getDevices().then(setDevices)
    }
  }, [])

  const inputDevices = devices.filter((d) => d.type === 'input')
  const outputDevices = devices.filter((d) => d.type === 'output')

  if (!isLoaded) return null

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between"
      >
        <h2 className="text-sm font-semibold text-gray-300">Settings</h2>
        <svg
          className={`h-4 w-4 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="mt-3 space-y-2">
          <Toggle label="Auto-start" checked={autoStart} onChange={(v) => updateSetting('autoStart', v)} />
          <Toggle label="Auto-shield" checked={autoShield} onChange={(v) => updateSetting('autoShield', v)} />
          <Toggle label="Notifications" checked={showNotifications} onChange={(v) => updateSetting('showNotifications', v)} />

          {/* Default level */}
          <div className="flex items-center justify-between py-1.5">
            <span className="text-xs text-gray-400">Default level</span>
            <select
              value={defaultLevel}
              onChange={(e) => updateSetting('defaultLevel', Number(e.target.value) as ShieldLevel)}
              className="rounded bg-gray-800 px-2 py-1 text-xs text-gray-300 outline-none"
            >
              {([ShieldLevel.Stealth, ShieldLevel.Moderate, ShieldLevel.Strong, ShieldLevel.Maximum] as const).map((l) => (
                <option key={l} value={l}>
                  {SHIELD_LEVEL_INFO[l].label}
                </option>
              ))}
            </select>
          </div>

          {/* Input device */}
          <div className="flex items-center justify-between py-1.5">
            <span className="text-xs text-gray-400">Input device</span>
            <select
              value={inputDeviceId ?? ''}
              onChange={(e) => updateSetting('inputDeviceId', e.target.value ? Number(e.target.value) : null)}
              className="max-w-[140px] truncate rounded bg-gray-800 px-2 py-1 text-xs text-gray-300 outline-none"
            >
              {inputDevices.length > 0 ? (
                inputDevices.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))
              ) : (
                <option value="">No devices found</option>
              )}
            </select>
          </div>

          {/* Output device */}
          <div className="flex items-center justify-between py-1.5">
            <span className="text-xs text-gray-400">Output device</span>
            <select
              value={outputDeviceId ?? ''}
              onChange={(e) => updateSetting('outputDeviceId', e.target.value ? Number(e.target.value) : null)}
              className="max-w-[140px] truncate rounded bg-gray-800 px-2 py-1 text-xs text-gray-300 outline-none"
            >
              {outputDevices.length > 0 ? (
                outputDevices.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))
              ) : (
                <option value="">No devices found</option>
              )}
            </select>
          </div>
        </div>
      )}
    </div>
  )
}
