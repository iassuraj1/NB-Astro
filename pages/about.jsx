import AboutPage from '../src/public/pages/AboutPage';
import PublicLayout from '../src/public/layout/PublicLayout';
import { SeoHead } from '../src/next/seo';
import { pageSeo } from '../src/next/seo';

export default function AboutRoute() {
  return <PublicLayout><SeoHead seo={pageSeo.about} /><AboutPage /></PublicLayout>;
}
