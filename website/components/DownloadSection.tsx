'use client'

import { useEffect, useState } from 'react'
import { Download, Apple, Monitor, ExternalLink } from 'lucide-react'

function useOS() {
  const [os, setOS] = useState<'mac' | 'windows' | 'unknown'>('unknown')
  useEffect(() => {
    const ua = navigator.userAgent
    if (ua.includes('Mac')) setOS('mac')
    else if (ua.includes('Win')) setOS('windows')
  }, [])
  return os
}

export default function DownloadSection() {
  const os = useOS()

  return (
    <section id="download" className="border-t border-white/5 px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">Download Nullify</h2>
        <p className="mt-4 text-lg text-zinc-400">
          Free, open source, and ready to protect your meetings.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="https://github.com/khaoss85/anti-granola/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl bg-red-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-red-700"
          >
            {os === 'mac' ? (
              <Apple className="h-5 w-5" />
            ) : os === 'windows' ? (
              <Monitor className="h-5 w-5" />
            ) : (
              <Download className="h-5 w-5" />
            )}
            {os === 'mac'
              ? 'Download for macOS'
              : os === 'windows'
                ? 'Download for Windows'
                : 'Download Free'}
          </a>

          {os !== 'unknown' && (
            <a
              href="https://github.com/khaoss85/anti-granola/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
              {os === 'mac' ? 'Also available for Windows' : 'Also available for macOS'}
            </a>
          )}
        </div>

        <div className="mt-12 grid gap-6 text-left sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-2">
              <Apple className="h-5 w-5 text-white" />
              <h3 className="font-semibold text-white">macOS</h3>
            </div>
            <ul className="mt-3 space-y-1 text-sm text-zinc-400">
              <li>macOS 12 (Monterey) or later</li>
              <li>Apple Silicon or Intel</li>
              <li>~50MB disk space</li>
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-white" />
              <h3 className="font-semibold text-white">Windows</h3>
            </div>
            <ul className="mt-3 space-y-1 text-sm text-zinc-400">
              <li>Windows 10 or later</li>
              <li>x64 architecture</li>
              <li>~50MB disk space</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
