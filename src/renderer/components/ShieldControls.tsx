import { useShield } from '../hooks/useShield'
import { ShieldLevel } from '../../shared/types'
import { SHIELD_LEVEL_INFO } from '../../shared/constants'

const levels = [ShieldLevel.Stealth, ShieldLevel.Moderate, ShieldLevel.Strong, ShieldLevel.Maximum]

export function ShieldControls() {
  const { isActive, level, latencyMs, activate, deactivate, setLevel } = useShield()

  const info = SHIELD_LEVEL_INFO[level]

  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-sm font-semibold text-gray-300">Shield</h2>
        {isActive && (
          <span className="rounded-full bg-green-500/15 px-2 py-0.5 text-[10px] font-medium text-green-400">
            ACTIVE
          </span>
        )}
      </div>

      {/* Toggle button */}
      <div className="mb-5 flex flex-col items-center">
        <button
          onClick={() => (isActive ? deactivate() : activate())}
          className={`group relative flex h-20 w-20 items-center justify-center rounded-full border-2 transition-all duration-300 ${
            isActive
              ? 'border-green-500/50 bg-green-500/10 shadow-[0_0_30px_rgba(34,197,94,0.2)]'
              : 'border-gray-700 bg-gray-800 hover:border-gray-600'
          }`}
        >
          <svg
            className={`h-8 w-8 transition-colors ${
              isActive ? 'text-green-400' : 'text-gray-500 group-hover:text-gray-400'
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            />
          </svg>
        </button>
        {isActive && (
          <span className="mt-2 text-xs font-mono text-gray-500">
            Latency: {latencyMs}ms
          </span>
        )}
      </div>

      {/* Level slider */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-gray-500">Level</span>
          <span className="text-xs font-medium text-gray-400">{info.label}</span>
        </div>
        <input
          type="range"
          min={1}
          max={4}
          step={1}
          value={level}
          onChange={(e) => setLevel(Number(e.target.value) as ShieldLevel)}
          className="w-full accent-green-500"
        />
        <div className="mt-1 flex justify-between px-0.5">
          {levels.map((l) => (
            <span
              key={l}
              className={`text-[10px] ${level === l ? 'text-green-400' : 'text-gray-600'}`}
            >
              {l}
            </span>
          ))}
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-gray-500">
          {info.description}
        </p>
      </div>
    </div>
  )
}
