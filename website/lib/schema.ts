export function getSoftwareSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Nullify',
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'macOS, Windows',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    license: 'https://opensource.org/licenses/MIT',
    description: 'Free open-source desktop app that detects hidden meeting transcription tools like Granola, Otter.ai, and Fireflies. Protect your meeting privacy.',
    url: 'https://nullify.guru',
    downloadUrl: 'https://github.com/khaoss85/anti-granola/releases',
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
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `https://nullify.guru/blog/${post.slug}`,
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
