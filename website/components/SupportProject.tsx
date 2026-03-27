import { Heart, Coffee } from 'lucide-react'
import { GitHubIcon } from '@/components/icons'

export default function SupportProject() {
  return (
    <section className="border-t border-white/5 px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <Heart className="mx-auto h-10 w-10 text-red-500" />
        <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Support the Project</h2>
        <p className="mt-4 text-lg text-zinc-400">
          Anti Granola is free and open source. If you find it useful, consider supporting
          its development.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="https://buymeacoffee.com/antigranola"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition hover:bg-yellow-400"
          >
            <Coffee className="h-5 w-5" />
            Buy Me a Coffee
          </a>
          <a
            href="https://github.com/khaoss85/anti-granola"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/5"
          >
            <GitHubIcon className="h-5 w-5" />
            Star on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
