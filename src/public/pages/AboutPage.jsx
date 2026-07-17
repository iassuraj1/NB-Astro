// import React from 'react';
// import Link from 'next/link';

// const AboutPage = () => {
//     // Professional image URLs for Naveen Bhagat Ji
//     const guruImage = "https://www.nbastro.com/attachments/pages_images/1766729644765_(1)1.png";
//     const meditationImage = "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
//     const teachingImage = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";

//     return (
//         <div>
//             {/* ============================================ */}
//             {/* HERO SECTION */}
//             {/* ============================================ */}
//             <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
//                 <div className="absolute inset-0">
//                     <img 
//                         src="https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
//                         alt="Himalayan Background"
//                         className="w-full h-full object-cover"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
//                 </div>

//                 <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
//                     <div className="max-w-2xl">
//                         <div className="inline-block px-4 py-2 rounded-full border border-[#00B7B3]/30 text-[#00B7B3] text-sm mb-6">
//                             Home / About Guru Ji
//                         </div>
                        
//                         <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
//                             About <span className="text-[#00B7B3]">Guru Ji</span>
//                         </h1>
                        
//                         <p className="text-gray-300 text-xl max-w-xl">
//                             Naveen Bhagat — Vedic Astrologer, Educator & Mentor
//                         </p>

//                         <div className="w-24 h-1 bg-[#00B7B3] mt-8"></div>
//                     </div>
//                 </div>

//                 <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
//             </div>

//             {/* ============================================ */}
//             {/* MAIN CONTENT - LEFT/RIGHT LAYOUT */}
//             {/* ============================================ */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                
//                 {/* SECTION 1: Introduction with Image - Left */}
//                 <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-20">
//                     {/* Image - Left Side */}
//                     <div className="lg:w-2/5">
//                         <div className="relative group">
//                             <div className="absolute -inset-1 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
//                             <div className="relative overflow-hidden rounded-2xl border-2 border-[#00B7B3]/20 group-hover:border-[#00B7B3]/40 transition-all duration-500">
//                                 <img 
//                                     src={guruImage}
//                                     alt="Naveen Bhagat Ji"
//                                     className="w-full h-[500px] object-cover group-hover:scale-110 transition-transform duration-700"
//                                 />
//                                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
//                                 <div className="absolute bottom-4 left-4 z-20">
//                                     <span className="px-4 py-2 bg-[#00B7B3] text-black rounded-full text-sm font-semibold">
//                                         Naveen Bhagat Ji
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Content - Right Side */}
//                     <div className="lg:w-3/5 space-y-6">
//                         <div className="inline-block p-3 bg-[#00B7B3]/10 rounded-full mb-2">
//                             <span className="text-2xl">🕉️</span>
//                         </div>
//                         <h2 className="text-3xl md:text-4xl font-bold text-white">
//                             I am <span className="text-[#00B7B3]">Naveen Bhagat</span>
//                         </h2>
//                         <p className="text-gray-300 leading-relaxed">
//                             I am Naveen Bhagat, originally from <span className="text-[#00B7B3] font-semibold">Almora</span>, a town in the Himalayan region renowned for its rich spiritual and intellectual heritage. Growing up in this environment played a formative role in shaping my perspective toward life, learning, and the classical sciences.
//                         </p>
//                         <p className="text-gray-300 leading-relaxed">
//                             I am a practicing astrologer and educator with specialized expertise in the <span className="text-[#00B7B3]">Prashna system</span> of prediction, Nakshatra-based analysis, evaluation of the Promise of a horoscope, and the systematic application of <span className="text-[#00B7B3]">Vimshottari Dasha</span>. Since beginning my astrological journey in <span className="text-[#00B7B3] font-semibold">2013</span>, I have focused on developing a structured, logical, and reproducible approach to predictive astrology—rooted firmly in Shastric principles.
//                         </p>
//                     </div>
//                 </div>

//                 {/* SECTION 2: Teaching Philosophy - Image Right */}
//                 <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16 mb-20">
//                     {/* Image - Right Side */}
//                     <div className="lg:w-2/5">
//                         <div className="relative group">
//                             <div className="absolute -inset-1 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
//                             <div className="relative overflow-hidden rounded-2xl border-2 border-[#00B7B3]/20 group-hover:border-[#00B7B3]/40 transition-all duration-500">
//                                 <img 
//                                     src={teachingImage}
//                                     alt="Teaching Philosophy"
//                                     className="w-full h-[350px] object-cover group-hover:scale-110 transition-transform duration-700"
//                                 />
//                                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
//                                 <div className="absolute bottom-4 left-4 z-20">
//                                     <span className="px-4 py-2 bg-[#00B7B3] text-black rounded-full text-sm font-semibold">
//                                         Teaching
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Content - Left Side */}
//                     <div className="lg:w-3/5 space-y-6">
//                         <h3 className="text-2xl md:text-3xl font-bold text-white">
//                             Teaching <span className="text-[#00B7B3]">Philosophy</span>
//                         </h3>
//                         <p className="text-gray-300 leading-relaxed">
//                             In my teaching methodology, I place strong emphasis on fundamentals and first principles. I believe clarity in basics is essential for accuracy in prediction. My approach is systematic and analytical, aimed at simplifying complex astrological concepts so that students can apply them confidently, precisely, and effectively.
//                         </p>
//                         <p className="text-gray-300 leading-relaxed">
//                             I regularly teach structured courses, conduct one-to-one consultations, and mentor serious students who wish to move beyond superficial astrology into authentic predictive mastery and Vedantic understanding. Over the years, I have taught Prashna and Nakshatra-based astrology to students across the globe through both in-person and online sessions.
//                         </p>
//                     </div>
//                 </div>

//                 {/* SECTION 3: Consultation Approach - Image Left */}
//                 <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-20">
//                     {/* Image - Left Side */}
//                     <div className="lg:w-2/5">
//                         <div className="relative group">
//                             <div className="absolute -inset-1 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
//                             <div className="relative overflow-hidden rounded-2xl border-2 border-[#00B7B3]/20 group-hover:border-[#00B7B3]/40 transition-all duration-500">
//                                 <img 
//                                     src={meditationImage}
//                                     alt="Consultation Approach"
//                                     className="w-full h-[350px] object-cover group-hover:scale-110 transition-transform duration-700"
//                                 />
//                                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
//                                 <div className="absolute bottom-4 left-4 z-20">
//                                     <span className="px-4 py-2 bg-[#00B7B3] text-black rounded-full text-sm font-semibold">
//                                         Consultation
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Content - Right Side */}
//                     <div className="lg:w-3/5 space-y-6">
//                         <h3 className="text-2xl md:text-3xl font-bold text-white">
//                             Consultation <span className="text-[#00B7B3]">Approach</span>
//                         </h3>
//                         <p className="text-gray-300 leading-relaxed">
//                             My consultation process focuses on identifying deep-rooted patterns, tendencies, habits, and psychological impressions reflected in the horoscope, and understanding how they manifest across different areas of life. The objective is not prediction alone, but guidance toward self-awareness, improvement, and informed decision-making aligned with timing and responsibility.
//                         </p>
//                         <p className="text-gray-300 leading-relaxed italic border-l-4 border-[#00B7B3] pl-6">
//                             I do not view astrology as a tool for fortune telling. Rather, I consider it a framework for understanding life patterns, duties, and cycles, enabling individuals to align their actions with awareness, purpose, and dharma.
//                         </p>
//                     </div>
//                 </div>

