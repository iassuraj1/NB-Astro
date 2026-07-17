// public/pages/ConsultationDetailsPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Loader2, User, Star, CheckCircle, ChevronLeft, ChevronRight, Sparkles, Info, BookOpen, Award, Headphones, MessageCircle, Shield, Users, Video } from 'lucide-react';
import { consultationAPI } from '../../admin/services/api';

// Styles for Quill content
const quillContentStyles = `
  .quill-content {
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
  }
  .quill-content h1 {
    font-size: 1.5rem !important;
    font-weight: bold !important;
    color: #00B7B3 !important;
    margin: 1rem 0 0.75rem 0 !important;
  }
  .quill-content h2 {
    font-size: 1.3rem !important;
    font-weight: 600 !important;
    color: #33C5C2 !important;
    margin: 0.875rem 0 0.625rem 0 !important;
  }
  .quill-content h3 {
    font-size: 1.1rem !important;
    font-weight: 500 !important;
    color: #66D9D6 !important;
    margin: 0.75rem 0 0.5rem 0 !important;
  }
  .quill-content p {
    margin-bottom: 0.75rem !important;
    line-height: 1.6 !important;
  }
  .quill-content ul, .quill-content ol {
    margin: 0.5rem 0 0.5rem 1.5rem !important;
    padding-left: 0 !important;
  }
  .quill-content li {
    margin: 0.25rem 0 !important;
  }
  .quill-content strong {
    color: #00B7B3 !important;
  }
  .quill-content a {
    color: #00B7B3 !important;
    text-decoration: underline !important;
  }
`;

