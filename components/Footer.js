import Link from 'next/link';

const COL_PRODUCT = [
  { label: 'Expense Tracker', href: '/expense-tracker-app' },
  { label: 'Expense Management', href: '/expense-management-app' },
  { label: 'Khata Book App', href: '/khata-book-app' },
  { label: 'Digital Khata Book', href: '/digital-khata-book' },
  { label: 'Udhar Management', href: '/udhar-management-app' },
  { label: 'Customer Ledger', href: '/customer-ledger-app' },
];

const COL_BUSINESS = [
  { label: 'Shopkeeper Accounting', href: '/shopkeeper-accounting-app' },
  { label: 'Small Business Accounting', href: '/small-business-accounting-app' },
  { label: 'Business Ledger App', href: '/business-ledger-app' },
  { label: 'Business Expense Tracker', href: '/business-expense-tracker' },
  { label: 'Receivable & Payable', href: '/receivable-payable-tracker' },
  { label: 'Hisab Kitab App', href: '/hisab-kitab-app' },
];

const COL_RESOURCES = [
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'About the App', href: '/about-app' },
  { label: 'Author', href: '/authors/mian-usman-khalid' },
];

const COL_COMPANY = [
  { label: 'About', href: '/about' },
  { label: 'Founder', href: '/founder' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'XICTEK Systems', href: '/xictek-systems' },
];

function FooterCol({ heading, links }) {
  return (
    <div style={{ minWidth: '140px' }}>
      <p style={{ fontWeight: 600, color: '#e2e8f0', marginBottom: '12px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{heading}</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {links.map((l) => (
          <li key={l.href} style={{ marginBottom: '8px' }}>
            <Link href={l.href} style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '13px' }}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="footer" style={{ background: '#060d1a', padding: '48px 24px 32px', borderTop: '1px solid var(--border)', color: 'var(--muted)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', marginBottom: '40px', justifyContent: 'space-between' }}>
          <div style={{ maxWidth: '220px' }}>
            <p style={{ fontWeight: 700, color: '#e2e8f0', fontSize: '16px', marginBottom: '8px' }}>HisabDo</p>
            <p style={{ fontSize: '13px', lineHeight: '1.6' }}>Free offline khata book, expense tracker and customer ledger app for Android — built for shopkeepers and small businesses.</p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <a href="https://www.facebook.com/people/HisabDo-Udhar-Khata-App/61587841495265/" aria-label="Facebook" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)' }}><i className="fab fa-facebook-f" /></a>
              <a href="https://www.instagram.com/hisabdo.app/" aria-label="Instagram" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)' }}><i className="fab fa-instagram" /></a>
              <a href="https://www.linkedin.com/company/hisabdo-expense-management-app/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)' }}><i className="fab fa-linkedin-in" /></a>
              <a href="https://www.tiktok.com/@hisabdo_udhar_khata_app" aria-label="TikTok" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)' }}><i className="fab fa-tiktok" /></a>
              <a href="https://www.youtube.com/channel/UCtYSl8MRwz-MK6ukBKZS9Rg" aria-label="YouTube" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)' }}><i className="fab fa-youtube" /></a>
            </div>
          </div>
          <FooterCol heading="Product" links={COL_PRODUCT} />
          <FooterCol heading="Business" links={COL_BUSINESS} />
          <FooterCol heading="Resources" links={COL_RESOURCES} />
          <FooterCol heading="Company" links={COL_COMPANY} />
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px', textAlign: 'center', fontSize: '13px' }}>
          <p>&copy; 2026 XICTEK Systems. All rights reserved. HisabDo is a product of XICTEK Systems.</p>
        </div>
      </div>
    </footer>
  );
}
