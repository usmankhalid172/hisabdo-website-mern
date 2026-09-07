const BASE = 'https://site.hisabdo.app';
const TODAY = '2026-08-06';

export default function sitemap() {
  const pages = [
    { url: '/',                priority: 1.0,  changeFrequency: 'weekly' },
    { url: '/about',           priority: 0.9,  changeFrequency: 'monthly' },
    { url: '/app',             priority: 0.9,  changeFrequency: 'monthly' },
    { url: '/xicteksystems',   priority: 0.9,  changeFrequency: 'monthly' },
    { url: '/faq',             priority: 0.9,  changeFrequency: 'monthly' },
    { url: '/blog',            priority: 0.9,  changeFrequency: 'weekly' },
    { url: '/careers',         priority: 0.7,  changeFrequency: 'monthly' },
    { url: '/contact',         priority: 0.8,  changeFrequency: 'monthly' },
    { url: '/founder',         priority: 0.8,  changeFrequency: 'monthly' },
    { url: '/leadership',      priority: 0.7,  changeFrequency: 'monthly' },
    { url: '/media',           priority: 0.7,  changeFrequency: 'monthly' },
    { url: '/privacy-policy',  priority: 0.7,  changeFrequency: 'monthly' },
    // Blog posts
    { url: '/blog/how-to-manage-daily-khata',           priority: 0.8, changeFrequency: 'monthly' },
    { url: '/blog/digital-ledger-vs-paper-ledger',      priority: 0.8, changeFrequency: 'monthly' },
    { url: '/blog/expense-tracking-for-small-business', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/blog/personal-budget-planning',            priority: 0.8, changeFrequency: 'monthly' },
    { url: '/blog/why-offline-finance-apps-are-better', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/blog/money-management-tips',               priority: 0.8, changeFrequency: 'monthly' },
    { url: '/blog/best-khata-app-in-pakistan',          priority: 0.8, changeFrequency: 'monthly' },
    { url: '/blog/bookkeeping-basics',                  priority: 0.8, changeFrequency: 'monthly' },
    { url: '/blog/freelancer-expense-tracking',         priority: 0.8, changeFrequency: 'monthly' },
    { url: '/blog/business-finance-tips',               priority: 0.8, changeFrequency: 'monthly' },
    { url: '/blog/customer-credit-management',          priority: 0.8, changeFrequency: 'monthly' },
    { url: '/blog/pdf-reports-for-businesses',          priority: 0.8, changeFrequency: 'monthly' },
    { url: '/blog/shopkeeper-accounting-guide',         priority: 0.8, changeFrequency: 'monthly' },
    { url: '/blog/receivable-payable-explained',        priority: 0.8, changeFrequency: 'monthly' },
    { url: '/blog/complete-guide-to-hisabdo',           priority: 0.8, changeFrequency: 'monthly' },
    { url: '/blog/track-customer-dues',                 priority: 0.8, changeFrequency: 'monthly' },
    { url: '/blog/business-expense-categories',         priority: 0.8, changeFrequency: 'monthly' },
    { url: '/blog/cash-flow-management',                priority: 0.8, changeFrequency: 'monthly' },
    { url: '/blog/supplier-payments-payables',          priority: 0.8, changeFrequency: 'monthly' },
    { url: '/blog/small-business-financial-management', priority: 0.8, changeFrequency: 'monthly' },
  ];

  return pages.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE}${url}`,
    lastModified: TODAY,
    changeFrequency,
    priority,
  }));
}
