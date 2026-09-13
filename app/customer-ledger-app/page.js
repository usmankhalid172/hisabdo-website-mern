import { getLandingPage } from '../../lib/pageData';
import { buildMetadata } from '../../lib/seo';
import LandingPageTemplate from '../../components/LandingPageTemplate';

const page = getLandingPage('customer-ledger-app');

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: '/customer-ledger-app',
  keywords: page.keywords,
  ogImage: page.ogImage,
});

export default function CustomerLedgerApp() {
  return <LandingPageTemplate page={page} />;
}
