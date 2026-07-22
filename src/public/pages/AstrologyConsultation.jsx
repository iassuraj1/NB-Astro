// public/pages/AstrologyConsultation.jsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Helmet } from 'react-helmet-async';
import { Loader2 } from 'lucide-react';
import { consultationAPI } from '../../admin/services/api';

const AstrologyConsultation = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [seoConfig, setSeoConfig] = useState(null);

    useEffect(() => {
        fetchServices();
        fetchSeoConfig();
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const { data } = await consultationAPI.getAll({ category: 'astrology', isActive: true });
            setServices(data.data || []);
        } catch (error) {
            console.error('Error fetching astrology services:', error);
            setError('Failed to load services. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const fetchSeoConfig = async () => {
        try {
            const response = await fetch('/api/home/seo');
            const result = await response.json();
            if (result.success && result.data) {
                setSeoConfig(result.data);
            }
        } catch (error) {
            console.error('Error fetching SEO config:', error);
        }
    };

    // Generate FAQ Schema
    const generateFAQSchema = () => {
        if (!services.length) return null;
        
        const allFaqs = services.flatMap(service => 
            (service.faqs || []).map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        );

        if (allFaqs.length === 0) return null;

        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": allFaqs.slice(0, 10)
        };
    };

    // Generate Service Schema
    const generateServiceSchema = () => {
        if (!services.length) return null;

        return {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Astrology Consultation Services",
            "description": "Professional Vedic astrology consultation services by Naveen Bhagat Ji",
            "numberOfItems": services.length,
            "itemListElement": services.map((service, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "Service",
                    "name": service.title,
                    "description": service.quickDescription || service.shortDescription,
                    "provider": {
                        "@type": "Person",
                        "name": service.expert || "Naveen Bhagat Ji"
                    },
                    "offers": {
                        "@type": "Offer",
                        "price": service.priceNumeric,
                        "priceCurrency": "INR",
                        "availability": "https://schema.org/InStock"
                    }
                }
            }))
        };
    };

    const pageTitle = seoConfig?.metaTitle || "Astrology Consultation Services - Accurate Vedic Astrology Predictions | NB Astro";
    const pageDescription = seoConfig?.metaDescription || "Get accurate Vedic astrology consultation for career, marriage, health, and wealth. Expert astrologer Naveen Bhagat Ji provides personalized remedies. Book online now!";
    const pageKeywords = seoConfig?.metaKeywords || "astrology consultation, vedic astrology, kundli reading, horoscope analysis, career astrology, marriage astrology, Naveen Bhagat";

    const faqSchema = generateFAQSchema();
    const serviceSchema = generateServiceSchema();
    const schemas = [serviceSchema, faqSchema].filter(s => s !== null);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-[#00B7B3] animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-400 mb-4">{error}</p>
                    <button onClick={fetchServices} className="bg-[#00B7B3] text-black px-4 py-2 rounded-lg">Try Again</button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content={pageKeywords} />
                <link rel="canonical" href="https://nbastro.com/astrology-consultation" />
                
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://nbastro.com/astrology-consultation" />
                <meta property="og:image" content="https://nbastro.com/astrology-og-image.jpg" />
                <meta property="og:site_name" content="NB Astro" />
                
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content="https://nbastro.com/astrology-twitter-image.jpg" />
                
                <meta name="robots" content="index, follow" />
                
                {schemas.map((schema, idx) => (
                    <script key={idx} type="application/ld+json">
                        {JSON.stringify(schema)}
                    </script>
                ))}
            </Helmet>

            <div>
                {/* Hero Section */}
                <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
                    <div className="absolute inset-0">
                        <img 
                            src="https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                            alt="Astrology Consultation Background"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
                    </div>

                    <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                        <div className="max-w-2xl">
                            <div className="inline-block p-3 bg-[#00B7B3]/10 rounded-full mb-6">
                                <span className="text-4xl" aria-label="Astrology Icon">⭐</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                                Astrology <span className="text-[#00B7B3]">Consultations</span>
                            </h1>
                            <p className="text-gray-300 text-lg max-w-xl">
                                Ancient Vedic wisdom for modern life challenges with Naveen Bhagat Ji
                            </p>
                            <div className="w-24 h-1 bg-[#00B7B3] mt-8"></div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
                </div>

                {/* CONSULTATIONS SECTION */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Our <span className="text-[#00B7B3]">Services</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Choose from our comprehensive range of astrology services
                        </p>
                    </div>

                    {services.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-400">No services available at the moment. Please check back later.</p>
                        </div>
                    ) : (
                        <div className="space-y-16">
                            {services.map((item, index) => (
                                <div 
                                    key={item._id}
                                    className={`flex flex-col ${
                                        index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                                    } gap-8 lg:gap-12 items-center bg-black/30 rounded-2xl p-6 lg:p-8 border border-[#00B7B3]/10 hover:border-[#00B7B3]/30 transition-all duration-500`}
                                >
                                    {/* Image Side */}
                                    <div className="lg:w-5/12">
                                        <div className="relative overflow-hidden rounded-xl border-2 border-[#00B7B3]/20 hover:border-[#00B7B3]/40 transition-all duration-500 group">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                                            <img 
                                                src={item.image && item.image !== '' ? 
                                                    (item.image.startsWith('http') ? item.image : `${item.image}`) : 
                                                    'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
                                                } 
                                                alt={item.title}
                                                className="w-full h-[250px] md:h-[300px] object-cover group-hover:scale-110 transition-transform duration-700"
                                                loading="lazy"
                                            />
                                            <div className="absolute top-4 left-4 z-20">
                                                <span className="px-4 py-2 bg-[#00B7B3] text-black rounded-full text-sm font-semibold">
                                                    {item.type}
                                                </span>
                                            </div>
                                            {item.duration && (
                                                <div className="absolute top-4 right-4 z-20">
                                                    <span className="px-3 py-1 bg-black/60 backdrop-blur-sm border border-[#00B7B3]/30 text-[#00B7B3] rounded-full text-xs">
                                                        {item.duration}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content Side */}
                                    <div className="lg:w-7/12 space-y-5">
                                        <div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                                {item.title}
                                            </h2>
                                            <div className="flex items-center gap-4 flex-wrap">
                                                <span className="text-2xl font-bold text-[#00B7B3]">
                                                    {item.price}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    Expert: {item.expert || 'Naveen Bhagat Ji'}
                                                </span>
                                            </div>
                                        </div>

                                        <p className="text-gray-400 leading-relaxed">
                                            {item.shortDescription || item.longDescription}
                                        </p>

                                        {/* Features/Benefits */}
                                        <div className="grid grid-cols-2 gap-3 pt-2">
                                            {(item.features && item.features.length > 0 ? item.features : [
                                                'Personalized Analysis',
                                                'Accurate Predictions',
                                                'Effective Remedies',
                                                'Follow-up Support'
                                            ]).slice(0, 4).map((feature, idx) => (
                                                <div key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                                                    <span className="text-[#00B7B3]">✓</span>
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Buttons - Fixed to go to details page */}
                                        <div className="grid grid-cols-2 gap-3 pt-4 w-full">
                                            <Link
                                                href={`/consultation/${item.category}/${item.slug}/book`}
                                                className="px-2 sm:px-6 py-2.5 sm:py-3 bg-[#00B7B3] text-black rounded-lg font-semibold hover:bg-[#33C5C2] text-xs sm:text-sm text-center transform hover:scale-105 transition-all duration-300"
                                            >
                                                BOOK NOW
                                            </Link>
                                            <Link
                                                href={`/consultation/astrology/${item.slug}`}
                                                className="px-2 sm:px-6 py-2.5 sm:py-3 border-2 border-[#00B7B3] text-[#00B7B3] rounded-lg font-semibold hover:bg-[#00B7B3]/10 text-xs sm:text-sm text-center transform hover:scale-105 transition-all duration-300"
                                            >
                                                KNOW MORE
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* WHY CHOOSE US SECTION */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="bg-gradient-to-br from-black/60 to-transparent border border-[#00B7B3]/10 rounded-3xl p-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">
                            Why Choose <span className="text-[#00B7B3]">Us?</span>
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center group">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00B7B3]/10 flex items-center justify-center group-hover:bg-[#00B7B3] group-hover:scale-110 transition-all duration-300">
                                    <span className="text-2xl group-hover:text-black">🔮</span>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00B7B3]">20+ Years Experience</h3>
                                <p className="text-sm text-gray-400">Trusted by thousands of clients worldwide</p>
                            </div>
                            
                            <div className="text-center group">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00B7B3]/10 flex items-center justify-center group-hover:bg-[#00B7B3] group-hover:scale-110 transition-all duration-300">
                                    <span className="text-2xl group-hover:text-black">⭐</span>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00B7B3]">Accurate Predictions</h3>
                                <p className="text-sm text-gray-400">99% accuracy rate in predictions</p>
                            </div>
                            
                            <div className="text-center group">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#00B7B3]/10 flex items-center justify-center group-hover:bg-[#00B7B3] group-hover:scale-110 transition-all duration-300">
                                    <span className="text-2xl group-hover:text-black">💎</span>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00B7B3]">Vedic Remedies</h3>
                                <p className="text-sm text-gray-400">Ancient solutions for modern problems</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AstrologyConsultation;
