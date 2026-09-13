import Link from 'next/link';
import JsonLd from './JsonLd';
import Breadcrumb from './Breadcrumb';
import FaqSection from './FaqSection';
import DownloadCTA from './DownloadCTA';
import { webPageSchema, softwareApplicationSchema, SITE } from '../lib/seo';
import { BLOG_POSTS } from '../lib/blogData';

const PLAY_URL = SITE.playStore;

// Map landing page slugs to relevant blog post slugs for internal linking
const PAGE_BLOG_MAP = {
  'expense-tracker-app': ['expense-tracking-for-small-business', 'how-to-track-daily-expenses', 'freelancer-expense-tracking'],
  'expense-management-app': ['expense-tracking-for-small-business', 'business-expense-categories', 'cash-flow-management'],
  'khata-book-app': ['how-to-manage-daily-khata', 'best-khata-app-in-pakistan', 'digital-khata-vs-paper-khata'],
  'digital-khata-book': ['digital-ledger-vs-paper-ledger', 'what-is-khata-book', 'khata-book-for-shopkeepers'],
  'customer-ledger-app': ['customer-credit-management', 'track-customer-dues', 'customer-ledger-management-guide'],
  'udhar-management-app': ['how-to-manage-udhar', 'udhar-tracking-for-small-business', 'track-customer-dues'],
  'shopkeeper-accounting-app': ['shopkeeper-accounting-guide', 'grocery-shop-accounting', 'retail-store-bookkeeping'],
  'small-business-accounting-app': ['small-business-financial-management', 'profit-and-loss-for-small-business', 'bookkeeping-basics'],
  'business-expense-tracker': ['business-expense-categories', 'expense-tracking-for-small-business', 'how-to-track-daily-expenses'],
  'receivable-payable-tracker': ['receivable-payable-explained', 'track-customer-dues', 'accounts-receivable-for-small-business'],
  'hisab-kitab-app': ['how-to-manage-daily-khata', 'best-khata-app-in-pakistan', 'urdu-accounting-app'],
  'business-ledger-app': ['customer-ledger-management-guide', 'bookkeeping-basics', 'small-business-financial-management'],
};

// Suitable users per page
const PAGE_USERS = {
  'expense-tracker-app': ['Shopkeepers', 'Freelancers', 'Small Business Owners', 'Retail Stores', 'Service Businesses'],
  'expense-management-app': ['Small Business Owners', 'Shopkeepers', 'Freelancers', 'Wholesale Businesses'],
  'khata-book-app': ['Shopkeepers', 'Kiryana Stores', 'Grocery Stores', 'Retail Shops', 'Small Businesses'],
  'digital-khata-book': ['Shopkeepers', 'Retail Stores', 'Grocery Shops', 'Small Businesses'],
  'customer-ledger-app': ['Shopkeepers', 'Wholesale Businesses', 'Service Providers', 'Retail Stores'],
  'udhar-management-app': ['Shopkeepers', 'Kiryana Stores', 'Grocery Stores', 'Small Businesses'],
  'shopkeeper-accounting-app': ['Retail Shopkeepers', 'Grocery Store Owners', 'Kiryana Store Owners', 'Small Shop Owners'],
  'small-business-accounting-app': ['Small Business Owners', 'Freelancers', 'Service Businesses', 'Retail Stores', 'Wholesale Businesses'],
  'business-expense-tracker': ['Small Business Owners', 'Shopkeepers', 'Freelancers', 'Service Businesses'],
  'receivable-payable-tracker': ['Shopkeepers', 'Wholesale Businesses', 'Service Providers', 'Small Businesses'],
  'hisab-kitab-app': ['Dukandaar', 'Kiryana Store Owners', 'Small Business Owners', 'Freelancers'],
  'business-ledger-app': ['Small Business Owners', 'Shopkeepers', 'Wholesale Businesses', 'Service Providers'],
};

