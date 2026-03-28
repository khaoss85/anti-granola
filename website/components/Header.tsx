'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Shield, Menu, X } from 'lucide-react'
import { GitHubIcon } from '@/components/icons'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="h-7 w-7 text-red-500" />
          <span className="text-lg font-bold text-white">Nullify</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm text-zinc-400 transition hover:text-white">
            Home
          </Link>
          <Link href="/download" className="text-sm text-zinc-400 transition hover:text-white">
            Download
          </Link>
          <Link href="/blog" className="text-sm text-zinc-400 transition hover:text-white">
            Blog
          </Link>
          <a
            href="https://github.com/khaoss85/nullify"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-zinc-400 transition hover:text-white"
          >
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </a>
          <Link
            href="/download"
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Download Free
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden text-zinc-400 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#0a0a0a] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-sm text-zinc-400 transition hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/download"
              className="text-sm text-zinc-400 transition hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Download
            </Link>
            <Link
              href="/blog"
              className="text-sm text-zinc-400 transition hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <a
              href="https://github.com/khaoss85/nullify"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-zinc-400 transition hover:text-white"
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
            </a>
            <Link
              href="/download"
              className="mt-2 rounded-lg bg-red-600 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-red-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Download Free
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
