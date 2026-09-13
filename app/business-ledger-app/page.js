import { getLandingPage } from '../../lib/pageData';
import { buildMetadata } from '../../lib/seo';
import LandingPageTemplate from '../../components/LandingPageTemplate';

const page = getLandingPage('business-ledger-app');

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: '/business-ledger-app',
  keywords: page.keywords,
  ogImage: page.ogImage,
});

export default function BusinessLedgerApp() {
  return <LandingPageTemplate page={page} />;
}
