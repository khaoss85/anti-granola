import { create } from 'zustand'
import type { ActivityLogEntry } from '../../shared/types'

const MAX_ENTRIES = 200

interface ActivityLogStore {
  entries: ActivityLogEntry[]
  addEntry: (entry: ActivityLogEntry) => void
  clearLog: () => void
}

export const useActivityLog = create<ActivityLogStore>((set) => {
  const api = window.electronAPI

  if (api) {
    api.activity.onLogEntry((entry) => {
      set((state) => ({
        entries: [...state.entries, entry].slice(-MAX_ENTRIES),
      }))
    })
  }

  return {
    entries: [],
    addEntry: (entry) =>
      set((state) => ({
        entries: [...state.entries, entry].slice(-MAX_ENTRIES),
      })),
    clearLog: () => set({ entries: [] }),
  }
})
