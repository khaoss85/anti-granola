import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'

interface BlogCardProps {
  slug: string
  title: string
  excerpt: string
  date: string
  readingTime: string
}

export default function BlogCard({ slug, title, excerpt, date, readingTime }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20 hover:bg-white/[0.04]"
    >
      <time className="text-xs text-zinc-600">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
      <h3 className="mt-2 text-lg font-semibold text-white group-hover:text-red-400 transition">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400 line-clamp-3">{excerpt}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="flex items-center gap-1 text-xs text-zinc-600">
          <Clock className="h-3.5 w-3.5" />
          {readingTime}
        </span>
        <span className="flex items-center gap-1 text-sm text-red-400 transition group-hover:gap-2">
          Read more
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}
