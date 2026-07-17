import { fetchJson, SITE_URL } from '../src/next/seo';

const staticRoutes = [
  { loc: '/', changefreq: 'daily', priority: '1.0' },
  { loc: '/about', changefreq: 'weekly', priority: '0.9' },
  { loc: '/astrology-consultation', changefreq: 'weekly', priority: '0.9' },
  { loc: '/vastu-consultation', changefreq: 'weekly', priority: '0.9' },
  { loc: '/astrology-courses', changefreq: 'weekly', priority: '0.8' },
  { loc: '/vastu-courses', changefreq: 'weekly', priority: '0.8' },
  { loc: '/courses', changefreq: 'weekly', priority: '0.8' },
  { loc: '/astrologer-courses', changefreq: 'weekly', priority: '0.8' },
  { loc: '/contact', changefreq: 'monthly', priority: '0.7' },
];

const escapeXml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

const absolute = (path) => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;

const toUrlXml = ({ loc, lastmod, changefreq, priority }) => `
  <url>
    <loc>${escapeXml(absolute(loc))}</loc>
    ${lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

export const getServerSideProps = async ({ res }) => {
  const today = new Date().toISOString();
  const courseResult = await fetchJson('/api/courses/sitemap', {});
  const allCoursesResult = await fetchJson('/api/courses', {});
  const consultationResult = await fetchJson('/api/consultations?isActive=true', {});

  const sitemapCourses = courseResult?.courses || courseResult?.data?.courses || courseResult?.data || [];
  const allCourses = allCoursesResult?.courses || allCoursesResult?.data?.courses || [];
  const courses = sitemapCourses.length ? sitemapCourses : allCourses;
  const consultations = consultationResult?.data || consultationResult?.services || [];

  const courseRoutes = courses
    .filter((course) => course?.slug)
    .map((course) => ({
      loc: `/courses/${course.slug}/details`,
      lastmod: course.updatedAt || course.createdAt || today,
      changefreq: 'weekly',
      priority: '0.7',
    }));

  const consultationRoutes = consultations
    .filter((service) => service?.slug && service?.category)
    .map((service) => ({
      loc: `/consultation/${String(service.category).toLowerCase()}/${service.slug}`,
      lastmod: service.updatedAt || service.createdAt || today,
      changefreq: 'weekly',
      priority: '0.7',
    }));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticRoutes, ...courseRoutes, ...consultationRoutes].map(toUrlXml).join('')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function Sitemap() {
  return null;
}
