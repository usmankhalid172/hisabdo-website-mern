import { getLandingPage } from '../../lib/pageData';
import { buildMetadata } from '../../lib/seo';
import LandingPageTemplate from '../../components/LandingPageTemplate';

const page = getLandingPage('receivable-payable-tracker');

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: '/receivable-payable-tracker',
  keywords: page.keywords,
  ogImage: page.ogImage,
});

export default function ReceivablePayableTracker() {
  return <LandingPageTemplate page={page} />;
}
