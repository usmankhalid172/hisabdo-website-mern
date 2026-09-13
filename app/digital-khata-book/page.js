import { getLandingPage } from '../../lib/pageData';
import { buildMetadata } from '../../lib/seo';
import LandingPageTemplate from '../../components/LandingPageTemplate';

const page = getLandingPage('digital-khata-book');

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: '/digital-khata-book',
  keywords: page.keywords,
  ogImage: page.ogImage,
});

export default function DigitalKhataBook() {
  return <LandingPageTemplate page={page} />;
}
