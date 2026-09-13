import { getLandingPage } from '../../lib/pageData';
import { buildMetadata } from '../../lib/seo';
import LandingPageTemplate from '../../components/LandingPageTemplate';

const page = getLandingPage('shopkeeper-accounting-app');

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: '/shopkeeper-accounting-app',
  keywords: page.keywords,
  ogImage: page.ogImage,
});

export default function ShopkeeperAccountingApp() {
  return <LandingPageTemplate page={page} />;
}
