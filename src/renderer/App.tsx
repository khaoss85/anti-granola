import { useState, useEffect } from 'react'
import { Dashboard } from './components/Dashboard'
import { SetupWizard } from './components/SetupWizard'

export function App() {
  const [showSetup, setShowSetup] = useState(false)

  useEffect(() => {
    const api = window.electronAPI
    if (!api) return

    // Check if a virtual audio device (BlackHole or VB-Cable) is available
    api.audio.getDevices().then((devices) => {
      const hasVirtualDevice = devices.some((d) => {
        const name = d.name.toLowerCase()
        return name.includes('blackhole') || name.includes('cable')
      })
      if (!hasVirtualDevice) {
        setShowSetup(true)
      }
    }).catch(() => {
      // Audio enumeration failed (permission denied or PortAudio unavailable)
      setShowSetup(true)
    })
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Dashboard />
      {showSetup && <SetupWizard onClose={() => setShowSetup(false)} />}
    </div>
  )
}
