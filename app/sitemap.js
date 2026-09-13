import { BLOG_POSTS } from '../lib/blogData';
import { LANDING_PAGES } from '../lib/pageData';

const BASE = 'https://hisabdo.app';
const TODAY = new Date().toISOString().split('T')[0];

const STATIC_PAGES = [
  { url: '/',                              priority: 1.0, changeFrequency: 'weekly' },
  { url: '/about',                         priority: 0.9, changeFrequency: 'monthly' },
  { url: '/about-app',                     priority: 0.9, changeFrequency: 'monthly' },
  { url: '/app',                           priority: 0.9, changeFrequency: 'monthly' },
  { url: '/faq',                           priority: 0.9, changeFrequency: 'monthly' },
  { url: '/blog',                          priority: 0.9, changeFrequency: 'weekly' },
  { url: '/careers',                       priority: 0.7, changeFrequency: 'monthly' },
  { url: '/contact',                       priority: 0.8, changeFrequency: 'monthly' },
  { url: '/founder',                       priority: 0.8, changeFrequency: 'monthly' },
  { url: '/authors/mian-usman-khalid',     priority: 0.8, changeFrequency: 'monthly' },
  { url: '/leadership',                    priority: 0.7, changeFrequency: 'monthly' },
  { url: '/media',                         priority: 0.7, changeFrequency: 'monthly' },
  { url: '/privacy-policy',               priority: 0.6, changeFrequency: 'yearly' },
  { url: '/xictek-systems',               priority: 0.8, changeFrequency: 'monthly' },
];

export default function sitemap() {
  const landingEntries = LANDING_PAGES.map(({ slug }) => ({
    url: `${BASE}/${slug}`,
    lastModified: TODAY,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const blogEntries = BLOG_POSTS.map(({ slug, date }) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: date || TODAY,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const staticEntries = STATIC_PAGES.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE}${url}`,
    lastModified: TODAY,
    changeFrequency,
    priority,
  }));

  return [...staticEntries, ...landingEntries, ...blogEntries];
}
