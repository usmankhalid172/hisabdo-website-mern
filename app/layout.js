import './globals.css';
import SiteShell from '../components/SiteShell';

export const metadata = {
  title: 'HisabDo | Smart Khata & Ledger App',
  description: 'Offline-first khata and ledger management for small businesses.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}