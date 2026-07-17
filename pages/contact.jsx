import ContactPage from '../src/public/pages/ContactPage';
import PublicLayout from '../src/public/layout/PublicLayout';
import { SeoHead } from '../src/next/seo';
import { pageSeo } from '../src/next/seo';

export default function ContactRoute() {
  return <PublicLayout><SeoHead seo={pageSeo.contact} /><ContactPage /></PublicLayout>;
}
