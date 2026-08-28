import Link from 'next/link';

export default function LeadershipPage() {
    return (
        <main id="main-content">

            {/* HERO */}
            <section className="hero">
                <div className="badge">👥 Founding &amp; Management Team</div>
                <h1>Leadership Team</h1>
                <p>The people behind HisabDo — combining software engineering with real-world business, finance and real estate experience.</p>
            </section>

            {/* PHILOSOPHY */}
            <section className="section">
                <h2 className="fade-up">Our Leadership Philosophy</h2>
                <div className="section-divider fade-up"></div>
                <p className="section-sub fade-up">At HisabDo, we believe technology should solve real-world problems while remaining simple, accessible, and trustworthy. The app itself is designed and built by Mian Usman Khalid, our founding software engineer, while the rest of the team contributes business perspective, product feedback and strategic direction drawn from their own industries.</p>
            </section>

            {/* FOUNDER & CEO */}
            <section className="section">
                <div className="split fade-up">
                    <div className="split-img">
                        <img src="/assets/images/founder.webp" alt="Mian Usman Khalid" style={{ width: '100%', borderRadius: '16px', objectFit: 'cover', aspectRatio: '1/1' }} loading="lazy" decoding="async" width="768" height="768" />
                    </div>
                    <div className="split-text">
                        <div className="badge">Founder & CEO</div>
                        <h2>Mian Usman Khalid</h2>
                        <p>Software Engineer, Entrepreneur, Businessman, Youth Political &amp; Social Leader. Responsible for the vision, technology, product development, and overall growth of HisabDo — he personally designs and builds the app.</p>
                        <Link className="btn" href="/founder">View Full Profile</Link>
                        <div className="social" style={{ marginTop: '16px' }}>
                            <a href="https://www.linkedin.com/in/mian-usman-khalid-39b8542a1" title="LinkedIn" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
                            <a href="https://www.facebook.com/share/1GyJzgV1KZ/" title="Facebook" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://www.instagram.com/mian.usman.khalid" title="Instagram" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                            <a href="https://x.com/mianusmankhali8" title="Twitter / X" target="_blank" rel="noopener noreferrer"><i className="fab fa-x-twitter"></i></a>
                            <a href="https://www.tiktok.com/@mian.usman.khalid.01" title="TikTok" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i></a>
                            <a href="https://youtube.com/@mianusmankhalid-01" title="YouTube" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
            </section>

            {/* SHARJEEL */}
            <section className="section" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%,rgba(34,197,94,.04) 0%,transparent 70%)' }}>
                <div className="split fade-up">
                    <div className="split-img">
                        <img src="/assets/images/miansharjeelkhalid.webp" alt="Mian Sharjeel Khalid" style={{ width: '100%', borderRadius: '16px', objectFit: 'cover', aspectRatio: '1/1' }} loading="lazy" decoding="async" width="1593" height="1593" />
                    </div>
                    <div className="split-text">
                        <div className="badge">Co-Founder — Business &amp; Product Advisor</div>
                        <h2>Mian Sharjeel Khalid</h2>
                        <p>Pakistani entrepreneur, real estate professional, and property advisor based in Bahria Town Lahore. Sales Director at Realtek Developers. At HisabDo, he contributes business perspective and product feedback on direction and growth decisions, bringing practical experience from the real estate industry.</p>
                        <Link className="btn" href="/founder">View Full Profile</Link>
                        <div className="social" style={{ marginTop: '16px' }}>
                            <a href="https://www.linkedin.com/in/mian-sharjeel-khalid-007603321" title="LinkedIn" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
                            <a href="https://www.facebook.com/share/1D7829bT5S/" title="Facebook" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://www.instagram.com/sharjeel_realtors/" title="Instagram" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                            <a href="https://www.tiktok.com/@sharjeel.realtors" title="TikTok" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i></a>
                        </div>
                    </div>
                </div>
            </section>

            {/* AHSAN */}
            <section className="section">
                <div className="split fade-up">
                    <div className="split-img">
                        <img src="/assets/images/mianahsankhalid.webp" alt="Mian Ahsan Khalid" style={{ width: '100%', borderRadius: '16px', objectFit: 'cover', aspectRatio: '1/1' }} loading="lazy" decoding="async" width="720" height="720" />
                    </div>
                    <div className="split-text">
                        <div className="badge">Co-Founder — Business &amp; Strategy Advisor</div>
                        <h2>Mian Ahsan Khalid</h2>
                        <p>Pakistani entrepreneur and real estate professional associated with Realtek Developers. At HisabDo, he contributes to business planning and strategic input on growth decisions, drawing on his background in real estate and financial planning.</p>
                        <Link className="btn" href="/founder">View Full Profile</Link>
                        <div className="social" style={{ marginTop: '16px' }}>
                            <a href="https://www.facebook.com/281069635101022/" title="Facebook" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://www.instagram.com/mian.ahsan.realtek/" title="Instagram" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                            <a href="https://www.tiktok.com/@mian.ahsan.realtek" title="TikTok" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i></a>
                        </div>
                    </div>
                </div>
            </section>

            {/* KHALID AZIZ */}
            <section className="section" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%,rgba(34,197,94,.04) 0%,transparent 70%)' }}>
                <div className="split fade-up">
                    <div className="split-img">
                        <img src="/assets/images/miankhalidaziz.webp" alt="Mian Khalid Aziz" style={{ width: '100%', borderRadius: '16px', objectFit: 'cover', aspectRatio: '1/1' }} loading="lazy" decoding="async" width="600" height="600" />
                    </div>
                    <div className="split-text">
                        <div className="badge">Co-Founder</div>
                        <h2>Mian Khalid Aziz</h2>
                        <p>Pakistani businessman and entrepreneur with decades of experience in business, real estate, construction, and investment. As Co-Founder of HisabDo, he provides strategic guidance and business insight on long-term direction.</p>
                        <Link className="btn" href="/founder">View Full Profile</Link>
                        <div className="social" style={{ marginTop: '16px' }}>
                            <a href="https://www.facebook.com/mianusman.utuber" title="Facebook" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://www.instagram.com/miankhalidsahib/" title="Instagram" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                            <a href="https://www.tiktok.com/@miankhalidaziz0" title="TikTok" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i></a>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOUNDING INSPIRATION */}
            <section className="section">
                <h2 className="fade-up">Founding Inspiration</h2>
                <div className="section-divider fade-up"></div>
                <div className="split fade-up">
                    <div className="split-img">
                        <img src="/assets/images/chabdulaziz.webp" alt="Chaudhary Abdul Aziz" style={{ width: '100%', borderRadius: '16px', objectFit: 'cover', aspectRatio: '1/1', filter: 'grayscale(30%)' }} loading="lazy" decoding="async" width="1024" height="1024" />
                    </div>
                    <div className="split-text">
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(148,163,184,.1)', border: '1px solid rgba(148,163,184,.2)', color: 'var(--muted)', padding: '6px 16px', borderRadius: '30px', fontSize: '12.5px', fontWeight: '500', marginBottom: '16px' }}>
                            🕊 In Loving Memory
                        </div>
                        <h2>Chaudhary Abdul Aziz <span style={{ fontSize: '0.6em', color: 'var(--muted)', fontWeight: 400 }}>(Late)</span></h2>
                        <p>Late Chaudhary Abdul Aziz was a respected businessman, former Sarpanch, community leader, and well-known Pehalwan — grandfather of Mian Usman, Sharjeel and Ahsan Khalid. Throughout his life, he was recognized for integrity, leadership, generosity, and dedication to public service.</p>
                        <p>His values of honesty, discipline, hard work, and community welfare continue to inspire the vision of HisabDo and its leadership team, and remain an important foundation for the family&apos;s entrepreneurial journey.</p>
                    </div>
                </div>
            </section>

            {/* CLOSING */}
            <section className="hero" style={{ padding: '80px 24px' }}>
                <div className="badge">🚀 Built With Purpose</div>
                <h2>A Team Driven by Real-World Experience</h2>
                <p>HisabDo is built by people who understand business, finance and technology from the ground up.</p>
                <div className="hero-buttons">
                    <a className="btn" href="https://play.google.com/store/apps/details?id=com.usman.hisabdo" target="_blank" rel="noopener noreferrer">Download HisabDo</a>
                    <Link className="btn-outline" href="/contact">Get in Touch</Link>
                </div>
            </section>

            {/* TEAM CREDENTIALS & TRUST */}
            <section className="section">
                <h2 className="fade-up">Team Credentials & Trust Signals</h2>
                <div className="section-divider fade-up"></div>
                <div className="policy-wrap fade-up">
                    <div className="policy-section">
                        <p>Our leadership combines technical product development with decades of business experience. The team has built, advised, and scaled local businesses and products with a focus on privacy, reliability and practical value for small business users.</p>
                    </div>
                    <div className="policy-section">
                        <h3>Verified Presence</h3>
                        <ul>
                            <li>Google Play listing for HisabDo with active user reviews and release notes.</li>
                            <li>Founder profiles and leadership transparency across the site (see the <Link href="/leadership">leadership page</Link> and individual profiles).</li>
                            <li>Press citations and featured writeups on technology and startup sites (see <Link href="/media">Media</Link>).</li>
                        </ul>
                    </div>
                    <div className="policy-section">
                        <h3>Security & Privacy</h3>
                        <p>HisabDo stores user data locally by default and provides optional backup/sync for users who opt in. Our Privacy Policy documents what is collected, why, and how to control your data.</p>
                    </div>
                    <div className="policy-section">
                        <h3>Internal Links & Resources</h3>
                        <p>Explore founder biographies, product details, and support resources directly from the site to learn more about our experience and product decisions: <Link href="/about">About</Link> · <Link href="/contact">Contact</Link>.</p>
                    </div>
                </div>
            </section>

        </main>
    );
}