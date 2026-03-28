'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Download, Apple, Monitor, ExternalLink, Check, ArrowLeft } from 'lucide-react'

function useOS() {
  const [os, setOS] = useState<'mac' | 'windows' | 'unknown'>('unknown')
  useEffect(() => {
    const ua = navigator.userAgent
    if (ua.includes('Mac')) setOS('mac')
    else if (ua.includes('Win')) setOS('windows')
  }, [])
  return os
}

export default function DownloadPageClient() {
  const os = useOS()

  return (
    <div className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-white md:text-5xl">Download Nullify</h1>
        <p className="mt-4 text-lg text-zinc-400">
          Protect your meetings from invisible transcription. Free and open source.
        </p>

        {/* Primary download */}
        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <a
            href="https://github.com/khaoss85/nullify/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl bg-red-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-red-700"
          >
            {os === 'mac' ? (
              <Apple className="h-6 w-6" />
            ) : os === 'windows' ? (
              <Monitor className="h-6 w-6" />
            ) : (
              <Download className="h-6 w-6" />
            )}
            {os === 'mac'
              ? 'Download for macOS (.dmg)'
              : os === 'windows'
                ? 'Download for Windows (.exe)'
                : 'Download Latest Release'}
          </a>
          {os !== 'unknown' && (
            <a
              href="https://github.com/khaoss85/nullify/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-zinc-500 transition hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
              {os === 'mac' ? 'Download for Windows instead' : 'Download for macOS instead'}
            </a>
          )}
        </div>

        {/* System Requirements */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <div className="flex items-center gap-3">
              <Apple className="h-8 w-8 text-white" />
              <h2 className="text-2xl font-bold text-white">macOS</h2>
            </div>
            <ul className="mt-6 space-y-3">
              {[
                'macOS 12 (Monterey) or later',
                'Apple Silicon (M1/M2/M3) or Intel',
                '~50MB disk space',
                'System audio access permission',
              ].map((req) => (
                <li key={req} className="flex items-start gap-2 text-sm text-zinc-400">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <div className="flex items-center gap-3">
              <Monitor className="h-8 w-8 text-white" />
              <h2 className="text-2xl font-bold text-white">Windows</h2>
            </div>
            <ul className="mt-6 space-y-3">
              {[
                'Windows 10 or later',
                'x64 architecture',
                '~50MB disk space',
                'Admin permission for installation',
              ].map((req) => (
                <li key={req} className="flex items-start gap-2 text-sm text-zinc-400">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Installation Steps */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white">Installation</h2>
          <ol className="mt-6 space-y-4">
            {[
              'Download the installer for your operating system from GitHub Releases.',
              'Run the installer and follow the on-screen instructions.',
              'Grant the required permissions (system audio access on macOS).',
              'Nullify will appear in your system tray — it\'s now protecting your meetings.',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-4 text-zinc-400">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-600/10 text-sm font-bold text-red-500 ring-1 ring-red-500/20">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* All releases */}
        <div className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <h3 className="text-lg font-semibold text-white">Looking for older releases?</h3>
          <p className="mt-2 text-sm text-zinc-400">
            All versions are available on GitHub Releases.
          </p>
          <a
            href="https://github.com/khaoss85/nullify/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-red-400 transition hover:text-red-300"
          >
            <ExternalLink className="h-4 w-4" />
            View all releases on GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
