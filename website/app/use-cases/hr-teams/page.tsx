import type { Metadata } from 'next'
import Link from 'next/link'
import { UserCheck, ShieldAlert, Lock, MessageSquareWarning, ArrowRight } from 'lucide-react'
import { getBreadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Nullify for HR Teams — Protect Sensitive Employee Conversations',
  description:
    'HR meetings contain highly sensitive data. Nullify detects invisible AI transcription tools during interviews, performance reviews, and employee relations conversations.',
  alternates: {
    canonical: 'https://nullify.guru/use-cases/hr-teams',
  },
  openGraph: {
    title: 'Nullify for HR Teams — Meeting Privacy for Sensitive Conversations',
    description:
      'Interviews, performance reviews, and employee relations meetings could be silently transcribed. Nullify detects it.',
    url: 'https://nullify.guru/use-cases/hr-teams',
    type: 'article',
  },
}

export default function HRTeamsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: 'Home', url: 'https://nullify.guru' },
              { name: 'Use Cases', url: 'https://nullify.guru/use-cases/hr-teams' },
              { name: 'HR Teams', url: 'https://nullify.guru/use-cases/hr-teams' },
            ])
          ),
        }}
      />

      <div className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          {/* Hero */}
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600/10 ring-1 ring-red-500/20">
              <UserCheck className="h-8 w-8 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Protect Sensitive HR Conversations
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
              HR meetings involve some of the most sensitive information in any organization.
              Nullify ensures invisible AI transcription tools can&apos;t capture these conversations.
            </p>
          </div>

          {/* The Problem */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white">Why HR Meetings Need Extra Protection</h2>
            <p className="mt-4 text-zinc-400">
              HR professionals handle conversations that can expose organizations to significant
              legal liability if improperly recorded. Performance reviews, disciplinary actions,
              accommodation discussions, and compensation negotiations all contain information
              protected by employment law and company policy. Silent AI transcription tools
              create an unauthorized record of these conversations on third-party servers.
            </p>
          </section>

          {/* Scenarios */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white">High-Risk HR Meeting Scenarios</h2>
            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                  <div>
                    <h3 className="font-semibold text-white">Interviews & Hiring Decisions</h3>
                    <p className="mt-2 text-sm text-zinc-400">
                      Interview discussions often include subjective assessments of candidates.
                      If an AI tool transcribes internal debrief meetings where hiring managers
                      discuss candidates, those transcripts could become evidence in discrimination
                      claims — even if the actual decision was lawful.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-start gap-3">
                  <Lock className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                  <div>
                    <h3 className="font-semibold text-white">Performance Reviews & PIPs</h3>
                    <p className="mt-2 text-sm text-zinc-400">
                      Performance improvement plans, corrective action meetings, and termination
                      discussions contain information that employees might use AI tools to capture.
                      Unauthorized transcripts of these meetings create discovery risks in
                      wrongful termination suits.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-start gap-3">
                  <MessageSquareWarning className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                  <div>
                    <h3 className="font-semibold text-white">Employee Relations & Complaints</h3>
                    <p className="mt-2 text-sm text-zinc-400">
                      Harassment investigations, workplace complaints, and whistleblower
                      conversations require strict confidentiality. Silent recording by any
                      party could compromise the investigation and expose the organization to
                      additional liability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Compliance */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white">Compliance & Data Protection</h2>
            <p className="mt-4 text-zinc-400">
              Unauthorized recording of HR conversations can violate multiple regulatory frameworks:
            </p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                <span className="text-sm text-zinc-400">
                  <strong className="text-zinc-200">GDPR (EU):</strong> Employee data is protected
                  personal data. Recording and processing voice data without consent and a lawful
                  basis violates Articles 6 and 9 of GDPR.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                <span className="text-sm text-zinc-400">
                  <strong className="text-zinc-200">HIPAA (US):</strong> If HR discussions involve
                  medical accommodations, FMLA, or health-related topics, transcripts stored on
                  third-party AI servers may violate HIPAA if the employer is a covered entity.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                <span className="text-sm text-zinc-400">
                  <strong className="text-zinc-200">State privacy laws:</strong> CCPA (California),
                  BIPA (Illinois), and other state laws impose specific requirements on how
                  employee biometric and conversational data is collected and stored.
                </span>
              </li>
            </ul>
          </section>

          {/* How Nullify Helps */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-white">How Nullify Protects HR Teams</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-white">Detect Instantly</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Know immediately when any meeting participant is running a transcription tool.
                  Address it before sensitive information is captured.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-white">Protect Audio</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Audio Shield disrupts AI transcription while keeping the conversation perfectly
                  clear for human participants. The meeting continues normally.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-white">100% Local Processing</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  No employee data, meeting content, or detection data ever leaves your device.
                  Nullify itself doesn&apos;t create any compliance risk.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-white">Cross-Platform Coverage</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Works with Zoom, Google Meet, Microsoft Teams, and every other video platform.
                  One tool covers all your meetings.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="mt-16 rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
            <h2 className="text-xl font-bold text-white">
              Secure Your HR Meetings
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Free, open-source, and fully local. Deploy Nullify across your HR team today.
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
