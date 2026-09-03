import Link from 'next/link';

export default function MediaPage() {
    return (
        <main id="main-content">

            <section className="hero">
                <div className="badge">📰 Media &amp; Press</div>
                <h1>Media Center</h1>
                <p>Official media resources, interviews, news coverage and press information for HisabDo and its Founder.</p>
            </section>

            <section className="section">
                <h2>News Coverage</h2>
                <div className="section-divider"></div>

                <div className="card">
                    <h3>Featured Press</h3>
                    <p>HisabDo has been highlighted in technology and startup publications for its practical offline-first approach to khata and ledger management.</p>
                    <ul style={{ marginTop: '16px', lineHeight: '1.7' }}>
                        <li><strong>StartupBase</strong> — HisabDo is featured as a launched product with a strong local-market focus.</li>
                        <li><strong>Medium</strong> — Founder insights on building a digital accounting app for Pakistani small businesses.</li>
                        <li><strong>FreePressRelease</strong> — Public launch announcement and product positioning story.</li>
                    </ul>
                </div>
            </section>

            <section className="section">
                <h2>Interviews &amp; Podcasts</h2>
                <div className="section-divider"></div>

                <div className="grid">
                    <div className="card">
                        <h3>Founder Interviews</h3>
                        <p>Founder Mian Usman Khalid shares the story behind HisabDo, real business use cases, and why offline-first technology matters for local entrepreneurs.</p>
                    </div>

                    <div className="card">
                        <h3>Podcast Appearances</h3>
                        <p>HisabDo is positioned as a practical startup solving daily financial challenges for shopkeepers, freelancers, and small businesses.</p>
                    </div>
                </div>
            </section>

            <section className="section">
                <h2>Speaking &amp; Events</h2>
                <div className="section-divider"></div>

                <div className="card">
                    <h3>Startup Talks</h3>
                    <p>HisabDo is built by a founder who has worked at the intersection of software engineering, business growth, and entrepreneurship training. Public speaking topics include product development, offline-first design, and small business finance.</p>
                </div>
            </section>

            <section className="section">
                <h2>Press Contact</h2>
                <div className="section-divider"></div>

                <div className="card">
                    <h3>Media Inquiries</h3>
                    <p>For interviews, coverage, or partnership inquiries, please contact us directly.</p>
                    <ul style={{ marginTop: '16px', lineHeight: '1.7' }}>
                        <li><strong>Email:</strong> support@hisabdo.app</li>
                        <li><strong>Founder:</strong> <Link href="/founder" style={{ color: 'var(--green)' }}>Mian Usman Khalid</Link></li>
                        <li><strong>Publication links:</strong> Available on the blog and founder profile pages.</li>
                    </ul>
                </div>
            </section>

            <section className="section">
                <h2>Why Media Coverage Matters</h2>
                <div className="section-divider"></div>

                <div className="policy-wrap">
                    <div className="policy-section">
                        <p>Media coverage helps demonstrate that HisabDo is a real product with a real user focus. We welcome journalists, podcast hosts, and industry writers who want to explore technology for small businesses, offline-first design, and financial inclusion.</p>
                    </div>
                    <div className="policy-section">
                        <p>If you are a writer or reporter looking for a story, email us with your angle and we can provide product information, founder quotes, app screenshots, and user impact details.</p>
                    </div>
                </div>
            </section>

        </main>
    );
}