//                 {/* SECTION 4: Expertise & Beyond */}
//                 <div className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm border border-[#00B7B3]/20 rounded-3xl p-8 lg:p-10 mb-20">
//                     <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
//                         Areas of <span className="text-[#00B7B3]">Expertise</span>
//                     </h3>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                         <div className="bg-black/40 border border-[#00B7B3]/10 rounded-xl p-5">
//                             <p className="text-gray-300 flex items-center gap-2">
//                                 <span className="text-[#00B7B3]">•</span> Predictive Nakshatra-based astrology
//                             </p>
//                         </div>
//                         <div className="bg-black/40 border border-[#00B7B3]/10 rounded-xl p-5">
//                             <p className="text-gray-300 flex items-center gap-2">
//                                 <span className="text-[#00B7B3]">•</span> Career growth & leadership transitions
//                             </p>
//                         </div>
//                         <div className="bg-black/40 border border-[#00B7B3]/10 rounded-xl p-5">
//                             <p className="text-gray-300 flex items-center gap-2">
//                                 <span className="text-[#00B7B3]">•</span> Marriage & relationships
//                             </p>
//                         </div>
//                         <div className="bg-black/40 border border-[#00B7B3]/10 rounded-xl p-5">
//                             <p className="text-gray-300 flex items-center gap-2">
//                                 <span className="text-[#00B7B3]">•</span> Financial cycles & reputation management
//                             </p>
//                         </div>
//                         <div className="bg-black/40 border border-[#00B7B3]/10 rounded-xl p-5">
//                             <p className="text-gray-300 flex items-center gap-2">
//                                 <span className="text-[#00B7B3]">•</span> Spiritual progress & life milestones
//                             </p>
//                         </div>
//                         <div className="bg-black/40 border border-[#00B7B3]/10 rounded-xl p-5">
//                             <p className="text-gray-300 flex items-center gap-2">
//                                 <span className="text-[#00B7B3]">•</span> Vastu Shastra & guided meditation
//                             </p>
//                         </div>
//                     </div>

//                     <p className="text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
//                         My work emphasizes accuracy, practicality, and real-world outcomes, rather than generic interpretations.
//                     </p>
//                 </div>

//                 {/* SECTION 5: Beyond Astrology & Current Location */}
//                 <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-20">
//                     {/* Content - Left Side */}
//                     <div className="lg:w-1/2 space-y-6">
//                         <h3 className="text-2xl md:text-3xl font-bold text-white">
//                             Beyond <span className="text-[#00B7B3]">Astrology</span>
//                         </h3>
//                         <p className="text-gray-300 leading-relaxed">
//                             Alongside astrology, my work extends into <span className="text-[#00B7B3]">Vastu Shastra, guided meditation, and Advaita Vedanta</span>, with a strong emphasis on Śravaṇa–Manana–Nididhyāsana as a disciplined path to inner transformation and self-knowledge. I have been deeply influenced by the teachings of <span className="text-[#00B7B3]">Adi Guru Shankaracharya</span>, which continue to inform both my worldview and professional approach.
//                         </p>
                        
//                         <h3 className="text-2xl md:text-3xl font-bold text-white mt-8">
//                             Current <span className="text-[#00B7B3]">Location</span>
//                         </h3>
//                         <p className="text-gray-300 leading-relaxed">
//                             Currently based in <span className="text-[#00B7B3] font-semibold">Greater Noida</span>, I work with professionals, entrepreneurs, CXOs, and founders who value precision, timing, confidentiality, and strategic foresight in both personal and professional domains. My consultations are structured, analytical, and aligned with real-life decision-making.
//                         </p>
//                     </div>

//                     {/* Image - Right Side */}
//                     <div className="lg:w-1/2">
//                         <div className="relative group">
//                             <div className="absolute -inset-1 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
//                             <div className="relative overflow-hidden rounded-2xl border-2 border-[#00B7B3]/20 group-hover:border-[#00B7B3]/40 transition-all duration-500">
//                                 <img 
//                                     src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
//                                     alt="Greater Noida"
//                                     className="w-full h-[350px] object-cover group-hover:scale-110 transition-transform duration-700"
//                                 />
//                                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
//                                 <div className="absolute bottom-4 left-4 z-20">
//                                     <span className="px-4 py-2 bg-[#00B7B3] text-black rounded-full text-sm font-semibold">
//                                         Greater Noida
//                                     </span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Decorative Divider */}
//                 <div className="relative my-16">
//                     <div className="absolute inset-0 flex items-center">
//                         <div className="w-full border-t border-[#00B7B3]/20"></div>
//                     </div>
//                     <div className="relative flex justify-center">
//                         <span className="bg-gradient-to-br from-black/80 to-black/60 px-6 py-3 rounded-full border border-[#00B7B3]/30 text-[#00B7B3]">
//                             ॐ
//                         </span>
//                     </div>
//                 </div>

//                 {/* CTA Section */}
//                 <div className="text-center">
//                     <h3 className="text-2xl font-bold text-white mb-6">
//                         Begin Your Journey with <span className="text-[#00B7B3]">Guru Ji</span>
//                     </h3>
//                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                         <Link
//                             href="/astrology-consultation"
//                             className="px-8 py-4 bg-[#00B7B3] text-black rounded-xl font-semibold hover:bg-[#33C5C2] transform hover:scale-105 transition-all duration-300"
//                         >
//                             Book Consultation
//                         </Link>
//                         <Link
//                             href="/courses"
//                             className="px-8 py-4 border-2 border-[#00B7B3] text-[#00B7B3] rounded-xl font-semibold hover:bg-[#00B7B3]/10 transform hover:scale-105 transition-all duration-300"
//                         >
//                             Explore Courses
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AboutPage;




// // public/pages/AboutPage.jsx
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Helmet } from 'react-helmet';
// import { Loader2 } from 'lucide-react';
// import { aboutPageAPI } from '../../admin/services/api';

// const AboutPage = () => {
//     const [loading, setLoading] = useState(true);
//     const [content, setContent] = useState(null);

//     useEffect(() => {
//         fetchContent();
//     }, []);

//     const fetchContent = async () => {
//         setLoading(true);
//         try {
//             const { data } = await aboutPageAPI.getContent();
//             if (data.success && data.data) {
//                 setContent(data.data);
//                 console.log('About page content loaded:', data.data);
//             }
//         } catch (error) {
//             console.error('Error fetching about page content:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-black flex items-center justify-center">
//                 <Loader2 className="w-12 h-12 text-[#00B7B3] animate-spin" />
//             </div>
//         );
//     }

//     const seoTitle = content?.seoTitle || 'About Naveen Bhagat - Vedic Astrologer | NB Astro';
//     const seoDescription = content?.seoDescription || 'Meet Naveen Bhagat, a renowned Vedic astrologer with expertise in Prashna system and Nakshatra-based analysis.';
//     const seoKeywords = content?.seoKeywords || 'naveen bhagat, vedic astrologer, astrology expert';

//     return (
//         <>
//             <Helmet>
//                 <title>{seoTitle}</title>
//                 <meta name="description" content={seoDescription} />
//                 <meta name="keywords" content={seoKeywords} />
//                 <meta property="og:title" content={seoTitle} />
//                 <meta property="og:description" content={seoDescription} />
//                 <meta property="og:type" content="website" />
//                 <meta property="og:image" content={content?.hero?.image || 'https://nbastro.com/about-og-image.jpg'} />
//             </Helmet>

//             <div>
//                 {/* HERO SECTION */}
//                 <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
//                     <div className="absolute inset-0">
//                         <img 
//                             src={content?.hero?.image || 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'} 
//                             alt="Hero Background"
//                             className="w-full h-full object-cover"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
//                     </div>

//                     <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
//                         <div className="max-w-2xl">
//                             <div className="inline-block px-4 py-2 rounded-full border border-[#00B7B3]/30 text-[#00B7B3] text-sm mb-6">
//                                 {content?.hero?.breadcrumbText || 'Home / About Guru Ji'}
//                             </div>
                            
//                             <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
//                                 {content?.hero?.title || 'About'} <span className="text-[#00B7B3]">{content?.hero?.subtitle || 'Guru Ji'}</span>
//                             </h1>
                            
//                             <p className="text-gray-300 text-xl max-w-xl">
//                                 {content?.hero?.description || 'Naveen Bhagat — Vedic Astrologer, Educator & Mentor'}
//                             </p>

