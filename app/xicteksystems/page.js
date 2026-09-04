import Link from 'next/link';

export const metadata = {
  title: 'XICTEK Systems | Software Company',
  description: 'XICTEK Systems builds modern software, cloud, AI and SaaS solutions with HisabDo as its flagship product.',
};

const services = [
  { icon: 'fas fa-laptop-code', title: 'Custom Software Development', description: 'Business-focused software products designed to simplify workflows, reduce friction, and scale operations.' },
  { icon: 'fas fa-code', title: 'Web Development', description: 'Modern, responsive web platforms built for speed, usability, and digital growth.' },
  { icon: 'fas fa-mobile-alt', title: 'Mobile App Development', description: 'User-centered mobile apps that prioritize performance, reliability, and everyday utility.' },
  { icon: 'fas fa-cloud', title: 'Cloud & Azure Solutions', description: 'Scalable cloud deployments and architecture planning for secure digital transformation.' },
  { icon: 'fas fa-robot', title: 'AI & Automation Solutions', description: 'Automation-first systems that help organizations reduce repetitive work and improve decision-making.' },
  { icon: 'fas fa-cubes', title: 'SaaS Product Development', description: 'End-to-end product strategy and engineering for software businesses and digital services.' },
  { icon: 'fas fa-chart-line', title: 'IT Consulting', description: 'Technical guidance for digital roadmaps, product decisions, and long-term business enablement.' },
];

const technologies = ['.NET', 'ASP.NET Core', 'Azure', 'React', 'Next.js', 'Angular', 'Flutter', 'SQL Server', 'Cosmos DB', 'AI Technologies'];

const trustPoints = [
  'Experienced Team',
  'Modern Technologies',
  'Scalable Solutions',
  'Security Focused',
  'Customer-Centric Approach',
  'Long-Term Partnership',
];

const stats = [
  { value: '5+', label: 'Core technology areas' },
  { value: '100%', label: 'Product-focused approach' },
  { value: '24/7', label: 'Business continuity mindset' },
  { value: '1', label: 'Flagship product: HisabDo' },
];

