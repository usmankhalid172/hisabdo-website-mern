import Link from 'next/link';

const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.usman.hisabdo';

export default function DownloadCTA({ heading = 'Download HisabDo Free', sub = 'Available on Android. Offline-first. No subscription required.' }) {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="cta-banner">
        <div className="badge">🚀 Available on Google Play</div>
        <h2>{heading}</h2>
        <p>{sub}</p>
        <div className="hero-buttons" style={{ marginBottom: 0 }}>
          <a className="btn" href={PLAY_URL} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-google-play" /> Download Free
          </a>
          <Link className="btn-outline" href="/about-app">Learn More</Link>
        </div>
      </div>
    </section>
  );
}
