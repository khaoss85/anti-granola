import { app, BrowserWindow, session } from 'electron'
import { join } from 'path'
import { TrayManager } from './tray'
import { SettingsStore } from './settings-store'
import { DetectorManager } from './detection'
import { ShieldManager } from './shield/shield-manager'
import { registerIpcHandlers } from './ipc-handlers'

let mainWindow: BrowserWindow | null = null
let trayManager: TrayManager | null = null
let detectorManager: DetectorManager | null = null
let settingsStore: SettingsStore | null = null
let shieldManager: ShieldManager | null = null

const isDev = !!process.env.ELECTRON_RENDERER_URL

function createWindow(): BrowserWindow {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    minWidth: 800,
    minHeight: 600,
    title: 'Anti Granola',
    backgroundColor: '#030712', // gray-950
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  // Load the renderer
  if (process.env.ELECTRON_RENDERER_URL) {
    win.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'))
  }

  return win
}

app.whenReady().then(() => {
  // Set CSP via session headers (works in both dev and production)
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    const csp = isDev
      ? "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' ws://localhost:*"
      : "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'"
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [csp],
      },
    })
  })

  settingsStore = new SettingsStore()
  detectorManager = new DetectorManager()
  shieldManager = new ShieldManager()

  mainWindow = createWindow()

  // Tray
  trayManager = new TrayManager(mainWindow, {
    onToggleShield: () => {
      if (!shieldManager || !settingsStore) return
      if (shieldManager.getState().isActive) {
        shieldManager.deactivate()
      } else {
        const settings = settingsStore.get()
        shieldManager.activate(settings.defaultLevel).catch(() => {
          // Error is emitted via shieldManager events, handled by IPC handlers
        })
      }
    },
    onQuit: () => {
      app.quit()
    },
  })
  trayManager.create()

  // Register IPC handlers
  registerIpcHandlers(mainWindow, detectorManager, settingsStore, shieldManager)

  // Update tray based on detection and shield state
  detectorManager.on('state-change', (state) => {
    if (shieldManager?.getState().isActive) {
      trayManager?.setState('shielded')
    } else if (state.level === 'confirmed' || state.level === 'probable') {
      trayManager?.setState('threat')
    } else if (state.isScanning) {
      trayManager?.setState('monitoring')
    } else {
      trayManager?.setState('inactive')
    }
  })

  shieldManager.on('state-change', (shieldState) => {
    if (shieldState.isActive) {
      trayManager?.setState('shielded')
    } else {
      // Revert to detection-based state
      const detState = detectorManager?.getState()
      if (detState && (detState.level === 'confirmed' || detState.level === 'probable')) {
        trayManager?.setState('threat')
      } else if (detState?.isScanning) {
        trayManager?.setState('monitoring')
      } else {
        trayManager?.setState('inactive')
      }
    }
  })

  // Auto-shield: when detection confirms threat and autoShield is enabled
  detectorManager.on('threat-detected', (data) => {
    if (!shieldManager || !settingsStore) return
    const settings = settingsStore.get()
    if (settings.autoShield && data.level === 'confirmed' && !shieldManager.getState().isActive) {
      shieldManager.activate(settings.defaultLevel).catch(() => {
        // Error handled by event listeners
      })
    }
  })

  // Auto-start detection
  detectorManager.start()

  // Handle window close: hide to tray instead of quitting
  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault()
      mainWindow?.hide()
    }
  })

  app.on('activate', () => {
    mainWindow?.show()
    mainWindow?.focus()
  })
})

// Extend app with isQuitting flag
declare module 'electron' {
  interface App {
    isQuitting?: boolean
  }
}

app.on('before-quit', () => {
  app.isQuitting = true
  shieldManager?.deactivate()
  detectorManager?.stop()
  trayManager?.destroy()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
