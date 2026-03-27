import type { Metadata } from 'next'
import { getBreadcrumbSchema } from '@/lib/schema'
import DownloadPageClient from './DownloadPageClient'

export const metadata: Metadata = {
  title: 'Download Anti Granola',
  description:
    'Download Anti Granola for free. Available for macOS and Windows. Detect and block invisible meeting transcription tools.',
  alternates: {
    canonical: 'https://antigranola.com/download',
  },
  openGraph: {
    title: 'Download Anti Granola — Free for macOS & Windows',
    description:
      'Download Anti Granola for free. Detect and block invisible meeting transcription tools like Granola, Otter.ai, and Fireflies.',
    url: 'https://antigranola.com/download',
    type: 'website',
  },
}

export default function DownloadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: 'Home', url: 'https://antigranola.com' },
              { name: 'Download', url: 'https://antigranola.com/download' },
            ])
          ),
        }}
      />
      <DownloadPageClient />
    </>
  )
}
