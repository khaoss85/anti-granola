import { Radar, AudioLines, ShieldCheck, Lock, Eye, Code } from 'lucide-react'

const features = [
  {
    icon: Radar,
    title: 'Real-Time Detection',
    description:
      'Continuously monitors your system for active transcription tools. Detects them the moment they start.',
  },
  {
    icon: AudioLines,
    title: 'Audio Shield',
    description:
      'Psychoacoustic perturbation technology that disrupts transcription accuracy without affecting human conversation.',
  },
  {
    icon: ShieldCheck,
    title: '4 Protection Levels',
    description:
      'From Stealth (silent monitoring) to Maximum (full audio shield). Choose the level that fits your needs.',
  },
  {
    icon: Lock,
    title: '100% Local',
    description:
      'Everything runs on your machine. No data is ever sent to external servers. Your conversations stay yours.',
  },
  {
    icon: Eye,
    title: 'Invisible Operation',
    description:
      'Runs silently in your system tray. Other meeting participants will never know it\'s there.',
  },
  {
    icon: Code,
    title: 'Open Source',
    description:
      'Fully open source and auditable. Verify exactly what the app does. No hidden functionality, no tracking.',
  },
]

export default function Features() {
  return (
    <section className="border-t border-white/5 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Built for Privacy
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Everything you need to protect your meetings from invisible surveillance.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20 hover:bg-white/[0.04]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/10 ring-1 ring-red-500/20">
                <f.icon className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
