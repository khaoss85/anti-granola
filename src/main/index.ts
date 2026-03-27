import { app, BrowserWindow, session } from 'electron'
import { join } from 'path'
import { TrayManager } from './tray'
import { SettingsStore } from './settings-store'
import { DetectorManager } from './detection'
import { registerIpcHandlers } from './ipc-handlers'

let mainWindow: BrowserWindow | null = null
let trayManager: TrayManager | null = null
let detectorManager: DetectorManager | null = null
let settingsStore: SettingsStore | null = null

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
    win.webContents.openDevTools({ mode: 'bottom' })
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

  mainWindow = createWindow()

  // Tray
  trayManager = new TrayManager(mainWindow, {
    onToggleShield: () => {
      // Stub: will be connected to ShieldManager in Phase 2
    },
    onQuit: () => {
      app.quit()
    },
  })
  trayManager.create()

  // Register IPC handlers
  registerIpcHandlers(mainWindow, detectorManager, settingsStore)

  // Update tray based on detection state
  detectorManager.on('state-change', (state) => {
    if (state.level === 'confirmed' || state.level === 'probable') {
      trayManager?.setState('threat')
    } else if (state.isScanning) {
      trayManager?.setState('monitoring')
    } else {
      trayManager?.setState('inactive')
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
  detectorManager?.stop()
  trayManager?.destroy()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
