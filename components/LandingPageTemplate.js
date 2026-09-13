import Link from 'next/link';
import JsonLd from './JsonLd';
import Breadcrumb from './Breadcrumb';
import FaqSection from './FaqSection';
import DownloadCTA from './DownloadCTA';
import { webPageSchema, softwareApplicationSchema } from '../lib/seo';

export default function LandingPageTemplate({ page }) {
  const { slug, h1, description, features, faqs, related } = page;

  return (
    <main id="main-content">
      <JsonLd data={[webPageSchema({ title: h1, description, url: `/${slug}` }), softwareApplicationSchema()]} />

      <section className="hero">
        <Breadcrumb items={[{ name: 'Home', path: '/' }, { name: h1, path: `/${slug}` }]} />
        <div className="badge">📱 Free Android App</div>
        <h1>{h1}</h1>
        <p>{description}</p>
        <div className="hero-buttons">
          <a className="btn" href="https://play.google.com/store/apps/details?id=com.usman.hisabdo" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-google-play" /> Download Free
          </a>
          <Link className="btn-outline" href="/about-app">Learn More</Link>
        </div>
      </section>

      {features?.length > 0 && (
        <section className="section">
          <h2>Key Features</h2>
          <div className="section-divider" />
          <div className="grid">
            {features.map((f) => (
              <div className="card card-left" key={f.title}>
                <div className="card-icon"><i className={`fas ${f.icon}`} /></div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <FaqSection faqs={faqs} />

      {related?.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <h2>Related Tools</h2>
          <div className="section-divider" />
          <div className="grid grid-3">
            {related.map((r) => (
              <div className="card card-left" key={r.href}>
                <Link href={r.href} className="btn-outline">{r.label} →</Link>
              </div>
            ))}
          </div>
        </section>
      )}

      <DownloadCTA />
    </main>
  );
}
