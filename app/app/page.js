import Link from 'next/link';
import Image from 'next/image';

export default function AboutAppPage() {
    return (
        <main id="main-content">

            <section className="hero">
                <div className="badge">📖 The Story Behind HisabDo</div>
                <h1>Why We Built HisabDo</h1>
                <p>Most shopkeepers still track udhar in a paper register. One torn page, one spilled cup of tea, and years of customer history is gone. Here&apos;s how HisabDo solves that — and what actually happens when you use it.</p>
                <div className="hero-buttons">
                    <a className="btn" href="https://play.google.com/store/apps/details?id=com.usman.hisabdo" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-google-play"></i> Download App
                    </a>
                    <Link className="btn-outline" href="/app">Explore App Details</Link>
                    <Link className="btn-outline" href="/contact">Get Support</Link>
                </div>
            </section>

            {/* THE PROBLEM */}
            <section className="section">
                <h2 className="fade-up">The Problem With Paper Khata</h2>
                <div className="section-divider fade-up"></div>
                <div className="grid fade-up">
                    <div className="card card-left"><div className="card-icon"><i className="fas fa-eraser"></i></div><h3>Entries Get Lost</h3><p>A torn page, a spilled drink, a misplaced register — years of customer history can disappear in seconds.</p></div>
                    <div className="card card-left"><div className="card-icon"><i className="fas fa-user-clock"></i></div><h3>No One Else Can Read It</h3><p>Handwritten registers are often understood only by the shop owner, which becomes a problem when someone else needs to check a balance.</p></div>
                    <div className="card card-left"><div className="card-icon"><i className="fas fa-calculator"></i></div><h3>Manual Totals Cause Errors</h3><p>Adding up dozens of entries by hand, every single day, leaves plenty of room for small mistakes that add up over time.</p></div>
                    <div className="card card-left"><div className="card-icon"><i className="fas fa-file-invoice-dollar"></i></div><h3>Nothing to Hand the Customer</h3><p>When a customer asks &quot;what do I owe you,&quot; there&apos;s no clean statement to give them — just a page they may not be able to read.</p></div>
                </div>
            </section>

            {/* WALKTHROUGH */}
            <section className="section" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%,rgba(34,197,94,.04) 0%,transparent 70%)' }}>
                <h2 className="fade-up">A Day With HisabDo</h2>
                <div className="section-divider fade-up"></div>
                <p className="section-sub fade-up">Here&apos;s what actually happens inside the app during a normal business day.</p>

                <div className="split fade-up">
                    <div className="split-text">
                        <div className="badge">Morning</div>
                        <h2>Open the App, See Where You Stand</h2>
                        <p>The dashboard shows your current receivables, payables and cash position the moment you open the app — no need to flip through pages or add anything up. If a customer&apos;s balance has been overdue for a while, it&apos;s visible right away.</p>
                    </div>
                    <div className="split-img">
                        <Image src="/assets/images/dashboard.webp" alt="HisabDo Dashboard" loading="lazy" decoding="async" width={702} height={1600} style={{ width: '100%', height: 'auto' }} />
                    </div>
                </div>

                <div className="split fade-up" style={{ marginTop: '56px' }}>
                    <div className="split-text">
                        <div className="badge">Throughout the Day</div>
                        <h2>Record as You Go — Even by Voice</h2>
                        <p>Each sale, payment, or expense is logged against the right customer as it happens. If your hands are full or you&apos;re mid-conversation with a customer, voice entry lets you record a transaction by speaking instead of typing.</p>
                    </div>
                    <div className="split-img">
                        <Image src="/assets/images/voice-entry.webp" alt="Voice Entry" loading="lazy" decoding="async" width={702} height={1600} style={{ width: '100%', height: 'auto' }} />
                    </div>
                </div>

                <div className="split fade-up" style={{ marginTop: '56px' }}>
                    <div className="split-text">
                        <div className="badge">When a Customer Asks</div>
                        <h2>Hand Them a Real Statement</h2>
                        <p>Instead of reading numbers off a register, generate a clean PDF statement showing exactly what&apos;s owed, what&apos;s been paid, and the running balance — something you can send over WhatsApp in seconds.</p>
                    </div>
                    <div className="split-img">
                        <Image src="/assets/images/customer.webp" alt="Customer Management" loading="lazy" decoding="async" width={590} height={1280} style={{ width: '100%', height: 'auto' }} />
                    </div>
                </div>

                <div className="split fade-up" style={{ marginTop: '56px' }}>
                    <div className="split-text">
                        <div className="badge">End of Month</div>
                        <h2>Understand the Bigger Picture</h2>
                        <p>Analytics show income trends, expense patterns and how much is tied up in unpaid dues — the kind of overview that&apos;s nearly impossible to get from a paper register no matter how carefully it&apos;s kept.</p>
                    </div>
                    <div className="split-img">
                        <Image src="/assets/images/analytics.webp" alt="Analytics" loading="lazy" decoding="async" width={702} height={1600} style={{ width: '100%', height: 'auto' }} />
                    </div>
                </div>

                <div className="split fade-up" style={{ marginTop: '56px' }}>
                    <div className="split-text">
                        <div className="badge">Peace of Mind</div>
                        <h2>Your Records Aren&apos;t Going Anywhere</h2>
                        <p>Core records are stored locally on your device, and optional signed-in features may support backup or sync when you choose to use them. This gives you flexibility whether you want to work offline or use extra convenience features when connected.</p>
                    </div>
                    <div className="split-img">
                        <Image src="/assets/images/ledger.webp" alt="Ledger" loading="lazy" decoding="async" width={738} height={1600} style={{ width: '100%', height: 'auto' }} />
                    </div>
                </div>
            </section>

            {/* HOW HISABDO COMPARES */}
            <section className="section">
                <h2 className="fade-up">Paper Khata vs. HisabDo</h2>
                <div className="section-divider fade-up"></div>
                <div className="grid fade-up">
                    <div className="card card-left"><h3>📓 Paper Register</h3><p>Can be lost, damaged or hard to read. Totals are calculated by hand. Only one person can realistically maintain it. No backup exists if it&apos;s misplaced.</p></div>
                    <div className="card card-left"><h3>📱 HisabDo</h3><p>Stored securely on your device with optional backup. Balances update automatically. Anyone in the business can be trained to use it in minutes. Statements can be shared instantly.</p></div>
                </div>
            </section>

            {/* WHO IT SERVES, IN DETAIL */}
            <section className="section">
                <h2 className="fade-up">Built Around Real Situations</h2>
                <div className="section-divider fade-up"></div>
                <div className="grid fade-up">
                    <div className="card card-left"><div className="card-icon"><i className="fas fa-store"></i></div><h3>The Corner Shop Owner</h3><p>Tracks dozens of regular customers who buy on credit throughout the month and settle up on payday.</p></div>
                    <div className="card card-left"><div className="card-icon"><i className="fas fa-laptop-code"></i></div><h3>The Freelancer</h3><p>Needs a simple way to see which clients still owe an invoice, without setting up complex accounting software.</p></div>
                    <div className="card card-left"><div className="card-icon"><i className="fas fa-warehouse"></i></div><h3>The Wholesaler</h3><p>Manages payables to suppliers alongside receivables from retail customers, all from one place.</p></div>
                    <div className="card card-left"><div className="card-icon"><i className="fas fa-home"></i></div><h3>The Home-Based Seller</h3><p>Runs a small business from home and wants a professional-looking record without hiring a bookkeeper.</p></div>
                </div>
            </section>

            {/* LANGUAGE & CURRENCY */}
            <section className="section" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%,rgba(34,197,94,.04) 0%,transparent 70%)' }}>
                <h2 className="fade-up">Works the Way You Do Business</h2>
                <div className="section-divider fade-up"></div>
                <div className="grid fade-up">
                    <div className="card card-left"><h3>🌍 In Your Language</h3><p>Switch between Urdu, English, Hindi, Arabic and Roman Urdu at any time — the app adapts, not the other way around.</p></div>
                    <div className="card card-left"><h3>💱 In Your Currency</h3><p>PKR, USD and INR are supported, so the app fits businesses operating in Pakistan, India and beyond.</p></div>
                </div>
            </section>

            {/* CTA */}
            <section className="hero" style={{ padding: '80px 24px' }}>
                <div className="badge">🚀 Available on Google Play</div>
                <h2>See It for Yourself</h2>
                <p>Download HisabDo today — free, offline and built around how small businesses actually work.</p>
                <div className="hero-buttons">
                    <a className="btn" href="https://play.google.com/store/apps/details?id=com.usman.hisabdo" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-google-play"></i> Download Now — Free
                    </a>
                    <Link className="btn-outline" href="/faq">Read the FAQ</Link>
                </div>
            </section>

        </main>
    );
}