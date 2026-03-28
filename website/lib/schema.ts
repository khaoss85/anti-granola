export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nullify',
    url: 'https://nullify.guru',
    description:
      'Free open-source desktop app that detects hidden meeting transcription tools like Granola, Otter.ai, and Fireflies. Protect your meeting privacy.',
    sameAs: [
      'https://github.com/khaoss85/nullify',
      'https://buymeacoffee.com/nicekhaoss',
    ],
  }
}

export function getWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Nullify',
    url: 'https://nullify.guru',
    description:
      'Free open-source desktop app that detects hidden meeting transcription tools like Granola, Otter.ai, and Fireflies. Protect your meeting privacy.',
  }
}

export function getHowToSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Detect Hidden Meeting Transcription with Nullify',
    description:
      'Install Nullify and detect invisible meeting transcription tools in under 2 minutes.',
    totalTime: 'PT2M',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Install',
        text: 'Download and install Nullify from GitHub Releases for macOS or Windows.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Run in Background',
        text: 'Launch Nullify and let it run in the background. It monitors for transcription tools automatically.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Instant Alerts',
        text: 'Receive instant alerts when hidden transcription tools like Granola, Otter.ai, or Fireflies are detected during your meetings.',
      },
    ],
  }
}

export function getSoftwareSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Nullify',
    applicationCategory: 'SecurityApplication',
    applicationSubCategory: 'Meeting Privacy Tool',
    operatingSystem: 'macOS, Windows',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    featureList: [
      'Detect hidden meeting transcription tools',
      'Audio Shield psychoacoustic perturbation',
      'Real-time process monitoring',
      'Support for Zoom, Google Meet, Microsoft Teams',
    ],
    license: 'https://opensource.org/licenses/MIT',
    description: 'Free open-source desktop app that detects hidden meeting transcription tools like Granola, Otter.ai, and Fireflies. Protect your meeting privacy.',
    url: 'https://nullify.guru',
    downloadUrl: 'https://nullify.guru/download',
    softwareVersion: '1.0.0',
    author: {
      '@type': 'Organization',
      name: 'Nullify',
      url: 'https://nullify.guru',
    },
  }
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function getBlogPostSchema(post: {
  title: string
  description: string
  date: string
  slug: string
  wordCount?: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url: `https://nullify.guru/blog/${post.slug}`,
    image: `https://nullify.guru/blog/${post.slug}/opengraph-image`,
    ...(post.wordCount != null && { wordCount: post.wordCount }),
    articleSection: 'Meeting Privacy',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://nullify.guru/blog/${post.slug}`,
    },
    author: {
      '@type': 'Organization',
      name: 'Nullify',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Nullify',
      url: 'https://nullify.guru',
    },
  }
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
