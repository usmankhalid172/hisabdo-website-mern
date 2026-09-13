import { getLandingPage } from '../../lib/pageData';
import { buildMetadata } from '../../lib/seo';
import LandingPageTemplate from '../../components/LandingPageTemplate';

const page = getLandingPage('expense-management-app');

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: '/expense-management-app',
  keywords: page.keywords,
  ogImage: page.ogImage,
});

export default function ExpenseManagementApp() {
  return <LandingPageTemplate page={page} />;
}
