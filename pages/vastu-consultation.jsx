import VastuConsultation from '../src/public/pages/VastuConsultation';
import PublicLayout from '../src/public/layout/PublicLayout';
import { SeoHead } from '../src/next/seo';
import { pageSeo } from '../src/next/seo';

export default function VastuConsultationPage() {
  return <PublicLayout><SeoHead seo={pageSeo.vastuConsultation} /><VastuConsultation /></PublicLayout>;
}