//                             <div className="w-24 h-1 bg-[#00B7B3] mt-8"></div>
//                         </div>
//                     </div>

//                     <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
//                 </div>

//                 {/* MAIN CONTENT */}
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    
//                     {/* SECTION 1: Introduction */}
//                     {content?.introduction && (
//                         <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-20">
//                             <div className="lg:w-2/5">
//                                 <div className="relative group">
//                                     <div className="absolute -inset-1 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
//                                     <div className="relative overflow-hidden rounded-2xl border-2 border-[#00B7B3]/20 group-hover:border-[#00B7B3]/40 transition-all duration-500">
//                                         <img 
//                                             src={content.introduction.image || 'https://www.nbastro.com/attachments/pages_images/1766729644765_(1)1.png'}
//                                             alt={content.introduction.imageAlt || 'Naveen Bhagat Ji'}
//                                             className="w-full h-[500px] object-cover group-hover:scale-110 transition-transform duration-700"
//                                         />
//                                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
//                                         {content.introduction.badgeText && (
//                                             <div className="absolute bottom-4 left-4 z-20">
//                                                 <span className="px-4 py-2 bg-[#00B7B3] text-black rounded-full text-sm font-semibold">
//                                                     {content.introduction.badgeText}
//                                                 </span>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="lg:w-3/5 space-y-6">
//                                 {content.introduction.badgeText && (
//                                     <div className="inline-block p-3 bg-[#00B7B3]/10 rounded-full mb-2">
//                                         <span className="text-2xl">{content.introduction.badgeText}</span>
//                                     </div>
//                                 )}
//                                 <h2 className="text-3xl md:text-4xl font-bold text-white">
//                                     {content.introduction.title || 'I am'} <span className="text-[#00B7B3]">{content.introduction.subtitle || 'Naveen Bhagat'}</span>
//                                 </h2>
//                                 <div className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.introduction.content }} />
//                             </div>
//                         </div>
//                     )}

//                     {/* SECTION 2: Teaching Philosophy */}
//                     {content?.teaching && (
//                         <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16 mb-20">
//                             <div className="lg:w-2/5">
//                                 <div className="relative group">
//                                     <div className="absolute -inset-1 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
//                                     <div className="relative overflow-hidden rounded-2xl border-2 border-[#00B7B3]/20 group-hover:border-[#00B7B3]/40 transition-all duration-500">
//                                         <img 
//                                             src={content.teaching.image || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
//                                             alt={content.teaching.imageAlt || 'Teaching Philosophy'}
//                                             className="w-full h-[350px] object-cover group-hover:scale-110 transition-transform duration-700"
//                                         />
//                                         {content.teaching.badgeText && (
//                                             <div className="absolute bottom-4 left-4 z-20">
//                                                 <span className="px-4 py-2 bg-[#00B7B3] text-black rounded-full text-sm font-semibold">
//                                                     {content.teaching.badgeText}
//                                                 </span>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="lg:w-3/5 space-y-6">
//                                 <h3 className="text-2xl md:text-3xl font-bold text-white">
//                                     {content.teaching.title || 'Teaching'} <span className="text-[#00B7B3]">Philosophy</span>
//                                 </h3>
//                                 <div className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.teaching.content }} />
//                             </div>
//                         </div>
//                     )}

//                     {/* SECTION 3: Consultation */}
//                     {content?.consultation && (
//                         <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-20">
//                             <div className="lg:w-2/5">
//                                 <div className="relative group">
//                                     <div className="absolute -inset-1 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
//                                     <div className="relative overflow-hidden rounded-2xl border-2 border-[#00B7B3]/20 group-hover:border-[#00B7B3]/40 transition-all duration-500">
//                                         <img 
//                                             src={content.consultation.image || 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
//                                             alt={content.consultation.imageAlt || 'Consultation Approach'}
//                                             className="w-full h-[350px] object-cover group-hover:scale-110 transition-transform duration-700"
//                                         />
//                                         {content.consultation.badgeText && (
//                                             <div className="absolute bottom-4 left-4 z-20">
//                                                 <span className="px-4 py-2 bg-[#00B7B3] text-black rounded-full text-sm font-semibold">
//                                                     {content.consultation.badgeText}
//                                                 </span>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="lg:w-3/5 space-y-6">
//                                 <h3 className="text-2xl md:text-3xl font-bold text-white">
//                                     {content.consultation.title || 'Consultation'} <span className="text-[#00B7B3]">Approach</span>
//                                 </h3>
//                                 <div className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.consultation.content }} />
//                                 {content.consultation.quote && (
//                                     <p className="text-gray-300 leading-relaxed italic border-l-4 border-[#00B7B3] pl-6">
//                                         {content.consultation.quote}
//                                     </p>
//                                 )}
//                             </div>
//                         </div>
//                     )}

//                     {/* SECTION 4: Expertise */}
//                     {content?.expertise && content.expertise.items && content.expertise.items.length > 0 && (
//                         <div className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm border border-[#00B7B3]/20 rounded-3xl p-8 lg:p-10 mb-20">
//                             <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
//                                 {content.expertise.title || 'Areas of'} <span className="text-[#00B7B3]">Expertise</span>
//                             </h3>
                            
