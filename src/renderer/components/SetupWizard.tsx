import { useState } from 'react'

type Platform = 'mac' | 'windows' | 'unknown'

function detectPlatform(): Platform {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('mac')) return 'mac'
  if (ua.includes('win')) return 'windows'
  return 'unknown'
}

const macSteps = [
  'Download BlackHole 2ch from the link below.',
  'Open the downloaded .pkg file and follow the installer.',
  'Open "Audio MIDI Setup" (search in Spotlight).',
  'Click the "+" button and create a "Multi-Output Device".',
  'Check both your speakers/headphones and "BlackHole 2ch".',
  'Set the Multi-Output Device as your system output.',
  'Return here and click "Check Installation".',
]

const windowsSteps = [
  'Download VB-Cable from the link below.',
  'Extract the ZIP and run "VBCABLE_Setup_x64.exe" as Administrator.',
  'Follow the installer and reboot if prompted.',
  'Open Sound Settings and verify "CABLE Input" appears.',
  'Return here and click "Check Installation".',
]

export function SetupWizard({ onClose }: { onClose: () => void }) {
  const [platform] = useState(detectPlatform)
  const [checking, setChecking] = useState(false)

  const steps = platform === 'windows' ? windowsSteps : macSteps
  const downloadUrl =
    platform === 'windows'
      ? 'https://vb-audio.com/Cable/'
      : 'https://existential.audio/blackhole/'
  const driverName = platform === 'windows' ? 'VB-Cable' : 'BlackHole 2ch'

  const handleCheck = async () => {
    setChecking(true)
    const api = window.electronAPI
    if (api) {
      const devices = await api.audio.getDevices()
      const found = devices.some((d) =>
        d.name.toLowerCase().includes(platform === 'windows' ? 'cable' : 'blackhole')
      )
      if (found) {
        onClose()
        return
      }
    }
    setChecking(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-lg rounded-2xl border border-gray-800 bg-gray-900 p-6">
        <h2 className="mb-1 text-lg font-bold text-white">Audio Setup Required</h2>
        <p className="mb-5 text-sm text-gray-400">
          Anti Granola needs a virtual audio driver to intercept and protect your audio.
          Install <span className="font-medium text-white">{driverName}</span> to continue.
        </p>

        {/* Steps */}
        <ol className="mb-5 space-y-2">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-800 text-xs font-medium text-gray-400">
                {i + 1}
              </span>
              <span className="text-gray-300">{step}</span>
            </li>
          ))}
        </ol>

        {/* Download link */}
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-5 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download {driverName}
        </a>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleCheck}
            disabled={checking}
            className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-50"
          >
            {checking ? 'Checking...' : 'Check Installation'}
          </button>
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm text-gray-400 transition-colors hover:text-gray-300"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  )
}
