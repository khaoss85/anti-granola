// Central download URLs — update here when releasing a new version
const VERSION = '0.2.0'
const BASE = 'https://github.com/khaoss85/nullify/releases/latest/download'

export const DOWNLOADS = {
  version: VERSION,
  mac: {
    arm64: `${BASE}/Nullify-${VERSION}-arm64.dmg`,
    x64: `${BASE}/Nullify-${VERSION}.dmg`,
  },
  windows: {
    x64: `${BASE}/Nullify-Setup-${VERSION}.exe`,
  },
  allReleases: 'https://github.com/khaoss85/nullify/releases',
} as const
