import { ipcMain, BrowserWindow, Notification } from 'electron'
import { DetectorManager } from './detection'
import { SettingsStore } from './settings-store'
import type { DetectionState, ActivityLogEntry, AppSettings } from '../shared/types'
import { ShieldLevel } from '../shared/types'
import * as IPC from '../shared/ipc-channels'

const VALID_SETTINGS_KEYS = new Set<keyof AppSettings>([
  'autoStart', 'autoShield', 'defaultLevel',
  'inputDeviceId', 'outputDeviceId', 'showNotifications',
])

const VALID_SHIELD_LEVELS = new Set([
  ShieldLevel.Stealth, ShieldLevel.Moderate,
  ShieldLevel.Strong, ShieldLevel.Maximum,
])

function safeSend(mainWindow: BrowserWindow, channel: string, ...args: unknown[]): void {
  if (!mainWindow.isDestroyed()) {
    mainWindow.webContents.send(channel, ...args)
  }
}

export function registerIpcHandlers(
  mainWindow: BrowserWindow,
  detectorManager: DetectorManager,
  settingsStore: SettingsStore
): void {
  // -- Detection handlers --
  ipcMain.handle(IPC.DETECTION_START, () => {
    detectorManager.start()
  })

  ipcMain.handle(IPC.DETECTION_STOP, () => {
    detectorManager.stop()
  })

  ipcMain.handle(IPC.DETECTION_STATUS, () => {
    return detectorManager.getState()
  })

  // Forward detection state changes to renderer
  detectorManager.on('state-change', (state: DetectionState) => {
    safeSend(mainWindow, IPC.DETECTION_STATE_CHANGED, state)
  })

  detectorManager.on('threat-detected', (data) => {
    // Desktop notification
    const settings = settingsStore.get()
    if (settings.showNotifications) {
      const notification = new Notification({
        title: 'Anti Granola - Threat Detected',
        body: `Detected: ${data.threats.map((t: { name: string }) => t.name).join(', ')}`,
        urgency: 'critical',
      })
      notification.show()
    }

    // Activity log entry
    sendLogEntry(mainWindow, {
      type: 'detection',
      message: `Threat detected: ${data.threats.map((t: { name: string }) => t.name).join(', ')} (score: ${data.score})`,
      severity: 'threat',
    })
  })

  detectorManager.on('threat-cleared', () => {
    sendLogEntry(mainWindow, {
      type: 'detection',
      message: 'All threats cleared',
      severity: 'success',
    })
  })

  detectorManager.on('error', ({ source, error }) => {
    sendLogEntry(mainWindow, {
      type: 'error',
      message: `Detection error (${source}): ${error.message ?? error}`,
      severity: 'warning',
    })
  })

  // -- Shield handlers (stubs for Phase 2) --
  let shieldState = {
    isActive: false,
    level: ShieldLevel.Moderate,
    latencyMs: 0,
    inputDevice: '',
    outputDevice: '',
  }

  ipcMain.handle(IPC.SHIELD_ACTIVATE, (_event, level: ShieldLevel) => {
    if (!VALID_SHIELD_LEVELS.has(level)) return
    shieldState = { ...shieldState, isActive: true, level }
    safeSend(mainWindow, IPC.SHIELD_STATE_CHANGED, shieldState)
    sendLogEntry(mainWindow, {
      type: 'shield',
      message: `Shield activated (level ${level})`,
      severity: 'success',
    })
  })

  ipcMain.handle(IPC.SHIELD_DEACTIVATE, () => {
    shieldState = { ...shieldState, isActive: false }
    safeSend(mainWindow, IPC.SHIELD_STATE_CHANGED, shieldState)
    sendLogEntry(mainWindow, {
      type: 'shield',
      message: 'Shield deactivated',
      severity: 'info',
    })
  })

  ipcMain.handle(IPC.SHIELD_SET_LEVEL, (_event, level: ShieldLevel) => {
    if (!VALID_SHIELD_LEVELS.has(level)) return
    shieldState = { ...shieldState, level }
    safeSend(mainWindow, IPC.SHIELD_STATE_CHANGED, shieldState)
  })

  ipcMain.handle(IPC.SHIELD_STATUS, () => {
    return shieldState
  })

  // -- Settings handlers --
  ipcMain.handle(IPC.SETTINGS_GET, () => {
    return settingsStore.get()
  })

  ipcMain.handle(IPC.SETTINGS_SET, (_event, partial: unknown) => {
    if (typeof partial !== 'object' || partial === null || Array.isArray(partial)) return
    // Only allow known settings keys
    const sanitized: Partial<AppSettings> = {}
    for (const [key, value] of Object.entries(partial)) {
      if (VALID_SETTINGS_KEYS.has(key as keyof AppSettings)) {
        (sanitized as Record<string, unknown>)[key] = value
      }
    }
    if (Object.keys(sanitized).length > 0) {
      settingsStore.set(sanitized)
    }
  })

  ipcMain.handle(IPC.SETTINGS_RESET, () => {
    settingsStore.reset()
  })

  // -- Audio handlers (stubs for Phase 2) --
  ipcMain.handle(IPC.AUDIO_GET_DEVICES, () => {
    return []
  })
}

let logIdCounter = 0

function sendLogEntry(
  mainWindow: BrowserWindow,
  entry: Omit<ActivityLogEntry, 'id' | 'timestamp'>
): void {
  const fullEntry: ActivityLogEntry = {
    id: `log-${++logIdCounter}`,
    timestamp: Date.now(),
    ...entry,
  }
  safeSend(mainWindow, IPC.ACTIVITY_LOG_ENTRY, fullEntry)
}
