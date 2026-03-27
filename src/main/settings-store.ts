import Store from 'electron-store'
import type { AppSettings } from '../shared/types'
import { ShieldLevel } from '../shared/types'

const DEFAULT_SETTINGS: AppSettings = {
  autoStart: false,
  autoShield: false,
  defaultLevel: ShieldLevel.Moderate,
  inputDeviceId: null,
  outputDeviceId: null,
  showNotifications: true,
}

export class SettingsStore {
  private store: Store<AppSettings>

  constructor() {
    this.store = new Store<AppSettings>({
      name: 'settings',
      defaults: DEFAULT_SETTINGS,
    })
  }

  get(): AppSettings {
    return {
      autoStart: this.store.get('autoStart'),
      autoShield: this.store.get('autoShield'),
      defaultLevel: this.store.get('defaultLevel'),
      inputDeviceId: this.store.get('inputDeviceId'),
      outputDeviceId: this.store.get('outputDeviceId'),
      showNotifications: this.store.get('showNotifications'),
    }
  }

  set(partial: Partial<AppSettings>): void {
    for (const [key, value] of Object.entries(partial)) {
      this.store.set(key as keyof AppSettings, value)
    }
  }

  reset(): void {
    this.store.clear()
    this.store.set(DEFAULT_SETTINGS)
  }
}
