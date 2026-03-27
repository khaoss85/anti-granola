import { create } from 'zustand'
import { ShieldLevel } from '../../shared/types'
import type { AppSettings } from '../../shared/types'

interface SettingsStore extends AppSettings {
  isLoaded: boolean
  loadSettings: () => Promise<void>
  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => Promise<void>
}

const defaultSettings: AppSettings = {
  autoStart: false,
  autoShield: false,
  defaultLevel: ShieldLevel.Moderate,
  inputDeviceId: null,
  outputDeviceId: null,
  showNotifications: true,
}

export const useSettings = create<SettingsStore>((set) => {
  const api = window.electronAPI

  return {
    ...defaultSettings,
    isLoaded: false,
    loadSettings: async () => {
      if (api) {
        const settings = await api.settings.get()
        set({ ...settings, isLoaded: true })
      } else {
        set({ ...defaultSettings, isLoaded: true })
      }
    },
    updateSetting: async (key, value) => {
      set({ [key]: value } as Partial<SettingsStore>)
      if (api) {
        await api.settings.set({ [key]: value })
      }
    },
  }
})
