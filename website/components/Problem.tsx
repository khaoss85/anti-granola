import Link from 'next/link'
import { AlertTriangle, Scale, GraduationCap, DollarSign } from 'lucide-react'

const facts = [
  {
    icon: DollarSign,
    title: 'Granola: $1.5B Valuation',
    description:
      'Granola raised $125M at a $1.5B valuation on March 25, 2026. It captures meeting audio through your system\'s audio pipeline — no bot, no indicator, completely invisible to other participants.',
  },
  {
    icon: AlertTriangle,
    title: 'Otter.ai Class-Action Lawsuit',
    description:
      'Otter.ai is facing a class-action lawsuit for recording meetings without proper consent from all participants. If you were on a call with an Otter user, you were likely recorded without knowing.',
  },
  {
    icon: GraduationCap,
    title: 'Stanford Bans AI Bots',
    description:
      'Stanford University has officially banned AI meeting bots from its meetings, recognizing the privacy threat they pose. When elite institutions take notice, the problem is real.',
  },
  {
    icon: Scale,
    title: '13 States Require Consent',
    description:
      'Thirteen U.S. states have two-party (all-party) consent laws for recording. Plus GDPR in Europe. Recording someone without consent isn\'t just rude — it may be illegal.',
  },
]

export default function Problem() {
  return (
    <section className="border-t border-white/5 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            The Invisible Transcription Problem
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            A new generation of AI meeting tools doesn&apos;t join as a visible bot. Instead, they
            silently capture your system audio — making them invisible to everyone else on the call.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {facts.map((fact) => (
            <div
              key={fact.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 transition hover:border-white/20"
            >
              <fact.icon className="h-8 w-8 text-red-500" />
              <h3 className="mt-4 text-xl font-semibold text-white">{fact.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{fact.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog/invisible-meeting-transcription-problem"
            className="text-sm font-medium text-red-400 transition hover:text-red-300 hover:underline"
          >
            Read more about the invisible transcription problem →
          </Link>
        </div>
      </div>
    </section>
  )
}
