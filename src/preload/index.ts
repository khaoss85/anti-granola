import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'
import type { ShieldLevel, AppSettings } from '../shared/types'
import * as IPC from '../shared/ipc-channels'

contextBridge.exposeInMainWorld('electronAPI', {
  detection: {
    start: () => ipcRenderer.invoke(IPC.DETECTION_START),
    stop: () => ipcRenderer.invoke(IPC.DETECTION_STOP),
    getStatus: () => ipcRenderer.invoke(IPC.DETECTION_STATUS),
    onStateChanged: (callback: (...args: unknown[]) => void) => {
      const handler = (_event: IpcRendererEvent, state: unknown) => callback(state)
      ipcRenderer.on(IPC.DETECTION_STATE_CHANGED, handler)
      return () => { ipcRenderer.removeListener(IPC.DETECTION_STATE_CHANGED, handler) }
    },
  },
  shield: {
    activate: (level: ShieldLevel) => ipcRenderer.invoke(IPC.SHIELD_ACTIVATE, level),
    deactivate: () => ipcRenderer.invoke(IPC.SHIELD_DEACTIVATE),
    setLevel: (level: ShieldLevel) => ipcRenderer.invoke(IPC.SHIELD_SET_LEVEL, level),
    getStatus: () => ipcRenderer.invoke(IPC.SHIELD_STATUS),
    onStateChanged: (callback: (...args: unknown[]) => void) => {
      const handler = (_event: IpcRendererEvent, state: unknown) => callback(state)
      ipcRenderer.on(IPC.SHIELD_STATE_CHANGED, handler)
      return () => { ipcRenderer.removeListener(IPC.SHIELD_STATE_CHANGED, handler) }
    },
  },
  settings: {
    get: () => ipcRenderer.invoke(IPC.SETTINGS_GET),
    set: (settings: Partial<AppSettings>) => ipcRenderer.invoke(IPC.SETTINGS_SET, settings),
    reset: () => ipcRenderer.invoke(IPC.SETTINGS_RESET),
  },
  audio: {
    getDevices: () => ipcRenderer.invoke(IPC.AUDIO_GET_DEVICES),
    onMeterData: (callback: (...args: unknown[]) => void) => {
      const handler = (_event: IpcRendererEvent, data: unknown) => callback(data)
      ipcRenderer.on(IPC.AUDIO_METER_DATA, handler)
      return () => { ipcRenderer.removeListener(IPC.AUDIO_METER_DATA, handler) }
    },
  },
  activity: {
    onLogEntry: (callback: (...args: unknown[]) => void) => {
      const handler = (_event: IpcRendererEvent, entry: unknown) => callback(entry)
      ipcRenderer.on(IPC.ACTIVITY_LOG_ENTRY, handler)
      return () => { ipcRenderer.removeListener(IPC.ACTIVITY_LOG_ENTRY, handler) }
    },
  },
})
