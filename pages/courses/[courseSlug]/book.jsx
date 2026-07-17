import CourseRegistrationPage from '../../../src/public/pages/RegistrationPage';
import PublicLayout from '../../../src/public/layout/PublicLayout';
import { SeoHead } from '../../../src/next/seo';
import { getCourseSeo } from '../../../src/next/seo';

export default function CourseBookRoute({ seo }) {
  return <PublicLayout><SeoHead seo={seo} /><CourseRegistrationPage /></PublicLayout>;
}

export const getServerSideProps = async ({ params }) => {
  const { seo } = await getCourseSeo(params?.courseSlug || '');
  return {
    props: {
      seo: {
        ...seo,
        title: `Book A Seat | ${seo.title}`,
        robots: 'index, follow',
      },
    },
  };
};
