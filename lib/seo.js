export const SITE = {
  name: 'HisabDo',
  url: 'https://hisabdo.app',
  description:
    'HisabDo — free offline expense tracker, khata book, customer ledger and udhar management app for shopkeepers and small businesses.',
  logo: 'https://hisabdo.app/assets/images/app-logo.png',
  ogImage: 'https://hisabdo.app/assets/images/dashboard.webp',
  playStore: 'https://play.google.com/store/apps/details?id=com.usman.hisabdo',
  twitter: '@hisabdo_app',
  keywords: [
    'expense tracker app',
    'expense management app',
    'khata book app',
    'digital khata book',
    'customer ledger app',
    'udhar management app',
    'shopkeeper accounting app',
    'small business accounting software',
    'business expense tracker',
    'receivable and payable tracker',
    'hisabdo',
    'khata app pakistan',
    'offline ledger app',
  ],
};

export const AUTHOR = {
  name: 'Mian Usman Khalid',
  url: 'https://hisabdo.app/authors/mian-usman-khalid',
  image: 'https://hisabdo.app/assets/images/founder.webp',
  sameAs: [
    'https://www.linkedin.com/in/mian-usman-khalid/',
    'https://github.com/usmankhalid172',
    'https://medium.com/@usmankhalid17248',
  ],
};

/** Build a full Next.js Metadata object */
export function buildMetadata({
  title,
  description,
  path = '/',
  keywords = [],
  ogImage,
  noIndex = false,
  alternates = {},
}) {
  const url = `${SITE.url}${path}`;
  const image = ogImage || SITE.ogImage;
  const allKeywords = [...SITE.keywords, ...keywords];

  return {
    metadataBase: new URL(SITE.url),
    title: `${title} | HisabDo`,
    description,
    keywords: allKeywords,
    authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
    creator: AUTHOR.name,
    publisher: SITE.name,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: {
      canonical: url,
      languages: { 'en-US': url, 'ur-PK': url, ...alternates },
    },
    openGraph: {
      type: 'website',
      url,
      title: `${title} | HisabDo`,
      description,
      siteName: SITE.name,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE.twitter,
      creator: SITE.twitter,
      title: `${title} | HisabDo`,
      description,
      images: [image],
    },
  };
}

// ─── JSON-LD Schemas ──────────────────────────────────────────────────────────

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HisabDo',
    url: SITE.url,
    logo: SITE.logo,
    founder: {
      '@type': 'Person',
      name: AUTHOR.name,
      url: AUTHOR.url,
    },
    sameAs: [
      'https://www.facebook.com/people/HisabDo-Udhar-Khata-App/61587841495265/',
      'https://www.instagram.com/hisabdo.app/',
      'https://www.linkedin.com/company/hisabdo-expense-management-app/',
      'https://www.youtube.com/channel/UCtYSl8MRwz-MK6ukBKZS9Rg',
      'https://www.tiktok.com/@hisabdo_udhar_khata_app',
      SITE.playStore,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'support@hisabdo.app',
      contactType: 'customer support',
    },
  };
}

export function softwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'HisabDo',
    description: SITE.description,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Android',
    url: SITE.url,
    downloadUrl: SITE.playStore,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@type': 'Person', name: AUTHOR.name },
  };
}

export function mobileApplicationSchema() {
  return softwareApplicationSchema();
}

export function articleSchema({ title, description, url, image, datePublished, dateModified, authorName }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    image: image || SITE.ogImage,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorName || AUTHOR.name,
      url: AUTHOR.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: SITE.logo },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function authorSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR.name,
    url: AUTHOR.url,
    image: AUTHOR.image,
    jobTitle: 'Founder & CEO',
    worksFor: { '@type': 'Organization', name: 'XICTEK Systems', url: SITE.url },
    sameAs: AUTHOR.sameAs,
  };
}

export function webPageSchema({ title, description, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `${SITE.url}${url}`,
    isPartOf: { '@type': 'WebSite', name: SITE.name, url: SITE.url },
  };
}
