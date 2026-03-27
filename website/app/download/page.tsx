import type { Metadata } from 'next'
import { getBreadcrumbSchema } from '@/lib/schema'
import DownloadPageClient from './DownloadPageClient'

export const metadata: Metadata = {
  title: 'Download Nullify',
  description:
    'Download Nullify for free. Available for macOS and Windows. Detect and block invisible meeting transcription tools.',
  alternates: {
    canonical: 'https://nullify.guru/download',
  },
  openGraph: {
    title: 'Download Nullify — Free for macOS & Windows',
    description:
      'Download Nullify for free. Detect and block invisible meeting transcription tools like Granola, Otter.ai, and Fireflies.',
    url: 'https://nullify.guru/download',
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
              { name: 'Home', url: 'https://nullify.guru' },
              { name: 'Download', url: 'https://nullify.guru/download' },
            ])
          ),
        }}
      />
      <DownloadPageClient />
    </>
  )
}
