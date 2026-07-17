import AstrologyCoursesPage from '../src/public/pages/AstrologyCoursesPage';
import PublicLayout from '../src/public/layout/PublicLayout';
import { SeoHead } from '../src/next/seo';
import { getPageContentSeo, pageSeo } from '../src/next/seo';

export default function AstrologyCoursesRoute({ seo, pageContent }) {
  return <PublicLayout><SeoHead seo={seo} /><AstrologyCoursesPage initialPageContent={pageContent} /></PublicLayout>;
}

export const getServerSideProps = async () => {
  const { seo, content } = await getPageContentSeo('ASTROLOGY', pageSeo.astrologyCourses);
  return { props: { seo, pageContent: content } };
};