export default function XictakSystemsPage() {
  return (
    <main id="main-content">
      <section className="hero" style={{ paddingBottom: '48px', background: 'radial-gradient(circle at top, rgba(34,197,94,0.12), transparent 40%)' }}>
        <img src="/assets/images/xicteksystems-logo.png" className="hero-logo" alt="XICTEK Systems official logo" width={120} height={120} style={{ width: '120px', height: '120px', borderRadius: '28px' }} />
        <div className="badge">Technology Company • Product Studio</div>
        <h1>XICTEK Systems</h1>
        <p style={{ maxWidth: '760px' }}>We build practical digital solutions that help businesses grow with confidence — from software products and cloud platforms to AI-powered automation and enterprise-grade business tools.</p>
        <div className="hero-buttons">
          <Link className="btn" href="/about">Explore HisabDo</Link>
          <Link className="btn-outline" href="/contact">Book a Consultation</Link>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '12px' }}>
        <div className="stats fade-up" style={{ maxWidth: '1000px' }}>
          {stats.map((item) => (
            <div className="stat-item" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="split fade-up">
          <div className="split-text">
            <div className="badge">Company Overview</div>
            <h2>Building technology that solves real business problems</h2>
            <p>XICTEK Systems is a modern technology company focused on building products and digital experiences that are useful, scalable, and designed for real-world business challenges. We combine engineering discipline, product thinking, and a strong understanding of customer needs.</p>
            <p>Our work spans software product development, web and mobile systems, cloud architecture, automation, and practical business tooling. Our flagship product, HisabDo, reflects this approach by helping businesses manage khata, ledger records, expenses, customer balances, and reporting in a clear and accessible way.</p>
            <ul className="split-list">
              <li>Solutions designed for growth-focused businesses</li>
              <li>Modern technology stack for scalable delivery</li>
              <li>Customer-first design with clarity and usability</li>
              <li>Strong focus on trust, security, and reliability</li>
            </ul>
          </div>
          <div className="split-img">
            <img src="/assets/images/dashboard.webp" alt="XICTEK Systems product engineering" loading="lazy" decoding="async" width="702" height="1600" style={{ borderRadius: '20px', boxShadow: '0 25px 60px rgba(34,197,94,0.14)' }} />
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(34,197,94,.04) 0%, transparent 70%)' }}>
        <h2 className="fade-up">Mission & Vision</h2>
        <div className="section-divider fade-up"></div>
        <div className="grid fade-up">
          <div className="card card-left">
            <div className="card-icon"><i className="fas fa-bullseye"></i></div>
            <h3>Mission</h3>
            <p>To build practical, dependable digital products that help individuals and businesses work smarter, remain organized, and achieve measurable value.</p>
          </div>
          <div className="card card-left">
            <div className="card-icon"><i className="fas fa-eye"></i></div>
            <h3>Vision</h3>
            <p>To become a trusted technology partner for entrepreneurs and enterprises seeking modern, scalable, and user-friendly software solutions.</p>
          </div>
          <div className="card card-left">
            <div className="card-icon"><i className="fas fa-industry"></i></div>
            <h3>Industries We Serve</h3>
            <p>Retail, services, fintech, business operations, education, and small business environments where practical tools matter.</p>
          </div>
          <div className="card card-left">
            <div className="card-icon"><i className="fas fa-tools"></i></div>
            <h3>Technology We Use</h3>
            <p>Modern frameworks and cloud-native platforms that support performance, extensibility, and secure product delivery.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="fade-up">Our Services</h2>
        <div className="section-divider fade-up"></div>
        <div className="grid fade-up">
          {services.map((service) => (
            <div className="card card-left" key={service.title}>
              <div className="card-icon"><i className={service.icon}></i></div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ background: 'rgba(34,197,94,.02)' }}>
        <h2 className="fade-up">Technology Stack</h2>
        <div className="section-divider fade-up"></div>
        <div className="tag-grid fade-up" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {technologies.map((tech) => (
            <span className="tag" key={tech}>{tech}</span>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="fade-up">Flagship Product</h2>
        <div className="section-divider fade-up"></div>
        <div className="split fade-up" style={{ background: 'rgba(34,197,94,.02)', border: '1px solid rgba(34,197,94,.14)', borderRadius: '22px', padding: '28px', maxWidth: '1100px' }}>
          <div className="split-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/assets/images/app-logo.webp" alt="HisabDo product logo" width={220} height={220} style={{ width: '220px', height: '220px', borderRadius: '24px', objectFit: 'cover' }} />
          </div>
          <div className="split-text">
            <div className="badge">Flagship Product of XICTEK Systems</div>
            <h2>HisabDo</h2>
            <p>HisabDo is an offline-first digital ledger and khata management solution built for modern financial tracking. It helps shopkeepers, freelancers, and small businesses manage transactions, customer balances, expenses, and reporting in one place.</p>
            <ul className="split-list">
              <li>Offline-first access for low-connectivity environments</li>
              <li>Simple customer and ledger management</li>
              <li>Detailed expense and transaction tracking</li>
              <li>Professional PDF reporting and financial summaries</li>
            </ul>
            <div className="hero-buttons" style={{ justifyContent: 'flex-start' }}>
              <Link className="btn" href="/about">Learn More</Link>
              <a className="btn-outline" href="https://play.google.com/store/apps/details?id=com.usman.hisabdo" target="_blank" rel="noopener noreferrer">Download App</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(34,197,94,.04) 0%, transparent 70%)' }}>
        <h2 className="fade-up">Why Choose XICTEK Systems</h2>
        <div className="section-divider fade-up"></div>
        <div className="grid fade-up">
          {trustPoints.map((point) => (
            <div className="card" key={point}>
              <div className="card-icon"><i className="fas fa-check-circle"></i></div>
              <h3>{point}</h3>
              <p>We deliver practical, reliable technology experiences built around trust, usability, and long-term value.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="fade-up">Leadership Team</h2>
        <div className="section-divider fade-up"></div>
        <div className="split fade-up" style={{ maxWidth: '1000px', background: 'rgba(34,197,94,.02)', border: '1px solid rgba(34,197,94,.14)', borderRadius: '22px', padding: '28px' }}>
          <div className="split-img">
            <img src="/assets/images/founder.webp" alt="Mian Usman Khalid, Founder and CEO of XICTEK Systems" loading="lazy" decoding="async" width="768" height="768" style={{ width: '100%', borderRadius: '18px', objectFit: 'cover', maxHeight: '500px' }} />
          </div>
          <div className="split-text">
            <div className="badge">Founder & CEO</div>
            <h2>Mian Usman Khalid</h2>
            <p>As the founder and CEO of XICTEK Systems, Mian Usman Khalid leads the company’s vision for practical technology, product innovation, and business-focused software delivery.</p>
            <p>He brings together software engineering expertise, entrepreneurship, and a clear product mindset to guide the growth of XICTEK Systems and the development of its flagship solution, HisabDo.</p>
            <div className="hero-buttons" style={{ justifyContent: 'flex-start' }}>
              <Link className="btn" href="/founder">View Full Profile</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="fade-up">Contact XICTEK Systems</h2>
        <div className="section-divider fade-up"></div>
        <div className="grid fade-up">
          <div className="card card-left">
            <div className="card-icon"><i className="fas fa-envelope"></i></div>
            <h3>Business Inquiries</h3>
            <p>Discuss new product ideas, custom software needs, or consulting opportunities with our team.</p>
            <a href="mailto:support@hisabdo.app" style={{ color: 'var(--green)', textDecoration: 'none', fontWeight: 600 }}>support@hisabdo.app</a>
          </div>
          <div className="card card-left">
            <div className="card-icon"><i className="fas fa-handshake"></i></div>
            <h3>Partnerships</h3>
            <p>Connect with us for collaborations, strategic partnerships, and business opportunities.</p>
            <Link href="/contact" style={{ color: 'var(--green)', textDecoration: 'none', fontWeight: 600 }}>Contact Us</Link>
          </div>
          <div className="card card-left">
            <div className="card-icon"><i className="fas fa-briefcase"></i></div>
            <h3>Careers</h3>
            <p>Explore opportunities to contribute to product engineering, growth, and product innovation.</p>
            <Link href="/careers" style={{ color: 'var(--green)', textDecoration: 'none', fontWeight: 600 }}>View Careers</Link>
          </div>
          <div className="card card-left">
            <div className="card-icon"><i className="fas fa-headset"></i></div>
            <h3>Support</h3>
            <p>Need help with HisabDo or a digital product inquiry? Our support team is ready to assist.</p>
            <Link href="/faq" style={{ color: 'var(--green)', textDecoration: 'none', fontWeight: 600 }}>Read FAQs</Link>
          </div>
        </div>
      </section>

      <section className="hero" style={{ padding: '80px 24px' }}>
        <div className="badge">Build with Confidence</div>
        <h2>Technology that helps businesses move forward.</h2>
        <p>From product strategy to engineering execution, XICTEK Systems creates digital systems designed for measurable business value.</p>
        <div className="hero-buttons">
          <Link className="btn" href="/contact">Talk to Our Team</Link>
          <Link className="btn-outline" href="/blog">Explore Insights</Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'XICTEK Systems',
            url: 'https://hisabdo.app',
            logo: 'https://hisabdo.app/assets/images/xicteksystems-logo.png',
            description: 'XICTEK Systems builds practical digital products, SaaS solutions, cloud systems, and business software with HisabDo as its flagship product.',
            founder: {
              '@type': 'Person',
              name: 'Mian Usman Khalid',
              jobTitle: 'Founder & CEO',
              url: 'https://hisabdo.app/founder'
            },
            sameAs: [
              'https://hisabdo.app',
              'https://www.linkedin.com/company/hisabdo-expense-management-app/'
            ],
            makesOffer: {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'SoftwareApplication',
                name: 'HisabDo',
                applicationCategory: 'BusinessApplication',
                operatingSystem: 'Android',
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'USD',
                  availability: 'https://schema.org/InStock'
                }
              }
            }
          })
        }}
      />
    </main>
  );
}
