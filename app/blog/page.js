import Link from 'next/link';
import { buildMetadata } from '../../lib/seo';
import { BLOG_POSTS, BLOG_CATEGORIES } from '../../lib/blogData';

export const metadata = buildMetadata({
  title: 'Blog — Expense Tracking, Khata Book & Small Business Finance',
  description:
    'Practical guides on expense tracking, khata book management, customer ledger, udhar management and small business accounting — by Mian Usman Khalid.',
  path: '/blog',
  keywords: ['expense tracking blog', 'khata book guide', 'small business finance tips', 'udhar management guide'],
});

// Group posts by category, only published posts (date <= today)
function groupByCategory(posts) {
  const map = {};
  for (const cat of BLOG_CATEGORIES) map[cat] = [];
  for (const post of posts) {
    if (map[post.category]) map[post.category].push(post);
  }
  return map;
}

const RECENT = BLOG_POSTS.slice(0, 6);
const BY_CATEGORY = groupByCategory(BLOG_POSTS);

export default function BlogPage() {
  return (
    <main id="main-content">
      <section className="hero">
        <div className="badge">✍ Insights &amp; Articles</div>
        <h1>HisabDo Blog</h1>
        <p>Practical guides on khata book, udhar management, expense tracking, customer ledger and small business accounting — by Mian Usman Khalid.</p>
      </section>

      {/* PILLAR ARTICLE */}
      <section className="section">
        <h2 className="fade-up">Start Here</h2>
        <div className="section-divider fade-up" />
        <div className="fade-up" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div className="card card-left" style={{ borderColor: 'rgba(34,197,94,.35)' }}>
            <div className="blog-meta">📊 Pillar Guide &nbsp;•&nbsp; Small Business Accounting</div>
            <h3 style={{ fontSize: '20px' }}>The Complete Small Business Financial Management Guide</h3>
            <p>Everything a small business owner needs to know — income tracking, expense management, receivables, payables, cash flow, bookkeeping and more.</p>
            <br />
            <Link className="btn" href="/blog/small-business-financial-management">Read the Complete Guide</Link>
          </div>
        </div>
      </section>

      {/* RECENT ARTICLES */}
      <section className="section" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%,rgba(34,197,94,.04) 0%,transparent 70%)' }}>
        <h2 className="fade-up">Recent Articles</h2>
        <div className="section-divider fade-up" />
        <div className="grid fade-up" style={{ maxWidth: '1150px', margin: '0 auto' }}>
          {RECENT.map((post) => (
            <div className="card card-left" key={post.slug}>
              <div className="blog-meta">{post.category}</div>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <br />
              <Link className="btn" href={`/blog/${post.slug}`}>Read Article</Link>
            </div>
          ))}
        </div>
      </section>

      {/* BY CATEGORY */}
      {BLOG_CATEGORIES.map((cat) => {
        const posts = BY_CATEGORY[cat];
        if (!posts || posts.length === 0) return null;
        return (
          <section key={cat} className="section" style={{ paddingTop: 0 }}>
            <h2 className="fade-up">{cat}</h2>
            <div className="section-divider fade-up" />
            <div className="grid fade-up" style={{ maxWidth: '1150px', margin: '0 auto' }}>
              {posts.map((post) => (
                <div className="card card-left" key={post.slug}>
                  <div className="blog-meta">Guide &nbsp;•&nbsp; HisabDo</div>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <br />
                  <Link className="btn-outline btn-sm" href={`/blog/${post.slug}`}>Read Article →</Link>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      {/* EXTERNAL PUBLICATIONS */}
      <section className="section" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%,rgba(34,197,94,.04) 0%,transparent 70%)' }}>
        <h2 className="fade-up">External Publications</h2>
        <div className="section-divider fade-up" />
        <div className="grid fade-up" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="card card-left">
            <div className="blog-meta">Product Launch &nbsp;•&nbsp; StartupBase</div>
            <div className="card-icon"><i className="fas fa-rocket" /></div>
            <h3>HisabDo on StartupBase</h3>
            <p>HisabDo is officially listed and featured on StartupBase — a platform for discovering and launching new products.</p>
            <br />
            <a className="btn" href="https://startupbase.io/products/hisabdo" target="_blank" rel="noopener noreferrer"><i className="fas fa-external-link-alt" /> View on StartupBase</a>
          </div>
          <div className="card card-left">
            <div className="blog-meta">Press Release &nbsp;•&nbsp; FreePressRelease</div>
            <div className="card-icon"><i className="fas fa-newspaper" /></div>
            <h3>HisabDo Introduces a Smarter Digital Accounting Solution</h3>
            <p>How HisabDo is helping small businesses manage finances efficiently with an offline-first digital ledger system.</p>
            <br />
            <a className="btn" href="https://freepressrelease.io/press/hisabdo-introduces-a-smarter-digital-accounting-solution-to-help-small-businesses-manage-finances-efficiently" target="_blank" rel="noopener noreferrer"><i className="fas fa-external-link-alt" /> Read Article</a>
          </div>
          <div className="card card-left">
            <div className="blog-meta">Article &nbsp;•&nbsp; Medium</div>
            <div className="card-icon"><i className="fab fa-medium" /></div>
            <h3>How HisabDo is Helping Pakistani Small Businesses Embrace Digital Accounting</h3>
            <p>A deep dive into how HisabDo is transforming the way small businesses in Pakistan manage their finances.</p>
            <br />
            <a className="btn" href="https://medium.com/@usmankhalid17248/how-hisabdo-is-helping-pakistani-small-businesses-embrace-digital-accounting-431699297311" target="_blank" rel="noopener noreferrer"><i className="fas fa-external-link-alt" /> Read on Medium</a>
          </div>
        </div>
      </section>

      <section className="hero" style={{ padding: '80px 24px' }}>
        <div className="badge">🚀 Stay Updated</div>
        <h2>Want to Follow More Updates?</h2>
        <p>Follow Mian Usman Khalid on social media for the latest articles, insights and HisabDo news.</p>
        <div className="hero-buttons">
          <Link className="btn" href="/founder">View Founder Profile</Link>
          <Link className="btn-outline" href="/contact">Get in Touch</Link>
        </div>
      </section>
    </main>
  );
}
