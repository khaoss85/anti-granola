import { create } from 'zustand'
import { ShieldLevel } from '../../shared/types'
import type { ShieldState } from '../../shared/types'

interface ShieldStore extends ShieldState {
  activate: (level?: ShieldLevel) => Promise<void>
  deactivate: () => Promise<void>
  setLevel: (level: ShieldLevel) => Promise<void>
}

const defaultState: ShieldState = {
  isActive: false,
  level: ShieldLevel.Moderate,
  latencyMs: 0,
  inputDevice: '',
  outputDevice: '',
}

export const useShield = create<ShieldStore>((set, get) => {
  const api = window.electronAPI

  if (api) {
    api.shield.getStatus().then((state) => set(state))
    api.shield.onStateChanged((state) => set(state))
  }

  return {
    ...defaultState,
    activate: async (level?: ShieldLevel) => {
      const lvl = level ?? get().level
      if (api) {
        await api.shield.activate(lvl)
      } else {
        set({ isActive: true, level: lvl, latencyMs: 23 })
      }
    },
    deactivate: async () => {
      if (api) {
        await api.shield.deactivate()
      } else {
        set({ isActive: false, latencyMs: 0 })
      }
    },
    setLevel: async (level: ShieldLevel) => {
      if (api) {
        await api.shield.setLevel(level)
      } else {
        set({ level })
      }
    },
  }
})
