import './globals.css';
import SiteShell from '../components/SiteShell';
import ChatBot from '../components/ChatBot';
import JsonLd from '../components/JsonLd';
import {
  SITE,
  organizationSchema,
  softwareApplicationSchema,
  mobileApplicationSchema,
} from '../lib/seo';

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'HisabDo | Khata Book, Expense Tracker & Customer Ledger App',
    template: '%s | HisabDo',
  },
  description: SITE.description,
  keywords: SITE.keywords,
  authors: [{ name: 'Mian Usman Khalid', url: `${SITE.url}/authors/mian-usman-khalid` }],
  creator: 'Mian Usman Khalid',
  publisher: 'HisabDo',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: SITE.url,
    languages: { 'en-US': SITE.url, 'ur-PK': SITE.url },
  },
  openGraph: {
    type: 'website',
    url: SITE.url,
    siteName: SITE.name,
    title: 'HisabDo | Khata Book, Expense Tracker & Customer Ledger App',
    description: SITE.description,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: 'HisabDo App' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: SITE.twitter,
    creator: SITE.twitter,
    title: 'HisabDo | Khata Book, Expense Tracker & Customer Ledger App',
    description: SITE.description,
    images: [SITE.ogImage],
  },
  icons: {
    icon: [
      { url: '/assets/images/app-logo.png', type: 'image/png' },
      { url: '/assets/images/app-logo.webp', type: 'image/webp' },
    ],
    shortcut: '/assets/images/app-logo.png',
    apple: '/assets/images/app-logo.png',
  },
  verification: {
    google: 'google37defe6419d8ecc5',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <JsonLd
          data={[
            organizationSchema(),
            softwareApplicationSchema(),
            mobileApplicationSchema(),
          ]}
        />
      </head>
      <body suppressHydrationWarning>
        <SiteShell>{children}</SiteShell>
        <ChatBot />
      </body>
    </html>
  );
}
