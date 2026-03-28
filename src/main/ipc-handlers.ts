import { ipcMain, BrowserWindow, Notification } from 'electron'
import { DetectorManager } from './detection'
import { SettingsStore } from './settings-store'
import { ShieldManager } from './shield/shield-manager'
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
  settingsStore: SettingsStore,
  shieldManager: ShieldManager
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
        title: 'Nullify - Threat Detected',
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

  // -- Shield handlers --
  ipcMain.handle(IPC.SHIELD_ACTIVATE, async (_event, level: ShieldLevel) => {
    if (!VALID_SHIELD_LEVELS.has(level)) return
    try {
      const settings = settingsStore.get()
      await shieldManager.activate(level, settings.inputDeviceId ?? undefined, settings.outputDeviceId ?? undefined)
      sendLogEntry(mainWindow, {
        type: 'shield',
        message: `Shield activated (level ${level})`,
        severity: 'success',
      })
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      sendLogEntry(mainWindow, {
        type: 'error',
        message: `Shield activation failed: ${msg}`,
        severity: 'warning',
      })
      throw err
    }
  })

  ipcMain.handle(IPC.SHIELD_DEACTIVATE, async () => {
    try {
      await shieldManager.deactivate()
      sendLogEntry(mainWindow, {
        type: 'shield',
        message: 'Shield deactivated',
        severity: 'info',
      })
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      sendLogEntry(mainWindow, {
        type: 'error',
        message: `Shield deactivation failed: ${msg}`,
        severity: 'warning',
      })
    }
  })

  ipcMain.handle(IPC.SHIELD_SET_LEVEL, (_event, level: ShieldLevel) => {
    if (!VALID_SHIELD_LEVELS.has(level)) return
    shieldManager.setLevel(level)
  })

  ipcMain.handle(IPC.SHIELD_STATUS, () => {
    return shieldManager.getState()
  })

  // Forward shield state changes to renderer
  shieldManager.on('state-change', (state) => {
    safeSend(mainWindow, IPC.SHIELD_STATE_CHANGED, state)
  })

  // Forward meter data to renderer
  shieldManager.on('meter-data', (data) => {
    safeSend(mainWindow, IPC.AUDIO_METER_DATA, data)
  })

  // Forward shield errors to activity log
  shieldManager.on('error', ({ source, error }) => {
    sendLogEntry(mainWindow, {
      type: 'error',
      message: `Audio error (${source}): ${error.message ?? error}`,
      severity: 'warning',
    })
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

  // -- Audio handlers --
  ipcMain.handle(IPC.AUDIO_GET_DEVICES, () => {
    try {
      return shieldManager.getDeviceManager().getDevices()
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      sendLogEntry(mainWindow, {
        type: 'error',
        message: `Failed to enumerate audio devices: ${msg}`,
        severity: 'warning',
      })
      return []
    }
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
