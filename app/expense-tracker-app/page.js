import { getLandingPage } from '../../lib/pageData';
import { buildMetadata } from '../../lib/seo';
import LandingPageTemplate from '../../components/LandingPageTemplate';

const page = getLandingPage('expense-tracker-app');

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: '/expense-tracker-app',
  keywords: page.keywords,
  ogImage: page.ogImage,
});

export default function ExpenseTrackerApp() {
  return <LandingPageTemplate page={page} />;
}