const ConsultationDetailsPage = ({ initialService }) => {
    const router = useRouter();
    const { category, slug } = router.query;
    const [service, setService] = useState(initialService || null);
    const [relatedServices, setRelatedServices] = useState([]);
    const [loading, setLoading] = useState(!initialService);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [openFaqIndex, setOpenFaqIndex] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const servicesPerPage = 3;

    // WhatsApp Number
    const WHATSAPP_NUMBER = "919953442381";

    const fetchServiceDetails = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const { data: serviceData } = await consultationAPI.getBySlug(slug);
            if (serviceData.success && serviceData.data) {
                setService(serviceData.data);
                
                const { data: relatedData } = await consultationAPI.getAll({ 
                    category: category, 
                    isActive: true 
                });
                if (relatedData.success) {
                    const filtered = relatedData.data.filter(s => s._id !== serviceData.data._id);
                    setRelatedServices(filtered);
                }
            } else {
                setError('Service not found');
            }
        } catch (error) {
            console.error('Error fetching service details:', error);
            setError('Failed to load service details. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [category, slug]);

    useEffect(() => {
        fetchServiceDetails();
    }, [fetchServiceDetails]);

    const handleWhatsApp = () => {
        const message = encodeURIComponent(`Hi, I have a question about "${service?.title}". Please help me.`);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    };

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    // Pagination for related services
    const getPaginatedServices = () => {
        const startIndex = (currentPage - 1) * servicesPerPage;
        const endIndex = startIndex + servicesPerPage;
        return relatedServices.slice(startIndex, endIndex);
    };
    const totalPages = Math.ceil(relatedServices.length / servicesPerPage);
    const paginatedServices = getPaginatedServices();

    // Generate Schema for SEO
    const generateProductSchema = () => {
        if (!service) return null;
        return {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": service.title,
            "description": service.quickDescription || service.shortDescription,
            "image": service.image ? (service.image.startsWith('http') ? service.image : `${service.image}`) : null,
            "offers": {
                "@type": "Offer",
                "price": service.priceNumeric,
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock"
            }
        };
    };

    const generateFAQSchema = () => {
        if (!service?.faqs?.length) return null;
        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": service.faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
            }))
        };
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-[#00B7B3] animate-spin" />
            </div>
        );
    }

    if (error || !service) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-400 mb-4">{error || 'Service not found'}</p>
                    <Link href="/" className="bg-[#00B7B3] text-black px-4 py-2 rounded-lg">Go Home</Link>
                </div>
            </div>
        );
    }

    const schemas = [generateProductSchema(), generateFAQSchema()].filter(s => s !== null);

    return (
        <>
            <Helmet>
                <title>{service.seoTitle || `${service.title} | ${category === 'astrology' ? 'Astrology' : 'Vastu'} Consultation | NB Astro`}</title>
                <meta name="description" content={service.seoDescription || service.quickDescription || service.shortDescription} />
                <meta name="keywords" content={service.seoKeywords || `${service.title}, ${service.type}, consultation`} />
                <link rel="canonical" href={`https://nbastro.com/consultation/${category}/${service.slug}`} />
                <meta property="og:title" content={service.seoTitle || service.title} />
                <meta property="og:description" content={service.seoDescription || service.quickDescription} />
                <meta property="og:image" content={service.image ? (service.image.startsWith('http') ? service.image : `${service.image}`) : 'https://nbastro.com/default-og.jpg'} />
                <meta name="robots" content="index, follow" />
                {schemas.map((schema, idx) => (
                    <script key={idx} type="application/ld+json">{JSON.stringify(schema)}</script>
                ))}
            </Helmet>

            <style>{quillContentStyles}</style>
            <div className="min-h-screen bg-gradient-to-b from-black via-black to-[#0a0c12] overflow-x-hidden">

                {/* Breadcrumb */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                    <div className="flex items-center gap-2 text-sm flex-wrap">
                        <Link href="/" className="text-gray-500 hover:text-[#00B7B3] transition">Home</Link>
                        <span className="text-gray-600">/</span>
                        <Link href={`/${category}-consultation`} className="text-gray-500 hover:text-[#00B7B3] transition">
                            {category === 'astrology' ? 'Astrology Consultation' : 'Vastu Consultation'}
                        </Link>
                        <span className="text-gray-600">/</span>
                        <span className="text-[#00B7B3] truncate max-w-[200px]">{service.title}</span>
                    </div>
                </div>

                {/* Main Content - Left Image + Right Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        {/* Left Side - Image */}
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#00B7B3]/20">
                                <img 
                                    src={service.image && service.image !== '' ? 
                                        (service.image.startsWith('http') ? service.image : `${service.image}`) : 
                                        (category === 'astrology' 
                                            ? 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                                            : 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')
                                    } 
                                    alt={service.title}
                                    className="w-full h-[400px] lg:h-[500px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                <div className="absolute top-4 left-4">
                                    <div className="px-3 py-1 bg-[#00B7B3]/20 backdrop-blur-sm rounded-full border border-[#00B7B3]/30">
                                        <span className="text-[#00B7B3] text-xs uppercase tracking-wider">{service.type}</span>
                                    </div>
                                </div>
                                {service.duration && (
                                    <div className="absolute top-4 right-4">
                                        <div className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full border border-[#00B7B3]/30">
                                            <span className="text-[#00B7B3] text-xs">{service.duration}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Right Side - Content */}
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Sparkles className="w-5 h-5 text-[#00B7B3]" />
                                    <span className="text-[#00B7B3] text-sm uppercase tracking-wider">Premium Service</span>
                                </div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight break-words">
                                    {service.title}
                                </h1>
                            </div>

                            <div className="flex items-baseline gap-3 flex-wrap">
                                <span className="text-3xl md:text-4xl font-bold text-[#00B7B3]">{service.price}</span>
                            </div>

                            <p className="text-gray-400 leading-relaxed">
                                {service.quickDescription || service.shortDescription}
                            </p>

                            {/* Key Info Grid - Rating Removed */}
                            <div className="grid grid-cols-1 gap-4 py-4">
                                <div className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-[#00B7B3]/20">
                                    <User className="w-5 h-5 text-[#00B7B3] flex-shrink-0" />
                                    <div className="min-w-0">
                                        <p className="text-[10px] text-gray-500">Expert</p>
                                        <p className="text-sm text-white font-medium truncate">{service.expert || 'Naveen Bhagat Ji'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link href={`/consultation/${category}/${service.slug}/book`} className="group px-8 py-3 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-full font-semibold hover:shadow-lg hover:shadow-[#00B7B3]/30 transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                                    Book Now
                                </Link>
                                <button 
                                    onClick={handleWhatsApp}
                                    className="px-8 py-3 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] rounded-full font-semibold hover:bg-[#25D366]/20 transition-all duration-300 flex items-center gap-2"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    WhatsApp
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Floating Price & Book Bar */}
                <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-[#00B7B3]/20 py-3 hidden lg:block">
                    <div className="max-w-7xl mx-auto px-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-400">{service.title}</p>
                                <p className="text-lg font-bold text-[#00B7B3]">{service.price}</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="px-6 py-2 border border-[#00B7B3] text-[#00B7B3] rounded-full text-sm font-semibold hover:bg-[#00B7B3]/10 transition">Request a Call</button>
                                <Link href={`/consultation/${category}/${service.slug}/book`} className="px-6 py-2 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-full text-sm font-semibold hover:shadow-lg transition">Book Now</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex gap-2 border-b border-[#00B7B3]/20 mb-8 overflow-x-auto">
                        {['overview', 'includes', 'faq'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-5 py-3 text-sm font-medium transition-all whitespace-nowrap ${
                                    activeTab === tab
                                        ? 'text-[#00B7B3] border-b-2 border-[#00B7B3]'
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                {tab === 'overview' && '📘 Overview'}
                                {tab === 'includes' && '✅ What\'s Included'}
                                {tab === 'faq' && '❓ FAQ'}
                            </button>
                        ))}
                    </div>

                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {service.longDescription && (
                                <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/20 rounded-2xl p-6 overflow-hidden">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Info className="w-5 h-5 text-[#00B7B3] flex-shrink-0" />
                                        <h2 className="text-xl font-bold text-white">About This Service</h2>
                                    </div>
                                    <p className="text-gray-300 leading-relaxed">{service.longDescription}</p>
                                </div>
                            )}

                            {service.fullDescription && (
                                <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/20 rounded-2xl p-6 overflow-hidden">
                                    <div className="flex items-center gap-2 mb-4">
                                        <BookOpen className="w-5 h-5 text-[#00B7B3] flex-shrink-0" />
                                        <h2 className="text-xl font-bold text-white">Detailed Information</h2>
                                    </div>
                                    <div className="quill-content text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: service.fullDescription }} />
                                </div>
                            )}

                            {service.features && service.features.length > 0 && (
                                <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/20 rounded-2xl p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Award className="w-5 h-5 text-[#00B7B3]" />
                                        <h2 className="text-xl font-bold text-white">Key Features</h2>
                                    </div>
                                    <div className="grid gap-3">
                                        {service.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-3 bg-black/40 rounded-xl">
                                                <CheckCircle className="w-5 h-5 text-[#00B7B3] flex-shrink-0" />
                                                <span className="text-gray-300 break-words">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Includes Tab */}
                    {activeTab === 'includes' && (
                        <div className="space-y-6">
                            {service.includes && service.includes.length > 0 && (
                                <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/20 rounded-2xl p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <CheckCircle className="w-5 h-5 text-[#00B7B3]" />
                                        <h2 className="text-xl font-bold text-white">What's Included</h2>
                                    </div>
                                    <div className="grid gap-3">
                                        {service.includes.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-3 bg-black/40 rounded-xl">
                                                <CheckCircle className="w-5 h-5 text-[#00B7B3] flex-shrink-0" />
                                                <span className="text-gray-300 break-words">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {service.whatYouGet && service.whatYouGet.length > 0 && (
                                <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/20 rounded-2xl p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Sparkles className="w-5 h-5 text-[#00B7B3]" />
                                        <h2 className="text-xl font-bold text-white">What You Get</h2>
                                    </div>
                                    <div className="grid gap-3">
                                        {service.whatYouGet.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-3 bg-black/40 rounded-xl">
                                                <span className="text-[#00B7B3] text-lg">📌</span>
                                                <span className="text-gray-300 break-words">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* FAQ Tab */}
                    {activeTab === 'faq' && service.faqs && service.faqs.length > 0 && (
                        <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/20 rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Headphones className="w-5 h-5 text-[#00B7B3]" />
                                <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
                            </div>
                            <div className="space-y-3">
                                {service.faqs.map((faq, idx) => (
                                    <div key={idx} className="border border-[#00B7B3]/20 rounded-xl overflow-hidden">
                                        <button 
                                            onClick={() => toggleFaq(idx)} 
                                            className="w-full px-5 py-4 flex items-center justify-between text-left bg-black/40 hover:bg-[#00B7B3]/10 transition-all"
                                        >
                                            <span className="text-white font-medium break-words pr-4">{faq.question}</span>
                                            <svg className={`w-5 h-5 text-[#00B7B3] transition-transform flex-shrink-0 ${openFaqIndex === idx ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        <AnimatePresence>
                                            {openFaqIndex === idx && (
                                                <motion.div 
                                                    initial={{ height: 0, opacity: 0 }} 
                                                    animate={{ height: "auto", opacity: 1 }} 
                                                    exit={{ height: 0, opacity: 0 }} 
                                                    className="px-5 pb-4"
                                                >
                                                    <p className="text-gray-400 text-sm leading-relaxed break-words">{faq.answer}</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Trust Badges */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                    <div className="flex flex-wrap justify-center gap-6 text-gray-500 text-sm">
                        <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#00B7B3]" /><span>Secure Payment</span></div>
                        <div className="flex items-center gap-2"><Users className="w-4 h-4 text-[#00B7B3]" /><span>1000+ Happy Clients</span></div>
                        <div className="flex items-center gap-2"><Video className="w-4 h-4 text-[#00B7B3]" /><span>Follow-up Support</span></div>
                    </div>
                </div>

                {/* Related Services Section */}
                {relatedServices.length > 0 && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles className="w-5 h-5 text-[#00B7B3]" />
                                        <span className="text-[#00B7B3] text-sm uppercase tracking-wider">Explore More</span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                                        Top <span className="text-[#00B7B3]">{category === 'astrology' ? 'Astrology' : 'Vastu'}</span> Services
                                    </h2>
                                    <p className="text-gray-400 text-sm mt-1">Explore other popular services from the same category</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {paginatedServices.map((related) => (
                                    <Link
                                        key={related._id}
                                        href={`/consultation/${category}/${related.slug}`}
                                        className="group bg-gradient-to-br from-black/40 to-black/20 rounded-xl border border-[#00B7B3]/10 hover:border-[#00B7B3]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#00B7B3]/5 overflow-hidden"
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <img 
                                                src={related.image ? (related.image.startsWith('http') ? related.image : `${related.image}`) : (category === 'astrology' ? 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' : 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')}
                                                alt={related.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                            <div className="absolute bottom-3 left-3">
                                                <span className="px-2 py-1 bg-black/70 backdrop-blur-sm rounded-full text-xs text-[#00B7B3] border border-[#00B7B3]/30">
                                                    {related.type}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-white font-semibold text-base mb-1 line-clamp-1 group-hover:text-[#00B7B3] transition-colors">
                                                {related.title}
                                            </h3>
                                            <div className="flex items-baseline gap-1 mb-2">
                                                <span className="text-[#00B7B3] font-bold text-sm">{related.price}</span>
                                            </div>
                                            <p className="text-gray-400 text-xs line-clamp-2 mb-3">
                                                {related.shortDescription}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <User className="w-3 h-3" />
                                                <span>{related.expert || 'Naveen Bhagat Ji'}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-3 mt-10">
                                    <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="p-2 rounded-lg bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition"><ChevronLeft size={20} /></button>
                                    <span className="text-gray-400">Page {currentPage} of {totalPages}</span>
                                    <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition"><ChevronRight size={20} /></button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ConsultationDetailsPage;