//                             {content.expertise.description && (
//                                 <p className="text-gray-400 text-center mb-6">{content.expertise.description}</p>
//                             )}
                            
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                                 {content.expertise.items.map((item, idx) => (
//                                     item.text && (
//                                         <div key={idx} className="bg-black/40 border border-[#00B7B3]/10 rounded-xl p-5">
//                                             <p className="text-gray-300 flex items-center gap-2">
//                                                 <span className="text-[#00B7B3]">•</span> {item.text}
//                                             </p>
//                                         </div>
//                                     )
//                                 ))}
//                             </div>

//                             {content.expertise.footerText && (
//                                 <p className="text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
//                                     {content.expertise.footerText}
//                                 </p>
//                             )}
//                         </div>
//                     )}

//                     {/* SECTION 5: Beyond Astrology */}
//                     {content?.beyond && (
//                         <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-20">
//                             <div className="lg:w-1/2 space-y-6">
//                                 <h3 className="text-2xl md:text-3xl font-bold text-white">
//                                     {content.beyond.title || 'Beyond'} <span className="text-[#00B7B3]">Astrology</span>
//                                 </h3>
//                                 <div className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.beyond.content }} />
//                             </div>

//                             <div className="lg:w-1/2">
//                                 <div className="relative group">
//                                     <div className="absolute -inset-1 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
//                                     <div className="relative overflow-hidden rounded-2xl border-2 border-[#00B7B3]/20 group-hover:border-[#00B7B3]/40 transition-all duration-500">
//                                         <img 
//                                             src={content.beyond.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
//                                             alt={content.beyond.imageAlt || 'Beyond Astrology'}
//                                             className="w-full h-[350px] object-cover group-hover:scale-110 transition-transform duration-700"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* SECTION 6: Location */}
//                     {content?.location && (
//                         <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16 mb-20">
//                             <div className="lg:w-1/2">
//                                 <div className="relative group">
//                                     <div className="absolute -inset-1 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
//                                     <div className="relative overflow-hidden rounded-2xl border-2 border-[#00B7B3]/20 group-hover:border-[#00B7B3]/40 transition-all duration-500">
//                                         <img 
//                                             src={content.location.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
//                                             alt={content.location.imageAlt || 'Greater Noida'}
//                                             className="w-full h-[350px] object-cover group-hover:scale-110 transition-transform duration-700"
//                                         />
//                                         {content.location.placeName && (
//                                             <div className="absolute bottom-4 left-4 z-20">
//                                                 <span className="px-4 py-2 bg-[#00B7B3] text-black rounded-full text-sm font-semibold">
//                                                     {content.location.placeName}
//                                                 </span>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="lg:w-1/2 space-y-6">
//                                 <h3 className="text-2xl md:text-3xl font-bold text-white">
//                                     {content.location.title || 'Current'} <span className="text-[#00B7B3]">Location</span>
//                                 </h3>
//                                 <div className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.location.description }} />
//                             </div>
//                         </div>
//                     )}

//                     {/* Decorative Divider */}
//                     <div className="relative my-16">
//                         <div className="absolute inset-0 flex items-center">
//                             <div className="w-full border-t border-[#00B7B3]/20"></div>
//                         </div>
//                         <div className="relative flex justify-center">
//                             <span className="bg-gradient-to-br from-black/80 to-black/60 px-6 py-3 rounded-full border border-[#00B7B3]/30 text-[#00B7B3]">
//                                 ॐ
//                             </span>
//                         </div>
//                     </div>

//                     {/* CTA Section */}
//                     {content?.cta && (
//                         <div className="text-center">
//                             <h3 className="text-2xl font-bold text-white mb-6">
//                                 {content.cta.title || 'Begin Your Journey with'} <span className="text-[#00B7B3]">Guru Ji</span>
//                             </h3>
//                             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                                 {content.cta.buttonOneText && (
//                                     <Link
//                                         href={content.cta.buttonOneLink || '/astrology-consultation'}
//                                         className="px-8 py-4 bg-[#00B7B3] text-black rounded-xl font-semibold hover:bg-[#33C5C2] transform hover:scale-105 transition-all duration-300"
//                                     >
//                                         {content.cta.buttonOneText}
//                                     </Link>
//                                 )}
//                                 {content.cta.buttonTwoText && (
//                                     <Link
//                                         href={content.cta.buttonTwoLink || '/astrology-courses'}
//                                         className="px-8 py-4 border-2 border-[#00B7B3] text-[#00B7B3] rounded-xl font-semibold hover:bg-[#00B7B3]/10 transform hover:scale-105 transition-all duration-300"
//                                     >
//                                         {content.cta.buttonTwoText}
//                                     </Link>
//                                 )}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AboutPage;



// // public/pages/AboutPage.jsx
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Helmet } from 'react-helmet';
// import { Loader2 } from 'lucide-react';
// import { aboutPageAPI } from '../../admin/services/api';

// const AboutPage = () => {
//     const [loading, setLoading] = useState(true);
//     const [content, setContent] = useState(null);

//     useEffect(() => {
//         fetchContent();
//     }, []);

//     const fetchContent = async () => {
//         setLoading(true);
//         try {
//             const { data } = await aboutPageAPI.getContent();
//             if (data.success && data.data) {
//                 setContent(data.data);
//                 console.log('About page content loaded:', data.data);
//             }
//         } catch (error) {
//             console.error('Error fetching about page content:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-black flex items-center justify-center">
//                 <Loader2 className="w-12 h-12 text-[#00B7B3] animate-spin" />
//             </div>
//         );
//     }

//     const seoTitle = content?.seoTitle || 'About Naveen Bhagat - Vedic Astrologer | NB Astro';
//     const seoDescription = content?.seoDescription || 'Meet Naveen Bhagat, a renowned Vedic astrologer with expertise in Prashna system and Nakshatra-based analysis.';
//     const seoKeywords = content?.seoKeywords || 'naveen bhagat, vedic astrologer, astrology expert';

//     return (
//         <>
//             <Helmet>
//                 <title>{seoTitle}</title>
//                 <meta name="description" content={seoDescription} />
//                 <meta name="keywords" content={seoKeywords} />
//                 <meta property="og:title" content={seoTitle} />
//                 <meta property="og:description" content={seoDescription} />
//                 <meta property="og:type" content="website" />
//                 <meta property="og:image" content={content?.hero?.image || 'https://nbastro.com/about-og-image.jpg'} />
//             </Helmet>

//             <div>
//                 {/* ============================================ */}
//                 {/* HERO SECTION */}
//                 {/* ============================================ */}
//                 <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
//                     <div className="absolute inset-0">
//                         <img 
//                             src={content?.hero?.image || 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'} 
//                             alt="Himalayan Background"
//                             className="w-full h-full object-cover"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
//                     </div>

//                     <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
//                         <div className="max-w-2xl">
//                             <div className="inline-block px-4 py-2 rounded-full border border-[#00B7B3]/30 text-[#00B7B3] text-sm mb-6">
//                                 {content?.hero?.breadcrumbText || 'Home / About Guru Ji'}
//                             </div>
                            
//                             <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
//                                 {content?.hero?.title || 'About'} <span className="text-[#00B7B3]">{content?.hero?.subtitle || 'Guru Ji'}</span>
//                             </h1>
                            
//                             <p className="text-gray-300 text-xl max-w-xl">
//                                 {content?.hero?.description || 'Naveen Bhagat — Vedic Astrologer, Educator & Mentor'}
//                             </p>

//                             <div className="w-24 h-1 bg-[#00B7B3] mt-8"></div>
//                         </div>
//                     </div>

//                     <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
//                 </div>

//                 {/* ============================================ */}
//                 {/* MAIN CONTENT - LEFT/RIGHT LAYOUT */}
//                 {/* ============================================ */}
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    
//                     {/* SECTION 1: Introduction with Image - Left */}
//                     {content?.introduction && (
//                         <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-20">
//                             {/* Image - Left Side */}
//                             <div className="lg:w-2/5">
//                                 <div className="relative group">
//                                     <div className="absolute -inset-1 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
//                                     <div className="relative overflow-hidden rounded-2xl border-2 border-[#00B7B3]/20 group-hover:border-[#00B7B3]/40 transition-all duration-500">
//                                         <img 
//                                             src={content.introduction.image || 'https://www.nbastro.com/attachments/pages_images/1766729644765_(1)1.png'}
//                                             alt={content.introduction.imageAlt || 'Naveen Bhagat Ji'}
//                                             className="w-full h-[500px] object-cover group-hover:scale-110 transition-transform duration-700"
//                                         />
//                                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
//                                         <div className="absolute bottom-4 left-4 z-20">
//                                             <span className="px-4 py-2 bg-[#00B7B3] text-black rounded-full text-sm font-semibold">
//                                                 {content.introduction.badgeText || 'Naveen Bhagat Ji'}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Content - Right Side */}
//                             <div className="lg:w-3/5 space-y-6">
//                                 <div className="inline-block p-3 bg-[#00B7B3]/10 rounded-full mb-2">
//                                     <span className="text-2xl">{content.introduction.badgeText || '🕉️'}</span>
//                                 </div>
//                                 <h2 className="text-3xl md:text-4xl font-bold text-white">
//                                     {content.introduction.title || 'I am'} <span className="text-[#00B7B3]">{content.introduction.subtitle || 'Naveen Bhagat'}</span>
//                                 </h2>
//                                 <div className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.introduction.content }} />
//                             </div>
//                         </div>
//                     )}

//                     {/* SECTION 2: Teaching Philosophy - Image Right */}
//                     {content?.teaching && (
//                         <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16 mb-20">
//                             {/* Image - Right Side */}
//                             <div className="lg:w-2/5">
//                                 <div className="relative group">
//                                     <div className="absolute -inset-1 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
//                                     <div className="relative overflow-hidden rounded-2xl border-2 border-[#00B7B3]/20 group-hover:border-[#00B7B3]/40 transition-all duration-500">
//                                         <img 
//                                             src={content.teaching.image || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
//                                             alt={content.teaching.imageAlt || 'Teaching Philosophy'}
//                                             className="w-full h-[350px] object-cover group-hover:scale-110 transition-transform duration-700"
//                                         />
//                                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
//                                         <div className="absolute bottom-4 left-4 z-20">
//                                             <span className="px-4 py-2 bg-[#00B7B3] text-black rounded-full text-sm font-semibold">
//                                                 {content.teaching.badgeText || 'Teaching'}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Content - Left Side */}
//                             <div className="lg:w-3/5 space-y-6">
//                                 <h3 className="text-2xl md:text-3xl font-bold text-white">
//                                     {content.teaching.title || 'Teaching'} <span className="text-[#00B7B3]">Philosophy</span>
//                                 </h3>
//                                 <div className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.teaching.content }} />
//                             </div>
//                         </div>
//                     )}

//                     {/* SECTION 3: Consultation Approach - Image Left */}
//                     {content?.consultation && (
//                         <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-20">
//                             {/* Image - Left Side */}
//                             <div className="lg:w-2/5">
//                                 <div className="relative group">
//                                     <div className="absolute -inset-1 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
//                                     <div className="relative overflow-hidden rounded-2xl border-2 border-[#00B7B3]/20 group-hover:border-[#00B7B3]/40 transition-all duration-500">
//                                         <img 
//                                             src={content.consultation.image || 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
//                                             alt={content.consultation.imageAlt || 'Consultation Approach'}
//                                             className="w-full h-[350px] object-cover group-hover:scale-110 transition-transform duration-700"
//                                         />
//                                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
//                                         <div className="absolute bottom-4 left-4 z-20">
//                                             <span className="px-4 py-2 bg-[#00B7B3] text-black rounded-full text-sm font-semibold">
//                                                 {content.consultation.badgeText || 'Consultation'}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Content - Right Side */}
//                             <div className="lg:w-3/5 space-y-6">
//                                 <h3 className="text-2xl md:text-3xl font-bold text-white">
//                                     {content.consultation.title || 'Consultation'} <span className="text-[#00B7B3]">Approach</span>
//                                 </h3>
//                                 <div className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.consultation.content }} />
//                                 {content.consultation.quote && (
//                                     <p className="text-gray-300 leading-relaxed italic border-l-4 border-[#00B7B3] pl-6">
//                                         {content.consultation.quote}
//                                     </p>
//                                 )}
//                             </div>
//                         </div>
//                     )}

//                     {/* SECTION 4: Expertise & Beyond */}
//                     {content?.expertise && content.expertise.items && content.expertise.items.length > 0 && (
//                         <div className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm border border-[#00B7B3]/20 rounded-3xl p-8 lg:p-10 mb-20">
//                             <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
//                                 {content.expertise.title || 'Areas of'} <span className="text-[#00B7B3]">Expertise</span>
//                             </h3>
                            
//                             {content.expertise.description && (
//                                 <p className="text-gray-400 text-center mb-6">{content.expertise.description}</p>
//                             )}
                            
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                                 {content.expertise.items.map((item, idx) => (
//                                     item.text && (
//                                         <div key={idx} className="bg-black/40 border border-[#00B7B3]/10 rounded-xl p-5">
//                                             <p className="text-gray-300 flex items-center gap-2">
//                                                 <span className="text-[#00B7B3]">•</span> {item.text}
//                                             </p>
//                                         </div>
//                                     )
//                                 ))}
//                             </div>

//                             {content.expertise.footerText && (
//                                 <p className="text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
//                                     {content.expertise.footerText}
//                                 </p>
//                             )}
//                         </div>
//                     )}

//                     {/* SECTION 5: Beyond Astrology & Current Location */}
//                     <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-20">
//                         {/* Content - Left Side */}
//                         <div className="lg:w-1/2 space-y-6">
//                             {content?.beyond && (
//                                 <>
//                                     <h3 className="text-2xl md:text-3xl font-bold text-white">
//                                         {content.beyond.title || 'Beyond'} <span className="text-[#00B7B3]">Astrology</span>
//                                     </h3>
//                                     <div className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.beyond.content }} />
//                                 </>
//                             )}
                            
//                             {content?.location && (
//                                 <>
//                                     <h3 className="text-2xl md:text-3xl font-bold text-white mt-8">
//                                         {content.location.title || 'Current'} <span className="text-[#00B7B3]">Location</span>
//                                     </h3>
//                                     <div className="text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.location.description }} />
//                                 </>
//                             )}
//                         </div>

//                         {/* Image - Right Side */}
//                         <div className="lg:w-1/2">
//                             <div className="relative group">
//                                 <div className="absolute -inset-1 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
//                                 <div className="relative overflow-hidden rounded-2xl border-2 border-[#00B7B3]/20 group-hover:border-[#00B7B3]/40 transition-all duration-500">
//                                     <img 
//                                         src={content?.beyond?.image || content?.location?.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
//                                         alt={content?.beyond?.imageAlt || content?.location?.imageAlt || 'Greater Noida'}
//                                         className="w-full h-[350px] object-cover group-hover:scale-110 transition-transform duration-700"
//                                     />
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
//                                     <div className="absolute bottom-4 left-4 z-20">
//                                         <span className="px-4 py-2 bg-[#00B7B3] text-black rounded-full text-sm font-semibold">
//                                             {content?.location?.placeName || 'Greater Noida'}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Decorative Divider */}
//                     <div className="relative my-16">
//                         <div className="absolute inset-0 flex items-center">
//                             <div className="w-full border-t border-[#00B7B3]/20"></div>
//                         </div>
//                         <div className="relative flex justify-center">
//                             <span className="bg-gradient-to-br from-black/80 to-black/60 px-6 py-3 rounded-full border border-[#00B7B3]/30 text-[#00B7B3]">
//                                 ॐ
//                             </span>
//                         </div>
//                     </div>

//                     {/* CTA Section */}
//                     {content?.cta && (
//                         <div className="text-center">
//                             <h3 className="text-2xl font-bold text-white mb-6">
//                                 {content.cta.title || 'Begin Your Journey with'} <span className="text-[#00B7B3]">Guru Ji</span>
//                             </h3>
//                             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                                 {content.cta.buttonOneText && (
//                                     <Link
//                                         href={content.cta.buttonOneLink || '/astrology-consultation'}
//                                         className="px-8 py-4 bg-[#00B7B3] text-black rounded-xl font-semibold hover:bg-[#33C5C2] transform hover:scale-105 transition-all duration-300"
//                                     >
//                                         {content.cta.buttonOneText}
//                                     </Link>
//                                 )}
//                                 {content.cta.buttonTwoText && (
//                                     <Link
//                                         href={content.cta.buttonTwoLink || '/astrology-courses'}
//                                         className="px-8 py-4 border-2 border-[#00B7B3] text-[#00B7B3] rounded-xl font-semibold hover:bg-[#00B7B3]/10 transform hover:scale-105 transition-all duration-300"
//                                     >
//                                         {content.cta.buttonTwoText}
//                                     </Link>
//                                 )}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AboutPage;




// // public/pages/AboutPage.jsx
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Helmet } from 'react-helmet';
// import { Loader2 } from 'lucide-react';
// import { aboutPageAPI } from '../../admin/services/api';

// const AboutPage = () => {
//     const [loading, setLoading] = useState(true);
//     const [content, setContent] = useState(null);

//     useEffect(() => {
//         fetchContent();
//     }, []);

//     const fetchContent = async () => {
//         setLoading(true);
//         try {
//             const { data } = await aboutPageAPI.getContent();
//             if (data.success && data.data) {
//                 setContent(data.data);
//                 console.log('About page content loaded:', data.data);
//             }
//         } catch (error) {
//             console.error('Error fetching about page content:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-black flex items-center justify-center">
//                 <Loader2 className="w-12 h-12 text-[#00B7B3] animate-spin" />
//             </div>
//         );
//     }

//     const seoTitle = content?.seoTitle || 'About Naveen Bhagat - Vedic Astrologer | NB Astro';
//     const seoDescription = content?.seoDescription || 'Meet Naveen Bhagat, a renowned Vedic astrologer with expertise in Prashna system and Nakshatra-based analysis.';
//     const seoKeywords = content?.seoKeywords || 'naveen bhagat, vedic astrologer, astrology expert';

//     return (
//         <>
//             <Helmet>
//                 <title>{seoTitle}</title>
//                 <meta name="description" content={seoDescription} />
//                 <meta name="keywords" content={seoKeywords} />
//                 <meta property="og:title" content={seoTitle} />
//                 <meta property="og:description" content={seoDescription} />
//                 <meta property="og:type" content="website" />
//                 <meta property="og:image" content={content?.hero?.image || 'https://nbastro.com/about-og-image.jpg'} />
//             </Helmet>

//             {/* Add overflow-x-hidden to the main container */}
//             <div className="overflow-x-hidden w-full">
//                 {/* ============================================ */}
//                 {/* HERO SECTION */}
//                 {/* ============================================ */}
//                 <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
//                     <div className="absolute inset-0">
//                         <img 
//                             src={content?.hero?.image || 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'} 
//                             alt="Himalayan Background"
//                             className="w-full h-full object-cover"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
//                     </div>

//                     <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
//                         <div className="max-w-2xl">
//                             <div className="inline-block px-4 py-2 rounded-full border border-[#00B7B3]/30 text-[#00B7B3] text-sm mb-6">
//                                 {content?.hero?.breadcrumbText || 'Home / About Guru Ji'}
//                             </div>
                            
//                             <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 break-words">
//                                 {content?.hero?.title || 'About'} <span className="text-[#00B7B3]">{content?.hero?.subtitle || 'Guru Ji'}</span>
//                             </h1>
                            
//                             <p className="text-gray-300 text-xl max-w-xl break-words">
//                                 {content?.hero?.description || 'Naveen Bhagat — Vedic Astrologer, Educator & Mentor'}
//                             </p>

//                             <div className="w-24 h-1 bg-[#00B7B3] mt-8"></div>
//                         </div>
//                     </div>

//                     <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
//                 </div>

//                 {/* ============================================ */}
//                 {/* MAIN CONTENT - LEFT/RIGHT LAYOUT */}
//                 {/* ============================================ */}
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full overflow-hidden">
                    
//                     {/* SECTION 1: Introduction with Image - Left */}
//                     {content?.introduction && (
//                         <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-20">
//                             {/* Image - Left Side */}
//                             <div className="lg:w-2/5 w-full">
//                                 <div className="relative group">
//                                     <div className="absolute -inset-1 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
//                                     <div className="relative overflow-hidden rounded-2xl border-2 border-[#00B7B3]/20 group-hover:border-[#00B7B3]/40 transition-all duration-500">
//                                         <img 
//                                             src={content.introduction.image || 'https://www.nbastro.com/attachments/pages_images/1766729644765_(1)1.png'}
//                                             alt={content.introduction.imageAlt || 'Naveen Bhagat Ji'}
//                                             className="w-full h-[500px] object-cover group-hover:scale-110 transition-transform duration-700"
//                                         />
//                                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
//                                         <div className="absolute bottom-4 left-4 z-20">
//                                             <span className="px-4 py-2 bg-[#00B7B3] text-black rounded-full text-sm font-semibold">
//                                                 {content.introduction.badgeText || 'Naveen Bhagat Ji'}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Content - Right Side */}
//                             <div className="lg:w-3/5 w-full space-y-6">
//                                 <div className="inline-block p-3 bg-[#00B7B3]/10 rounded-full mb-2">
//                                     <span className="text-2xl">{content.introduction.badgeText || '🕉️'}</span>
//                                 </div>
//                                 <h2 className="text-3xl md:text-4xl font-bold text-white break-words">
//                                     {content.introduction.title || 'I am'} <span className="text-[#00B7B3]">{content.introduction.subtitle || 'Naveen Bhagat'}</span>
//                                 </h2>
//                                 <div className="text-gray-300 leading-relaxed overflow-x-auto break-words" dangerouslySetInnerHTML={{ __html: content.introduction.content }} />
//                             </div>
//                         </div>
//                     )}

//                     {/* SECTION 2: Teaching Philosophy - Image Right */}
//                     {content?.teaching && (
//                         <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16 mb-20">
//                             {/* Image - Right Side */}
//                             <div className="lg:w-2/5 w-full">
//                                 <div className="relative group">
//                                     <div className="absolute -inset-1 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
//                                     <div className="relative overflow-hidden rounded-2xl border-2 border-[#00B7B3]/20 group-hover:border-[#00B7B3]/40 transition-all duration-500">
//                                         <img 
//                                             src={content.teaching.image || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
//                                             alt={content.teaching.imageAlt || 'Teaching Philosophy'}
//                                             className="w-full h-[350px] object-cover group-hover:scale-110 transition-transform duration-700"
//                                         />
//                                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
//                                         <div className="absolute bottom-4 left-4 z-20">
//                                             <span className="px-4 py-2 bg-[#00B7B3] text-black rounded-full text-sm font-semibold">
//                                                 {content.teaching.badgeText || 'Teaching'}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Content - Left Side */}
//                             <div className="lg:w-3/5 w-full space-y-6">
//                                 <h3 className="text-2xl md:text-3xl font-bold text-white break-words">
//                                     {content.teaching.title || 'Teaching'} <span className="text-[#00B7B3]">Philosophy</span>
//                                 </h3>
//                                 <div className="text-gray-300 leading-relaxed overflow-x-auto break-words" dangerouslySetInnerHTML={{ __html: content.teaching.content }} />
//                             </div>
//                         </div>
//                     )}

//                     {/* SECTION 3: Consultation Approach - Image Left */}
//                     {content?.consultation && (
//                         <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-20">
//                             {/* Image - Left Side */}
//                             <div className="lg:w-2/5 w-full">
//                                 <div className="relative group">
//                                     <div className="absolute -inset-1 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
//                                     <div className="relative overflow-hidden rounded-2xl border-2 border-[#00B7B3]/20 group-hover:border-[#00B7B3]/40 transition-all duration-500">
//                                         <img 
//                                             src={content.consultation.image || 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
//                                             alt={content.consultation.imageAlt || 'Consultation Approach'}
//                                             className="w-full h-[350px] object-cover group-hover:scale-110 transition-transform duration-700"
//                                         />
//                                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
//                                         <div className="absolute bottom-4 left-4 z-20">
//                                             <span className="px-4 py-2 bg-[#00B7B3] text-black rounded-full text-sm font-semibold">
//                                                 {content.consultation.badgeText || 'Consultation'}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Content - Right Side */}
//                             <div className="lg:w-3/5 w-full space-y-6">
//                                 <h3 className="text-2xl md:text-3xl font-bold text-white break-words">
//                                     {content.consultation.title || 'Consultation'} <span className="text-[#00B7B3]">Approach</span>
//                                 </h3>
//                                 <div className="text-gray-300 leading-relaxed overflow-x-auto break-words" dangerouslySetInnerHTML={{ __html: content.consultation.content }} />
//                                 {content.consultation.quote && (
//                                     <p className="text-gray-300 leading-relaxed italic border-l-4 border-[#00B7B3] pl-6 break-words">
//                                         {content.consultation.quote}
//                                     </p>
//                                 )}
//                             </div>
//                         </div>
//                     )}

//                     {/* SECTION 4: Expertise & Beyond */}
//                     {content?.expertise && content.expertise.items && content.expertise.items.length > 0 && (
//                         <div className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm border border-[#00B7B3]/20 rounded-3xl p-8 lg:p-10 mb-20 overflow-hidden">
//                             <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center break-words">
//                                 {content.expertise.title || 'Areas of'} <span className="text-[#00B7B3]">Expertise</span>
//                             </h3>
                            
//                             {content.expertise.description && (
//                                 <p className="text-gray-400 text-center mb-6 break-words">{content.expertise.description}</p>
//                             )}
                            
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                                 {content.expertise.items.map((item, idx) => (
//                                     item.text && (
//                                         <div key={idx} className="bg-black/40 border border-[#00B7B3]/10 rounded-xl p-5">
//                                             <p className="text-gray-300 flex items-center gap-2 break-words">
//                                                 <span className="text-[#00B7B3] flex-shrink-0">•</span> 
//                                                 <span className="break-words">{item.text}</span>
//                                             </p>
//                                         </div>
//                                     )
//                                 ))}
//                             </div>

//                             {content.expertise.footerText && (
//                                 <p className="text-gray-300 leading-relaxed text-center max-w-3xl mx-auto break-words">
//                                     {content.expertise.footerText}
//                                 </p>
//                             )}
//                         </div>
//                     )}

//                     {/* SECTION 5: Beyond Astrology & Current Location */}
//                     <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-20">
//                         {/* Content - Left Side */}
//                         <div className="lg:w-1/2 w-full space-y-6">
//                             {content?.beyond && (
//                                 <>
//                                     <h3 className="text-2xl md:text-3xl font-bold text-white break-words">
//                                         {content.beyond.title || 'Beyond'} <span className="text-[#00B7B3]">Astrology</span>
//                                     </h3>
//                                     <div className="text-gray-300 leading-relaxed overflow-x-auto break-words" dangerouslySetInnerHTML={{ __html: content.beyond.content }} />
//                                 </>
//                             )}
                            
//                             {content?.location && (
//                                 <>
//                                     <h3 className="text-2xl md:text-3xl font-bold text-white mt-8 break-words">
//                                         {content.location.title || 'Current'} <span className="text-[#00B7B3]">Location</span>
//                                     </h3>
//                                     <div className="text-gray-300 leading-relaxed overflow-x-auto break-words" dangerouslySetInnerHTML={{ __html: content.location.description }} />
//                                 </>
//                             )}
//                         </div>

//                         {/* Image - Right Side */}
//                         <div className="lg:w-1/2 w-full">
//                             <div className="relative group">
//                                 <div className="absolute -inset-1 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
//                                 <div className="relative overflow-hidden rounded-2xl border-2 border-[#00B7B3]/20 group-hover:border-[#00B7B3]/40 transition-all duration-500">
//                                     <img 
//                                         src={content?.beyond?.image || content?.location?.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
//                                         alt={content?.beyond?.imageAlt || content?.location?.imageAlt || 'Greater Noida'}
//                                         className="w-full h-[350px] object-cover group-hover:scale-110 transition-transform duration-700"
//                                     />
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
//                                     <div className="absolute bottom-4 left-4 z-20">
//                                         <span className="px-4 py-2 bg-[#00B7B3] text-black rounded-full text-sm font-semibold">
//                                             {content?.location?.placeName || 'Greater Noida'}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Decorative Divider */}
//                     <div className="relative my-16">
//                         <div className="absolute inset-0 flex items-center">
//                             <div className="w-full border-t border-[#00B7B3]/20"></div>
//                         </div>
//                         <div className="relative flex justify-center">
//                             <span className="bg-gradient-to-br from-black/80 to-black/60 px-6 py-3 rounded-full border border-[#00B7B3]/30 text-[#00B7B3]">
//                                 ॐ
//                             </span>
//                         </div>
//                     </div>

//                     {/* CTA Section */}
//                     {content?.cta && (
//                         <div className="text-center">
//                             <h3 className="text-2xl font-bold text-white mb-6 break-words">
//                                 {content.cta.title || 'Begin Your Journey with'} <span className="text-[#00B7B3]">Guru Ji</span>
//                             </h3>
//                             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                                 {content.cta.buttonOneText && (
//                                     <Link
//                                         href={content.cta.buttonOneLink || '/astrology-consultation'}
//                                         className="px-8 py-4 bg-[#00B7B3] text-black rounded-xl font-semibold hover:bg-[#33C5C2] transform hover:scale-105 transition-all duration-300 inline-block text-center"
//                                     >
//                                         {content.cta.buttonOneText}
//                                     </Link>
//                                 )}
//                                 {content.cta.buttonTwoText && (
//                                     <Link
//                                         href={content.cta.buttonTwoLink || '/astrology-courses'}
//                                         className="px-8 py-4 border-2 border-[#00B7B3] text-[#00B7B3] rounded-xl font-semibold hover:bg-[#00B7B3]/10 transform hover:scale-105 transition-all duration-300 inline-block text-center"
//                                     >
//                                         {content.cta.buttonTwoText}
//                                     </Link>
//                                 )}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AboutPage;




// public/pages/AboutPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Helmet } from 'react-helmet-async';  // ← CHANGE: react-helmet to react-helmet-async
import { Loader2 } from 'lucide-react';
import { aboutPageAPI } from '../../admin/services/api';

const AboutPage = () => {
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState(null);

    const fetchContent = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await aboutPageAPI.getContent();
            if (data.success && data.data) {
                setContent(data.data);
                console.log('About page content loaded:', data.data);
            }
        } catch (error) {
            if (error?.response?.status !== 404) {
                console.warn('Unable to load about page content:', error?.message);
            }
            setContent(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchContent();
    }, [fetchContent]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-[#00B7B3] animate-spin" />
            </div>
        );
    }

    const seoTitle = content?.seoTitle || 'About Naveen Bhagat - Vedic Astrologer | NB Astro';
    const seoDescription = content?.seoDescription || 'Meet Naveen Bhagat, a renowned Vedic astrologer with expertise in Prashna system and Nakshatra-based analysis.';
    const seoKeywords = content?.seoKeywords || 'naveen bhagat, vedic astrologer, astrology expert';
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://nbastro.com/about';
    const ogImage = content?.hero?.image || 'https://nbastro.com/about-og-image.jpg';

    return (
        <>
            {/* ✅ SEO Helmet - UPDATED */}
            <Helmet>
                <title>{seoTitle}</title>
                <meta name="description" content={seoDescription} />
                <meta name="keywords" content={seoKeywords} />
                <meta name="robots" content="index, follow" />
                
                {/* Open Graph / Facebook */}
                <meta property="og:title" content={seoTitle} />
                <meta property="og:description" content={seoDescription} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:image" content={ogImage} />
                <meta property="og:site_name" content="NB Astro" />
                <meta property="og:locale" content="en_IN" />
                
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={seoTitle} />
                <meta name="twitter:description" content={seoDescription} />
                <meta name="twitter:image" content={ogImage} />
                
                {/* Canonical URL */}
                <link rel="canonical" href={currentUrl} />
            </Helmet>

            {/* Add overflow-x-hidden to the main container */}
            <div className="overflow-x-hidden w-full">
                {/* ============================================ */}
                {/* HERO SECTION */}
                {/* ============================================ */}
                <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
                    <div className="absolute inset-0">
                        <img 
                            src={content?.hero?.image || 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'} 
                            alt="Himalayan Background"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
                    </div>

                    <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                        <div className="max-w-2xl">
                            <div className="inline-block px-4 py-2 rounded-full border border-[#00B7B3]/30 text-[#00B7B3] text-sm mb-6">
                                {content?.hero?.breadcrumbText || 'Home / About Guru Ji'}
                            </div>
                            
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 break-words">
                                {content?.hero?.title || 'About'} <span className="text-[#00B7B3]">{content?.hero?.subtitle || 'Guru Ji'}</span>
                            </h1>
                            
                            <p className="text-gray-300 text-xl max-w-xl break-words">
                                {content?.hero?.description || 'Naveen Bhagat — Vedic Astrologer, Educator & Mentor'}
                            </p>

                            <div className="w-24 h-1 bg-[#00B7B3] mt-8"></div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
                </div>

                {/* ============================================ */}
                {/* MAIN CONTENT - LEFT/RIGHT LAYOUT */}
                {/* ============================================ */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full overflow-hidden">
                    
                    {/* SECTION 1: Introduction with Image - Left */}
                    {content?.introduction && (
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-20">
                            {/* Image - Left Side */}
                            <div className="lg:w-2/5 w-full">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
                                    <div className="relative overflow-hidden rounded-2xl border-2 border-[#00B7B3]/20 group-hover:border-[#00B7B3]/40 transition-all duration-500">
                                        <img 
                                            src={content.introduction.image || 'https://www.nbastro.com/attachments/pages_images/1766729644765_(1)1.png'}
                                            alt={content.introduction.imageAlt || 'Naveen Bhagat Ji'}
                                            className="w-full h-[500px] object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 z-20">
                                            <span className="px-4 py-2 bg-[#00B7B3] text-black rounded-full text-sm font-semibold">
                                                {content.introduction.badgeText || 'Naveen Bhagat Ji'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content - Right Side */}
                            <div className="lg:w-3/5 w-full space-y-6">
                                <div className="inline-block p-3 bg-[#00B7B3]/10 rounded-full mb-2">
                                    <span className="text-2xl">{content.introduction.badgeText || '🕉️'}</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white break-words">
                                    {content.introduction.title || 'I am'} <span className="text-[#00B7B3]">{content.introduction.subtitle || 'Naveen Bhagat'}</span>
                                </h2>
                                <div className="text-gray-300 leading-relaxed overflow-x-auto break-words" dangerouslySetInnerHTML={{ __html: content.introduction.content }} />
                            </div>
                        </div>
                    )}

                    {/* SECTION 2: Teaching Philosophy - Image Right */}
                    {content?.teaching && (
                        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16 mb-20">
                            {/* Image - Right Side */}
                            <div className="lg:w-2/5 w-full">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
                                    <div className="relative overflow-hidden rounded-2xl border-2 border-[#00B7B3]/20 group-hover:border-[#00B7B3]/40 transition-all duration-500">
                                        <img 
                                            src={content.teaching.image || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
                                            alt={content.teaching.imageAlt || 'Teaching Philosophy'}
                                            className="w-full h-[350px] object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 z-20">
                                            <span className="px-4 py-2 bg-[#00B7B3] text-black rounded-full text-sm font-semibold">
                                                {content.teaching.badgeText || 'Teaching'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content - Left Side */}
                            <div className="lg:w-3/5 w-full space-y-6">
                                <h3 className="text-2xl md:text-3xl font-bold text-white break-words">
                                    {content.teaching.title || 'Teaching'} <span className="text-[#00B7B3]">Philosophy</span>
                                </h3>
                                <div className="text-gray-300 leading-relaxed overflow-x-auto break-words" dangerouslySetInnerHTML={{ __html: content.teaching.content }} />
                            </div>
                        </div>
                    )}

                    {/* SECTION 3: Consultation Approach - Image Left */}
                    {content?.consultation && (
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-20">
                            {/* Image - Left Side */}
                            <div className="lg:w-2/5 w-full">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
                                    <div className="relative overflow-hidden rounded-2xl border-2 border-[#00B7B3]/20 group-hover:border-[#00B7B3]/40 transition-all duration-500">
                                        <img 
                                            src={content.consultation.image || 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
                                            alt={content.consultation.imageAlt || 'Consultation Approach'}
                                            className="w-full h-[350px] object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 z-20">
                                            <span className="px-4 py-2 bg-[#00B7B3] text-black rounded-full text-sm font-semibold">
                                                {content.consultation.badgeText || 'Consultation'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content - Right Side */}
                            <div className="lg:w-3/5 w-full space-y-6">
                                <h3 className="text-2xl md:text-3xl font-bold text-white break-words">
                                    {content.consultation.title || 'Consultation'} <span className="text-[#00B7B3]">Approach</span>
                                </h3>
                                <div className="text-gray-300 leading-relaxed overflow-x-auto break-words" dangerouslySetInnerHTML={{ __html: content.consultation.content }} />
                                {content.consultation.quote && (
                                    <p className="text-gray-300 leading-relaxed italic border-l-4 border-[#00B7B3] pl-6 break-words">
                                        {content.consultation.quote}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* SECTION 4: Expertise & Beyond */}
                    {content?.expertise && content.expertise.items && content.expertise.items.length > 0 && (
                        <div className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm border border-[#00B7B3]/20 rounded-3xl p-8 lg:p-10 mb-20 overflow-hidden">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center break-words">
                                {content.expertise.title || 'Areas of'} <span className="text-[#00B7B3]">Expertise</span>
                            </h3>
                            
                            {content.expertise.description && (
                                <p className="text-gray-400 text-center mb-6 break-words">{content.expertise.description}</p>
                            )}
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                {content.expertise.items.map((item, idx) => (
                                    item.text && (
                                        <div key={idx} className="bg-black/40 border border-[#00B7B3]/10 rounded-xl p-5">
                                            <p className="text-gray-300 flex items-center gap-2 break-words">
                                                <span className="text-[#00B7B3] flex-shrink-0">•</span> 
                                                <span className="break-words">{item.text}</span>
                                            </p>
                                        </div>
                                    )
                                ))}
                            </div>

                            {content.expertise.footerText && (
                                <p className="text-gray-300 leading-relaxed text-center max-w-3xl mx-auto break-words">
                                    {content.expertise.footerText}
                                </p>
                            )}
                        </div>
                    )}

                    {/* SECTION 5: Beyond Astrology & Current Location */}
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-20">
                        {/* Content - Left Side */}
                        <div className="lg:w-1/2 w-full space-y-6">
                            {content?.beyond && (
                                <>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white break-words">
                                        {content.beyond.title || 'Beyond'} <span className="text-[#00B7B3]">Astrology</span>
                                    </h3>
                                    <div className="text-gray-300 leading-relaxed overflow-x-auto break-words" dangerouslySetInnerHTML={{ __html: content.beyond.content }} />
                                </>
                            )}
                            
                            {content?.location && (
                                <>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mt-8 break-words">
                                        {content.location.title || 'Current'} <span className="text-[#00B7B3]">Location</span>
                                    </h3>
                                    <div className="text-gray-300 leading-relaxed overflow-x-auto break-words" dangerouslySetInnerHTML={{ __html: content.location.description }} />
                                </>
                            )}
                        </div>

                        {/* Image - Right Side */}
                        <div className="lg:w-1/2 w-full">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] rounded-2xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
                                <div className="relative overflow-hidden rounded-2xl border-2 border-[#00B7B3]/20 group-hover:border-[#00B7B3]/40 transition-all duration-500">
                                    <img 
                                        src={content?.beyond?.image || content?.location?.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
                                        alt={content?.beyond?.imageAlt || content?.location?.imageAlt || 'Greater Noida'}
                                        className="w-full h-[350px] object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 z-20">
                                        <span className="px-4 py-2 bg-[#00B7B3] text-black rounded-full text-sm font-semibold">
                                            {content?.location?.placeName || 'Greater Noida'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Divider */}
                    <div className="relative my-16">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#00B7B3]/20"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-gradient-to-br from-black/80 to-black/60 px-6 py-3 rounded-full border border-[#00B7B3]/30 text-[#00B7B3]">
                                ॐ
                            </span>
                        </div>
                    </div>

                    {/* CTA Section */}
                    {content?.cta && (
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-white mb-6 break-words">
                                {content.cta.title || 'Begin Your Journey with'} <span className="text-[#00B7B3]">Guru Ji</span>
                            </h3>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {content.cta.buttonOneText && (
                                    <Link
                                        href={content.cta.buttonOneLink || '/astrology-consultation'}
                                        className="px-8 py-4 bg-[#00B7B3] text-black rounded-xl font-semibold hover:bg-[#33C5C2] transform hover:scale-105 transition-all duration-300 inline-block text-center"
                                    >
                                        {content.cta.buttonOneText}
                                    </Link>
                                )}
                                {content.cta.buttonTwoText && (
                                    <Link
                                        href={content.cta.buttonTwoLink || '/astrology-courses'}
                                        className="px-8 py-4 border-2 border-[#00B7B3] text-[#00B7B3] rounded-xl font-semibold hover:bg-[#00B7B3]/10 transform hover:scale-105 transition-all duration-300 inline-block text-center"
                                    >
                                        {content.cta.buttonTwoText}
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AboutPage;
