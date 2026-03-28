import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, AlertTriangle, Check, X, ArrowRight } from 'lucide-react'
import { getBreadcrumbSchema, getFAQSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Nullify vs Granola — How to Detect & Block Granola Transcription',
  description:
    'Compare Nullify vs Granola. Learn how Granola silently transcribes your meetings and how Nullify detects and blocks it. Free, open-source meeting privacy tool.',
  alternates: {
    canonical: 'https://nullify.guru/nullify-vs-granola',
  },
  openGraph: {
    title: 'Nullify vs Granola — Detect & Block Silent Transcription',
    description:
      'Granola silently transcribes your meetings without visible indicators. Nullify detects it in real time and protects your privacy.',
    url: 'https://nullify.guru/nullify-vs-granola',
    type: 'article',
  },
}

const comparisonData = [
  { feature: 'Purpose', nullify: 'Protect meeting privacy', granola: 'Transcribe meetings with AI' },
  { feature: 'Visibility to participants', nullify: 'Transparent — shows alerts', granola: 'Invisible — no indicator shown' },
  { feature: 'Consent required', nullify: 'N/A — runs on your device', granola: 'Often skipped — no prompt to others' },
  { feature: 'Open source', nullify: true, granola: false },
  { feature: 'Free', nullify: true, granola: 'Freemium' },
  { feature: 'Works with Zoom, Meet, Teams', nullify: true, granola: true },
  { feature: 'Audio Shield (disrupt transcription)', nullify: true, granola: false },
  { feature: 'Real-time process detection', nullify: true, granola: false },
  { feature: 'Stores your conversation data', nullify: false, granola: true },
  { feature: 'Sends audio to external servers', nullify: false, granola: true },
]

const faqData = [
  {
    question: 'What is Granola and how does it work?',
    answer:
      'Granola is a meeting transcription tool that runs silently in the background on a participant\'s computer. It captures audio from meetings on Zoom, Google Meet, and Microsoft Teams, then uses AI to generate transcripts and notes. Unlike platform-native recording, Granola does not trigger a recording indicator visible to other participants.',
  },
  {
    question: 'Can Granola record me without my knowledge?',
    answer:
      'Yes. Granola runs as a background process and captures meeting audio without displaying any visible indicator to other meeting participants. The person using Granola sees their own interface, but you would have no way to know your conversation is being transcribed unless you use a detection tool like Nullify.',
  },
  {
    question: 'How does Nullify detect Granola?',
    answer:
      'Nullify monitors your system for process-level and network-level signatures of known transcription tools, including Granola. When Granola is active during a meeting, Nullify identifies its running process and alerts you immediately — before any transcription can be completed.',
  },
  {
    question: 'Is it legal for someone to use Granola in my meeting?',
    answer:
      'It depends on jurisdiction. In 13 U.S. states (including California, Illinois, and Florida), all-party consent is required for recording. Under GDPR in Europe, recording without explicit consent violates data protection laws. The growing number of lawsuits around covert transcription tools suggests this is an active legal issue.',
  },
  {
    question: 'Does Nullify block Granola completely?',
    answer:
      'Nullify offers multiple protection levels. At its base level, it detects Granola and alerts you instantly. With Audio Shield enabled, Nullify uses psychoacoustic perturbation to disrupt the audio that Granola captures — making the transcript unintelligible to AI while your voice sounds completely normal to human participants.',
  },
  {
    question: 'Is Nullify free?',
    answer:
      'Yes. Nullify is completely free and open-source under the MIT License. You can download it from GitHub and inspect the source code yourself. There are no hidden fees, subscriptions, or premium tiers.',
  },
]

export default function NullifyVsGranola() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: 'Home', url: 'https://nullify.guru' },
              { name: 'Nullify vs Granola', url: 'https://nullify.guru/nullify-vs-granola' },
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
              Nullify vs Granola
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
              Granola silently transcribes your meetings without visible indicators. Nullify detects
              it in real time and gives you back control over your privacy.
            </p>
          </div>

          {/* What is Granola */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white">What Is Granola?</h2>
            <p className="mt-4 text-zinc-400">
              Granola is an AI-powered meeting transcription tool that runs as a desktop application.
              Once installed, it automatically captures audio from meetings on Zoom, Google Meet,
              Microsoft Teams, and other platforms. It processes the audio using AI to generate
              structured notes and transcripts.
            </p>
            <div className="mt-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-yellow-500" />
                <p className="text-sm text-zinc-300">
                  <strong className="text-yellow-400">The problem:</strong> Granola does not display a
                  recording indicator to other meeting participants. You have no way to know your
                  conversation is being captured and sent to external servers for AI processing.
                </p>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white">Feature Comparison</h2>
            <p className="mt-2 text-zinc-400">
              How Nullify and Granola compare across key features.
            </p>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 pr-4 text-left text-sm font-semibold text-zinc-300">Feature</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-red-400">Nullify</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-zinc-400">Granola</th>
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
                        {row.granola === true ? (
                          <Check className="mx-auto h-5 w-5 text-green-400" />
                        ) : row.granola === false ? (
                          <X className="mx-auto h-5 w-5 text-zinc-600" />
                        ) : (
                          <span className="text-sm text-zinc-300">{row.granola}</span>
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
            <h2 className="text-2xl font-bold text-white">How Nullify Protects You from Granola</h2>
            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-white">1. Real-Time Detection</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Nullify continuously monitors running processes on your system. The moment Granola
                  activates during a meeting, Nullify identifies it and sends you an instant alert.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-white">2. Audio Shield</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Enable Audio Shield to inject psychoacoustic perturbation into the audio stream.
                  This makes Granola&apos;s AI transcription produce garbled, unusable text — while
                  human participants hear your voice perfectly normally.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-white">3. Zero Performance Impact</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Nullify runs efficiently in the background with minimal resource usage. It won&apos;t
                  slow down your meetings or affect audio quality for other participants.
                </p>
              </div>
            </div>
          </section>

          {/* Privacy Concerns */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white">Privacy & Legal Concerns with Granola</h2>
            <p className="mt-4 text-zinc-400">
              Covert meeting transcription raises serious privacy and legal issues:
            </p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                <span className="text-sm text-zinc-400">
                  <strong className="text-zinc-200">Two-party consent laws:</strong> In 13 U.S.
                  states (California, Illinois, Florida, etc.), all parties must consent to
                  recording. Using Granola without informing participants may violate wiretapping
                  laws.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                <span className="text-sm text-zinc-400">
                  <strong className="text-zinc-200">GDPR compliance:</strong> In the EU, recording
                  conversations without explicit consent violates the General Data Protection
                  Regulation. This applies even if only one participant is in the EU.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                <span className="text-sm text-zinc-400">
                  <strong className="text-zinc-200">Data sent to external servers:</strong> Granola
                  sends captured audio to third-party AI services for processing. Your private
                  conversations become training data or stored on servers you don&apos;t control.
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
              Protect Yourself from Silent Transcription
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Download Nullify for free and know instantly when Granola or other transcription tools
              are active in your meetings.
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
