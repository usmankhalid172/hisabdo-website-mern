import Link from 'next/link';
import Image from 'next/image';
import Reveal from '../components/Reveal';
import CountUp from '../components/CountUp';

const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.usman.hisabdo';

const SCREENS = [
  { src: '/assets/images/dashboard.webp', w: 702, h: 1600, title: 'Dashboard', desc: 'Overview of balances and daily activity.' },
  { src: '/assets/images/customer.webp', w: 590, h: 1280, title: 'Customers', desc: 'Customer records and outstanding balances.' },
  { src: '/assets/images/transaction.webp', w: 590, h: 1280, title: 'Transactions', desc: 'Review money received, paid and recorded.' },
  { src: '/assets/images/analytics.webp', w: 702, h: 1600, title: 'Analytics', desc: 'Visual insights into business performance.' },
  { src: '/assets/images/ledger.webp', w: 738, h: 1600, title: 'Ledger', desc: 'Detailed customer and transaction history.' },
  { src: '/assets/images/voice-entry.webp', w: 702, h: 1600, title: 'Voice Entry', desc: 'Quick transaction entry using voice input.' },
];

const FEATURES = [
  { icon: 'fa-book', title: 'Khata & Ledger', desc: 'Track every transaction — money given and received — with detailed records.' },
  { icon: 'fa-users', title: 'Customer Management', desc: 'Add customers, manage balances and view complete financial histories.' },
  { icon: 'fa-chart-line', title: 'Analytics', desc: 'Understand your business performance with clear visual insights.' },
  { icon: 'fa-file-pdf', title: 'PDF Export', desc: 'Create professional reports and transaction statements instantly.' },
  { icon: 'fa-microphone', title: 'Voice Entry', desc: 'Create records faster with built-in voice input support.' },
  { icon: 'fa-cloud-upload-alt', title: 'Backup & Restore', desc: 'Protect your business records and restore them anytime.' },
];

const STEPS = [
  { icon: 'fa-user-plus', title: 'Add Customers', desc: 'Start by creating customer profiles and keeping their dues organized from day one.' },
  { icon: 'fa-money-bill-wave', title: 'Record Transactions', desc: 'Track money given, money received, expenses and balances in a simple journal flow.' },
  { icon: 'fa-file-pdf', title: 'Export Reports', desc: 'Generate clean PDF summaries whenever you need a business-ready record or statement.' },
  { icon: 'fa-shield-alt', title: 'Stay Secure', desc: 'Protect sensitive financial data locally and restore it whenever needed with trusted backups.' },
];

