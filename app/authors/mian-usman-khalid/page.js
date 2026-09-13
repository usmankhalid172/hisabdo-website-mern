import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '../../../components/JsonLd';
import Breadcrumb from '../../../components/Breadcrumb';
import { buildMetadata, authorSchema, AUTHOR, SITE } from '../../../lib/seo';
import { BLOG_POSTS } from '../../../lib/blogData';

export const metadata = buildMetadata({
  title: 'Mian Usman Khalid — Founder & Author',
  description:
    'Mian Usman Khalid is the Founder & CEO of HisabDo and XICTEK Systems. Software engineer, entrepreneur and author writing about expense tracking, khata book and small business finance.',
  path: '/authors/mian-usman-khalid',
  keywords: ['mian usman khalid', 'hisabdo founder', 'xictek systems'],
  ogImage: AUTHOR.image,
});

const RECENT_POSTS = BLOG_POSTS.slice(0, 6);

export default function AuthorPage() {
  return (
    <main id="main-content">
      <JsonLd data={authorSchema()} />

      <section className="hero" style={{ paddingBottom: '48px' }}>
        <Breadcrumb
          items={[
            { name: 'Home', path: '/' },
            { name: 'Authors', path: '/blog' },
            { name: 'Mian Usman Khalid', path: '/authors/mian-usman-khalid' },
          ]}
        />
        <div className="badge">✍ Author Profile</div>
        <h1>Mian Usman Khalid</h1>
        <p>Founder & CEO of HisabDo · Software Engineer · Entrepreneur</p>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="split" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="split-img">
            <Image
              src="/assets/images/founder.webp"
              alt="Mian Usman Khalid"
              width={768}
              height={1024}
              style={{ width: '100%', borderRadius: '22px', objectFit: 'cover', aspectRatio: '3/4', height: 'auto' }}
            />
          </div>
          <div className="split-text">
            <div className="badge">👤 Founder & CEO</div>
            <h2>About the Author</h2>
            <p>
              Mian Usman Khalid is the Founder & CEO of HisabDo and XICTEK Systems. He built HisabDo
              to help shopkeepers, freelancers and small businesses across Pakistan and South Asia manage
              their finances digitally — offline, in their own language.
            </p>
            <p>
              He writes about expense tracking, khata book management, customer ledger systems and
              small business accounting — practical guides for real business owners.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
              {AUTHOR.sameAs.map((url) => {
                const label = url.includes('linkedin') ? 'LinkedIn'
                  : url.includes('github') ? 'GitHub'
                  : url.includes('medium') ? 'Medium'
                  : 'Profile';
                return (
                  <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="btn-outline btn-sm">
                    {label} →
                  </a>
                );
              })}
              <Link href="/founder" className="btn-outline btn-sm">Full Profile →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <h2>Articles by Mian Usman Khalid</h2>
        <div className="section-divider" />
        <div className="grid grid-3">
          {RECENT_POSTS.map((post) => (
            <div className="card card-left" key={post.slug}>
              <div className="blog-meta">{post.category}</div>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <br />
              <Link className="btn-outline btn-sm" href={`/blog/${post.slug}`}>
                Read Article →
              </Link>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <Link className="btn-outline" href="/blog">View All Articles</Link>
        </div>
      </section>
    </main>
  );
}
