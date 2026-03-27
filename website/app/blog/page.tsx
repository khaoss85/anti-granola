import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import { getBreadcrumbSchema } from '@/lib/schema'
import BlogCard from '@/components/BlogCard'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articles about meeting privacy, invisible AI transcription, and how to protect your conversations.',
  alternates: {
    canonical: 'https://nullify.guru/blog',
  },
  openGraph: {
    title: 'Nullify Blog — Meeting Privacy & AI Transcription',
    description:
      'Articles about meeting privacy, invisible AI transcription, and how to protect your conversations.',
    url: 'https://nullify.guru/blog',
    type: 'website',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: 'Home', url: 'https://nullify.guru' },
              { name: 'Blog', url: 'https://nullify.guru/blog' },
            ])
          ),
        }}
      />
      <div className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-white md:text-5xl">Blog</h1>
          <p className="mt-4 text-lg text-zinc-400">
            Meeting privacy, invisible AI transcription, and how to protect your conversations.
          </p>

          {posts.length > 0 ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {posts.map((post) => (
                <BlogCard
                  key={post.slug}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  readingTime={post.readingTime}
                />
              ))}
            </div>
          ) : (
            <p className="mt-12 text-zinc-500">No articles yet. Check back soon.</p>
          )}
        </div>
      </div>
    </>
  )
}
