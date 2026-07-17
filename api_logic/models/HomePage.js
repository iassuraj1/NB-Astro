// models/HomePage.js
const mongoose = require('mongoose');

const heroSlideSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    highlight: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    mobileImage: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        enum: ['StarIcon', 'CrystalBallIcon', 'HomeIcon', 'HeartIcon'],
        default: 'StarIcon'
    },
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const featureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    gradient: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const serviceSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['main', 'sub'],
        default: 'main'
    },
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const faqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const aboutSectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    clients: {
        type: Number,
        required: true
    },
    satisfaction: {
        type: Number,
        required: true
    },
    principles: [{
        type: String
    }],
    quote: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const contactInfoSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    socialLinks: {
        facebook: String,
        twitter: String,
        instagram: String,
        linkedin: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const ctaSectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    button1Text: {
        type: String,
        required: true
    },
    button1Link: {
        type: String,
        required: true
    },
    button2Text: {
        type: String,
        required: true
    },
    button2Link: {
        type: String,
        required: true
    },
    guaranteeText: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

// ==================== SEO SCHEMA ====================
const seoSchema = new mongoose.Schema({
    metaTitle: {
        type: String,
        required: true,
        default: 'NB Astro - Best Astrologer in India | Vedic Astrology & Vastu Consultation'
    },
    metaDescription: {
        type: String,
        required: true,
        default: 'Get accurate Vedic astrology and Vastu consultation from Naveen Bhagat, India\'s leading astrologer. Book online consultation for career, marriage, business, health solutions.'
    },
    metaKeywords: {
        type: String,
        default: 'astrologer in India, Vedic astrology, Vastu consultant, Naveen Bhagat, astrology consultation, Vastu consultation, online astrologer, best astrologer, astrology courses, Vastu courses'
    },
    ogTitle: {
        type: String,
        default: 'NB Astro - Best Astrologer in India | Vedic Astrology & Vastu Consultation'
    },
    ogDescription: {
        type: String,
        default: 'Get accurate Vedic astrology and Vastu consultation from Naveen Bhagat, India\'s leading astrologer. Book online consultation for career, marriage, business, health solutions.'
    },
    ogImage: {
        type: String,
        default: 'https://nbastro.com/og-image-home.jpg'
    },
    ogUrl: {
        type: String,
        default: 'https://nbastro.com'
    },
    twitterTitle: {
        type: String,
        default: 'NB Astro - Best Astrologer in India | Vedic Astrology & Vastu Consultation'
    },
    twitterDescription: {
        type: String,
        default: 'Get accurate Vedic astrology and Vastu consultation from Naveen Bhagat, India\'s leading astrologer.'
    },
    twitterImage: {
        type: String,
        default: 'https://nbastro.com/twitter-image-home.jpg'
    },
    canonicalUrl: {
        type: String,
        default: 'https://nbastro.com'
    },
    robots: {
        type: String,
        default: 'index, follow'
    },
    structuredData: {
        type: mongoose.Schema.Types.Mixed,
        default: {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "NB Astro",
            "url": "https://nbastro.com",
            "logo": "https://nbastro.com/logo.png",
            "description": "Get accurate Vedic astrology and Vastu consultation from Naveen Bhagat, India's leading astrologer.",
            "sameAs": [
                "https://www.facebook.com/nbastro",
                "https://www.instagram.com/nbastro",
                "https://twitter.com/nbastro"
            ]
        }
    },
    breadcrumbSchema: {
        type: mongoose.Schema.Types.Mixed,
        default: {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://nbastro.com"
                }
            ]
        }
    },
    localBusinessSchema: {
        type: mongoose.Schema.Types.Mixed,
        default: {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "NB Astro",
            "image": "https://nbastro.com/logo.png",
            "telephone": "+91-XXXXXXXXXX",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Greater Noida",
                "addressRegion": "UP",
                "addressCountry": "IN"
            },
            "openingHours": "Mo-Su 09:00-21:00",
            "priceRange": "₹₹"
        }
    },
    // Additional SEO settings
    googleVerification: {
        type: String,
        default: ''
    },
    bingVerification: {
        type: String,
        default: ''
    },
    yandexVerification: {
        type: String,
        default: ''
    },
    baiduVerification: {
        type: String,
        default: ''
    },
    // Analytics
    googleAnalyticsId: {
        type: String,
        default: ''
    },
    googleTagManagerId: {
        type: String,
        default: ''
    },
    // Performance settings
    enableLazyLoading: {
        type: Boolean,
        default: true
    },
    enablePreload: {
        type: Boolean,
        default: true
    },
    // Schema types for better SEO
    serviceSchema: {
        type: mongoose.Schema.Types.Mixed,
        default: {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Astrology & Vastu Consultation",
            "provider": {
                "@type": "Person",
                "name": "Naveen Bhagat",
                "jobTitle": "Vedic Astrologer & Vastu Consultant"
            },
            "areaServed": "Worldwide",
            "availableChannel": {
                "@type": "ServiceChannel",
                "serviceUrl": "https://nbastro.com/consultation",
                "servicePhone": "+91-XXXXXXXXXX"
            }
        }
    },
    courseSchema: {
        type: mongoose.Schema.Types.Mixed,
        default: {
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Astrology & Vastu Courses",
            "description": "Learn Vedic astrology and Vastu from expert Naveen Bhagat",
            "provider": {
                "@type": "Organization",
                "name": "NB Astro",
                "sameAs": "https://nbastro.com"
            }
        }
    },
    // WebPage schema
    webpageSchema: {
        type: mongoose.Schema.Types.Mixed,
        default: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Home - NB Astro",
            "description": "Best Astrologer in India - Vedic Astrology & Vastu Consultation",
            "url": "https://nbastro.com",
            "inLanguage": "en-US"
        }
    },
    // Last updated timestamp for SEO freshness
    seoLastUpdated: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

// Create a single SEO document (singleton pattern)
const SeoConfig = mongoose.models.SeoConfig || mongoose.model('SeoConfig', seoSchema);

// Also add SEO fields to existing models if needed
// Add SEO to hero slide (for individual slide SEO)
heroSlideSchema.add({
    seo: {
        title: String,
        description: String
    }
});

module.exports = {
    HeroSlide: mongoose.models.HeroSlide || mongoose.model('HeroSlide', heroSlideSchema),
    Feature: mongoose.models.Feature || mongoose.model('Feature', featureSchema),
    Service: mongoose.models.Service || mongoose.model('Service', serviceSchema),
    FAQ: mongoose.models.FAQ || mongoose.model('FAQ', faqSchema),
    AboutSection: mongoose.models.AboutSection || mongoose.model('AboutSection', aboutSectionSchema),
    ContactInfo: mongoose.models.ContactInfo || mongoose.model('ContactInfo', contactInfoSchema),
    CTASection: mongoose.models.CTASection || mongoose.model('CTASection', ctaSectionSchema),
    SeoConfig: SeoConfig  // Export SEO model
};