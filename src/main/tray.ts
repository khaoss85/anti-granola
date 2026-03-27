import { Tray, Menu, nativeImage, BrowserWindow } from 'electron'

type TrayState = 'inactive' | 'monitoring' | 'threat' | 'shielded'

const TRAY_COLORS: Record<TrayState, [number, number, number]> = {
  inactive: [107, 114, 128],  // gray
  monitoring: [59, 130, 246], // blue
  threat: [239, 68, 68],      // red
  shielded: [34, 197, 94],    // green
}

function createTrayIcon(rgb: [number, number, number]): Electron.NativeImage {
  // Create a 16x16 RGBA bitmap
  const size = 16
  const buffer = Buffer.alloc(size * size * 4)

  const centerX = size / 2
  const centerY = size / 2
  const radius = size / 2 - 1

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x - centerX + 0.5
      const dy = y - centerY + 0.5
      const dist = Math.sqrt(dx * dx + dy * dy)
      const offset = (y * size + x) * 4

      if (dist <= radius) {
        // Anti-alias the edge
        const alpha = dist > radius - 1 ? Math.max(0, (radius - dist)) * 255 : 255
        buffer[offset] = rgb[0]     // R
        buffer[offset + 1] = rgb[1] // G
        buffer[offset + 2] = rgb[2] // B
        buffer[offset + 3] = Math.round(alpha) // A
      } else {
        buffer[offset + 3] = 0 // transparent
      }
    }
  }

  return nativeImage.createFromBuffer(buffer, {
    width: size,
    height: size,
  })
}

export class TrayManager {
  private tray: Tray | null = null
  private state: TrayState = 'inactive'
  private mainWindow: BrowserWindow | null = null
  private onToggleShield: (() => void) | null = null
  private onQuit: (() => void) | null = null

  constructor(
    mainWindow: BrowserWindow,
    callbacks: {
      onToggleShield?: () => void
      onQuit?: () => void
    } = {}
  ) {
    this.mainWindow = mainWindow
    this.onToggleShield = callbacks.onToggleShield ?? null
    this.onQuit = callbacks.onQuit ?? null
  }

  create(): void {
    const icon = createTrayIcon(TRAY_COLORS.inactive)
    this.tray = new Tray(icon)
    this.tray.setToolTip('Anti Granola - Inactive')
    this.updateMenu()

    this.tray.on('click', () => {
      if (this.mainWindow) {
        if (this.mainWindow.isVisible()) {
          this.mainWindow.hide()
        } else {
          this.mainWindow.show()
          this.mainWindow.focus()
        }
      }
    })
  }

  setState(state: TrayState): void {
    this.state = state
    if (!this.tray) return

    const icon = createTrayIcon(TRAY_COLORS[state])
    this.tray.setImage(icon)

    const tooltips: Record<TrayState, string> = {
      inactive: 'Anti Granola - Inactive',
      monitoring: 'Anti Granola - Monitoring',
      threat: 'Anti Granola - Threat Detected!',
      shielded: 'Anti Granola - Shield Active',
    }
    this.tray.setToolTip(tooltips[state])
    this.updateMenu()
  }

  private updateMenu(): void {
    if (!this.tray) return

    const menu = Menu.buildFromTemplate([
      {
        label: 'Show Dashboard',
        click: () => {
          this.mainWindow?.show()
          this.mainWindow?.focus()
        },
      },
      { type: 'separator' },
      {
        label: this.state === 'shielded' ? 'Deactivate Shield' : 'Activate Shield',
        click: () => this.onToggleShield?.(),
      },
      { type: 'separator' },
      {
        label: 'Quit Anti Granola',
        click: () => this.onQuit?.(),
      },
    ])

    this.tray.setContextMenu(menu)
  }

  destroy(): void {
    this.tray?.destroy()
    this.tray = null
  }
}
