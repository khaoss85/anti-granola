import Link from 'next/link'
import { Shield, Heart, Coffee } from 'lucide-react'
import { GitHubIcon } from '@/components/icons'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a]">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-red-500" />
              <span className="text-lg font-bold text-white">Nullify</span>
            </Link>
            <p className="mt-3 max-w-md text-sm text-zinc-500">
              Free, open-source desktop app that detects and blocks invisible meeting
              transcription tools. Protect your meeting privacy.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs text-green-400">
                Free & Open Source
              </span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-white">Product</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/download" className="text-sm text-zinc-500 transition hover:text-white">
                  Download
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-zinc-500 transition hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/khaoss85/anti-granola"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-zinc-500 transition hover:text-white"
                >
                  <GitHubIcon className="h-3.5 w-3.5" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white">Support</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="https://github.com/khaoss85/anti-granola/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-500 transition hover:text-white"
                >
                  Report a Bug
                </a>
              </li>
              <li>
                <a
                  href="https://buymeacoffee.com/nullify"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-zinc-500 transition hover:text-white"
                >
                  <Coffee className="h-3.5 w-3.5" />
                  Buy Me a Coffee
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/khaoss85/anti-granola"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-zinc-500 transition hover:text-white"
                >
                  <Heart className="h-3.5 w-3.5" />
                  Contribute
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-center text-xs text-zinc-600">
            © {new Date().getFullYear()} Nullify. Open source under MIT License.
          </p>
        </div>
      </div>
    </footer>
  )
}
