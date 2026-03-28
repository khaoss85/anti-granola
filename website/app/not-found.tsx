import type { Metadata } from 'next'
import Link from 'next/link'
import { Home, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist or has been moved.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="text-center">
        <p className="text-7xl font-bold text-red-500">404</p>
        <h1 className="mt-4 text-2xl font-bold text-white">Page Not Found</h1>
        <p className="mt-2 text-zinc-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            href="/blog"
            className="flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 font-medium text-white transition hover:bg-white/5"
          >
            <BookOpen className="h-4 w-4" />
            Read the Blog
          </Link>
        </div>
      </div>
    </div>
  )
}
