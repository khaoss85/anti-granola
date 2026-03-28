import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, AlertTriangle, Check, X, ArrowRight } from 'lucide-react'
import { getBreadcrumbSchema, getFAQSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Nullify vs Otter.ai — How to Detect & Block Otter.ai Recording',
  description:
    'Compare Nullify vs Otter.ai. Learn how Otter.ai records your meetings and how Nullify detects and blocks it. Free, open-source meeting privacy tool.',
  alternates: {
    canonical: 'https://nullify.guru/nullify-vs-otter-ai',
  },
  openGraph: {
    title: 'Nullify vs Otter.ai — Detect & Block Silent Meeting Recording',
    description:
      'Otter.ai joins or records your meetings silently. Nullify detects it in real time and protects your privacy.',
    url: 'https://nullify.guru/nullify-vs-otter-ai',
    type: 'article',
  },
}

const comparisonData = [
  { feature: 'Purpose', nullify: 'Protect meeting privacy', otter: 'Transcribe meetings with AI' },
  { feature: 'Visibility to participants', nullify: 'Transparent — shows alerts', otter: 'Bot joins call or runs silently' },
  { feature: 'Consent required', nullify: 'N/A — runs on your device', otter: 'Often auto-joins without individual consent' },
  { feature: 'Open source', nullify: true, otter: false },
  { feature: 'Free', nullify: true, otter: 'Freemium' },
  { feature: 'Works with Zoom, Meet, Teams', nullify: true, otter: true },
  { feature: 'Audio Shield (disrupt transcription)', nullify: true, otter: false },
  { feature: 'Real-time process detection', nullify: true, otter: false },
  { feature: 'Stores your conversation data', nullify: false, otter: true },
  { feature: 'Sends audio to external servers', nullify: false, otter: true },
  { feature: 'Subject of class-action lawsuit', nullify: false, otter: true },
]

const faqData = [
  {
    question: 'What is Otter.ai and how does it work?',
    answer:
      'Otter.ai is an AI-powered meeting transcription service. It works in two ways: it can join meetings as a bot participant (OtterPilot) that records and transcribes, or it can run as a desktop/mobile app that captures audio locally. It integrates with Zoom, Google Meet, and Microsoft Teams to automatically join and transcribe scheduled meetings.',
  },
  {
    question: 'Can Otter.ai record my meeting without my consent?',
    answer:
      'Yes. When someone has OtterPilot configured to auto-join meetings, it can join your call and start recording. While the bot may appear in the participant list, it often joins silently and participants may not notice. The desktop app version can also capture audio without any visible indicator to other participants.',
  },
  {
    question: 'Is there a lawsuit against Otter.ai?',
    answer:
      'Yes. Otter.ai has faced a class-action lawsuit alleging that its recording practices violate wiretapping and privacy laws. The lawsuit argues that Otter.ai records conversations without obtaining proper consent from all parties, particularly in states that require all-party consent for recording.',
  },
  {
    question: 'How does Nullify detect Otter.ai?',
    answer:
      'Nullify detects Otter.ai through multiple methods: it monitors for Otter.ai processes running on your system, identifies OtterPilot bot connections during meetings, and watches for network-level signatures associated with Otter.ai\'s transcription service. You get an instant alert the moment Otter.ai activity is detected.',
  },
  {
    question: 'Can Nullify block Otter.ai from transcribing my voice?',
    answer:
      'Yes. Nullify\'s Audio Shield feature uses psychoacoustic perturbation to disrupt AI transcription in real time. When enabled, Otter.ai\'s AI receives garbled audio that produces unusable transcripts, while human participants hear your voice normally. This works regardless of whether Otter.ai is running locally or has joined as a bot.',
  },
  {
    question: 'How do I stop Otter.ai from auto-joining my meetings?',
    answer:
      'You cannot control whether other participants have Otter.ai configured to auto-join. If someone on your call has OtterPilot enabled, it will join and record. The only way to protect yourself is to detect it when it happens — which is exactly what Nullify does — and optionally use Audio Shield to neutralize the transcription.',
  },
]