export default function Home() {
  return (
    <main id="main-content">
      {/* ═══ HERO ═══ */}
      <section className="hero">
        <Image src="/assets/images/app-logo.webp" className="hero-logo" alt="HisabDo Logo" width={768} height={768} priority />
        <Reveal><div className="badge">📱 Smart Offline Financial Management</div></Reveal>
        <Reveal delay={80}>
          <h1>HisabDo: <span className="grad-text">Khata &amp; Ledger</span></h1>
        </Reveal>
        <Reveal delay={160}>
          <p>Manage Khata, Udhar, Expenses, Receivables &amp; Customers with a powerful offline-first digital ledger — built for shopkeepers, freelancers &amp; small businesses.</p>
        </Reveal>
        <Reveal delay={240}>
          <div className="hero-buttons">
            <a className="btn" href={PLAY_URL} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-google-play"></i> Download Free
            </a>
            <Link className="btn-outline" href="/about-app">Learn More</Link>
          </div>
        </Reveal>
        <Reveal delay={320}>
          <p className="hero-note">🔒 Offline First &bull; 📄 PDF Reports &bull; ☁ Backup &amp; Restore</p>
        </Reveal>
      </section>

      {/* ═══ TRUST BADGES ═══ */}
      <section className="section" style={{ paddingTop: '24px', paddingBottom: '40px' }}>
        <Reveal>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
            <a href="https://startupbase.io/products/hisabdo?utm_source=startupbase&utm_medium=badge&utm_campaign=featured-badge-light" target="_blank" rel="noopener noreferrer">
              <img src="https://statics.startupbase.io/site/badges/featured-on-sb.svg" alt="Featured on StartupBase" style={{ height: '52px', width: 'auto' }} loading="lazy" decoding="async" />
            </a>
            <a href="https://startupbase.io/products/hisabdo?utm_source=startupbase&utm_medium=badge&utm_campaign=launch-badge-light" target="_blank" rel="noopener noreferrer">
              <img src="https://statics.startupbase.io/site/badges/launched-on-sb.svg" alt="Launched on StartupBase" style={{ height: '52px', width: 'auto' }} loading="lazy" decoding="async" />
            </a>
          </div>
        </Reveal>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: '64px' }}>
        <Reveal>
          <div className="stats">
            <div className="stat-item"><CountUp end={5} suffix="+" /><span>Languages Supported</span></div>
            <div className="stat-item"><CountUp end={3} /><span>Currencies (PKR, USD, INR)</span></div>
            <div className="stat-item"><CountUp end="Offline-first" /><span>Built for low-connectivity use</span></div>
          </div>
        </Reveal>
      </section>

      {/* ═══ ABOUT / SPLIT ═══ */}
      <section className="section">
        <Reveal>
          <div className="split">
            <div className="split-text">
              <div className="badge">Built For Modern Businesses</div>
              <h2>Replace Your Paper Khata With a Smarter System</h2>
              <p>HisabDo is designed to replace traditional paper registers with a modern, organized digital ledger. Core records work locally on your device, and optional signed-in features can support backup or sync when you choose to use them.</p>
              <ul className="split-list">
                <li>Track money given and received in real time</li>
                <li>Manage customers and their complete history</li>
                <li>Export professional PDF reports anytime</li>
                <li>Works fully offline — no internet needed</li>
              </ul>
              <Link className="btn" href="/about-app">Explore Features</Link>
            </div>
            <div className="split-img">
              <Image src="/assets/images/dashboard.webp" alt="HisabDo Dashboard" width={702} height={1600} style={{ width: '100%', height: 'auto' }} />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══ CORE FEATURES ═══ */}
      <section className="section" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(34,197,94,.05) 0%, transparent 70%)' }}>
        <Reveal><h2>Everything You Need</h2></Reveal>
        <div className="section-divider"></div>
        <Reveal delay={60}><p className="section-sub">A complete toolkit for managing your business finances — offline, secure and easy to use.</p></Reveal>
        <div className="grid">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 70}>
              <div className="card card-left">
                <div className="card-icon"><i className={`fas ${f.icon}`}></i></div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ APP SCREENS SHOWCASE ═══ */}
      <section className="section" style={{ overflow: 'hidden' }}>
        <Reveal><h2>Application Screens</h2></Reveal>
        <div className="section-divider"></div>
        <Reveal delay={60}><p className="section-sub">Take a tour of the app — swipe or scroll sideways to explore every screen.</p></Reveal>
        <div className="showcase">
          {SCREENS.map((s) => (
            <div className="phone-card" key={s.title}>
              <div className="phone-screen">
                <Image src={s.src} alt={s.title} width={s.w} height={s.h} style={{ width: '100%', height: 'auto' }} />
              </div>
              <h3>{s.title}</h3>
              <p className="screenshot-caption">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ WHY CHOOSE ═══ */}
      <section className="section">
        <Reveal><h2>Why Choose HisabDo?</h2></Reveal>
        <div className="section-divider"></div>
        <div className="grid">
          {[
            ['🔒', 'Offline First', 'Core features work without internet, which helps in low-connectivity environments.'],
            ['📄', 'PDF Export', 'Create professional reports instantly.'],
            ['☁', 'Backup & Restore', 'Protect important business records.'],
            ['🌍', 'Multi Language', 'Urdu, English, Hindi, Arabic & Roman Urdu.'],
            ['💱', 'Multi Currency', 'PKR, USD and INR support.'],
            ['🎤', 'Voice Entry', 'Create records faster using voice support.'],
          ].map(([emoji, title, desc], i) => (
            <Reveal key={title} delay={i * 60}>
              <div className="card"><h3>{emoji} {title}</h3><p>{desc}</p></div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ FOUNDER ═══ */}
      <section className="section">
        <Reveal><h2>Meet The Founder</h2></Reveal>
        <div className="section-divider"></div>
        <Reveal delay={80}>
          <div className="split" style={{ maxWidth: '900px' }}>
            <div className="split-img">
              <Image src="/assets/images/founder.webp" alt="Mian Usman Khalid" width={768} height={1024} style={{ width: '100%', borderRadius: '22px', objectFit: 'cover', aspectRatio: '3/4', height: 'auto' }} />
            </div>
            <div className="split-text">
              <div className="badge">👤 Founder &amp; CEO</div>
              <h2>Mian Usman Khalid</h2>
              <p className="founder-title">Software Engineer • Entrepreneur • Youth Leader</p>
              <p>Founder &amp; CEO of HisabDo, focused on building practical technology solutions for businesses and individuals across Pakistan and beyond.</p>
              <Link className="btn" href="/mian-usman-khalid">View Full Profile</Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══ HOW IT WORKS — TIMELINE ═══ */}
      <section className="section" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(34,197,94,.05) 0%, transparent 70%)' }}>
        <Reveal><h2>How It Works</h2></Reveal>
        <div className="section-divider"></div>
        <div className="hiw">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 110}>
              <div className="hiw-step">
                <div className="hiw-num"><i className={`fas ${s.icon}`}></i></div>
                <h3><span className="grad-text">{i + 1}.</span> {s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ USE CASES ═══ */}
      <section className="section">
        <Reveal><h2>Practical Tools for Shopkeepers, Freelancers &amp; Small Business Owners</h2></Reveal>
        <div className="section-divider"></div>
        <Reveal delay={60}><p className="section-sub">A simple way to track khata, expenses, customers and receivables without relying on a complicated setup.</p></Reveal>
        <div className="grid grid-3">
          {[
            ['Daily khata tracking', 'Useful for shopkeepers who want a more organized record of payments, dues and balances without relying entirely on paper.'],
            ['Freelance expense tracking', 'Helpful for freelancers who need a simple way to record income, expenses and client balances in one place.'],
            ['Small business recordkeeping', 'Supports day-to-day tracking for businesses that want cleaner records and faster statement sharing.'],
          ].map(([title, desc], i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="card review-card blog-card">
                <div className="blog-meta">Use Case</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ DOWNLOAD STATS ═══ */}
      <section className="section" style={{ paddingTop: 0 }}>
        <Reveal>
          <div className="stat-grid">
            <div className="stat-card"><strong>Offline-first</strong><span>Built for local use and low-connectivity environments</span></div>
            <div className="stat-card"><strong>5+</strong><span>Languages supported</span></div>
            <div className="stat-card"><strong>3</strong><span>Currencies supported</span></div>
            <div className="stat-card"><strong>24/7</strong><span>Local access and backup</span></div>
          </div>
        </Reveal>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="section" style={{ paddingTop: 0 }}>
        <Reveal><h2>Frequently Asked Questions</h2></Reveal>
        <div className="section-divider"></div>
        <Reveal delay={60}>
          <div className="faq-list">
            <details className="faq-item">
              <summary>Is HisabDo free to use?</summary>
              <p>Yes. The app is available as a free download and is designed to help individuals and business owners manage everyday finances without unnecessary friction.</p>
            </details>
            <details className="faq-item">
              <summary>Does it work without the internet?</summary>
              <p>Absolutely. HisabDo is built to work offline so your records stay available even in low-connectivity situations.</p>
            </details>
            <details className="faq-item">
              <summary>Can I export reports?</summary>
              <p>Yes. You can generate PDF reports for transactions, balances and customer activity when you need a professional record.</p>
            </details>
          </div>
        </Reveal>
        <div className="hero-buttons" style={{ marginTop: '28px' }}>
          <Link className="btn-outline" href="/faq">Read More FAQs</Link>
        </div>
      </section>

      {/* ═══ WHO SHOULD USE ═══ */}
      <section className="section">
        <Reveal><h2>Who Should Use HisabDo?</h2></Reveal>
        <div className="section-divider"></div>
        <Reveal delay={60}>
          <div className="tag-grid">
            {['Shopkeepers', 'Freelancers', 'Students', 'Small Businesses', 'Home-Based Sellers', 'Service Providers'].map((t) => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ═══ BENEFITS ═══ */}
      <section className="section">
        <Reveal><h2>Benefits at a Glance</h2></Reveal>
        <div className="section-divider"></div>
        <div className="grid grid-4">
          {[
            ['Simple Daily Use', 'Designed for busy users who want a fast and practical tool for everyday money management.'],
            ['Reliable Accounting', 'Create accurate records for receivables, payables and expenses without a complicated setup.'],
            ['Privacy-Focused', 'Core records remain local by design, while optional backup or sync features depend on how you choose to use the app.'],
            ['Portable Reports', 'Provide clear PDF reports to customers, suppliers and partners without manual formatting.'],
          ].map(([title, desc], i) => (
            <Reveal key={title} delay={i * 70}>
              <div className="card"><h3>{title}</h3><p>{desc}</p></div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ LATEST BLOG ═══ */}
      <section className="section" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(34,197,94,.05) 0%, transparent 70%)' }}>
        <Reveal><h2>Latest Blog Posts</h2></Reveal>
        <div className="section-divider"></div>
        <div className="grid grid-3">
          {[
            ['Guide', 'How to Manage Daily Khata', 'A practical guide for keeping your daily ledger accurate and easy to follow.', '/blog/how-to-manage-daily-khata'],
            ['Comparison', 'Digital Ledger vs Paper Ledger', 'Understand the advantages of switching from manual records to a smarter digital process.', '/blog/digital-ledger-vs-paper-ledger'],
            ['Guide', 'Expense Tracking for Small Business', 'Learn how to capture daily spending, spot waste and improve cash flow with confidence.', '/blog/expense-tracking-for-small-business'],
          ].map(([meta, title, desc, href], i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="card blog-card">
                <div className="blog-meta">{meta}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <Link className="btn-outline btn-sm" href={href}>Read Article →</Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ ROADMAP ═══ */}
      <section className="section">
        <Reveal><h2>App Roadmap</h2></Reveal>
        <div className="section-divider"></div>
        <div className="grid grid-3">
          {[
            ['Current Focus', 'Expanding offline reliability, backup quality and reporting for everyday business use.'],
            ['Next Release', 'Improving visual summaries, invoicing workflows and bilingual reporting support.'],
            ['Long-Term Vision', 'Building a more connected and user-friendly finance ecosystem for entrepreneurs across the region.'],
          ].map(([title, desc], i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="card card-left"><h3>{title}</h3><p>{desc}</p></div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══ BUSINESS TYPES + TRUST ═══ */}
      <section className="section">
        <Reveal><h2>Built for Many Business Types</h2></Reveal>
        <div className="section-divider"></div>
        <Reveal delay={60}>
          <div className="tag-grid">
            {['Retail Stores', 'Grocery Shops', 'Wholesale Businesses', 'Service Providers', 'Freelance Teams', 'Small Clinics'].map((t) => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="tag-grid" style={{ marginTop: '18px' }}>
            <span className="tag"><i className="fas fa-lock"></i> Secure Local Storage</span>
            <span className="tag"><i className="fas fa-mobile-alt"></i> Mobile Friendly</span>
            <span className="tag"><i className="fas fa-file-pdf"></i> PDF Export</span>
            <span className="tag"><i className="fas fa-globe"></i> Multi-Region Support</span>
          </div>
        </Reveal>
      </section>

      {/* ═══ SEO CONTENT ═══ */}
      <section className="section">
        <Reveal><h2>Khata, Ledger &amp; Finance Management Made Practical</h2></Reveal>
        <div className="section-divider"></div>
        <Reveal delay={60}>
          <p className="section-sub" style={{ marginBottom: 0 }}>Whether you run a small business in Pakistan, manage customer balances in India, or simply want better personal budgeting, HisabDo offers an easy way to track khata, ledger entries, expense activity, receivables and payables in one place.</p>
        </Reveal>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section className="section" style={{ paddingTop: 0 }}>
        <Reveal>
          <div className="cta-banner">
            <div className="badge">🚀 Available on Google Play</div>
            <h2>Ready To Manage Your Finances Smarter?</h2>
            <p>Download HisabDo today — free, offline and built for your business.</p>
            <div className="hero-buttons" style={{ marginBottom: 0 }}>
              <a className="btn" href={PLAY_URL} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-google-play"></i> Download Now — Free
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══ SOCIAL ═══ */}
      <section className="section" style={{ paddingTop: '48px', paddingBottom: '56px' }}>
        <Reveal><h2>Follow HisabDo</h2></Reveal>
        <div className="section-divider"></div>
        <Reveal delay={60}>
          <div className="social">
            <a href="https://www.facebook.com/people/HisabDo-Udhar-Khata-App/61587841495265/" title="Facebook" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/hisabdo.app/" title="Instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="https://www.linkedin.com/company/hisabdo-expense-management-app/" title="LinkedIn" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            <a href="https://www.tiktok.com/@hisabdo_udhar_khata_app" title="TikTok" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><i className="fab fa-tiktok"></i></a>
            <a href="https://www.youtube.com/channel/UCtYSl8MRwz-MK6ukBKZS9Rg" title="YouTube" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
