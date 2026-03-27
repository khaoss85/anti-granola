import { Download, Cpu, Bell } from 'lucide-react'

const steps = [
  {
    icon: Download,
    step: '01',
    title: 'Install Nullify',
    description: 'Download and install the free desktop app. Available for macOS and Windows.',
  },
  {
    icon: Cpu,
    step: '02',
    title: 'Runs in Background',
    description: 'Nullify quietly monitors during your meetings. Zero impact on performance.',
  },
  {
    icon: Bell,
    step: '03',
    title: 'Instant Alerts',
    description:
      'Get notified immediately if a transcription tool is detected. Take action before a single word is transcribed.',
  },
]

export default function HowItWorks() {
  return (
    <section className="border-t border-white/5 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">How It Works</h2>
          <p className="mt-4 text-lg text-zinc-400">
            Three simple steps to protect your meeting privacy.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.step} className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600/10 ring-1 ring-red-500/20">
                <s.icon className="h-7 w-7 text-red-500" />
              </div>
              <span className="mt-4 block text-sm font-bold text-red-500">{s.step}</span>
              <h3 className="mt-2 text-xl font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm text-zinc-400">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
