'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'Is it legal to use Anti Granola?',
    answer:
      'Yes, absolutely. Anti Granola runs locally on your own computer and simply monitors what software is active during your meetings. It\'s the equivalent of checking your Task Manager. In fact, many jurisdictions give you the legal right to know when you\'re being recorded — Anti Granola helps you exercise that right.',
  },
  {
    question: 'Does Anti Granola block Granola from running?',
    answer:
      'Anti Granola offers multiple protection levels. At its base level, it detects transcription tools and alerts you. With Audio Shield enabled, it can disrupt transcription accuracy using psychoacoustic perturbation — making the captured audio unintelligible to AI while sounding normal to humans.',
  },
  {
    question: 'Will people on the call hear the audio shield?',
    answer:
      'No. The Audio Shield uses psychoacoustic techniques designed to be imperceptible to human ears while disrupting AI speech-to-text systems. Other participants will hear your normal voice. The perturbation targets the specific frequency patterns that transcription algorithms rely on.',
  },
  {
    question: 'Does it work with Zoom, Google Meet, Microsoft Teams?',
    answer:
      'Yes. Anti Granola works with all major meeting platforms including Zoom, Google Meet, Microsoft Teams, Webex, and others. It monitors at the system level, so it detects transcription tools regardless of which meeting platform you\'re using.',
  },
  {
    question: 'How do I know if someone is recording my meeting?',
    answer:
      'Traditional platform indicators (like the red recording dot) only detect in-platform recording. Stealth tools like Granola bypass these entirely. Anti Granola monitors for process-level and network-level signatures of known transcription tools, catching what platform indicators miss.',
  },
  {
    question: 'Is Granola recording without my consent legal?',
    answer:
      'It depends on your jurisdiction. In 13 U.S. states (including California, Illinois, and Florida), all parties must consent to recording. Under GDPR in Europe, recording without consent violates data protection laws. The Otter.ai class-action lawsuit shows this is an active legal issue. Regardless of legality, you deserve to know when you\'re being recorded.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="border-t border-white/5 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Everything you need to know about Anti Granola.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-white/[0.02]"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="pr-4 text-sm font-medium text-white md:text-base">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-zinc-500 transition-transform ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="border-t border-white/5 px-6 py-5">
                  <p className="text-sm leading-relaxed text-zinc-400">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
