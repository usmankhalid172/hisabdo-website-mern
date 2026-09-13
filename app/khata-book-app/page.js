import { getLandingPage } from '../../lib/pageData';
import { buildMetadata } from '../../lib/seo';
import LandingPageTemplate from '../../components/LandingPageTemplate';

const page = getLandingPage('khata-book-app');

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: '/khata-book-app',
  keywords: page.keywords,
  ogImage: page.ogImage,
});

export default function KhataBookApp() {
  return <LandingPageTemplate page={page} />;
}
