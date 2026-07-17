// import React from 'react';
// import HeroSection from '../componants/home/HeroSection';
// import AboutNaveenSection from '../componants/home/AboutNaveenSection';
// import ServicesSection from '../componants/home/ServicesSection';
// import FeaturesSection from '../componants/home/FeaturesSection';


// import CTASection from '../componants/home/CTASection';
// import ContactSection from '../componants/home/ContactSection';
// import FAQsSection from '../componants/home/FAQsSection';

// const Home_page = () => {
//   return (
//     <main>
//       <HeroSection />
      
//       <AboutNaveenSection />
//       <ServicesSection />
//       <FeaturesSection />
//       <CTASection />
//       <FAQsSection/>
//       <ContactSection />
      
//     </main>
//   );
// };

// export default Home_page;


import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../componants/home/HeroSection';
import AboutNaveenSection from '../componants/home/AboutNaveenSection';
import ServicesSection from '../componants/home/ServicesSection';
import FeaturesSection from '../componants/home/FeaturesSection';
import TestimonialsSection from '../componants/home/TestimonialsSection';
import CTASection from '../componants/home/CTASection';
import ContactSection from '../componants/home/ContactSection';
import FAQsSection from '../componants/home/FAQsSection';

const Home_page = ({ initialSeo }) => {
  const [seoData, setSeoData] = useState({
    metaTitle: initialSeo?.title || 'NB Astro - Best Astrologer in India | Vedic Astrology & Vastu Consultation',
    metaDescription: initialSeo?.description || 'Get accurate Vedic astrology and Vastu consultation from Naveen Bhagat, India\'s leading astrologer. Book online consultation for career, marriage, business, health solutions.',
    metaKeywords: initialSeo?.keywords || 'astrologer in India, Vedic astrology, Vastu consultant, Naveen Bhagat, astrology consultation',
    ogTitle: initialSeo?.ogTitle || 'NB Astro - Best Astrologer in India',
    ogDescription: initialSeo?.ogDescription || 'Expert Vedic astrology and Vastu consultation services',
    ogImage: initialSeo?.image || 'https://nbastro.com/og-image-home.jpg',
    twitterTitle: initialSeo?.twitterTitle || 'NB Astro - Best Astrologer in India',
    twitterDescription: initialSeo?.twitterDescription || 'Get accurate Vedic astrology and Vastu consultation',
    twitterImage: initialSeo?.twitterImage || 'https://nbastro.com/twitter-image-home.jpg',
    canonicalUrl: initialSeo?.canonical || 'https://nbastro.com',
    robots: initialSeo?.robots || 'index, follow'
  });
  const [, setLoading] = useState(true);

  // Dynamic API URL
  const getApiUrl = () => {
    if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      return '';
    }
    return '';
  };
  
  const API_BASE_URL = getApiUrl();

  const fetchSEOConfig = useCallback(async () => {
    try {
      setLoading(true);
      const url = `${API_BASE_URL}/api/home/seo`;
      console.log('Fetching SEO config from:', url);
      
      const response = await fetch(url);
      const result = await response.json();
      
      console.log('SEO config fetched:', result);
      
      if (result.success && result.data) {
        setSeoData(prev => ({
          metaTitle: result.data.metaTitle || prev.metaTitle,
          metaDescription: result.data.metaDescription || prev.metaDescription,
          metaKeywords: result.data.metaKeywords || prev.metaKeywords,
          ogTitle: result.data.ogTitle || prev.ogTitle,
          ogDescription: result.data.ogDescription || prev.ogDescription,
          ogImage: result.data.ogImage || prev.ogImage,
          twitterTitle: result.data.twitterTitle || prev.twitterTitle,
          twitterDescription: result.data.twitterDescription || prev.twitterDescription,
          twitterImage: result.data.twitterImage || prev.twitterImage,
          canonicalUrl: result.data.canonicalUrl || prev.canonicalUrl,
          robots: result.data.robots || prev.robots
        }));
      }
    } catch (error) {
      console.error('Error fetching SEO config:', error);
      // Keep default values if API fails
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  // Fetch SEO config from API
  useEffect(() => {
    fetchSEOConfig();
  }, [fetchSEOConfig]);

  // Generate structured data for rich snippets
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": seoData.metaTitle,
    "description": seoData.metaDescription,
    "url": seoData.canonicalUrl,
    "inLanguage": "en-US",
    "mainEntity": {
      "@type": "Organization",
      "name": "NB Astro",
      "url": seoData.canonicalUrl,
      "logo": "https://nbastro.com/logo.png",
      "description": "Best Astrologer in India - Vedic Astrology & Vastu Consultation",
      "sameAs": [
        "https://www.facebook.com/nbastro",
        "https://www.instagram.com/nbastro",
        "https://twitter.com/nbastro",
        "https://www.youtube.com/channel/UCSIePQfbI4wvLg6JH5J-AaQ",
        "https://wa.me/919953442381"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9953442381",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi"]
      }
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "NB Astro",
    "image": "https://nbastro.com/logo.png",
    "telephone": "+91-9953442381",
    "email": "nbastro108@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "B-153, 40ft Road, Sai Kunj, New Palam Vihar - Phase 3",
      "addressLocality": "Gurugram",
      "addressRegion": "Haryana",
      "postalCode": "122017",
      "addressCountry": "IN"
    },
    "openingHours": "Mo-Su 09:00-21:00",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "09:00",
        "closes": "21:00"
      }
    ],
    "priceRange": "₹₹",
    "areaServed": "Worldwide"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": seoData.canonicalUrl
      }
    ]
  };

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{seoData.metaTitle}</title>
        <meta name="description" content={seoData.metaDescription} />
        <meta name="keywords" content={seoData.metaKeywords} />
        <meta name="robots" content={seoData.robots} />
        {seoData.canonicalUrl && <link rel="canonical" href={seoData.canonicalUrl} />}
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seoData.canonicalUrl} />
        <meta property="og:title" content={seoData.ogTitle || seoData.metaTitle} />
        <meta property="og:description" content={seoData.ogDescription || seoData.metaDescription} />
        {seoData.ogImage && <meta property="og:image" content={seoData.ogImage} />}
        <meta property="og:site_name" content="NB Astro" />
        <meta property="og:locale" content="en_IN" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={seoData.canonicalUrl} />
        <meta name="twitter:title" content={seoData.twitterTitle || seoData.metaTitle} />
        <meta name="twitter:description" content={seoData.twitterDescription || seoData.metaDescription} />
        {seoData.twitterImage && <meta name="twitter:image" content={seoData.twitterImage} />}
        
        {/* Additional SEO Tags */}
        <meta name="author" content="Naveen Bhagat" />
        <meta name="geo.region" content="IN-HR" />
        <meta name="geo.placename" content="Gurugram" />
        <meta name="geo.position" content="28.4595;77.0266" />
        <meta name="ICBM" content="28.4595, 77.0266" />
        
        {/* Language and Viewport */}
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Verification Tags - Add your codes here */}
        <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />
        
        {/* Structured Data / Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      
      <main>
        <HeroSection />
        <AboutNaveenSection />
        <ServicesSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
        <FAQsSection />
        <ContactSection />
      </main>
    </>
  );
};

export default Home_page;
