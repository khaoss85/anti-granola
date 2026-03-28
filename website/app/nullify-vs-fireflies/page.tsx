import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, AlertTriangle, Check, X, ArrowRight } from 'lucide-react'
import { getBreadcrumbSchema, getFAQSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Nullify vs Fireflies.ai — How to Detect & Block Fireflies Recording',
  description:
    'Compare Nullify vs Fireflies.ai. Learn how Fireflies records your meetings and how Nullify detects and blocks it. Free, open-source meeting privacy tool.',
  alternates: {
    canonical: 'https://nullify.guru/nullify-vs-fireflies',
  },
  openGraph: {
    title: 'Nullify vs Fireflies.ai — Detect & Block Meeting Recording Bots',
    description:
      'Fireflies.ai joins your meetings as a bot to record and transcribe. Nullify detects it instantly and protects your privacy.',
    url: 'https://nullify.guru/nullify-vs-fireflies',
    type: 'article',
  },
}

const comparisonData = [
  { feature: 'Purpose', nullify: 'Protect meeting privacy', fireflies: 'Transcribe meetings with AI bot' },
  { feature: 'How it works', nullify: 'Monitors your system locally', fireflies: 'Bot joins meeting as participant' },
  { feature: 'Consent from all parties', nullify: 'N/A — runs on your device', fireflies: 'Not always obtained' },
  { feature: 'Open source', nullify: true, fireflies: false },
  { feature: 'Free', nullify: true, fireflies: 'Freemium' },
  { feature: 'Works with Zoom, Meet, Teams', nullify: true, fireflies: true },
  { feature: 'Audio Shield (disrupt transcription)', nullify: true, fireflies: false },
  { feature: 'Real-time detection', nullify: true, fireflies: false },
  { feature: 'Stores your conversation data', nullify: false, fireflies: true },
  { feature: 'Sends audio to external servers', nullify: false, fireflies: true },
  { feature: 'Requires meeting calendar access', nullify: false, fireflies: true },
]

const faqData = [
  {
    question: 'What is Fireflies.ai and how does it work?',
    answer:
      'Fireflies.ai is an AI meeting assistant that records and transcribes meetings. It primarily works by joining meetings as a bot participant called "Fireflies.ai Notetaker." When someone connects their calendar, Fireflies automatically joins their scheduled meetings. The bot records the audio, sends it to Fireflies\' servers, and generates transcripts and AI summaries.',
  },
  {
    question: 'Can Fireflies.ai record my meeting without my permission?',
    answer:
      'Yes. If any participant on your call has Fireflies configured to auto-join meetings, the Fireflies bot will join and start recording. While the bot appears in the participant list, it often joins without explicit consent from all participants. In large meetings, the bot may go unnoticed entirely.',
  },
  {
    question: 'How does Nullify detect Fireflies.ai?',
    answer:
      'Nullify detects Fireflies.ai through process-level monitoring and network signature analysis. When the Fireflies bot connects to your meeting or when Fireflies\' desktop components are active, Nullify identifies the activity and sends you an immediate alert.',
  },
  {
    question: 'Can I remove the Fireflies bot from my meeting?',
    answer:
      'If you are the meeting host, you can remove the Fireflies bot from the participant list. However, you need to notice it first — which is where Nullify helps. Nullify alerts you the moment Fireflies joins, so you can take action immediately rather than discovering after the meeting that you were recorded.',
  },
  {
    question: 'Does Fireflies.ai store my meeting data?',
    answer:
      'Yes. Fireflies.ai uploads all recorded audio to its cloud servers for processing. The generated transcripts, summaries, and original audio are stored on Fireflies\' infrastructure. This means your private meeting conversations are stored on third-party servers and potentially used for AI model training.',
  },
  {
    question: 'How does Nullify\'s Audio Shield work against Fireflies?',
    answer:
      'Audio Shield injects psychoacoustic perturbation into your audio stream. This perturbation is imperceptible to human ears but disrupts AI speech-to-text systems. When Fireflies\' bot records the audio, the AI transcription produces garbled, unusable text while other meeting participants hear your voice perfectly normally.',
  },
]

