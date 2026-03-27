import { ImageResponse } from 'next/og'
import { getPostBySlug, getAllSlugs } from '@/lib/blog'

export const alt = 'Nullify Blog'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  const title = post?.title ?? 'Nullify Blog'

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '16px',
              fontSize: '24px',
            }}
          >
            🛡️
          </div>
          <span
            style={{
              fontSize: '32px',
              fontWeight: 700,
              color: '#a1a1aa',
            }}
          >
            Nullify
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.2,
              maxWidth: '900px',
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '24px',
            }}
          >
            <div
              style={{
                padding: '6px 16px',
                borderRadius: '16px',
                background: 'rgba(239, 68, 68, 0.15)',
                color: '#f87171',
                fontSize: '16px',
              }}
            >
              Meeting Privacy
            </div>
            <div
              style={{
                padding: '6px 16px',
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.1)',
                color: '#e4e4e7',
                fontSize: '16px',
              }}
            >
              nullify.guru/blog
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
