"use client";
import Link from 'next/link';

export default function SiteShell({ children }) {
  return (
    <>
      {/* NAVBAR */}
      <header className="nav">
        <Link href="/" className="logo" style={{ textDecoration: 'none', color: 'var(--text)' }}>
          <img src="/assets/images/app-logo.webp" alt="HisabDo Logo" />
          <span>HisabDo.</span>
        </Link>

        <div className="nav-menu">
          <nav>
            <Link href="/">HOME</Link>
            <Link href="/about">ABOUT</Link>
            <Link href="/app">APP</Link>
            <Link href="/founder">FOUNDER</Link>
            <Link href="/leadership">LEADERSHIP</Link>
            <Link href="/media">MEDIA</Link>
          </nav>
          <a href="https://play.google.com/store/apps/details?id=com.usman.hisabdo" target="_blank" rel="noopener noreferrer" className="btn btn-sm">Get the app</a>
        </div>
      </header>

      {/* MAIN CONTENT */}
      {children}

      {/* FOOTER */}
      <footer>
        <div className="footer-col" style={{ minWidth: '250px' }}>
          <Link href="/" className="logo footer-logo" style={{ textDecoration: 'none', color: 'var(--text)' }}>
            <img src="/assets/images/app-logo.webp" alt="HisabDo Logo" style={{ width: '30px', height: '30px', border: 'none' }} />
            <span>HisabDo.</span>
          </Link>
          <p className="footer-copy" style={{ marginTop: '14px', lineHeight: '1.6' }}>
            Offline-first finance tools for the businesses that keep communities moving.
          </p>
        </div>

        <div className="footer-links-wrap" style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
          <div className="footer-col">
            <h4 style={{ color: 'var(--text)', marginBottom: '12px', fontSize: '15px' }}>Explore</h4>
            <Link href="/about" style={{ display: 'block', color: 'var(--muted)', marginBottom: '8px', fontSize: '13.5px', textDecoration: 'none' }}>About HisabDo</Link>
            <Link href="/app" style={{ display: 'block', color: 'var(--muted)', marginBottom: '8px', fontSize: '13.5px', textDecoration: 'none' }}>The app</Link>
            <Link href="/leadership" style={{ display: 'block', color: 'var(--muted)', marginBottom: '8px', fontSize: '13.5px', textDecoration: 'none' }}>Leadership</Link>
          </div>
          <div className="footer-col">
            <h4 style={{ color: 'var(--text)', marginBottom: '12px', fontSize: '15px' }}>Contact</h4>
            <a href="mailto:support@hisabdo.app" style={{ display: 'block', color: 'var(--muted)', marginBottom: '8px', fontSize: '13.5px', textDecoration: 'none' }}>support@hisabdo.app</a>
            <Link href="/media" style={{ display: 'block', color: 'var(--muted)', marginBottom: '8px', fontSize: '13.5px', textDecoration: 'none' }}>Press & media</Link>
          </div>
        </div>

        <div style={{ width: '100%', borderTop: '1px solid var(--border)', paddingTop: '24px', marginTop: '16px' }}>
          <small className="footer-copy">© 2026 HisabDo. All rights reserved.</small>
        </div>
      </footer>
    </>
  );
}