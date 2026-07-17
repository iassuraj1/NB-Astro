import VastuCoursesPage from '../src/public/pages/VastuCoursesPage';
import PublicLayout from '../src/public/layout/PublicLayout';
import { SeoHead } from '../src/next/seo';
import { getPageContentSeo, pageSeo } from '../src/next/seo';

export default function VastuCoursesRoute({ seo, pageContent }) {
  return <PublicLayout><SeoHead seo={seo} /><VastuCoursesPage initialPageContent={pageContent} /></PublicLayout>;
}

export const getServerSideProps = async () => {
  const { seo, content } = await getPageContentSeo('VASTU', pageSeo.vastuCourses);
  return { props: { seo, pageContent: content } };
};
