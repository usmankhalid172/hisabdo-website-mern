import { getLandingPage } from '../../lib/pageData';
import { buildMetadata } from '../../lib/seo';
import LandingPageTemplate from '../../components/LandingPageTemplate';

const page = getLandingPage('business-expense-tracker');

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: '/business-expense-tracker',
  keywords: page.keywords,
  ogImage: page.ogImage,
});

export default function BusinessExpenseTracker() {
  return <LandingPageTemplate page={page} />;
}
