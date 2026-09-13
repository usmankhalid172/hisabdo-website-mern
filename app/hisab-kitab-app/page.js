import { getLandingPage } from '../../lib/pageData';
import { buildMetadata } from '../../lib/seo';
import LandingPageTemplate from '../../components/LandingPageTemplate';

const page = getLandingPage('hisab-kitab-app');

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: '/hisab-kitab-app',
  keywords: page.keywords,
  ogImage: page.ogImage,
});

export default function HisabKitabApp() {
  return <LandingPageTemplate page={page} />;
}
