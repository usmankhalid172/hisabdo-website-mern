import './globals.css';
import SiteShell from '../components/SiteShell';

export const metadata = {
  metadataBase: new URL('https://site.hisabdo.app'),
  verification: {
    google: 'cRwOB42ERAVp7tkYLPEa23vv9BZd7jTFyMi89e9DpGc',
  },
  title: {
    default: 'HisabDo | Smart Khata & Ledger App',
    template: '%s | HisabDo by XICTEK Systems',
  },
  description: 'HisabDo is a flagship product of XICTEK Systems, built for offline-first khata, ledger, and business finance management.',
  keywords: ['HisabDo', 'XICTEK Systems', 'Khata app', 'ledger app', 'offline finance app', 'small business accounting'],
  applicationName: 'HisabDo',
  authors: [{ name: 'Mian Usman Khalid' }, { name: 'XICTEK Systems' }],
  publisher: 'XICTEK Systems',
  icons: {
    icon: '/assets/images/app-logo.webp',
    shortcut: '/assets/images/app-logo.webp',
    apple: '/assets/images/app-logo.webp',
  },
  openGraph: {
    title: 'HisabDo by XICTEK Systems',
    description: 'Offline-first khata, ledger, and finance management for small businesses.',
    siteName: 'HisabDo',
    type: 'website',
    url: 'https://hisabdo.app',
    images: [{ url: '/assets/images/app-logo.webp', width: 768, height: 768, alt: 'HisabDo by XICTEK Systems' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HisabDo by XICTEK Systems',
    description: 'Offline-first khata, ledger, and finance management for small businesses.',
    images: ['/assets/images/app-logo.webp'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
