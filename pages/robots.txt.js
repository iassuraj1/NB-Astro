import { SITE_URL } from '../src/next/seo';

export const getServerSideProps = async ({ res }) => {
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin',
    'Disallow: /admin/',
    'Disallow: /appointment/confirmation/',
    'Disallow: /track-appointment',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    '',
  ].join('\n');

  res.setHeader('Content-Type', 'text/plain');
  res.write(body);
  res.end();

  return { props: {} };
};

export default function Robots() {
  return null;
}
