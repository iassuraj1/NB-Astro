



import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';  // ← CHANGE: react-helmet to react-helmet-async
import { Loader2, Calendar, Clock, Users, Award, BookOpen, Video, MessageCircle, CheckCircle, Star, Shield, Globe, Sparkles, GraduationCap, FileText, Monitor, MapPin, CreditCard, Headphones, Zap, Info, ChevronRight, ArrowRight } from 'lucide-react';
import { contactAPI, courseAPI } from '../../admin/services/api';

// Add this style to handle Quill content properly
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
    word-break: break-all !important;
  }
  .quill-content img {
    max-width: 100% !important;
    height: auto !important;
    border-radius: 0.5rem !important;
    margin: 0.75rem 0 !important;
  }
  .quill-content pre, .quill-content code {
    max-width: 100% !important;
    overflow-x: auto !important;
    white-space: pre-wrap !important;
    word-wrap: break-word !important;
  }
  .quill-content blockquote {
    border-left: 3px solid #00B7B3 !important;
    padding-left: 1rem !important;
    margin: 0.75rem 0 !important;
    color: #9ca3af !important;
    font-style: italic !important;
  }
  .quill-content table {
    max-width: 100% !important;
    overflow-x: auto !important;
    display: block !important;
  }
`;

const CourseDetailsPage = ({ initialCourse }) => {
    const router = useRouter();
    const { courseSlug } = router.query;
    
    const [course, setCourse] = useState(initialCourse || null);
    const [recentCourses, setRecentCourses] = useState([]);
    const [loading, setLoading] = useState(!initialCourse);
    const [requestSubmitting, setRequestSubmitting] = useState(false);
    const [showRequestForm, setShowRequestForm] = useState(false);
    const [openFaqIndex, setOpenFaqIndex] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [requestFormData, setRequestFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    // WhatsApp Number
    const WHATSAPP_NUMBER = "919953442381";

    // Helper function to strip HTML tags
    const stripHtml = (html) => {
        if (!html) return '';
        return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    };

    // Fetch course by slug and recent courses
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data } = await courseAPI.getAll();
                const allCourses = data.courses || [];
                
                // Filter astrology courses
                const astrologyCourses = allCourses.filter(course => 
                    course.category && course.category.includes('ASTROLOGY')
                );
                
                // Find current course
                const foundCourse = astrologyCourses.find(course => 
                    course.slug === courseSlug || 
                    course.title?.toLowerCase().replace(/\s+/g, '-') === courseSlug
                );
                
                if (foundCourse) {
                    setCourse(foundCourse);
                    
                    // Get recent courses (excluding current course)
                    const otherCourses = astrologyCourses.filter(c => c._id !== foundCourse._id);
                    // Get up to 4 recent courses
                    setRecentCourses(otherCourses.slice(0, 4));
                } else {
                    setCourse(null);
                }
            } catch (error) {
                console.error('Error fetching course:', error);
                setCourse(null);
            } finally {
                setLoading(false);
            }
        };
        
        if (courseSlug) {
            fetchData();
        }
    }, [courseSlug]);
    
    const handleRequestSubmit = async (e) => {
        e.preventDefault();
        setRequestSubmitting(true);

        try {
            const { data } = await contactAPI.sendCourseCallRequest({
                ...requestFormData,
                courseId: course?._id || course?.id || '',
                courseTitle: course?.title || '',
                courseSlug: course?.slug || courseSlug || '',
                coursePrice: course?.price || course?.courseFee || course?.discountPrice || '',
                courseCategory: course?.category || '',
                pageUrl: typeof window !== 'undefined' ? window.location.href : ''
            });

            alert(data?.message || 'Request sent successfully. We will contact you shortly.');
            setShowRequestForm(false);
            setRequestFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            alert(error?.response?.data?.message || 'Unable to send request. Please try again.');
        } finally {
            setRequestSubmitting(false);
        }
    };
    
    const handleWhatsApp = () => {
        const message = encodeURIComponent(`Hi, I have a question about "${course?.title}". Please help me.`);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    };
    
    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };
    
    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-[#00B7B3] animate-spin" />
            </div>
        );
    }
    
    if (!course) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Course Not Found</h2>
                    <p className="text-gray-400 mb-4">The course you're looking for doesn't exist.</p>
                    <Link href="/astrology-courses" className="text-[#00B7B3] hover:underline">Back to Courses</Link>
                </div>
            </div>
        );
    }
    
    // ✅ SEO Data
    const pageTitle = course.seoTitle || `${course.title} | NB Astro`;
    const pageDescription = course.seoDescription || stripHtml(course.aboutCourse || course.whatIs || '').substring(0, 155) || `Learn ${course.title} with NB Astro. Expert-led course with certification.`;
    const pageKeywords = course.seoKeywords || `${course.title}, ${course.category?.toLowerCase()}, vedic astrology, nb astro, online course`;
    const pageUrl = `https://nbastro.com/courses/${course.slug}/details`;
    const pageImage = course.image ? `${course.image}` : 'https://nbastro.com/default-og-image.jpg';
    
    return (
        <>
            {/* ✅ SEO Helmet - UPDATED */}
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta name="keywords" content={pageKeywords} />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="NB Astro" />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:image" content={pageImage} />
                <meta property="og:site_name" content="NB Astro" />
                
                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={pageUrl} />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={pageImage} />
                
                {/* Canonical URL */}
                <link rel="canonical" href={pageUrl} />
                
                {/* Schema.org markup for Google */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Course",
                        "name": course.title,
                        "description": stripHtml(course.aboutCourse || course.whatIs || '').substring(0, 300),
                        "provider": {
                            "@type": "Organization",
                            "name": "NB Astro",
                            "url": "https://nbastro.com",
                            "logo": "https://nbastro.com/logo.png"
                        },
                        "offers": {
                            "@type": "Offer",
                            "price": course.price || course.courseFee || "Contact for price",
                            "priceCurrency": "INR",
                            "availability": "https://schema.org/OnlineOnly",
                            "validFrom": new Date().toISOString()
                        },
                        "hasCourseInstance": {
                            "@type": "CourseInstance",
                            "courseMode": course.type === 'Online' ? "online" : "offline",
                            "startDate": course.date || "Flexible",
                            "duration": course.courseDuration || "Flexible",
                            "instructor": {
                                "@type": "Person",
                                "name": course.instructor?.name || "Naveen Bhagat",
                                "description": course.instructor?.bio || "Senior Astrologer with 20+ years experience"
                            }
                        },
                        "educationalLevel": course.level || "All Levels",
                        "timeRequired": course.courseDuration || "Flexible",
                        "numberOfCredits": course.modules || "Multiple"
                    })}
                </script>
            </Helmet>
            
            <style>{quillContentStyles}</style>
            <div className="min-h-screen bg-gradient-to-b from-black via-black to-[#0a0c12] overflow-x-hidden">
                {/* Breadcrumb */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
                    <div className="flex items-center gap-2 text-sm flex-wrap">
                        <Link href="/" className="text-gray-500 hover:text-[#00B7B3] transition">Home</Link>
                        <ChevronRight className="w-3 h-3 text-gray-600" />
                        <Link href="/astrology-courses" className="text-gray-500 hover:text-[#00B7B3] transition">Astrology Courses</Link>
                        <ChevronRight className="w-3 h-3 text-gray-600" />
                        <span className="text-[#00B7B3] truncate max-w-[200px]">{course.title}</span>
                    </div>
                </div>

                {/* Hero Section - Left Image + Right Content */}
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
                                    src={course.image ? `${course.image}` : 'https://images.unsplash.com/photo-1507484467459-0c91be303a5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                                    alt={course.title}
                                    className="w-full h-[400px] lg:h-[500px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                
                                {/* Floating Badge */}
                                <div className="absolute top-4 left-4">
                                    <div className="px-3 py-1 bg-[#00B7B3]/20 backdrop-blur-sm rounded-full border border-[#00B7B3]/30">
                                        <span className="text-[#00B7B3] text-xs uppercase tracking-wider">{course.category || 'Astrology Course'}</span>
                                    </div>
                                </div>
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
                                    <span className="text-[#00B7B3] text-sm uppercase tracking-wider">Premium Course</span>
                                </div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight break-words">
                                    {course.title}
                                </h1>
                            </div>

                            <div className="flex items-baseline gap-3 flex-wrap">
                                <span className="text-3xl md:text-4xl font-bold text-[#00B7B3]">{course.price || course.courseFee || 'Contact Us'}</span>
                                {course.courseFee && <span className="text-gray-400">+ GST</span>}
                            </div>

                            {/* Course Info Grid */}
                            <div className="grid grid-cols-2 gap-4 py-4">
                                <div className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-[#00B7B3]/20">
                                    <Calendar className="w-5 h-5 text-[#00B7B3] flex-shrink-0" />
                                    <div className="min-w-0">
                                        <p className="text-[10px] text-gray-500">Start Date</p>
                                        <p className="text-sm text-white font-medium truncate">{course.date || 'Flexible'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-[#00B7B3]/20">
                                    <Clock className="w-5 h-5 text-[#00B7B3] flex-shrink-0" />
                                    <div className="min-w-0">
                                        <p className="text-[10px] text-gray-500">Timing</p>
                                        <p className="text-sm text-white font-medium truncate">{course.timing || 'Flexible'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-[#00B7B3]/20">
                                    <Users className="w-5 h-5 text-[#00B7B3] flex-shrink-0" />
                                    <div className="min-w-0">
                                        <p className="text-[10px] text-gray-500">Duration</p>
                                        <p className="text-sm text-white font-medium truncate">{course.courseDuration || 'Flexible'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-[#00B7B3]/20">
                                    <Monitor className="w-5 h-5 text-[#00B7B3] flex-shrink-0" />
                                    <div className="min-w-0">
                                        <p className="text-[10px] text-gray-500">Mode</p>
                                        <p className="text-sm text-white font-medium truncate">{course.type || 'Online'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-[#00B7B3]/20">
                                    <MapPin className="w-5 h-5 text-[#00B7B3] flex-shrink-0" />
                                    <div className="min-w-0">
                                        <p className="text-[10px] text-gray-500">Location</p>
                                        <p className="text-sm text-white font-medium truncate">{course.location || 'Zoom'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-[#00B7B3]/20">
                                    <Globe className="w-5 h-5 text-[#00B7B3] flex-shrink-0" />
                                    <div className="min-w-0">
                                        <p className="text-[10px] text-gray-500">Language</p>
                                        <p className="text-sm text-white font-medium truncate">{course.language || 'Hindi & English'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link 
                                    href={`/courses/${course.slug || courseSlug}/book`}
                                    className="group px-8 py-3 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-full font-semibold hover:shadow-lg hover:shadow-[#00B7B3]/30 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                                >
                                    <GraduationCap className="w-5 h-5" />
                                    Book A Seat
                                </Link>
                                <button 
                                    onClick={() => setShowRequestForm(true)}
                                    className="px-8 py-3 border-2 border-[#00B7B3] text-[#00B7B3] rounded-full font-semibold hover:bg-[#00B7B3]/10 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                                >
                                    <Headphones className="w-5 h-5" />
                                    Request a Call
                                </button>
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

                {/* Floating Price & Enroll Bar */}
                <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-[#00B7B3]/20 py-3 hidden lg:block">
                    <div className="max-w-7xl mx-auto px-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-400">{course.title}</p>
                                <p className="text-lg font-bold text-[#00B7B3]">{course.courseFee || course.price || 'Contact Us'}</p>
                            </div>
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => setShowRequestForm(true)}
                                    className="px-6 py-2 border border-[#00B7B3] text-[#00B7B3] rounded-full text-sm font-semibold hover:bg-[#00B7B3]/10 transition"
                                >
                                    Request a Call
                                </button>
                                <Link 
                                    href={`/courses/${course.slug || courseSlug}/book`}
                                    className="px-6 py-2 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-full text-sm font-semibold hover:shadow-lg transition"
                                >
                                    Book A Seat
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content - Tabs */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Tabs */}
                    <div className="flex gap-2 border-b border-[#00B7B3]/20 mb-8 overflow-x-auto">
                        {['overview', 'curriculum', 'highlights', 'faq'].map((tab) => (
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
                                {tab === 'curriculum' && '📚 Curriculum'}
                                {tab === 'highlights' && '⭐ Highlights'}
                                {tab === 'faq' && '❓ FAQ'}
                            </button>
                        ))}
                    </div>

                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* What is Section */}
                            {course.whatIs && (
                                <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/20 rounded-2xl p-6 overflow-hidden">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Info className="w-5 h-5 text-[#00B7B3] flex-shrink-0" />
                                        <h2 className="text-xl font-bold text-white">What is {course.title.split(' - ')[0]}?</h2>
                                    </div>
                                    <div className="quill-content text-gray-300 leading-relaxed break-words" dangerouslySetInnerHTML={{ __html: course.whatIs }} />
                                </div>
                            )}

                            {/* About Course */}
                            {course.aboutCourse && (
                                <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/20 rounded-2xl p-6 overflow-hidden">
                                    <div className="flex items-center gap-2 mb-4">
                                        <BookOpen className="w-5 h-5 text-[#00B7B3] flex-shrink-0" />
                                        <h2 className="text-xl font-bold text-white">About the Course</h2>
                                    </div>
                                    <div className="quill-content text-gray-300 leading-relaxed break-words" dangerouslySetInnerHTML={{ __html: course.aboutCourse }} />
                                </div>
                            )}

                            {/* Duration Details */}
                            {course.durationDetails && (
                                <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Clock className="w-5 h-5 text-[#00B7B3] flex-shrink-0" />
                                        <h2 className="text-xl font-bold text-white">Course Duration</h2>
                                    </div>
                                    <p className="text-gray-300 break-words">{course.durationDetails}</p>
                                </div>
                            )}

                            {/* Note */}
                            {course.note && (
                                <div className="bg-[#00B7B3]/10 border border-[#00B7B3]/30 rounded-2xl p-6">
                                    <div className="flex items-start gap-3">
                                        <Video className="w-6 h-6 text-[#00B7B3] flex-shrink-0" />
                                        <div className="min-w-0">
                                            <h3 className="text-[#00B7B3] font-semibold mb-1">Important Note</h3>
                                            <p className="text-gray-300 break-words">{course.note}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Curriculum Tab */}
                    {activeTab === 'curriculum' && course.courseContent && course.courseContent.length > 0 && course.courseContent[0] !== '' && (
                        <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/20 rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <FileText className="w-5 h-5 text-[#00B7B3]" />
                                <h2 className="text-xl font-bold text-white">Course Curriculum</h2>
                            </div>
                            <div className="space-y-3">
                                {course.courseContent.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 bg-black/40 rounded-xl border border-[#00B7B3]/10 hover:border-[#00B7B3]/30 transition-all">
                                        <div className="w-6 h-6 rounded-full bg-[#00B7B3]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-[#00B7B3] text-xs font-bold">{idx + 1}</span>
                                        </div>
                                        <span className="text-gray-300 break-words">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Highlights Tab */}
                    {activeTab === 'highlights' && course.highlights && course.highlights.length > 0 && course.highlights[0] !== '' && (
                        <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/20 rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Award className="w-5 h-5 text-[#00B7B3]" />
                                <h2 className="text-xl font-bold text-white">Course Highlights</h2>
                            </div>
                            <div className="grid gap-3">
                                {course.highlights.map((highlight, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 bg-black/40 rounded-xl">
                                        <CheckCircle className="w-5 h-5 text-[#00B7B3] flex-shrink-0" />
                                        <span className="text-gray-300 break-words">{highlight}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* FAQ Tab */}
                    {activeTab === 'faq' && (
                        <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/20 rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Headphones className="w-5 h-5 text-[#00B7B3]" />
                                <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { question: 'Will I get recorded sessions?', answer: 'Yes, video recording of every session will be provided to all students after each session for revision.' },
                                    { question: 'What is the mode of teaching?', answer: `Classes are conducted ${course.type === 'Online' ? 'online via Zoom' : 'in-person'}. Live interactive sessions with Q&A.` },
                                    { question: 'Is there any certification?', answer: 'Yes, upon successful completion, you will receive a certificate from NB Astro.' },
                                    { question: 'Can I get a refund?', answer: 'Please contact our support team for refund policy details. We have a flexible refund policy for our courses.' }
                                ].map((faq, idx) => (
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

                {/* Trust Badges Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                    <div className="flex flex-wrap justify-center gap-6 text-gray-500 text-sm">
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-[#00B7B3] flex-shrink-0" />
                            <span>Secure Payment</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-[#00B7B3] flex-shrink-0" />
                            <span>1000+ Students Enrolled</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-[#00B7B3] flex-shrink-0" />
                            <span>4.9 Rating (500+ Reviews)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Video className="w-4 h-4 text-[#00B7B3] flex-shrink-0" />
                            <span>Lifetime Access to Recordings</span>
                        </div>
                    </div>
                </div>

                {/* Recent Courses Section */}
                {recentCourses.length > 0 && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles className="w-5 h-5 text-[#00B7B3]" />
                                        <span className="text-[#00B7B3] text-sm uppercase tracking-wider">Keep Learning</span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                                        Recent <span className="text-[#00B7B3]">Astrology Courses</span>
                                    </h2>
                                    <p className="text-gray-400 text-sm mt-1">Explore more courses from the same category</p>
                                </div>
                                <Link 
                                    href="/astrology-courses"
                                    className="hidden md:flex items-center gap-2 text-[#00B7B3] hover:text-white transition-colors group"
                                >
                                    <span>View All Courses</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {recentCourses.map((recentCourse) => (
                                    <Link
                                        key={recentCourse._id}
                                        href={`/courses/${recentCourse.slug || recentCourse.title.toLowerCase().replace(/\s+/g, '-')}/details`}
                                        className="group bg-gradient-to-br from-black/40 to-black/20 rounded-xl border border-[#00B7B3]/10 hover:border-[#00B7B3]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#00B7B3]/5 overflow-hidden"
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <img 
                                                src={recentCourse.image ? `${recentCourse.image}` : 'https://images.unsplash.com/photo-1507484467459-0c91be303a5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'} 
                                                alt={recentCourse.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                            <div className="absolute bottom-3 left-3">
                                                <span className="px-2 py-1 bg-black/70 backdrop-blur-sm rounded-full text-xs text-[#00B7B3] border border-[#00B7B3]/30">
                                                    {recentCourse.modules || 'Multiple'} Modules
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-white font-semibold text-base mb-1 line-clamp-1 group-hover:text-[#00B7B3] transition-colors">
                                                {recentCourse.title}
                                            </h3>
                                            <div className="flex items-baseline gap-1 mb-2">
                                                <span className="text-[#00B7B3] font-bold text-sm">{recentCourse.price || recentCourse.courseFee || 'Contact Us'}</span>
                                                {recentCourse.courseFee && <span className="text-gray-500 text-[10px]">+ GST</span>}
                                            </div>
                                            <p className="text-gray-400 text-xs line-clamp-2 mb-3">
                                                {stripHtml(recentCourse.whatIs || recentCourse.aboutCourse) || 'Discover the ancient wisdom of Vedic astrology.'}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                <Clock className="w-3 h-3" />
                                                <span>{recentCourse.courseDuration || 'Flexible'}</span>
                                                <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                                <Monitor className="w-3 h-3" />
                                                <span>{recentCourse.type || 'Online'}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Mobile View All Button */}
                            <div className="mt-6 text-center md:hidden">
                                <Link 
                                    href="/astrology-courses"
                                    className="inline-flex items-center gap-2 px-6 py-2 border border-[#00B7B3] text-[#00B7B3] rounded-full text-sm font-semibold hover:bg-[#00B7B3]/10 transition-colors"
                                >
                                    View All Courses
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Request A Call Modal */}
                {showRequestForm && (
                    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-gradient-to-br from-black to-gray-900 border border-[#00B7B3]/30 rounded-2xl max-w-md w-full p-6"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-white">Request a Call</h3>
                                <button onClick={() => setShowRequestForm(false)} className="text-gray-400 hover:text-white">✕</button>
                            </div>
                            <form onSubmit={handleRequestSubmit} className="space-y-4">
                                <input type="text" placeholder="Full Name" className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none transition" value={requestFormData.name} onChange={(e) => setRequestFormData({...requestFormData, name: e.target.value})} required />
                                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none transition" value={requestFormData.email} onChange={(e) => setRequestFormData({...requestFormData, email: e.target.value})} required />
                                <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none transition" value={requestFormData.phone} onChange={(e) => setRequestFormData({...requestFormData, phone: e.target.value})} required />
                                <textarea placeholder="Your Message (Optional)" rows="3" className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none resize-none transition" value={requestFormData.message} onChange={(e) => setRequestFormData({...requestFormData, message: e.target.value})} />
                                <button type="submit" disabled={requestSubmitting} className="w-full py-3 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-xl font-semibold hover:shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-70">
                                    {requestSubmitting ? 'Sending...' : 'Submit Request'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
                
            </div>
        </>
    );
};

export default CourseDetailsPage;
