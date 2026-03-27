import { create } from 'zustand'
import type { DetectionState } from '../../shared/types'

interface DetectionStore extends DetectionState {
  startScanning: () => Promise<void>
  stopScanning: () => Promise<void>
}

const defaultState: DetectionState = {
  isScanning: false,
  threats: [],
  score: 0,
  level: 'none',
}

export const useDetection = create<DetectionStore>((set) => {
  const api = window.electronAPI

  if (api) {
    api.detection.getStatus().then((state) => set(state))
    api.detection.onStateChanged((state) => set(state))
  }

  return {
    ...defaultState,
    startScanning: async () => {
      if (api) {
        await api.detection.start()
      } else {
        set({ isScanning: true })
      }
    },
    stopScanning: async () => {
      if (api) {
        await api.detection.stop()
      } else {
        set({ isScanning: false, threats: [], score: 0, level: 'none' })
      }
    },
  }
})
