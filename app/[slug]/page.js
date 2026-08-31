import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

/**
 * Serves legacy content pages from the static HTML files:
 *   /blog/<slug>            -> blog/<slug>.html
 *   /<legacy-slug>          -> <legacy-slug>.html (about-app, terms, …)
 * Extracts the <main>…</main> block so it renders inside the shared
 * SiteShell (React navbar/footer), keeping one consistent design.
 */

const LEGACY_SLUGS = [
  "about-app",
  "about-founder",
  "about",
  "app",
  "blog-small-business-khata",
  "disclaimer",
  "terms",
  "mian-usman-khalid",
  "mian-ahsan-khalid",
  "mian-khalid-aziz",
  "mian-sharjeel-khalid",
  "offline-financial-apps",
  "paper-ledger-vs-digital-ledger",
  "why-i-built-hisabdo",
];

function resolveFile(slug) {
  const root = process.cwd();
  const candidates = [
    path.join(root, "blog", `${slug}.html`),
    path.join(root, `${slug}.html`),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return fs.readFileSync(c, "utf8");
  }
  return null;
}

function extractMain(html) {
  const m = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (!m) return null;
  return (
    m[1]
      // drop legacy placeholder shells (our SiteShell provides these)
      .replace(/<div id="site-nav"><\/div>/gi, "")
      .replace(/<div id="site-footer"><\/div>/gi, "")
      .replace(/<script[\s\S]*?<\/script>/gi, "")
  );
}

function extractTitle(html) {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  return m ? m[1].replace(/\s*\|\s*HisabDo.*$/i, "").trim() : "HisabDo";
}

export function generateStaticParams() {
  const root = process.cwd();
  const params = LEGACY_SLUGS.map((slug) => ({ slug }));
  const blogDir = path.join(root, "blog");
  if (fs.existsSync(blogDir)) {
    for (const f of fs.readdirSync(blogDir)) {
      if (f.endsWith(".html")) params.push({ slug: f.replace(/\.html$/, "") });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const html = resolveFile(slug);
  return { title: html ? `${extractTitle(html)} | HisabDo` : "HisabDo" };
}

export default async function LegacyPage({ params }) {
  const { slug } = await params;
  const html = resolveFile(slug);
  const content = html && extractMain(html);
  if (!content) notFound();

  return (
    <main id="main-content">
      <article
        className="legacy-article"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </main>
  );
}
