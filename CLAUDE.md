# Nullify

Nullify is a desktop app that detects hidden meeting transcription tools and shields audio in real-time. Built with Electron + React + TypeScript.

## Architecture

### App structure (electron-vite)
- `src/main/` — Electron main process (Node.js)
- `src/preload/` — Context bridge (IPC channels)
- `src/renderer/` — React 19 SPA (Tailwind CSS 4, Zustand)
- `src/shared/` — Types, constants, IPC channel names shared between processes
- `website/` — Next.js marketing site (separate project, has its own CLAUDE.md)

### Main process modules
- `src/main/detection/` — Process + network scanning for transcription tools
- `src/main/shield/` — Audio pipeline: mic → perturbation → virtual device
  - `shield-manager.ts` — Orchestrates DeviceManager + AudioPipeline + PerturbationEngine
  - `audio-pipeline.ts` — naudiodon streams (PortAudio), lazy-loaded to avoid startup crash
  - `device-manager.ts` — Audio device enumeration, virtual device detection
  - `perturbation/` — DSP: FFT, psychoacoustic masking, phoneme injection, VAD
- `src/main/tray.ts` — System tray with colored dot icon
- `src/main/settings-store.ts` — Persistent settings via electron-store
- `src/main/ipc-handlers.ts` — All IPC handlers (detection, shield, settings, audio)

### Key patterns
- **Lazy naudiodon loading**: naudiodon is `require()`'d inside functions, never top-level imported. PortAudio crashes (SIGSEGV) if loaded before macOS grants microphone permission.
- **Microphone permission**: `systemPreferences.askForMediaAccess('microphone')` is called in `index.ts` before any audio access. `device-manager.ts` also has a sync guard via `getMediaAccessStatus()`.
- **IPC channels**: Defined in `src/shared/ipc-channels.ts` as constants. Renderer uses `window.electronAPI` (see `src/preload/index.ts`).
- **Shield levels**: 4 levels (1-4) in `ShieldLevel` enum. Each level adjusts psychoacoustic + phoneme gains.
- **Event-driven**: DetectorManager and ShieldManager extend EventEmitter. State changes propagate via events → IPC → Zustand stores.

## Build & package

```bash
npm run dev          # electron-vite dev server
npm run build        # electron-vite build
npm run package:mac  # electron-builder --mac (DMG)
npm run package:win  # electron-builder --win (NSIS exe)
```

- Native modules (naudiodon) need PortAudio: `brew install portaudio` on macOS
- electron-builder auto-runs `@electron/rebuild` for the target Electron version
- macOS entitlements in `assets/entitlements.mac.plist` (audio-input permission)
- `NSMicrophoneUsageDescription` set via `extendInfo` in `electron-builder.yml`

## Website

The `website/` directory is a separate Next.js project deployed to Vercel.
- Download URLs centralized in `website/lib/downloads.ts` — update VERSION there for new releases.
- Has its own CLAUDE.md referencing AGENTS.md for Next.js version-specific rules.

## Common pitfalls
- Never import naudiodon at module top level — always use lazy `require()` inside functions
- naudiodon `getDevices()` segfaults without mic permission on macOS — always check `getMediaAccessStatus` first
- FFT buffer size must match BUFFER_SIZE (1024). PerturbationEngine skips processing if sizes mismatch.
- electron-store is ESM-only — excluded from `externalizeDepsPlugin` so it gets bundled
- Windows builds can't cross-compile from macOS (naudiodon native module). Use GitHub Actions CI.
