import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import JsonLd from '../../../components/JsonLd';
import Breadcrumb from '../../../components/Breadcrumb';
import FaqSection from '../../../components/FaqSection';
import DownloadCTA from '../../../components/DownloadCTA';
import { buildMetadata, articleSchema, SITE, AUTHOR } from '../../../lib/seo';
import { BLOG_POSTS, getPostBySlug, getRelatedPosts } from '../../../lib/blogData';

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    keywords: post.keywords,
    ogImage: SITE.ogImage,
  });
}

const POST_CONTENT = {
  sections: [
    { id: 'overview', heading: 'Overview' },
    { id: 'why-it-matters', heading: 'Why It Matters' },
    { id: 'how-hisabdo-helps', heading: 'How HisabDo Helps' },
    { id: 'getting-started', heading: 'Getting Started' },
    { id: 'best-practices', heading: 'Best Practices' },
  ],
  faqs: (post) => [
    {
      q: `What is the best app for ${post.keywords[0]}?`,
      a: `HisabDo is one of the top-rated free Android apps for ${post.keywords[0]}. It works offline, supports Urdu and English, and includes PDF export.`,
    },
    {
      q: 'Does HisabDo work without internet?',
      a: 'Yes. HisabDo is built offline-first — all core features work without any internet connection.',
    },
    {
      q: 'Is HisabDo free to download?',
      a: 'Yes. HisabDo is completely free on Google Play with no subscription or hidden charges.',
    },
    {
      q: 'Can I export reports from HisabDo?',
      a: 'Yes. You can generate and share professional PDF reports for any period directly from the app.',
    },
  ],
};

