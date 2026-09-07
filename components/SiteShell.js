'use client';

import Image from 'next/image';
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
  { href: '/xictek-systems', label: 'Company' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
];

const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.usman.hisabdo';

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

  return <>
    <FadeUpObserver key={pathname} />
    <ScrollProgress />
    <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-inner">
        <Link className="logo" href="/" onClick={() => setOpen(false)} aria-label="HisabDo home">
          <Image src="/assets/images/app-logo.webp" alt="HisabDo" width={38} height={38} />
          HisabDo<em>.</em>
        </Link>

        <nav className="nav-links" aria-label="Primary navigation">
          {NAV_LINKS.map(({ href, label }) => <Link key={href} href={href} className={pathname === href ? 'active-nav' : ''}>{label}</Link>)}
        </nav>

        <a className="btn btn-sm nav-cta" href={PLAY_URL} target="_blank" rel="noopener noreferrer">
          <i className="fab fa-google-play" aria-hidden="true"></i> Get App
        </a>

        <button
          className={`hamburger${open ? ' open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      <nav className={`nav-mobile ${open ? 'open' : ''}`} aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className={pathname === href ? 'active-nav' : ''}>
              {label}
            </Link>
          ))}
        <a
          className="btn btn-sm"
          href={PLAY_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: '12px 24px 16px', alignSelf: 'flex-start' }}
        >
          <i className="fab fa-google-play" aria-hidden="true"></i> Get App
        </a>
      </nav>
      </header>

    {children}

    <footer className="site-footer">
      <div className="footer-grid">

        <div className="footer-col footer-brand">
          <Link className="footer-logo" href="/">
            <Image src="/assets/images/app-logo.webp" alt="HisabDo" width={36} height={36} />
            HisabDo<em>.</em>
          </Link>
          <p className="footer-desc">
            HisabDo is a product developed and maintained by XICTEK Systems — a software company building practical technology for businesses and individuals.
          </p>
          <div className="social footer-social">
            <a href="https://www.facebook.com/people/HisabDo-Udhar-Khata-App/61587841495265/" title="Facebook" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/hisabdo.app/" title="Instagram" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            <a href="https://www.linkedin.com/company/hisabdo-expense-management-app/" title="LinkedIn" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
            <a href="https://www.youtube.com/channel/UCtYSl8MRwz-MK6ukBKZS9Rg" title="YouTube" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
            <a href="https://www.tiktok.com/@hisabdo_udhar_khata_app" title="TikTok" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <Link href="/xictek-systems">About XICTEK Systems</Link>
          <Link href="/leadership">Leadership Team</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/media">Media &amp; Press</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="footer-col">
          <h4>Products &amp; Resources</h4>
          <Link href="/about-app">HisabDo App</Link>
          <a href={PLAY_URL} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-google-play"></i> Download Free
          </a>
          <Link href="/blog">Blog</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/founder">Founder Profile</Link>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms &amp; Conditions</Link>
          <Link href="/disclaimer">Disclaimer</Link>
          <Link href="/delete-data">Delete My Data</Link>
          <a href="mailto:support@hisabdo.app">
            <i className="fas fa-envelope"></i> support@hisabdo.app
          </a>
        </div>

      </div>
      <div className="footer-bottom">
        <span className="footer-meta">&copy; 2026 XICTEK Systems. All rights reserved.</span>
        <span>HisabDo is a product developed and maintained by XICTEK Systems.</span>
      </div>
    </footer>
  </>;
}

