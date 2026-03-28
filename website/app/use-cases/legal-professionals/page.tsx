import type { Metadata } from 'next'
import Link from 'next/link'
import { Scale, ShieldAlert, Lock, FileWarning, ArrowRight } from 'lucide-react'
import { getBreadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Nullify for Lawyers & Legal Professionals — Protect Attorney-Client Privilege',
  description:
    'AI transcription tools can silently record privileged legal conversations. Nullify detects and blocks invisible meeting recorders to protect attorney-client privilege.',
  alternates: {
    canonical: 'https://nullify.guru/use-cases/legal-professionals',
  },
  openGraph: {
    title: 'Nullify for Lawyers — Protect Attorney-Client Privilege',
    description:
      'Silent AI transcription tools threaten attorney-client privilege. Nullify detects them instantly.',
    url: 'https://nullify.guru/use-cases/legal-professionals',
    type: 'article',
  },
}

export default function LegalProfessionalsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: 'Home', url: 'https://nullify.guru' },
              { name: 'Use Cases', url: 'https://nullify.guru/use-cases/legal-professionals' },
              { name: 'Legal Professionals', url: 'https://nullify.guru/use-cases/legal-professionals' },
            ])
          ),
        }}
      />

      <div className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          {/* Hero */}
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600/10 ring-1 ring-red-500/20">
              <Scale className="h-8 w-8 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Protect Attorney-Client Privilege
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
              AI transcription tools can silently capture privileged conversations during
              video meetings. Nullify detects these tools and helps you maintain confidentiality.
            </p>
          </div>

          {/* The Risk */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white">The Threat to Legal Confidentiality</h2>
            <p className="mt-4 text-zinc-400">
              Law firms and legal departments have rapidly adopted video conferencing for client
              consultations, depositions, settlement discussions, and internal strategy meetings.
              But the same tools that make remote legal work possible also create a new attack
              surface for confidentiality breaches.
            </p>
            <p className="mt-4 text-zinc-400">
              AI transcription tools like Granola, Otter.ai, and Fireflies.ai can silently capture
              meeting audio and generate searchable transcripts. If opposing counsel, a witness, or
              any participant is running one of these tools, your privileged communications could be
              captured, stored on third-party servers, and potentially discoverable.
            </p>
          </section>

          {/* Key Risks */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white">Specific Risks for Legal Professionals</h2>
            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                  <div>
                    <h3 className="font-semibold text-white">Waiver of Attorney-Client Privilege</h3>
                    <p className="mt-2 text-sm text-zinc-400">
                      If a privileged conversation is recorded by a third-party tool and stored on
                      external servers, the privilege may be deemed waived. Courts have held that
                      failing to take reasonable precautions to protect privileged communications
                      can result in waiver — even if the disclosure was inadvertent.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
                <div className="flex items-start gap-3">
                  <Lock className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                  <div>
                    <h3 className="font-semibold text-white">Work Product Doctrine</h3>
                    <p className="mt-2 text-sm text-zinc-400">
                      Internal strategy discussions, case analysis, and litigation planning shared in
                      meetings are protected under work product doctrine. Silent transcription could
                      create an unauthorized record of these discussions outside your control.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
                <div className="flex items-start gap-3">
                  <FileWarning className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                  <div>
                    <h3 className="font-semibold text-white">Ethics & Compliance Obligations</h3>
                    <p className="mt-2 text-sm text-zinc-400">
                      ABA Model Rule 1.6 requires lawyers to make reasonable efforts to prevent
                      unauthorized disclosure of client information. State bar associations
                      increasingly view AI tool monitoring as part of that obligation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Use cases */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white">Conversations That Must Stay Private</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-white">Client Consultations</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Initial consultations, case updates, and legal advice sessions — all protected
                  by attorney-client privilege and at risk from silent transcription.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-white">Settlement Negotiations</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Settlement offers, strategy discussions, and mediation sessions where unauthorized
                  recordings could be devastating to your client&apos;s position.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-white">Internal Case Strategy</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Team meetings about litigation strategy, witness preparation, and case analysis —
                  protected work product that must remain confidential.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-white">Depositions & Witness Prep</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Virtual depositions and witness preparation sessions where unauthorized recording
                  could compromise the integrity of proceedings.
                </p>
              </div>
            </div>
          </section>

          {/* How Nullify helps */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white">How Nullify Helps Legal Professionals</h2>
            <div className="mt-6 space-y-6">
              <div className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">1</span>
                <div>
                  <h3 className="font-semibold text-white">Demonstrate Reasonable Precautions</h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    Running Nullify during meetings demonstrates that you&apos;re taking reasonable
                    steps to protect privileged communications — a key element in maintaining
                    privilege claims if challenged.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">2</span>
                <div>
                  <h3 className="font-semibold text-white">Detect Before Disclosure</h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    Get alerted the moment a transcription tool activates. You can pause the
                    conversation, address the recording, or move to a secure channel before
                    any privileged information is compromised.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">3</span>
                <div>
                  <h3 className="font-semibold text-white">Audio Shield as Last Resort</h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    If you detect a transcription tool but can&apos;t stop the meeting, Audio Shield
                    renders the AI transcription unusable while keeping your voice perfectly clear
                    for human participants.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-sm font-bold text-white">4</span>
                <div>
                  <h3 className="font-semibold text-white">100% Local — No Data Exposure</h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    Nullify processes everything locally on your device. No meeting audio, no
                    detection logs, no data of any kind is sent to external servers. Your
                    security tool doesn&apos;t become another data exposure risk.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="mt-16 rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
            <h2 className="text-xl font-bold text-white">
              Protect Privileged Communications
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Free, open-source, and fully local. Add Nullify to your firm&apos;s security toolkit.
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
