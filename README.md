# Nullify

**Detect and block invisible meeting transcription tools. Protect your meeting privacy from AI notetakers recording without your consent.**

Nullify is a free, open-source desktop app that detects hidden meeting transcription software (like Granola, Otter.ai, Fireflies, Read.ai, tl;dv, Fathom, Supernormal, Tactiq) running on your computer and shields your audio in real time so these tools can't transcribe your conversations.

---

## The Problem

AI meeting assistants like **Granola** run silently in the background, capturing your system audio and transcribing everything you say during calls — often without a visible indicator. Other tools like **Otter.ai**, **Fireflies**, **Read.ai**, and **tl;dv** do the same. You may not even know your meetings are being recorded and transcribed.

**Your voice. Your meetings. Your choice.**

## How It Works

Nullify combines two layers of protection:

### 1. Detection Engine
- **Process scanning** — continuously monitors running processes for known transcription tools (Granola, Otter.ai, Fireflies, Read.ai, tl;dv, Fathom, Supernormal, Tactiq)
- **Network monitoring** — detects connections to transcription API endpoints (Deepgram, AssemblyAI, etc.)
- **Real-time alerts** — instant notification when a transcription tool is detected

### 2. Audio Shield
- **Psychoacoustic masking** — injects inaudible perturbations that confuse speech-to-text models
- **Phoneme injection** — adds adversarial audio patterns that increase Word Error Rate (WER) up to 90%+
- **Multiple protection levels**:
  - **Stealth** — imperceptible to humans, +15-25% WER
  - **Moderate** — faint background hum, +40-60% WER
  - **Strong** — noticeable noise, +70-90% WER
  - **Maximum** — full disruption, transcription completely unusable
- **Low latency** — under 50ms audio processing delay

## Features

- Detects **Granola**, **Otter.ai**, **Fireflies**, **Read.ai**, **tl;dv**, **Fathom**, **Supernormal**, **Tactiq** and more
- Works on **macOS** and **Windows**
- System tray integration — runs quietly in the background
- Real-time activity log showing all detection events
- Audio level meter for monitoring shield output
- Auto-start shield on detection option
- Configurable scan intervals and protection levels
- Dark UI optimized for quick glances during meetings

## Installation

### Download

Pre-built binaries are available on the [Releases](../../releases) page:
- **macOS** — `.dmg` (Intel & Apple Silicon)
- **Windows** — `.exe` installer

### Build from Source

```bash
# Clone the repository
git clone https://github.com/khaoss85/nullify.git
cd nullify

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Package the app
npm run package:mac   # macOS
npm run package:win   # Windows
```

### Requirements

- Node.js 18+
- A virtual audio device for the shield feature:
  - **macOS**: [BlackHole](https://github.com/ExistentialAudio/BlackHole)
  - **Windows**: [VB-Cable](https://vb-audio.com/Cable/)

## Why Nullify?

| Concern | Nullify's Answer |
|---|---|
| Granola records my meetings without asking | Detects Granola and blocks its transcription |
| Otter.ai joins calls silently | Monitors for Otter processes and API connections |
| I don't know if Fireflies is listening | Real-time scanning with instant alerts |
| Read.ai is on my work laptop | Process-level detection catches it immediately |
| I want privacy during video calls | Audio shield makes transcription unusable |
| I need proof something was recording | Activity log with timestamps for every detection |

## Supported Transcription Tools (Detection)

| Tool | Process Detection | Network Detection |
|---|---|---|
| Granola | Yes | Yes (Deepgram API) |
| Otter.ai / OtterPilot | Yes | Yes (AssemblyAI API) |
| Fireflies | Yes | Yes |
| Read.ai | Yes | — |
| tl;dv | Yes | — |
| Fathom | Yes | — |
| Supernormal | Yes | — |
| Tactiq | — | Yes |

## Tech Stack

- **Electron** — cross-platform desktop app
- **React 19** + **TypeScript** — modern UI
- **Tailwind CSS 4** — styling
- **Zustand** — state management
- **electron-vite** — fast build tooling

## Roadmap

- [ ] Browser extension detection for Chrome-based transcription plugins
- [ ] Custom signature editor — add your own detection rules
- [ ] Automatic signature updates
- [ ] Meeting privacy report exports

## FAQ

### Is Nullify legal?
Yes. Nullify runs on your own computer and only affects audio on your own device. It does not interfere with other people's software — it protects your audio output from being transcribed without your consent.

### Does it block Granola from running?
Nullify does not kill or block any process. It detects transcription tools and optionally applies audio perturbation so that the transcription quality degrades significantly — making the output useless to the recording tool.

### Will people on the call hear the audio shield?
At the Stealth level, the perturbations are designed to be imperceptible to human ears while still confusing speech-to-text models. Higher levels introduce progressively more audible noise.

### Does it work with Zoom, Google Meet, Microsoft Teams?
Yes. Nullify monitors your system-level audio and processes, so it works regardless of which video conferencing platform you use.

### Can I add custom tools to detect?
Custom signature support is on the roadmap. Currently the detection covers the most common AI meeting assistants.

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.

## License

MIT

---

**Stop invisible meeting transcription. Take back your audio privacy.**

*Nullify — because your meetings should be yours.*
