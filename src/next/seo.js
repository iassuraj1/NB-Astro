import React from 'react';
import Head from 'next/head';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://nbastro.com').replace(/\/$/, '');
export const API_URL = typeof window === 'undefined' 
  ? (process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000').replace(/\/$/, '')
  : '';
export const SITE_NAME = 'NB Astro';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/default-og-image.jpg`;

export const DEFAULT_SEO = {
  title: 'NB Astro - Best Astrologer in India | Vedic Astrology & Vastu Consultation',
  description: 'Get accurate Vedic astrology and Vastu consultation from Naveen Bhagat, India\'s leading astrologer. Book online consultation for career, marriage, business, and health solutions.',
  keywords: 'astrologer in India, Vedic astrology, Vastu consultant, Naveen Bhagat, astrology consultation, Vastu consultation, astrology courses',
  path: '/',
  image: DEFAULT_OG_IMAGE,
  robots: 'index, follow',
  type: 'website',
};

const stripHtml = (value = '') => String(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

export const absoluteUrl = (value, base = SITE_URL) => {
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  const normalizedBase = base.replace(/\/$/, '');
  const normalizedValue = String(value).startsWith('/') ? value : `/${value}`;
  return `${normalizedBase}${normalizedValue}`;
};

export const backendAssetUrl = (value) => absoluteUrl(value, API_URL);

export const normalizeSeo = (seo = {}) => {
  const title = seo.title || seo.metaTitle || seo.seoTitle || DEFAULT_SEO.title;
  const description = stripHtml(seo.description || seo.metaDescription || seo.seoDescription || DEFAULT_SEO.description).slice(0, 170);
  const keywords = seo.keywords || seo.metaKeywords || seo.seoKeywords || DEFAULT_SEO.keywords;
  const path = seo.path || seo.url || seo.canonicalPath || DEFAULT_SEO.path;
  const canonical = seo.canonical || seo.canonicalUrl || absoluteUrl(path);
  const image = absoluteUrl(seo.image || seo.ogImage || seo.twitterImage || DEFAULT_SEO.image);

  return {
    title,
    description,
    keywords,
    canonical,
    image,
    robots: seo.robots || DEFAULT_SEO.robots,
    type: seo.type || DEFAULT_SEO.type,
    locale: seo.locale || 'en_IN',
    siteName: seo.siteName || SITE_NAME,
    twitterCard: seo.twitterCard || 'summary_large_image',
    twitterTitle: seo.twitterTitle || seo.ogTitle || title,
    twitterDescription: seo.twitterDescription || seo.ogDescription || description,
    twitterImage: absoluteUrl(seo.twitterImage || image),
    ogTitle: seo.ogTitle || title,
    ogDescription: seo.ogDescription || description,
    noindex: Boolean(seo.noindex),
    structuredData: Array.isArray(seo.structuredData) ? seo.structuredData.filter(Boolean) : (seo.structuredData ? [seo.structuredData] : []),
  };
};

export function SeoHead({ seo }) {
  const meta = normalizeSeo(seo);
  const robots = meta.noindex ? 'noindex, nofollow' : meta.robots;

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {meta.keywords && <meta name="keywords" content={meta.keywords} />}
      <meta name="robots" content={robots} />
      <meta name="author" content="Naveen Bhagat" />
      <link rel="canonical" href={meta.canonical} />

      <meta property="og:type" content={meta.type} />
      <meta property="og:url" content={meta.canonical} />
      <meta property="og:title" content={meta.ogTitle} />
      <meta property="og:description" content={meta.ogDescription} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:site_name" content={meta.siteName} />
      <meta property="og:locale" content={meta.locale} />

      <meta name="twitter:card" content={meta.twitterCard} />
      <meta name="twitter:url" content={meta.canonical} />
      <meta name="twitter:title" content={meta.twitterTitle} />
      <meta name="twitter:description" content={meta.twitterDescription} />
      <meta name="twitter:image" content={meta.twitterImage} />

      <meta httpEquiv="Content-Language" content="en" />
      {meta.structuredData.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  );
}

export async function fetchJson(path, fallback = null) {
  try {
    const response = await fetch(`${API_URL}${path}`);
    if (!response.ok) return fallback;
    return await response.json();
  } catch {
    return fallback;
  }
}

export const pageSeo = {
  home: {
    ...DEFAULT_SEO,
    path: '/',
  },
  about: {
    title: 'About Naveen Bhagat Ji | Vedic Astrologer & Mentor | NB Astro',
    description: 'Learn about Naveen Bhagat Ji, Vedic astrologer, educator, and mentor offering astrology consultations, Vastu guidance, and structured astrology courses.',
    keywords: 'Naveen Bhagat, about astrologer, Vedic astrologer, astrology mentor, NB Astro',
    path: '/about',
  },
  contact: {
    title: 'Contact NB Astro | Book Astrology & Vastu Consultation',
    description: 'Contact NB Astro for astrology consultation, Vastu services, course enquiries, and appointment support with Naveen Bhagat Ji.',
    keywords: 'contact NB Astro, astrology consultation contact, Vastu consultation booking, Naveen Bhagat phone',
    path: '/contact',
  },
  astrologyCourses: {
    title: 'Astrology Courses | Learn Vedic Astrology Online | NB Astro',
    description: 'Join astrology courses by Naveen Bhagat Ji and learn Vedic astrology through practical training, structured modules, and certification-focused guidance.',
    keywords: 'astrology course, Vedic astrology course, astrology classes online, astrology training, learn astrology',
    path: '/astrology-courses',
    image: `${SITE_URL}/astrology-og-image.jpg`,
  },
  vastuCourses: {
    title: 'Vastu Courses | Learn Vastu Shastra Online | NB Astro',
    description: 'Join Vastu courses by Naveen Bhagat Ji and learn Vastu Shastra for homes, offices, remedies, and professional consultation practice.',
    keywords: 'Vastu course, Vastu Shastra course, Vastu classes online, Vastu training, learn Vastu',
    path: '/vastu-courses',
    image: `${SITE_URL}/vastu-og-image.jpg`,
  },
  astrologyConsultation: {
    title: 'Astrology Consultation Services | Accurate Vedic Predictions | NB Astro',
    description: 'Book Vedic astrology consultation for career, marriage, health, wealth, and life guidance with Naveen Bhagat Ji.',
    keywords: 'astrology consultation, Vedic astrology, kundli reading, horoscope analysis, career astrology, marriage astrology',
    path: '/astrology-consultation',
    image: `${SITE_URL}/astrology-og-image.jpg`,
  },
  vastuConsultation: {
    title: 'Vastu Consultation Services | Home & Office Vastu | NB Astro',
    description: 'Book expert Vastu consultation for home, office, commercial spaces, and practical Vastu remedies with Naveen Bhagat Ji.',
    keywords: 'Vastu consultation, home Vastu, office Vastu, Vastu remedies, Vastu Shastra consultant',
    path: '/vastu-consultation',
    image: `${SITE_URL}/vastu-og-image.jpg`,
  },
  trackAppointment: {
    title: 'Track Appointment | NB Astro',
    description: 'Track your NB Astro appointment or consultation booking status securely using your booking ID.',
    keywords: 'track appointment, NB Astro booking status, consultation booking',
    path: '/track-appointment',
    noindex: true,
  },
};

export async function getHomeSeo() {
  const result = await fetchJson('/api/home/seo');
  return normalizeSeo({
    ...pageSeo.home,
    ...(result?.success ? result.data : {}),
    path: '/',
  });
}

export async function getPageContentSeo(pageType, fallbackSeo) {
  const result = await fetchJson(`/api/page-content/${pageType}`);
  const content = result?.success ? result.data : null;
  return {
    content,
    seo: normalizeSeo({
      ...fallbackSeo,
      title: content?.seoTitle || fallbackSeo.title,
      description: content?.seoDescription || fallbackSeo.description,
      keywords: content?.seoKeywords || fallbackSeo.keywords,
      image: content?.heroImage || fallbackSeo.image,
      path: fallbackSeo.path,
    }),
  };
}

export async function getCourseSeo(courseSlug) {
  const result = await fetchJson(`/api/courses/slug/${encodeURIComponent(courseSlug)}`);
  const course = result?.course || result?.data || null;
  if (!course) return { course: null, seo: normalizeSeo({ title: 'Course Not Found | NB Astro', path: `/courses/${courseSlug}/details`, noindex: true }) };

  const description = course.seoDescription || stripHtml(course.aboutCourse || course.whatIs || `Learn ${course.title} with NB Astro.`);
  return {
    course,
    seo: normalizeSeo({
      title: course.seoTitle || `${course.title} | NB Astro`,
      description,
      keywords: course.seoKeywords || `${course.title}, ${course.category || 'astrology'}, NB Astro, online course`,
      path: `/courses/${course.slug || courseSlug}/details`,
      image: course.image ? backendAssetUrl(course.image) : DEFAULT_OG_IMAGE,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: course.title,
        description: stripHtml(description).slice(0, 300),
        provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      },
    }),
  };
}

export async function getConsultationSeo(category, slug) {
  const result = await fetchJson(`/api/consultations/slug/${encodeURIComponent(slug)}`);
  const service = result?.data || null;
  if (!service) return { service: null, seo: normalizeSeo({ title: 'Consultation Not Found | NB Astro', path: `/consultation/${category}/${slug}`, noindex: true }) };

  const description = service.seoDescription || service.quickDescription || service.shortDescription || `${service.title} consultation by NB Astro.`;
  return {
    service,
    seo: normalizeSeo({
      title: service.seoTitle || `${service.title} | ${category === 'vastu' ? 'Vastu' : 'Astrology'} Consultation | NB Astro`,
      description,
      keywords: service.seoKeywords || `${service.title}, ${category} consultation, NB Astro`,
      path: `/consultation/${category}/${service.slug || slug}`,
      image: service.image ? backendAssetUrl(service.image) : DEFAULT_OG_IMAGE,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.title,
        description: stripHtml(description),
        provider: { '@type': 'Person', name: service.expert || 'Naveen Bhagat Ji' },
      },
    }),
  };
}