export default function NullifyVsOtterAi() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: 'Home', url: 'https://nullify.guru' },
              { name: 'Nullify vs Otter.ai', url: 'https://nullify.guru/nullify-vs-otter-ai' },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFAQSchema(faqData)),
        }}
      />

      <div className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          {/* Hero */}
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600/10 ring-1 ring-red-500/20">
              <Shield className="h-8 w-8 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Nullify vs Otter.ai
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
              Otter.ai records and transcribes your meetings — often without your knowledge. Nullify
              detects it instantly and gives you the power to stop it.
            </p>
          </div>

          {/* What is Otter.ai */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white">What Is Otter.ai?</h2>
            <p className="mt-4 text-zinc-400">
              Otter.ai is a popular AI meeting transcription service used by millions. It offers
              two main recording methods: OtterPilot, a bot that auto-joins your scheduled
              meetings to record and transcribe, and a desktop/mobile app that captures audio
              directly from your device.
            </p>
            <div className="mt-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-500" />
                <p className="text-sm text-zinc-300">
                  <strong className="text-yellow-400">The problem:</strong> OtterPilot can be
                  configured to auto-join every meeting on a user&apos;s calendar. It joins silently,
                  and even when it appears in the participant list, many users don&apos;t notice a bot
                  is recording them. Otter.ai has already faced a class-action lawsuit over its
                  recording practices.
                </p>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white">Feature Comparison</h2>
            <p className="mt-2 text-zinc-400">
              How Nullify and Otter.ai compare across key features.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 pr-4 text-left text-sm font-semibold text-zinc-300">Feature</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-red-400">Nullify</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-zinc-400">Otter.ai</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row) => (
                    <tr key={row.feature} className="border-b border-white/5">
                      <td className="py-3 pr-4 text-sm text-zinc-300">{row.feature}</td>
                      <td className="px-4 py-3 text-center">
                        {row.nullify === true ? (
                          <Check className="mx-auto h-5 w-5 text-green-400" />
                        ) : row.nullify === false ? (
                          <X className="mx-auto h-5 w-5 text-zinc-600" />
                        ) : (
                          <span className="text-sm text-zinc-300">{row.nullify}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {row.otter === true ? (
                          <Check className="mx-auto h-5 w-5 text-green-400" />
                        ) : row.otter === false ? (
                          <X className="mx-auto h-5 w-5 text-zinc-600" />
                        ) : (
                          <span className="text-sm text-zinc-300">{row.otter}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* How Nullify Protects You */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white">How Nullify Protects You from Otter.ai</h2>
            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-white">1. Detect OtterPilot Bot</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Nullify identifies when OtterPilot joins your meeting as a bot participant. You get
                  an instant alert so you can decide whether to allow the recording or ask the host
                  to remove it.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-white">2. Detect Desktop App</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  If someone on your call is running the Otter.ai desktop app to capture audio
                  locally, Nullify detects the process running on your system and alerts you
                  immediately.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-white">3. Audio Shield</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Enable Audio Shield to inject psychoacoustic perturbation that renders Otter.ai&apos;s
                  transcription useless. Your voice sounds perfectly normal to humans but produces
                  garbled, unusable text for AI systems.
                </p>
              </div>
            </div>
          </section>

          {/* The Otter.ai Lawsuit */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white">The Otter.ai Class-Action Lawsuit</h2>
            <p className="mt-4 text-zinc-400">
              Otter.ai has faced legal action over its recording practices. Key allegations include:
            </p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                <span className="text-sm text-zinc-400">
                  <strong className="text-zinc-200">Wiretapping violations:</strong> Recording
                  conversations without obtaining consent from all parties, violating state and
                  federal wiretapping statutes.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                <span className="text-sm text-zinc-400">
                  <strong className="text-zinc-200">Auto-join without consent:</strong> OtterPilot
                  automatically joining meetings and recording without explicit permission from all
                  participants.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                <span className="text-sm text-zinc-400">
                  <strong className="text-zinc-200">Data handling concerns:</strong> Questions about
                  how recorded audio and generated transcripts are stored, processed, and potentially
                  used to train AI models.
                </span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-zinc-500">
              Regardless of the lawsuit outcome, the fact remains: you deserve to know when your
              conversations are being recorded and transcribed.
            </p>
          </section>

          {/* FAQ */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
            <div className="mt-6 space-y-4">
              {faqData.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-xl border border-white/10 bg-white/5"
                >
                  <summary className="cursor-pointer px-5 py-4 text-sm font-medium text-white">
                    {faq.question}
                  </summary>
                  <p className="px-5 pb-4 text-sm text-zinc-400">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-16 rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
            <h2 className="text-xl font-bold text-white">
              Stop Otter.ai from Transcribing Your Meetings
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Download Nullify for free and know instantly when Otter.ai or other transcription
              tools are active in your meetings.
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
