import './globals.css';
import SiteShell from '../components/SiteShell';

export const metadata = {
  metadataBase: new URL('https://hisabdo.app'),
  title: 'HisabDo | Smart Khata & Ledger App',
  description: 'HisabDo by XICTEK Systems — offline-first khata and ledger management for small businesses.',
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
      </head>
      <body suppressHydrationWarning>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