const CATEGORY_LINKS = {
  'Expense Tracking': [
    { label: 'Expense Tracker App', href: '/expense-tracker-app' },
    { label: 'Business Expense Tracker', href: '/business-expense-tracker' },
    { label: 'Expense Management App', href: '/expense-management-app' },
  ],
  'Khata Book': [
    { label: 'Khata Book App', href: '/khata-book-app' },
    { label: 'Digital Khata Book', href: '/digital-khata-book' },
    { label: 'Shopkeeper Accounting App', href: '/shopkeeper-accounting-app' },
  ],
  'Customer Ledger': [
    { label: 'Customer Ledger App', href: '/customer-ledger-app' },
    { label: 'Udhar Management App', href: '/udhar-management-app' },
    { label: 'Receivable & Payable Tracker', href: '/receivable-payable-tracker' },
  ],
  'Udhar Management': [
    { label: 'Udhar Management App', href: '/udhar-management-app' },
    { label: 'Customer Ledger App', href: '/customer-ledger-app' },
    { label: 'Khata Book App', href: '/khata-book-app' },
  ],
  'Shopkeeper Accounting': [
    { label: 'Shopkeeper Accounting App', href: '/shopkeeper-accounting-app' },
    { label: 'Khata Book App', href: '/khata-book-app' },
    { label: 'Small Business Accounting App', href: '/small-business-accounting-app' },
  ],
  'Shopkeeper Accounting': [
    { label: 'Shopkeeper Accounting App', href: '/shopkeeper-accounting-app' },
    { label: 'Khata Book App', href: '/khata-book-app' },
    { label: 'Small Business Accounting App', href: '/small-business-accounting-app' },
  ],
  'Small Business Accounting': [
    { label: 'Small Business Accounting App', href: '/small-business-accounting-app' },
    { label: 'Business Expense Tracker', href: '/business-expense-tracker' },
    { label: 'Receivable & Payable Tracker', href: '/receivable-payable-tracker' },
  ],
  'Hisaab Kitab': [
    { label: 'Hisab Kitab App', href: '/hisab-kitab-app' },
    { label: 'Khata Book App', href: '/khata-book-app' },
    { label: 'Udhar Management App', href: '/udhar-management-app' },
  ],
};

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);
  const faqs = POST_CONTENT.faqs(post);
  const url = `${SITE.url}/blog/${slug}`;
  const ctxLinks = CATEGORY_LINKS[post.category] || [];

  const schemas = [
    articleSchema({
      title: post.title,
      description: post.description,
      url,
      image: SITE.ogImage,
      datePublished: post.date,
      dateModified: post.date,
    }),
  ];

  return (
    <main id="main-content">
      <JsonLd data={schemas} />

      <article>
        <section className="hero" style={{ paddingBottom: '48px' }}>
          <Breadcrumb
            items={[
              { name: 'Home', path: '/' },
              { name: 'Blog', path: '/blog' },
              { name: post.title, path: `/blog/${slug}` },
            ]}
          />
          <div className="badge">📝 {post.category}</div>
          <h1>{post.title}</h1>
          <p>{post.description}</p>
          <div className="blog-meta" style={{ marginTop: '16px', opacity: 0.7 }}>
            By{' '}
            <Link href="/authors/mian-usman-khalid" style={{ textDecoration: 'underline' }}>
              {AUTHOR.name}
            </Link>{' '}
            &bull; {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </section>

        {/* Table of Contents */}
        <section className="section" style={{ paddingTop: 0, paddingBottom: '32px' }}>
          <div className="card card-left" style={{ maxWidth: '480px' }}>
            <h2 style={{ fontSize: '16px', marginBottom: '12px' }}>Table of Contents</h2>
            <ol style={{ paddingLeft: '20px', lineHeight: '2' }}>
              {POST_CONTENT.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} style={{ textDecoration: 'underline', opacity: 0.85 }}>
                    {s.heading}
                  </a>
                </li>
              ))}
              <li>
                <a href="#faq" style={{ textDecoration: 'underline', opacity: 0.85 }}>
                  Frequently Asked Questions
                </a>
              </li>
            </ol>
          </div>
        </section>

        {/* Article Body */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>

            <h2 id="overview">Overview</h2>
            <p>
              {post.description} HisabDo is a free offline Android app designed specifically for shopkeepers,
              freelancers and small business owners who need a reliable way to manage their finances without
              depending on an internet connection.
            </p>

            <h2 id="why-it-matters">Why It Matters</h2>
            <p>
              For millions of small businesses across Pakistan, India and South Asia, managing finances
              accurately is the difference between growth and loss. Traditional paper registers are error-prone,
              easily lost and impossible to search. A digital solution like HisabDo solves these problems
              while remaining accessible to everyone — even without a data connection.
            </p>
            <p>
              Whether you are tracking daily expenses, managing customer credit (udhar), recording supplier
              payments or generating financial reports, having the right tool makes every task faster and
              more accurate.
            </p>

            <h2 id="how-hisabdo-helps">How HisabDo Helps</h2>
            <p>
              HisabDo brings together all the financial management tools a small business needs in one
              offline-first Android app:
            </p>
            <ul style={{ paddingLeft: '24px', lineHeight: '2' }}>
              <li>Record income and expenses with categories and notes</li>
              <li>Manage individual customer ledgers with full transaction history</li>
              <li>Track receivables (what customers owe you) and payables (what you owe suppliers)</li>
              <li>Generate and share professional PDF reports</li>
              <li>Use voice entry for faster transaction recording</li>
              <li>Support for Urdu, English, Hindi, Arabic and Roman Urdu</li>
              <li>Multi-currency: PKR, USD and INR</li>
            </ul>

            <h2 id="getting-started">Getting Started</h2>
            <p>
              Getting started with HisabDo takes less than two minutes. Download the app free from Google
              Play, create your first customer or expense category, and start recording transactions
              immediately — no account or internet required.
            </p>
            <div style={{ margin: '24px 0' }}>
              <a
                className="btn"
                href={SITE.playStore}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-google-play" /> Download HisabDo Free
              </a>
            </div>

            <h2 id="best-practices">Best Practices</h2>
            <p>
              To get the most out of HisabDo, record every transaction as it happens rather than at the
              end of the day. Use categories consistently so your reports are meaningful. Export PDF
              statements for customers regularly to maintain transparency and reduce disputes. Enable
              backup to protect your records.
            </p>

            {/* Contextual internal links */}
            {ctxLinks.length > 0 && (
              <div style={{ margin: '32px 0', padding: '20px', border: '1px solid rgba(34,197,94,.2)', borderRadius: '12px' }}>
                <p style={{ fontWeight: 600, marginBottom: '12px' }}>Related HisabDo Features:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {ctxLinks.map((l) => (
                    <Link key={l.href} href={l.href} className="btn-outline btn-sm">
                      {l.label} →
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </article>

      {/* FAQ with schema */}
      <div id="faq">
        <FaqSection faqs={faqs} />
      </div>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <h2>Related Articles</h2>
          <div className="section-divider" />
          <div className="grid grid-3">
            {related.map((r) => (
              <div className="card card-left" key={r.slug}>
                <div className="blog-meta">{r.category}</div>
                <h3>{r.title}</h3>
                <p>{r.description}</p>
                <br />
                <Link className="btn-outline btn-sm" href={`/blog/${r.slug}`}>
                  Read Article →
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      <DownloadCTA />
    </main>
  );
}
