import AstrologyConsultation from '../src/public/pages/AstrologyConsultation';
import PublicLayout from '../src/public/layout/PublicLayout';
import { SeoHead } from '../src/next/seo';
import { pageSeo } from '../src/next/seo';

export default function AstrologyConsultationPage() {
  return <PublicLayout><SeoHead seo={pageSeo.astrologyConsultation} /><AstrologyConsultation /></PublicLayout>;
}
