"use client";
import Link from 'next/link';

export default function SiteShell({ children }) {
  return (
    <>
      {/* ORIGINAL NAVBAR */}
      <header className="nav">
        <Link href="/" className="logo" style={{ textDecoration: 'none', color: 'var(--text)' }}>
          <img src="/assets/images/app-logo.webp" alt="HisabDo Logo" />
          <span>HisabDo</span>
        </Link>

        <div className="nav-menu">
          <nav>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/app">App</Link>
            <Link href="/founder">Founder</Link>
            <Link href="/leadership">Leadership</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/media">Media</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </nav>
          <a href="https://play.google.com/store/apps/details?id=com.usman.hisabdo" target="_blank" rel="noopener noreferrer" className="btn btn-sm">Get App</a>
        </div>
      </header>

      {/* MAIN CONTENT */}
      {children}

      {/* ORIGINAL FOOTER */}
      <footer>
        <div className="footer-grid">
          <div className="footer-col">
            <Link href="/" className="footer-logo" style={{ textDecoration: 'none' }}>
              <img src="/assets/images/app-logo.webp" alt="HisabDo Logo" style={{ width: '32px', height: '32px', borderRadius: '8px' }} />
              <span>HisabDo</span>
            </Link>
            <p className="footer-copy" style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.6' }}>
              Offline-first khata and ledger management for shopkeepers, freelancers and small businesses in Pakistan and beyond.
            </p>
            <p className="footer-copy" style={{ color: '#64748b', fontSize: '13px', marginTop: '12px' }}>
              © 2026 HisabDo. All rights reserved.
            </p>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/disclaimer">Disclaimer</Link>
            <Link href="/support">Support</Link>
          </div>

          <div className="footer-col">
            <h4>Explore</h4>
            <Link href="/">Home</Link>
            <Link href="/app">App</Link>
            <Link href="/founder">Founder</Link>
            <Link href="/leadership">Leadership</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/media">Media</Link>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <span>support@hisabdo.app</span>
            <span>Pakistan</span>
            <a href="https://play.google.com/store/apps/details?id=com.usman.hisabdo" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)' }}>Google Play</a>

            <div className="footer-social">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i></a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
            </div>

            <div style={{ marginTop: '8px', color: '#64748b', fontSize: '12px' }}>
              Version 1.1 • Updated August 2026
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}