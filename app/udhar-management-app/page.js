import { getLandingPage } from '../../lib/pageData';
import { buildMetadata } from '../../lib/seo';
import LandingPageTemplate from '../../components/LandingPageTemplate';

const page = getLandingPage('udhar-management-app');

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: '/udhar-management-app',
  keywords: page.keywords,
  ogImage: page.ogImage,
});

export default function UdharManagementApp() {
  return <LandingPageTemplate page={page} />;
}
