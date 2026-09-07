import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'XICTEK Systems — Software Company | Pakistan',
  description: 'XICTEK Systems is a Pakistani software company building practical technology products. HisabDo is our flagship product — an offline-first digital ledger app for small businesses.',
};

const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.usman.hisabdo';

export default function XictekSystemsPage() {
  return (
    <main>

      {/* HERO */}
      <section className="hero">
        <div className="badge">🏢 Software Company — Pakistan</div>
        <h1>XICTEK Systems</h1>
        <p>Building Practical Technology for Businesses and Individuals</p>
        <div className="hero-buttons">
          <Link className="btn" href="/about-app"><i className="fas fa-mobile-alt"></i> View Our Products</Link>
          <Link className="btn-outline" href="/contact">Contact Us</Link>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section">
        <div className="split fade-up">
          <div className="split-text">
            <div className="badge">About the Company</div>
            <h2>Who We Are</h2>
            <p>XICTEK Systems is a Pakistani software company focused on building practical, accessible technology products. We design and develop software that solves real problems for businesses, entrepreneurs and individuals — starting with the markets and users we know best.</p>
            <p style={{ marginTop: '14px' }}>Our flagship product, <strong style={{ color: '#e2e8f0' }}>HisabDo</strong>, is an offline-first digital ledger and khata management app used by shopkeepers, freelancers and small businesses across Pakistan and beyond.</p>
            <Link className="btn" href="#products" style={{ marginTop: '24px', display: 'inline-flex' }}>View Our Products</Link>
          </div>
          <div className="split-img">
            <Image src="/assets/images/app-logo.webp" alt="XICTEK Systems — HisabDo" width={400} height={400} style={{ width: '100%', borderRadius: '16px', objectFit: 'contain', background: 'rgba(34,197,94,.04)', padding: '40px' }} />
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="section" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%,rgba(34,197,94,.04) 0%,transparent 70%)' }}>
        <h2 className="fade-up">Mission &amp; Vision</h2>
        <div className="section-divider fade-up"></div>
        <div className="grid fade-up" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="card card-left">
            <div className="card-icon"><i className="fas fa-bullseye"></i></div>
            <h3>Our Mission</h3>
            <p>Build software that works for real people. Every product we create starts with a real problem observed in the field, not a feature list on a whiteboard.</p>
          </div>
          <div className="card card-left">
            <div className="card-icon"><i className="fas fa-eye"></i></div>
            <h3>Our Vision</h3>
            <p>Practical technology for every business — reliable, affordable and easy-to-use software regardless of internet connectivity or technical background.</p>
          </div>
        </div>
      </section>

      {/* CORE SERVICES */}
      <section className="section">
        <h2 className="fade-up">Core Services</h2>
        <div className="section-divider fade-up"></div>
        <p className="section-sub fade-up">What XICTEK Systems builds and delivers.</p>
        <div className="grid fade-up">
          {[
            { icon: 'fa-code',        title: 'Software Development',      text: 'Custom software solutions built for real-world use cases using modern, maintainable technology stacks.' },
            { icon: 'fa-mobile-alt',  title: 'Mobile App Development',    text: 'Android-first mobile applications designed for offline use and practical daily workflows. HisabDo is our flagship mobile product.' },
            { icon: 'fa-globe',       title: 'Web Development',           text: 'Responsive, fast and accessible web applications built with Next.js, React and modern web standards.' },
            { icon: 'fa-cloud',       title: 'Cloud & Azure Solutions',   text: 'Cloud architecture, deployment and integration using Microsoft Azure for scalable, secure business solutions.' },
            { icon: 'fa-robot',       title: 'AI & Automation Solutions', text: 'Intelligent automation and AI-powered features that reduce manual work and improve business decision-making.' },
            { icon: 'fa-layer-group', title: 'SaaS Product Development',  text: 'End-to-end SaaS product design, development and launch — from idea to production.' },
          ].map(s => (
            <div className="card card-left" key={s.title}>
              <div className="card-icon"><i className={`fas ${s.icon}`}></i></div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT PORTFOLIO */}
      <section className="section" id="products" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%,rgba(34,197,94,.04) 0%,transparent 70%)' }}>
        <h2 className="fade-up">Our Products</h2>
        <div className="section-divider fade-up"></div>
        <div className="grid fade-up" style={{ maxWidth: '960px', margin: '0 auto' }}>

          {/* HisabDo flagship — full-width */}
          <div className="card card-left fade-up" style={{ borderColor: 'rgba(34,197,94,.35)', gridColumn: '1/-1' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
              <Image src="/assets/images/app-logo.webp" alt="HisabDo" width={72} height={72} style={{ borderRadius: '14px', objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: '240px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
                  <div className="badge" style={{ margin: 0 }}>🚀 Flagship Product</div>
                  {['Android', 'Offline-First', 'Free'].map(t => (
                    <span key={t} style={{ background: 'rgba(34,197,94,.08)', border: '1px solid rgba(34,197,94,.2)', color: 'var(--green)', padding: '4px 12px', borderRadius: '20px', fontSize: '12.5px' }}>{t}</span>
                  ))}
                </div>
                <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>HisabDo — Khata &amp; Ledger App</h3>
                <p>An offline-first digital ledger and khata management app for shopkeepers, freelancers and small businesses. Track customer balances, expenses, receivables and generate PDF reports — all without needing an internet connection. Available free on Google Play.</p>
                <div style={{ display: 'flex', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
                  <Link className="btn" href="/about-app"><i className="fas fa-info-circle"></i> Learn More</Link>
                  <a className="btn-outline" href={PLAY_URL} target="_blank" rel="noopener noreferrer"><i className="fab fa-google-play"></i> Download Free</a>
                </div>
              </div>
            </div>
          </div>

          {/* Coming soon */}
          <div className="card card-left fade-up" style={{ opacity: 0.7 }}>
            <div className="card-icon"><i className="fas fa-rocket"></i></div>
            <div className="badge" style={{ marginBottom: '12px' }}>In Development</div>
            <h3>More Products Coming</h3>
            <p>XICTEK Systems is actively developing new software products. Follow us for updates on upcoming launches.</p>
            <Link className="btn-outline" href="/contact" style={{ marginTop: '16px', display: 'inline-block' }}>Contact Us for Inquiries</Link>
          </div>

        </div>
      </section>

      {/* WHY CHOOSE XICTEK */}
      <section className="section">
        <h2 className="fade-up">Why Businesses Choose XICTEK Systems</h2>
        <div className="section-divider fade-up"></div>
        <div className="grid fade-up">
          {[
            { icon: 'fa-users',          title: 'Real-World Focus',         text: 'We build for problems we observe directly. Every feature starts with a real user need, not an abstract use case.' },
            { icon: 'fa-wifi',           title: 'Offline-First Philosophy', text: 'Our products work without constant internet access, making them reliable in any environment.' },
            { icon: 'fa-shield-alt',     title: 'Privacy by Design',        text: 'User data stays on the device by default. We do not sell personal information.' },
            { icon: 'fa-map-marker-alt', title: 'Local Context',            text: 'We understand the Pakistani market, its languages, currencies and business workflows.' },
          ].map(r => (
            <div className="card card-left" key={r.title}>
              <div className="card-icon"><i className={`fas ${r.icon}`}></i></div>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="section" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%,rgba(34,197,94,.04) 0%,transparent 70%)' }}>
        <h2 className="fade-up">The Team Behind XICTEK Systems</h2>
        <div className="section-divider fade-up"></div>
        <div className="split fade-up" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div className="split-img">
            <Image src="/assets/images/founder.webp" alt="Mian Usman Khalid — Founder & CEO, XICTEK Systems" width={400} height={400} style={{ width: '100%', borderRadius: '16px', objectFit: 'cover', aspectRatio: '1/1' }} />
          </div>
          <div className="split-text">
            <div className="badge">Founder &amp; CEO</div>
            <h2>Mian Usman Khalid</h2>
            <p>XICTEK Systems is led by Mian Usman Khalid — a Pakistani software engineer, entrepreneur and youth leader. He founded XICTEK Systems and built HisabDo as its flagship product, managing product development, marketing and growth independently.</p>
            <p style={{ marginTop: '14px' }}>The founding team also includes Mian Sharjeel Khalid, Mian Ahsan Khalid and Mian Khalid Aziz — bringing backgrounds in software engineering, entrepreneurship, real estate and business development.</p>
            <Link className="btn" href="/leadership" style={{ marginTop: '24px', display: 'inline-flex' }}><i className="fas fa-users"></i> Meet the Full Team</Link>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section">
        <h2 className="fade-up">Get in Touch</h2>
        <div className="section-divider fade-up"></div>
        <div className="grid fade-up" style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div className="contact-icon"><i className="fas fa-envelope"></i></div>
            <h3>General Inquiries</h3>
            <p style={{ marginBottom: '20px' }}>support@hisabdo.app</p>
            <a className="btn" href="mailto:support@hisabdo.app"><i className="fas fa-paper-plane"></i> Send Email</a>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div className="contact-icon"><i className="fas fa-handshake"></i></div>
            <h3>Business &amp; Partnerships</h3>
            <p style={{ marginBottom: '20px' }}>For partnership, licensing or enterprise inquiries, reach out directly.</p>
            <a className="btn" href="mailto:support@hisabdo.app?subject=Business Inquiry — XICTEK Systems"><i className="fas fa-briefcase"></i> Contact for Business</a>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div className="contact-icon"><i className="fas fa-user-graduate"></i></div>
            <h3>Careers</h3>
            <p style={{ marginBottom: '20px' }}>Interested in joining XICTEK Systems? View open roles and internship programs.</p>
            <Link className="btn" href="/careers"><i className="fas fa-arrow-right"></i> View Careers</Link>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="hero" style={{ padding: '80px 24px' }}>
        <div className="badge">🚀 XICTEK Systems — Pakistan</div>
        <h2>Building Practical Technology, One Product at a Time.</h2>
        <p>HisabDo is our flagship product. More is coming.</p>
        <div className="hero-buttons">
          <Link className="btn" href="/about-app"><i className="fas fa-mobile-alt"></i> View HisabDo</Link>
          <Link className="btn-outline" href="/contact"><i className="fas fa-envelope"></i> Contact Us</Link>
          <Link className="btn-outline" href="/leadership"><i className="fas fa-users"></i> Meet the Team</Link>
        </div>
      </section>

    </main>
  );
}
