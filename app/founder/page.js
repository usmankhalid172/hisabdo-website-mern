import Link from 'next/link';

export default function FounderPage() {
    return (
        <main id="main-content">

            {/* HERO */}
            <section className="hero" style={{ paddingBottom: '48px' }}>
                <img src="/assets/images/founder.webp" className="founder-hero-img" alt="Mian Usman Khalid" loading="lazy" decoding="async" width="768" height="768" />
                <div className="badge">👤 Founder &amp; CEO — HisabDo</div>
                <h1>Mian Usman Khalid</h1>
                <p style={{ color: 'var(--muted)', fontSize: '15px' }}>Software Engineer &nbsp;•&nbsp; Entrepreneur &nbsp;•&nbsp; Youth Political &amp; Social Leader</p>
                <div className="hero-buttons" style={{ marginTop: '28px' }}>
                    <a className="btn" href="mailto:support@hisabdo.app"><i className="fas fa-envelope"></i> Contact</a>
                    <a className="btn-outline" href="https://www.linkedin.com/in/mian-usman-khalid-39b8542a1" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i> LinkedIn</a>
                </div>
            </section>

            {/* WIKI BODY */}
            <div style={{ padding: '48px 0 80px' }}>
                <div className="wiki-layout">

                    {/* MAIN CONTENT */}
                    <div className="wiki-main">

                        {/* 1. Biography */}
                        <div className="wiki-section" id="biography">
                            <h2>1. Biography</h2>
                            <p>Mian Usman Khalid is a Pakistani Software Engineer, Entrepreneur, and Youth Political &amp; Social Leader. He is the Founder and CEO of <strong style={{ color: '#e2e8f0' }}>HisabDo</strong>, a digital ledger and business finance management application built for individuals and businesses in Pakistan and beyond.</p>
                            <p>Born and raised in Pakistan, Usman grew up in an entrepreneurial family with a strong tradition of business, real estate, and community leadership. His father, Mian Khalid Aziz, is a seasoned businessman and Co-Founder of HisabDo. His grandfather, Late Chaudhary Abdul Aziz, was a respected community leader and Sarpanch whose values of integrity and service continue to inspire the family.</p>
                            <p>Usman completed his degree in Computer Science from COMSATS University Islamabad, where he developed expertise in software engineering, enterprise application development, and modern cloud technologies.</p>
                        </div>

                        {/* 2. Founder Story */}
                        <div className="wiki-section" id="founder-story">
                            <h2>2. Founder Story</h2>
                            <p>The idea for HisabDo came from a real problem Usman observed in his family&apos;s business environment — small businesses and traders in Pakistan were still managing their accounts manually in paper ledgers (hisab kitab), leading to errors, lost records, and inefficiency.</p>
                            <p>Usman set out to build a simple, offline-first Android application that would replace the paper ledger with a digital one — accessible to anyone with a smartphone, regardless of internet connectivity. The name &quot;HisabDo&quot; (meaning &quot;Do the Accounting&quot; in Urdu) reflects this mission directly.</p>
                            <p>What started as a solution for local businesses has grown into a product that has also been recognized through startup and media platforms such as StartupBase.</p>
                        </div>

                        {/* 3. Education */}
                        <div className="wiki-section" id="education">
                            <h2>3. Education</h2>
                            <ul>
                                <li><strong style={{ color: '#e2e8f0' }}>Bachelor of Science — Computer Science</strong><br />
                                    <span style={{ fontSize: '13.5px' }}>COMSATS University Islamabad, Pakistan</span></li>
                            </ul>
                        </div>

                        {/* 4. Career Timeline */}
                        <div className="wiki-section" id="career-timeline">
                            <h2>4. Career Timeline</h2>
                            <div className="timeline">
                                <div className="tl-item">
                                    <div className="tl-year">COMSATS University</div>
                                    <div className="tl-title">Computer Science Graduate</div>
                                    <div className="tl-desc">Completed BS Computer Science with focus on software engineering, enterprise systems, and application development.</div>
                                </div>
                                <div className="tl-item">
                                    <div className="tl-year">IT Industry</div>
                                    <div className="tl-title">Software Engineer</div>
                                    <div className="tl-desc">Worked on enterprise software solutions, web applications, and mobile apps. Gained hands-on experience in .NET, Azure, Blazor, and Android development.</div>
                                </div>
                                <div className="tl-item">
                                    <div className="tl-year">Entrepreneurship</div>
                                    <div className="tl-title">Founded HisabDo</div>
                                    <div className="tl-desc">Conceptualized, designed, and launched HisabDo — a digital ledger app for Pakistani businesses. Managed product development, marketing, and growth independently.</div>
                                </div>
                                <div className="tl-item">
                                    <div className="tl-year">Present</div>
                                    <div className="tl-title">Founder & CEO — HisabDo</div>
                                    <div className="tl-desc">Leading HisabDo&apos;s product roadmap, team, and business development. Actively involved in youth leadership, social development, and entrepreneurship advocacy.</div>
                                </div>
                            </div>
                        </div>

                        {/* 5. HisabDo Journey */}
                        <div className="wiki-section" id="hisabdo-journey">
                            <h2>5. HisabDo Journey</h2>
                            <p>HisabDo is available on the Google Play Store and has been featured on multiple startup and media platforms. The app provides digital ledger management, transaction tracking, customer/supplier accounts, voice entry, and business analytics — all designed for the Pakistani market.</p>
                            <ul>
                                <li>Published on Google Play Store</li>
                                <li>Featured on StartupBase (Featured + Launched badges)</li>
                                <li>Covered by 15+ media outlets and publications</li>
                                <li>Growing user base across Pakistan</li>
                                <li>Built with offline-first architecture for low-connectivity environments</li>
                            </ul>
                            <div style={{ marginTop: '20px' }}>
                                <h3 style={{ fontSize: '18px', marginBottom: '10px', color: 'var(--green)' }}>Company & Product Highlights</h3>
                                <p>HisabDo is built to help shopkeepers, freelancers and small businesses replace paper khata with a more accurate, digital workflow. The product is designed, developed, and maintained by the HisabDo founding team with a strong focus on privacy, simplicity, and real-world utility.</p>
                                <p>Our commitment is to deliver an app that works when users need it most: offline, fast, and with clear customer and expense tracking.</p>
                            </div>
                        </div>

                        {/* 6. Skills */}
                        <div className="wiki-section" id="skills">
                            <h2>6. Skills &amp; Technologies</h2>
                            <div className="skills-grid" style={{ marginBottom: '20px' }}>
                                <span className="skill-tag">.NET / C#</span>
                                <span className="skill-tag">ASP.NET Core</span>
                                <span className="skill-tag">Blazor</span>
                                <span className="skill-tag">Azure</span>
                                <span className="skill-tag">Android Development</span>
                                <span className="skill-tag">SQL / Databases</span>
                                <span className="skill-tag">REST APIs</span>
                                <span className="skill-tag">Artificial Intelligence</span>
                                <span className="skill-tag">SaaS Architecture</span>
                                <span className="skill-tag">Product Management</span>
                                <span className="skill-tag">Entrepreneurship</span>
                                <span className="skill-tag">Real Estate</span>
                                <span className="skill-tag">Youth Leadership</span>
                            </div>
                        </div>

                        {/* 7. Mock Interview Program */}
                        <div className="wiki-section" id="interviews">
                            <h2>7. Mock Interview Program</h2>
                            <div className="card" style={{ padding: '28px 24px' }}>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                                    <div className="card-icon" style={{ flexShrink: 0 }}><i className="fas fa-comments"></i></div>
                                    <div>
                                        <h3 style={{ fontSize: '17px', marginBottom: '8px' }}>Free Mock Interviews for Students &amp; Fresh Graduates</h3>
                                        <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '16px' }}>Mian Usman Khalid personally conducts free mock interviews for students, fresh graduates, and career switchers, helping them prepare for real-world job interviews with honest, practical feedback on technical and communication skills.</p>
                                        <a className="btn" href="https://forms.gle/Ff8XcsXEbMWjxEvV7" target="_blank" rel="noopener noreferrer"><i className="fas fa-calendar-check"></i> Book Mock Interview</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 8. Awards & Recognition */}
                        <div className="wiki-section" id="awards">
                            <h2>8. Awards &amp; Recognition</h2>
                            <ul>
                                <li><strong style={{ color: '#e2e8f0' }}>Featured on StartupBase</strong> — HisabDo has been listed and recognized through the platform</li>
                                <li><strong style={{ color: '#e2e8f0' }}>Launch Recognition</strong> — Public product launch visibility through startup and media channels</li>
                                <li><strong style={{ color: '#e2e8f0' }}>Public Coverage</strong> — HisabDo has appeared in public articles and media references linked on this website</li>
                            </ul>
                        </div>

                        {/* 9. Publications */}
                        <div className="wiki-section" id="publications">
                            <h2>9. Publications &amp; Articles</h2>
                            <p>Articles and blog posts authored by Mian Usman Khalid are available on multiple platforms. <Link href="/blog" style={{ color: 'var(--green)' }}>View all publications →</Link></p>
                        </div>

                        {/* 10. Social Profiles */}
                        <div className="wiki-section" id="social-profiles">
                            <h2>10. Social Profiles</h2>
                            <table className="social-table">
                                <tbody>
                                    <tr><td><i className="fab fa-linkedin"></i> LinkedIn</td><td><a href="https://www.linkedin.com/in/mian-usman-khalid-39b8542a1" target="_blank" rel="noopener noreferrer">linkedin.com/in/mian-usman-khalid-39b8542a1</a></td></tr>
                                    <tr><td><i className="fab fa-github"></i> GitHub</td><td><a href="https://github.com/usmankhalid172/hisabDo_site" target="_blank" rel="noopener noreferrer">github.com/mian-usman-khalid</a></td></tr>
                                    <tr><td><i className="fab fa-facebook"></i> Facebook</td><td><a href="https://www.facebook.com/share/1GyJzgV1KZ/" target="_blank" rel="noopener noreferrer">facebook.com/mian.usman.khalid</a></td></tr>
                                    <tr><td><i className="fab fa-instagram"></i> Instagram</td><td><a href="https://www.instagram.com/mian.usman.khalid" target="_blank" rel="noopener noreferrer">@mian.usman.khalid</a></td></tr>
                                    <tr><td><i className="fab fa-x-twitter"></i> X (Twitter)</td><td><a href="https://x.com/mianusmankhali8" target="_blank" rel="noopener noreferrer">@mianusmankhali8</a></td></tr>
                                    <tr><td><i className="fab fa-youtube"></i> YouTube</td><td><a href="https://youtube.com/@mianusmankhalid-01" target="_blank" rel="noopener noreferrer">@mianusmankhalid-01</a></td></tr>
                                    <tr><td><i className="fab fa-tiktok"></i> TikTok</td><td><a href="https://www.tiktok.com/@mian.usman.khalid.01" target="_blank" rel="noopener noreferrer">@mian.usman.khalid.01</a></td></tr>
                                    <tr><td><i className="fas fa-rocket"></i> StartupBase</td><td><a href="https://startupbase.io/startups/hisabdo" target="_blank" rel="noopener noreferrer">startupbase.io/startups/hisabdo</a></td></tr>
                                </tbody>
                            </table>
                        </div>

                    </div>{/* /wiki-main */}

                    {/* SIDEBAR */}
                    <div className="wiki-sidebar">

                        {/* Infobox */}
                        <div className="infobox">
                            <img src="/assets/images/founder.webp" alt="Mian Usman Khalid" loading="lazy" decoding="async" width="768" height="768" />
                            <div style={{ textAlign: 'center', marginBottom: '4px' }}>
                                <strong style={{ fontSize: '15px' }}>Mian Usman Khalid</strong>
                            </div>
                            <div className="infobox-row">
                                <div className="infobox-item">
                                    <div className="infobox-label">Role</div>
                                    <div className="infobox-value">Founder &amp; CEO, HisabDo</div>
                                </div>
                                <div className="infobox-item">
                                    <div className="infobox-label">Nationality</div>
                                    <div className="infobox-value">Pakistani</div>
                                </div>
                                <div className="infobox-item">
                                    <div className="infobox-label">Education</div>
                                    <div className="infobox-value">BS Computer Science<br />COMSATS University Islamabad</div>
                                </div>
                                <div className="infobox-item">
                                    <div className="infobox-label">Known For</div>
                                    <div className="infobox-value">HisabDo — Digital Ledger App</div>
                                </div>
                                <div className="infobox-item">
                                    <div className="infobox-label">Specialization</div>
                                    <div className="infobox-value">.NET, Azure, Blazor, Android, AI/SaaS</div>
                                </div>
                                <div className="infobox-item">
                                    <div className="infobox-label">Website</div>
                                    <div className="infobox-value"><a href="https://hisabdo.app" style={{ color: 'var(--green)' }}>hisabdo.app</a></div>
                                </div>
                            </div>
                        </div>

                        {/* TOC */}
                        <div className="wiki-toc">
                            <h4>Contents</h4>
                            <ol>
                                <li><a href="#biography">Biography</a></li>
                                <li><a href="#founder-story">Founder Story</a></li>
                                <li><a href="#education">Education</a></li>
                                <li><a href="#career-timeline">Career Timeline</a></li>
                                <li><a href="#hisabdo-journey">HisabDo Journey</a></li>
                                <li><a href="#skills">Skills</a></li>
                                <li><a href="#interviews">Mock Interview Program</a></li>
                                <li><a href="#awards">Awards</a></li>
                                <li><a href="#publications">Publications</a></li>
                                <li><a href="#social-profiles">Social Profiles</a></li>
                            </ol>
                        </div>

                    </div>{/* /wiki-sidebar */}

                </div>
            </div>

            {/* CTA */}
            <section className="hero" style={{ padding: '80px 24px' }}>
                <h2>Let&apos;s Build Something Impactful Together</h2>
                <p>Open for collaborations in technology, business &amp; social development.</p>
                <div className="hero-buttons">
                    <a className="btn" href="mailto:support@hisabdo.app"><i className="fas fa-envelope"></i> Contact Me</a>
                    <Link className="btn-outline" href="/leadership"><i className="fas fa-users"></i> Full Team</Link>
                </div>
            </section>

            <section className="section" style={{ paddingTop: '20px' }}>
                <div className="hero-buttons">
                    <Link className="btn-outline" href="/why-i-built-hisabdo">Read: Why I Built HisabDo</Link>
                </div>
            </section>

        </main>
    );
}