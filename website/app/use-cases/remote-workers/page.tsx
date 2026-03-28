import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Monitor, Wifi, Users, ArrowRight } from 'lucide-react'
import { getBreadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Nullify for Remote Workers — Protect Your Meeting Privacy',
  description:
    'Remote workers face daily meetings on Zoom, Google Meet, and Teams. Nullify detects invisible transcription tools that record without consent. Free and open source.',
  alternates: {
    canonical: 'https://nullify.guru/use-cases/remote-workers',
  },
  openGraph: {
    title: 'Nullify for Remote Workers — Meeting Privacy Protection',
    description:
      'Your daily standups, 1-on-1s, and team calls could be silently transcribed. Nullify detects it and protects your privacy.',
    url: 'https://nullify.guru/use-cases/remote-workers',
    type: 'article',
  },
}

export default function RemoteWorkersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: 'Home', url: 'https://nullify.guru' },
              { name: 'Use Cases', url: 'https://nullify.guru/use-cases/remote-workers' },
              { name: 'Remote Workers', url: 'https://nullify.guru/use-cases/remote-workers' },
            ])
          ),
        }}
      />

      <div className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          {/* Hero */}
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600/10 ring-1 ring-red-500/20">
              <Monitor className="h-8 w-8 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Meeting Privacy for Remote Workers
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
              You spend hours in Zoom, Meet, and Teams every day. Any participant could be silently
              recording you with AI transcription tools. Nullify lets you know — and lets you stop it.
            </p>
          </div>

          {/* The Problem */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white">The Hidden Risk in Remote Work</h2>
            <p className="mt-4 text-zinc-400">
              Remote work means more meetings on more platforms with more people. Each meeting is an
              opportunity for invisible AI transcription tools to capture your words without your
              knowledge. Tools like Granola, Otter.ai, and Fireflies.ai can record silently —
              no notification, no recording indicator, no consent request.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
                <Wifi className="mx-auto h-8 w-8 text-red-400" />
                <p className="mt-3 text-2xl font-bold text-white">23+</p>
                <p className="mt-1 text-sm text-zinc-400">Avg. meetings per week for remote workers</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
                <Users className="mx-auto h-8 w-8 text-red-400" />
                <p className="mt-3 text-2xl font-bold text-white">300M+</p>
                <p className="mt-1 text-sm text-zinc-400">Daily Zoom meeting participants</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
                <Shield className="mx-auto h-8 w-8 text-red-400" />
                <p className="mt-3 text-2xl font-bold text-white">0</p>
                <p className="mt-1 text-sm text-zinc-400">Platform warnings for stealth recorders</p>
              </div>
            </div>
          </section>

          {/* Scenarios */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white">Meetings Where Privacy Matters</h2>
            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-white">Daily Standups & Team Syncs</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  You share blockers, challenges, and honest assessments of your work. If a colleague
                  is running Granola, every candid comment becomes a permanent, searchable transcript
                  on a third-party server.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-white">1-on-1s with Your Manager</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Salary discussions, career concerns, feedback about colleagues — these are
                  conversations that should stay between two people. Silent transcription turns
                  private dialogue into stored data.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-white">Client & Vendor Calls</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Pricing negotiations, contract terms, and competitive strategies discussed on
                  calls can be captured by transcription tools. Your business-sensitive information
                  ends up on servers you don&apos;t control.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-white">Interview Calls</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Whether you&apos;re interviewing for a new role or conducting interviews,
                  transcription tools can capture the entire conversation. Candidate responses,
                  salary expectations, and informal comments all become stored records.
                </p>
              </div>
            </div>
          </section>

          {/* How Nullify Helps */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white">How Nullify Protects Remote Workers</h2>
            <div className="mt-6 space-y-6">
              <div className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">1</span>
                <div>
                  <h3 className="font-semibold text-white">Install Once, Always Protected</h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    Download Nullify and it runs silently in your menu bar. No setup per meeting,
                    no browser extension to manage, no configuration needed. It just works.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">2</span>
                <div>
                  <h3 className="font-semibold text-white">Works Across All Platforms</h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    Zoom, Google Meet, Microsoft Teams, Webex — Nullify monitors at the system level
                    so it detects transcription tools regardless of which platform you&apos;re using.
                    Switch between platforms freely.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">3</span>
                <div>
                  <h3 className="font-semibold text-white">Instant Alerts</h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    The moment a transcription tool activates, you get a desktop notification. You can
                    address it immediately — ask the person to stop, leave the meeting, or activate
                    Audio Shield.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">4</span>
                <div>
                  <h3 className="font-semibold text-white">Audio Shield for Active Protection</h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    When you can&apos;t leave a meeting but don&apos;t want to be transcribed, Audio Shield
                    disrupts AI transcription while keeping your voice perfectly clear to human
                    participants.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="mt-16 rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
            <h2 className="text-xl font-bold text-white">
              Protect Every Meeting, Every Day
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Free, open-source, and built for the way you work. Download Nullify and take control
              of your meeting privacy.
            </p>
            <Link
              href="/download"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Download Nullify Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </div>
      </div>
    </>
  )
}
