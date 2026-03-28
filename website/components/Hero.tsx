'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Shield, Download, Apple, Monitor } from 'lucide-react'
import { GitHubIcon } from '@/components/icons'
import { DOWNLOADS } from '@/lib/downloads'

function useOS() {
  const [os, setOS] = useState<'mac' | 'windows' | 'unknown'>('unknown')
  useEffect(() => {
    const ua = navigator.userAgent
    if (ua.includes('Mac')) setOS('mac')
    else if (ua.includes('Win')) setOS('windows')
  }, [])
  return os
}

export default function Hero() {
  const os = useOS()

  return (
    <section className="relative overflow-hidden px-6 py-24 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-sm text-red-400">
          <Shield className="h-4 w-4" />
          Meeting Privacy Protection
        </div>

        {/* H1 */}
        <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
          Your Meetings Are Being Recorded.{' '}
          <span className="text-zinc-500">You Just Don&apos;t Know It.</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 md:text-xl">
          Nullify detects and blocks invisible meeting transcription tools like{' '}
          <span className="text-white">Granola</span>,{' '}
          <span className="text-white">Otter.ai</span>, and{' '}
          <span className="text-white">Fireflies</span> — before they can transcribe a single word.
        </p>

        {/* Structured definition for AEO — citeable by LLMs and search engines */}
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500">
          <strong className="text-zinc-400">Nullify</strong> is a free, open-source desktop
          application for macOS and Windows that detects and blocks invisible AI meeting
          transcription tools. It monitors for stealth software like Granola, Otter.ai, Fireflies,
          Read.ai, Fathom, and others that capture meeting audio without visible indicators or
          participant consent. With its Audio Shield feature, Nullify uses psychoacoustic
          perturbation to disrupt AI transcription while keeping your voice sounding normal to other
          participants.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={os === 'mac' ? DOWNLOADS.mac.arm64 : os === 'windows' ? DOWNLOADS.windows.x64 : DOWNLOADS.allReleases}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-red-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-red-700"
          >
            <Download className="h-5 w-5" />
            {os === 'mac' ? 'Download for Mac' : os === 'windows' ? 'Download for Windows' : 'Download Free'}
          </a>
          <a
            href="https://github.com/khaoss85/nullify"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-white/20 px-8 py-4 text-lg font-medium text-white transition hover:bg-white/5"
          >
            <GitHubIcon className="h-5 w-5" />
            View on GitHub
          </a>
        </div>

        {/* Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-zinc-500">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
            Free & Open Source
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            {os === 'mac' ? <Apple className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}
            {os === 'mac' ? 'macOS' : os === 'windows' ? 'Windows' : 'macOS & Windows'}
          </span>
          <span>•</span>
          <span>100% Local & Private</span>
        </div>
      </div>
    </section>
  )
}