// How it works steps per page
const PAGE_STEPS = {
  'expense-tracker-app': [
    { icon: 'fa-download', step: '1', title: 'Download Free', desc: 'Install HisabDo from Google Play — no account or internet required.' },
    { icon: 'fa-plus-circle', step: '2', title: 'Add Expenses', desc: 'Record each expense with category, amount and notes instantly.' },
    { icon: 'fa-chart-bar', step: '3', title: 'View Analytics', desc: 'See spending patterns and category breakdowns at a glance.' },
    { icon: 'fa-file-pdf', step: '4', title: 'Export Reports', desc: 'Generate PDF expense reports for any period and share them.' },
  ],
  'khata-book-app': [
    { icon: 'fa-download', step: '1', title: 'Download Free', desc: 'Install HisabDo from Google Play — works offline from the start.' },
    { icon: 'fa-user-plus', step: '2', title: 'Add Customers', desc: 'Create a profile for each customer with their contact details.' },
    { icon: 'fa-money-bill-wave', step: '3', title: 'Record Transactions', desc: 'Log udhar given and payments received for each customer.' },
    { icon: 'fa-share-alt', step: '4', title: 'Share Statements', desc: 'Send PDF khata statements to customers via WhatsApp or print.' },
  ],
  default: [
    { icon: 'fa-download', step: '1', title: 'Download Free', desc: 'Install HisabDo from Google Play — no subscription required.' },
    { icon: 'fa-cog', step: '2', title: 'Set Up Your Account', desc: 'Add your business details, customers and categories in minutes.' },
    { icon: 'fa-pencil-alt', step: '3', title: 'Record Transactions', desc: 'Log every transaction as it happens — income, expenses and dues.' },
    { icon: 'fa-file-pdf', step: '4', title: 'Generate Reports', desc: 'Export professional PDF reports and share them anytime.' },
  ],
};

function getSteps(slug) {
  return PAGE_STEPS[slug] || PAGE_STEPS.default;
}

function getRelatedBlogPosts(slug) {
  const slugs = PAGE_BLOG_MAP[slug] || [];
  return slugs.map((s) => BLOG_POSTS.find((p) => p.slug === s)).filter(Boolean);
}

export default function LandingPageTemplate({ page }) {
  const { slug, h1, description, features, faqs, related } = page;
  const users = PAGE_USERS[slug] || [];
  const steps = getSteps(slug);
  const relatedPosts = getRelatedBlogPosts(slug);

  return (
    <main id="main-content">
      <JsonLd data={[webPageSchema({ title: h1, description, url: `/${slug}` }), softwareApplicationSchema()]} />

      {/* HERO */}
      <section className="hero">
        <Breadcrumb items={[{ name: 'Home', path: '/' }, { name: h1, path: `/${slug}` }]} />
        <div className="badge">📱 Free Android App</div>
        <h1>{h1}</h1>
        <p>{description}</p>
        <div className="hero-buttons">
          <a className="btn" href={PLAY_URL} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-google-play" /> Download Free
          </a>
          <Link className="btn-outline" href="/about-app">Learn More</Link>
        </div>
      </section>

      {/* FEATURES */}
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

      {/* SUITABLE USERS */}
      {users.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <h2>Who Is This For?</h2>
          <div className="section-divider" />
          <div className="tag-grid">
            {users.map((u) => <span className="tag" key={u}>{u}</span>)}
          </div>
        </section>
      )}

      {/* HOW IT WORKS */}
      <section className="section" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%,rgba(34,197,94,.04) 0%,transparent 70%)' }}>
        <h2>How It Works</h2>
        <div className="section-divider" />
        <div className="hiw">
          {steps.map((s) => (
            <div className="hiw-step" key={s.title}>
              <div className="hiw-num"><i className={`fas ${s.icon}`} /></div>
              <h3><span className="grad-text">{s.step}.</span> {s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <FaqSection faqs={faqs} />

      {/* RELATED BLOG POSTS */}
      {relatedPosts.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <h2>Related Guides</h2>
          <div className="section-divider" />
          <div className="grid grid-3">
            {relatedPosts.map((post) => (
              <div className="card card-left" key={post.slug}>
                <div className="blog-meta">{post.category}</div>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <br />
                <Link className="btn-outline btn-sm" href={`/blog/${post.slug}`}>Read Article →</Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* RELATED LANDING PAGES */}
      {related?.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <h2>Related Tools</h2>
          <div className="section-divider" />
          <div className="tag-grid">
            {related.map((r) => (
              <Link href={r.href} className="tag" key={r.href}>{r.label} →</Link>
            ))}
          </div>
        </section>
      )}

      <DownloadCTA />
    </main>
  );
}
