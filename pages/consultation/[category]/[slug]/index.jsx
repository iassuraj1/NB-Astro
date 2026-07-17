import ConsultationDetailsPage from '../../../../src/public/pages/ConsultationDetailsPage';
import PublicLayout from '../../../../src/public/layout/PublicLayout';
import { SeoHead } from '../../../../src/next/seo';
import { getConsultationSeo } from '../../../../src/next/seo';

export default function ConsultationDetailsRoute({ seo, service }) {
  return <PublicLayout><SeoHead seo={seo} /><ConsultationDetailsPage initialService={service} /></PublicLayout>;
}

export const getServerSideProps = async ({ params }) => {
  const { seo, service } = await getConsultationSeo(params?.category || '', params?.slug || '');
  return { props: { seo, service } };
};
