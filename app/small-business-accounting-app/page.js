import { getLandingPage } from '../../lib/pageData';
import { buildMetadata } from '../../lib/seo';
import LandingPageTemplate from '../../components/LandingPageTemplate';

const page = getLandingPage('small-business-accounting-app');

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: '/small-business-accounting-app',
  keywords: page.keywords,
  ogImage: page.ogImage,
});

export default function SmallBusinessAccountingApp() {
  return <LandingPageTemplate page={page} />;
}
