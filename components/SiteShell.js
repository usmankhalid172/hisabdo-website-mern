"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import FadeUpObserver from './FadeUpObserver';
import ScrollProgress from './ScrollProgress';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/app', label: 'App' },
  { href: '/founder', label: 'Founder' },
  { href: '/leadership', label: 'Leadership' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
  { href: '/ai', label: 'AI' },
  { href: '/careers', label: 'Careers' },
  { href: '/media', label: 'Media' },
  { href: '/contact', label: 'Contact' },
  {href:'/privacy-policy', label: 'Privacy Policy' },
];

export default function SiteShell({ children }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  return (
    <>
      <FadeUpObserver key={pathname} />
      <ScrollProgress />
      {/* ── NAVBAR ── */}
      <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="nav-inner">
          <Link href="/" className="logo" aria-label="HisabDo home">
            <img src="/assets/images/app-logo.webp" alt="HisabDo Logo" />
            <span>Hisab<em>Do</em></span>
          </Link>

          <nav className="nav-links" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={pathname === l.href ? 'active-nav' : ''}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <a
              href="https://play.google.com/store/apps/details?id=com.usman.hisabdo"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm"
            >
              <i className="fab fa-google-play" aria-hidden="true"></i> Get App
            </a>
            <button
              className={`nav-toggle ${open ? 'is-open' : ''}`}
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={open}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>

        <nav className={`nav-mobile ${open ? 'open' : ''}`} aria-label="Mobile">
          {NAV_LINKS.concat([{ href: '/privacy-policy', label: 'Privacy Policy' }]).map((l) => (
            <Link key={l.href} href={l.href} className={pathname === l.href ? 'active-nav' : ''}>
              {l.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* MAIN CONTENT */}
      {children}

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <Link href="/" className="footer-logo">
              <img src="/assets/images/app-logo.webp" alt="HisabDo Logo" />
              <span>Hisab<em>Do</em></span>
            </Link>
            <p className="footer-desc">
              Offline-first khata and ledger management for shopkeepers, freelancers
              and small businesses in Pakistan and beyond.
            </p>
            <div className="footer-social">
              <a href="https://www.facebook.com/people/HisabDo-Udhar-Khata-App/61587841495265/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="https://www.instagram.com/hisabdo.app/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="https://www.linkedin.com/company/hisabdo-expense-management-app/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://www.tiktok.com/@hisabdo_udhar_khata_app" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><i className="fab fa-tiktok"></i></a>
              <a href="https://www.youtube.com/channel/UCtYSl8MRwz-MK6ukBKZS9Rg" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Product</h4>
            <Link href="/app">App Features</Link>
            <Link href="/faq">FAQ</Link>
            <a href="https://play.google.com/store/apps/details?id=com.usman.hisabdo" target="_blank" rel="noopener noreferrer">Google Play</a>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <Link href="/about">About</Link>
            <Link href="/founder">Founder</Link>
            <Link href="/leadership">Leadership</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/media">Media</Link>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
            <Link href="/disclaimer">Disclaimer</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 HisabDo. All rights reserved.</span>
          <span className="footer-meta">Offline-first • Built with care in Pakistan</span>
        </div>
      </footer>
    </>
  );
}
