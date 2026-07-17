import Home from '../src/public/pages/Home_page';
import PublicLayout from '../src/public/layout/PublicLayout';
import { SeoHead } from '../src/next/seo';
import { getHomeSeo } from '../src/next/seo';

export default function HomePage({ seo }) {
  return <PublicLayout><SeoHead seo={seo} /><Home initialSeo={seo} /></PublicLayout>;
}

export const getServerSideProps = async () => ({
  props: { seo: await getHomeSeo() },
});