export default function NullifyVsFireflies() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: 'Home', url: 'https://nullify.guru' },
              { name: 'Nullify vs Fireflies.ai', url: 'https://nullify.guru/nullify-vs-fireflies' },
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
              Nullify vs Fireflies.ai
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
              Fireflies.ai drops a recording bot into your meetings — often without your consent.
              Nullify detects it instantly and can neutralize the transcription.
            </p>
          </div>

          {/* What is Fireflies */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white">What Is Fireflies.ai?</h2>
            <p className="mt-4 text-zinc-400">
              Fireflies.ai is an AI meeting assistant that automatically joins video calls as a bot
              participant. When a user connects their calendar, Fireflies&apos; &ldquo;Notetaker&rdquo; bot
              auto-joins all scheduled meetings, records the full audio, and sends it to
              Fireflies&apos; cloud servers for AI transcription and summarization.
            </p>
            <div className="mt-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-500" />
                <p className="text-sm text-zinc-300">
                  <strong className="text-yellow-400">The problem:</strong> The Fireflies bot
                  auto-joins meetings based on one participant&apos;s calendar settings. Other
                  participants don&apos;t get asked for consent. In large meetings the bot often goes
                  unnoticed, and all audio — including yours — gets uploaded to third-party servers.
                </p>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white">Feature Comparison</h2>
            <p className="mt-2 text-zinc-400">
              How Nullify and Fireflies.ai compare across key features.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 pr-4 text-left text-sm font-semibold text-zinc-300">Feature</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-red-400">Nullify</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-zinc-400">Fireflies.ai</th>
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
                        {row.fireflies === true ? (
                          <Check className="mx-auto h-5 w-5 text-green-400" />
                        ) : row.fireflies === false ? (
                          <X className="mx-auto h-5 w-5 text-zinc-600" />
                        ) : (
                          <span className="text-sm text-zinc-300">{row.fireflies}</span>
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
            <h2 className="text-2xl font-bold text-white">How Nullify Protects You from Fireflies.ai</h2>
            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-white">1. Instant Bot Detection</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  The moment the Fireflies Notetaker bot joins your meeting, Nullify detects it and
                  alerts you. No more discovering hours later that your entire conversation was recorded.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-white">2. Audio Shield Protection</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Even if you can&apos;t remove the bot (e.g., you&apos;re not the meeting host), Audio Shield
                  ensures the transcription of your voice is garbled and unusable. The psychoacoustic
                  perturbation targets AI speech-to-text specifically.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-white">3. Network Signature Detection</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Nullify monitors network traffic for Fireflies.ai service endpoints, catching the
                  tool even if it changes its process name or operates in an unexpected way.
                </p>
              </div>
            </div>
          </section>

          {/* Calendar access concern */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white">The Calendar Auto-Join Problem</h2>
            <p className="mt-4 text-zinc-400">
              One of the most concerning aspects of Fireflies.ai is its calendar integration:
            </p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                <span className="text-sm text-zinc-400">
                  <strong className="text-zinc-200">Automatic joining:</strong> Once a user connects
                  their Google or Outlook calendar, Fireflies auto-joins every meeting on their
                  schedule — including meetings organized by others.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                <span className="text-sm text-zinc-400">
                  <strong className="text-zinc-200">No consent flow:</strong> The person who
                  connected their calendar chose to use Fireflies. But you — as another participant —
                  never consented to being recorded by a third-party AI service.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                <span className="text-sm text-zinc-400">
                  <strong className="text-zinc-200">Data leaves the meeting:</strong> Your audio is
                  uploaded to Fireflies&apos; cloud infrastructure, processed by AI models, and stored
                  as transcripts. You have no control over how this data is retained or used.
                </span>
              </li>
            </ul>
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
              Take Back Control of Your Meeting Privacy
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Download Nullify for free and get instant alerts when Fireflies.ai or any other
              transcription tool tries to record your meetings.
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
