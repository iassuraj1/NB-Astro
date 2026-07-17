import CourseDetailsPage from '../../../src/public/pages/CourseDetailsPage';
import PublicLayout from '../../../src/public/layout/PublicLayout';
import { SeoHead } from '../../../src/next/seo';
import { getCourseSeo } from '../../../src/next/seo';

export default function CourseDetailsRoute({ seo, course }) {
  return <PublicLayout><SeoHead seo={seo} /><CourseDetailsPage initialCourse={course} /></PublicLayout>;
}

export const getServerSideProps = async ({ params }) => {
  const { seo, course } = await getCourseSeo(params?.courseSlug || '');
  return { props: { seo, course } };
};
