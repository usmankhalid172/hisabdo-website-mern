import { SITE } from './seo';

export const LANDING_PAGES = [
  {
    slug: 'expense-tracker-app',
    title: 'Best Expense Tracker App',
    h1: 'Best Expense Tracker App for Android',
    description:
      'HisabDo is a free offline expense tracker app for Android. Record daily expenses, manage income and get PDF reports — no internet needed.',
    keywords: ['expense tracker app', 'best expense tracker', 'free expense tracker android'],
    ogImage: `${SITE.url}/assets/images/dashboard.webp`,
    related: [
      { label: 'Expense Management App', href: '/expense-management-app' },
      { label: 'Business Expense Tracker', href: '/business-expense-tracker' },
      { label: 'Small Business Accounting', href: '/small-business-accounting-app' },
    ],
    faqs: [
      { q: 'Is HisabDo a free expense tracker app?', a: 'Yes. HisabDo is completely free to download and use on Android with no subscription required.' },
      { q: 'Does the expense tracker work offline?', a: 'Yes. All core expense tracking features work fully offline without any internet connection.' },
      { q: 'Can I export expense reports as PDF?', a: 'Yes. You can generate and share professional PDF expense reports directly from the app.' },
      { q: 'What currencies does the expense tracker support?', a: 'HisabDo supports PKR, USD and INR for multi-currency expense tracking.' },
    ],
    features: [
      { icon: 'fa-wallet', title: 'Daily Expense Recording', desc: 'Log every expense instantly with categories, notes and amounts.' },
      { icon: 'fa-chart-bar', title: 'Spending Analytics', desc: 'Visual charts to understand where your money goes each month.' },
      { icon: 'fa-file-pdf', title: 'PDF Reports', desc: 'Export clean expense summaries for any period.' },
      { icon: 'fa-wifi-slash', title: 'Offline First', desc: 'Works without internet — your data stays on your device.' },
    ],
  },
  {
    slug: 'expense-management-app',
    title: 'Expense Management App',
    h1: 'Expense Management App for Small Businesses',
    description:
      'Manage all your business expenses in one place with HisabDo. Track income, expenses, receivables and payables — offline and free.',
    keywords: ['expense management app', 'business expense management', 'expense management software'],
    ogImage: `${SITE.url}/assets/images/analytics.webp`,
    related: [
      { label: 'Expense Tracker App', href: '/expense-tracker-app' },
      { label: 'Business Expense Tracker', href: '/business-expense-tracker' },
      { label: 'Khata Book App', href: '/khata-book-app' },
    ],
    faqs: [
      { q: 'What is an expense management app?', a: 'An expense management app helps you record, categorize and analyze all business and personal spending in one organized place.' },
      { q: 'How does HisabDo help with expense management?', a: 'HisabDo lets you record every transaction, categorize expenses, track income vs spending and export reports — all offline.' },
      { q: 'Is HisabDo suitable for small business expense management?', a: 'Yes. It is designed specifically for shopkeepers, freelancers and small business owners who need simple but powerful expense management.' },
      { q: 'Can I manage both income and expenses?', a: 'Yes. HisabDo tracks both money received and money paid so you always know your net position.' },
    ],
    features: [
      { icon: 'fa-list-alt', title: 'Expense Categories', desc: 'Organize spending by category for cleaner reports.' },
      { icon: 'fa-balance-scale', title: 'Income vs Expense', desc: 'See your net financial position at a glance.' },
      { icon: 'fa-history', title: 'Transaction History', desc: 'Full searchable history of every transaction.' },
      { icon: 'fa-cloud-upload-alt', title: 'Backup & Restore', desc: 'Protect your expense data with reliable backups.' },
    ],
  },
  {
    slug: 'khata-book-app',
    title: 'Khata Book App',
    h1: 'Digital Khata Book App for Shopkeepers',
    description:
      'Replace your paper khata with HisabDo — a free digital khata book app for Android. Track customer balances, udhar and daily transactions offline.',
    keywords: ['khata book app', 'digital khata book', 'khata app android', 'khata app pakistan'],
    ogImage: `${SITE.url}/assets/images/ledger.webp`,
    related: [
      { label: 'Digital Khata Book', href: '/digital-khata-book' },
      { label: 'Customer Ledger App', href: '/customer-ledger-app' },
      { label: 'Udhar Management App', href: '/udhar-management-app' },
    ],
    faqs: [
      { q: 'What is a khata book app?', a: 'A khata book app is a digital replacement for the traditional paper register used to record customer credit, payments and daily transactions.' },
      { q: 'Is HisabDo the best khata book app?', a: 'HisabDo is one of the most complete khata book apps available — it works offline, supports Urdu and English, and is completely free.' },
      { q: 'Can I use the khata app without internet?', a: 'Yes. HisabDo is built offline-first so your khata records are always available even without a data connection.' },
      { q: 'Does the khata app support Urdu?', a: 'Yes. HisabDo supports Urdu, English, Hindi, Arabic and Roman Urdu.' },
    ],
    features: [
      { icon: 'fa-book', title: 'Digital Khata', desc: 'Replace paper registers with a clean digital ledger.' },
      { icon: 'fa-users', title: 'Customer Accounts', desc: 'Separate khata for every customer with full history.' },
      { icon: 'fa-language', title: 'Urdu Support', desc: 'Full Urdu language support for local users.' },
      { icon: 'fa-print', title: 'Print & Share', desc: 'Share khata statements via PDF or WhatsApp.' },
    ],
  },
  {
    slug: 'digital-khata-book',
    title: 'Digital Khata Book',
    h1: 'Digital Khata Book — Replace Paper with Smart Records',
    description:
      'HisabDo is a free digital khata book for Android. Manage customer credit, udhar and daily transactions digitally — offline and secure.',
    keywords: ['digital khata book', 'digital khata app', 'online khata book', 'electronic khata'],
    ogImage: `${SITE.url}/assets/images/ledger.webp`,
    related: [
      { label: 'Khata Book App', href: '/khata-book-app' },
      { label: 'Customer Ledger App', href: '/customer-ledger-app' },
      { label: 'Shopkeeper Accounting App', href: '/shopkeeper-accounting-app' },
    ],
    faqs: [
      { q: 'What is a digital khata book?', a: 'A digital khata book is a mobile app that replaces the traditional paper ledger used by shopkeepers to record customer credit and payments.' },
      { q: 'Why switch from paper khata to digital?', a: 'Digital khata is faster, more accurate, searchable and can generate PDF reports — unlike paper which can be lost or damaged.' },
      { q: 'Is HisabDo a good digital khata book?', a: 'Yes. HisabDo is purpose-built as a digital khata book with offline support, Urdu language and PDF export.' },
      { q: 'Can I share digital khata with customers?', a: 'Yes. You can generate and share PDF statements with customers directly from the app.' },
    ],
    features: [
      { icon: 'fa-tablet-alt', title: 'Mobile Khata', desc: 'Full khata management on your Android phone.' },
      { icon: 'fa-search', title: 'Searchable Records', desc: 'Find any transaction instantly by name or date.' },
      { icon: 'fa-shield-alt', title: 'Secure & Private', desc: 'All data stored locally on your device.' },
      { icon: 'fa-sync', title: 'Backup & Sync', desc: 'Optional backup to protect your khata records.' },
    ],
  },
  {
    slug: 'customer-ledger-app',
    title: 'Customer Ledger App',
    h1: 'Customer Ledger App — Track Every Customer Balance',
    description:
      'HisabDo is a free customer ledger app for Android. Track customer credit, udhar, receivables and payment history — all offline.',
    keywords: ['customer ledger app', 'customer account management', 'customer credit tracker'],
    ogImage: `${SITE.url}/assets/images/customer.webp`,
    related: [
      { label: 'Udhar Management App', href: '/udhar-management-app' },
      { label: 'Receivable & Payable Tracker', href: '/receivable-payable-tracker' },
      { label: 'Khata Book App', href: '/khata-book-app' },
    ],
    faqs: [
      { q: 'What is a customer ledger app?', a: 'A customer ledger app lets you maintain individual accounts for each customer, tracking what they owe and what they have paid.' },
      { q: 'How does HisabDo manage customer ledgers?', a: 'Each customer gets their own ledger with a complete transaction history, outstanding balance and PDF statement export.' },
      { q: 'Can I track multiple customers?', a: 'Yes. HisabDo supports unlimited customer accounts, each with their own ledger and balance.' },
      { q: 'Can I send statements to customers?', a: 'Yes. Generate a PDF statement for any customer and share it via WhatsApp, email or print.' },
    ],
    features: [
      { icon: 'fa-address-book', title: 'Customer Profiles', desc: 'Individual ledger for every customer with contact info.' },
      { icon: 'fa-money-check', title: 'Balance Tracking', desc: 'Real-time outstanding balance for each customer.' },
      { icon: 'fa-bell', title: 'Due Reminders', desc: 'Know who owes you and how much at a glance.' },
      { icon: 'fa-file-invoice', title: 'Customer Statements', desc: 'PDF statements for any customer on demand.' },
    ],
  },
  {
    slug: 'udhar-management-app',
    title: 'Udhar Management App',
    h1: 'Udhar Management App — Track & Recover Dues Easily',
    description:
      'HisabDo is a free udhar management app for Android. Track who owes you, record payments and manage customer credit — offline and in Urdu.',
    keywords: ['udhar management app', 'udhar tracker', 'udhar app android', 'udhar khata app'],
    ogImage: `${SITE.url}/assets/images/customer.webp`,
    related: [
      { label: 'Customer Ledger App', href: '/customer-ledger-app' },
      { label: 'Khata Book App', href: '/khata-book-app' },
      { label: 'Receivable & Payable Tracker', href: '/receivable-payable-tracker' },
    ],
    faqs: [
      { q: 'What is an udhar management app?', a: 'An udhar management app helps shopkeepers and businesses track customer credit (udhar), record payments and manage outstanding dues.' },
      { q: 'How does HisabDo help manage udhar?', a: 'HisabDo lets you record udhar for each customer, track payments and see the total outstanding balance — all offline.' },
      { q: 'Is the udhar app available in Urdu?', a: 'Yes. HisabDo fully supports Urdu language for local users in Pakistan and India.' },
      { q: 'Can I recover dues using the app?', a: 'Yes. You can see all outstanding udhar, generate statements and share them with customers to request payment.' },
    ],
    features: [
      { icon: 'fa-hand-holding-usd', title: 'Udhar Recording', desc: 'Record every udhar transaction instantly.' },
      { icon: 'fa-list-ol', title: 'Due List', desc: 'See all customers with outstanding balances.' },
      { icon: 'fa-share-alt', title: 'Share Statements', desc: 'Send udhar statements via WhatsApp or PDF.' },
      { icon: 'fa-language', title: 'Urdu Interface', desc: 'Full Urdu support for local shopkeepers.' },
    ],
  },
  {
    slug: 'shopkeeper-accounting-app',
    title: 'Shopkeeper Accounting App',
    h1: 'Shopkeeper Accounting App — Built for Retail Businesses',
    description:
      'HisabDo is a free shopkeeper accounting app for Android. Manage daily sales, customer credit, supplier payments and expenses — offline.',
    keywords: ['shopkeeper accounting app', 'retail accounting app', 'shop management app', 'dukaan accounting app'],
    ogImage: `${SITE.url}/assets/images/dashboard.webp`,
    related: [
      { label: 'Khata Book App', href: '/khata-book-app' },
      { label: 'Small Business Accounting App', href: '/small-business-accounting-app' },
      { label: 'Customer Ledger App', href: '/customer-ledger-app' },
    ],
    faqs: [
      { q: 'What is a shopkeeper accounting app?', a: 'A shopkeeper accounting app helps retail shop owners manage daily sales, customer credit, supplier payments and expenses in one place.' },
      { q: 'Is HisabDo good for shopkeepers?', a: 'Yes. HisabDo is specifically designed for shopkeepers with features like customer khata, udhar tracking, expense recording and PDF reports.' },
      { q: 'Can I manage supplier payments in HisabDo?', a: 'Yes. You can track what you owe to suppliers alongside what customers owe you.' },
      { q: 'Does the shopkeeper app work without internet?', a: 'Yes. HisabDo is fully offline so it works in shops with poor or no internet connectivity.' },
    ],
    features: [
      { icon: 'fa-store', title: 'Shop Management', desc: 'Complete daily accounting for your retail shop.' },
      { icon: 'fa-truck', title: 'Supplier Payables', desc: 'Track what you owe to suppliers and vendors.' },
      { icon: 'fa-cash-register', title: 'Daily Sales', desc: 'Record and review daily sales transactions.' },
      { icon: 'fa-receipt', title: 'Expense Tracking', desc: 'Log shop operating expenses with categories.' },
    ],
  },
  {
    slug: 'small-business-accounting-app',
    title: 'Small Business Accounting App',
    h1: 'Small Business Accounting App — Free & Offline',
    description:
      'HisabDo is a free small business accounting app for Android. Track income, expenses, customer ledgers and generate financial reports — no internet needed.',
    keywords: ['small business accounting app', 'small business accounting software', 'free accounting app android'],
    ogImage: `${SITE.url}/assets/images/analytics.webp`,
    related: [
      { label: 'Business Expense Tracker', href: '/business-expense-tracker' },
      { label: 'Shopkeeper Accounting App', href: '/shopkeeper-accounting-app' },
      { label: 'Receivable & Payable Tracker', href: '/receivable-payable-tracker' },
    ],
    faqs: [
      { q: 'What accounting features does HisabDo offer for small businesses?', a: 'HisabDo covers expense tracking, income recording, customer ledgers, receivables, payables, PDF reports and backup.' },
      { q: 'Is HisabDo a replacement for accounting software?', a: 'For small businesses and shopkeepers, HisabDo covers the most important daily accounting needs without the complexity of full accounting software.' },
      { q: 'Can I use HisabDo for my small business in Pakistan?', a: 'Yes. HisabDo is built for small businesses in Pakistan and South Asia with Urdu support and PKR currency.' },
      { q: 'Is there a free small business accounting app for Android?', a: 'Yes. HisabDo is completely free with no subscription or hidden charges.' },
    ],
    features: [
      { icon: 'fa-chart-pie', title: 'Financial Overview', desc: 'Complete picture of income, expenses and balances.' },
      { icon: 'fa-file-alt', title: 'Business Reports', desc: 'Generate professional financial reports as PDF.' },
      { icon: 'fa-users-cog', title: 'Customer & Supplier', desc: 'Manage both customer receivables and supplier payables.' },
      { icon: 'fa-lock', title: 'Data Security', desc: 'All records stored locally with backup support.' },
    ],
  },
  {
    slug: 'business-expense-tracker',
    title: 'Business Expense Tracker',
    h1: 'Business Expense Tracker App for Android',
    description:
      'Track all your business expenses with HisabDo — a free offline business expense tracker for Android. Categorize spending, view analytics and export PDF reports.',
    keywords: ['business expense tracker', 'business expense tracking app', 'company expense tracker'],
    ogImage: `${SITE.url}/assets/images/analytics.webp`,
    related: [
      { label: 'Expense Tracker App', href: '/expense-tracker-app' },
      { label: 'Expense Management App', href: '/expense-management-app' },
      { label: 'Small Business Accounting App', href: '/small-business-accounting-app' },
    ],
    faqs: [
      { q: 'What is a business expense tracker?', a: 'A business expense tracker is an app that helps you record, categorize and analyze all business-related spending.' },
      { q: 'How does HisabDo track business expenses?', a: 'HisabDo lets you log every business expense with categories, dates and notes, then view analytics and export PDF reports.' },
      { q: 'Can I track expenses by category?', a: 'Yes. HisabDo supports expense categories so you can see exactly where your business money is going.' },
      { q: 'Is the business expense tracker free?', a: 'Yes. HisabDo is completely free with no subscription or premium tier required.' },
    ],
    features: [
      { icon: 'fa-tags', title: 'Expense Categories', desc: 'Tag every expense for organized reporting.' },
      { icon: 'fa-chart-line', title: 'Spending Trends', desc: 'Visual analytics to spot patterns and reduce waste.' },
      { icon: 'fa-calendar-alt', title: 'Date Filtering', desc: 'View expenses by day, week, month or custom range.' },
      { icon: 'fa-download', title: 'Export Reports', desc: 'Download PDF expense reports for any period.' },
    ],
  },
  {
    slug: 'receivable-payable-tracker',
    title: 'Receivable and Payable Tracker',
    h1: 'Receivable and Payable Tracker App',
    description:
      'HisabDo is a free receivable and payable tracker for Android. Know exactly who owes you and what you owe — manage both sides of your business finances offline.',
    keywords: ['receivable and payable tracker', 'accounts receivable app', 'accounts payable app', 'receivable payable management'],
    ogImage: `${SITE.url}/assets/images/transaction.webp`,
    related: [
      { label: 'Customer Ledger App', href: '/customer-ledger-app' },
      { label: 'Udhar Management App', href: '/udhar-management-app' },
      { label: 'Small Business Accounting App', href: '/small-business-accounting-app' },
    ],
    faqs: [
      { q: 'What is a receivable and payable tracker?', a: 'A receivable and payable tracker helps you manage money owed to you (receivables) and money you owe to others (payables) in one place.' },
      { q: 'How does HisabDo track receivables and payables?', a: 'HisabDo maintains separate ledgers for customers (receivables) and suppliers (payables) with real-time balances.' },
      { q: 'Can I see total receivables and payables at once?', a: 'Yes. The HisabDo dashboard shows your total receivable and payable positions at a glance.' },
      { q: 'Does the tracker work offline?', a: 'Yes. All receivable and payable tracking works fully offline without any internet connection.' },
    ],
    features: [
      { icon: 'fa-arrow-circle-down', title: 'Receivables', desc: 'Track all money owed to you by customers.' },
      { icon: 'fa-arrow-circle-up', title: 'Payables', desc: 'Track all money you owe to suppliers.' },
      { icon: 'fa-tachometer-alt', title: 'Net Position', desc: 'See your overall financial position instantly.' },
      { icon: 'fa-bell', title: 'Overdue Alerts', desc: 'Identify overdue receivables and payables quickly.' },
    ],
  },
  {
    slug: 'hisab-kitab-app',
    title: 'Hisab Kitab App',
    h1: 'Hisab Kitab App — Dukan Ka Hisab Digital Karein',
    description:
      'HisabDo ek free hisab kitab app hai Android ke liye. Dukan ka khata, customer ka udhar, aur rozana ka hisab — sab offline manage karein.',
    keywords: ['hisab kitab app', 'dukan ka hisab kitab app', 'udhar ka hisab app', 'dukan ka khata app', 'karobar ka hisab kitab app'],
    ogImage: `${SITE.url}/assets/images/ledger.webp`,
    related: [
      { label: 'Khata Book App', href: '/khata-book-app' },
      { label: 'Udhar Management App', href: '/udhar-management-app' },
      { label: 'Shopkeeper Accounting App', href: '/shopkeeper-accounting-app' },
    ],
    faqs: [
      { q: 'Hisab kitab app kya hota hai?', a: 'Hisab kitab app ek digital tool hai jo aapki dukan ya karobar ka rozana ka hisab, customer ka udhar aur income/expense record karta hai — bilkul paper register ki jagah.' },
      { q: 'Kya HisabDo Urdu mein kaam karta hai?', a: 'Haan. HisabDo Urdu, English, Hindi, Arabic aur Roman Urdu support karta hai.' },
      { q: 'Kya yeh app internet ke bina kaam karta hai?', a: 'Haan. HisabDo offline-first hai — internet ke bina bhi poora kaam karta hai.' },
      { q: 'Kya main customer ka udhar track kar sakta hoon?', a: 'Haan. Har customer ka alag hisab, outstanding balance aur PDF statement generate kar sakte hain.' },
    ],
    features: [
      { icon: 'fa-book', title: 'Digital Hisab Kitab', desc: 'Paper register ki jagah digital hisab — fast, accurate aur searchable.' },
      { icon: 'fa-users', title: 'Customer Ka Udhar', desc: 'Har customer ka alag account aur outstanding balance.' },
      { icon: 'fa-language', title: 'Urdu Support', desc: 'Poori Urdu language support local users ke liye.' },
      { icon: 'fa-file-pdf', title: 'PDF Report', desc: 'Kisi bhi period ka PDF report generate aur share karein.' },
    ],
  },
  {
    slug: 'business-ledger-app',
    title: 'Business Ledger App',
    h1: 'Business Ledger App — Digital Records for Every Transaction',
    description:
      'HisabDo is a free business ledger app for Android. Maintain digital ledgers for customers, suppliers and daily transactions — offline and secure.',
    keywords: ['business ledger app', 'digital ledger app', 'small business ledger app', 'customer ledger software', 'business bookkeeping app'],
    ogImage: `${SITE.url}/assets/images/ledger.webp`,
    related: [
      { label: 'Customer Ledger App', href: '/customer-ledger-app' },
      { label: 'Small Business Accounting App', href: '/small-business-accounting-app' },
      { label: 'Receivable & Payable Tracker', href: '/receivable-payable-tracker' },
    ],
    faqs: [
      { q: 'What is a business ledger app?', a: 'A business ledger app is a digital tool for recording all business transactions — income, expenses, customer credit and supplier payments — in organized accounts.' },
      { q: 'How does HisabDo work as a business ledger?', a: 'HisabDo maintains separate ledgers for each customer and supplier, with a complete transaction history, running balance and PDF export.' },
      { q: 'Can I use HisabDo as a digital ledger for my small business?', a: 'Yes. HisabDo is designed specifically for small businesses that need a simple, reliable digital ledger without complex accounting software.' },
      { q: 'Does the business ledger app work offline?', a: 'Yes. All ledger records are stored locally on your device and work fully offline.' },
    ],
    features: [
      { icon: 'fa-book-open', title: 'Digital Ledger', desc: 'Organized digital accounts for every customer and supplier.' },
      { icon: 'fa-exchange-alt', title: 'Transaction Records', desc: 'Complete history of every debit and credit entry.' },
      { icon: 'fa-balance-scale', title: 'Running Balance', desc: 'Real-time balance for every ledger account.' },
      { icon: 'fa-file-export', title: 'Export & Share', desc: 'Generate PDF ledger statements for any account.' },
    ],
  },
];

export function getLandingPage(slug) {
  return LANDING_PAGES.find((p) => p.slug === slug) || null;
}
