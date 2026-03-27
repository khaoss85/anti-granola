import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllSlugs, getPostBySlug } from '@/lib/blog'
import { getBlogPostSchema, getBreadcrumbSchema } from '@/lib/schema'

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `https://nullify.guru/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `https://nullify.guru/blog/${slug}`,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  return (
    <article className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <header>
          <h1 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readingTime}
            </span>
          </div>
        </header>

        <div className="prose prose-invert prose-zinc mt-12 max-w-none prose-headings:text-white prose-a:text-red-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:text-red-400">
          <MDXRemote source={post.content} />
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
          <h3 className="text-xl font-bold text-white">Protect Your Meeting Privacy</h3>
          <p className="mt-2 text-sm text-zinc-400">
            Download Nullify for free and detect invisible transcription tools.
          </p>
          <Link
            href="/download"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Download Nullify
          </Link>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              getBlogPostSchema({
                title: post.title,
                description: post.description,
                date: post.date,
                slug: post.slug,
              })
            ),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              getBreadcrumbSchema([
                { name: 'Home', url: 'https://nullify.guru' },
                { name: 'Blog', url: 'https://nullify.guru/blog' },
                { name: post.title, url: `https://nullify.guru/blog/${slug}` },
              ])
            ),
          }}
        />
      </div>
    </article>
  )
}
