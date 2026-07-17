// import React from 'react';
// import Link from 'next/link';

// // SVG Icons Components
// const StarIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
// );

// const PlanetIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M12 4C10 6 8 8 8 12C8 16 10 18 12 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <path d="M12 4C14 6 16 8 16 12C16 16 14 18 12 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <ellipse cx="12" cy="12" rx="4" ry="6" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const MoonIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
// );

// const ZodiacIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M12 3L12 6M12 18L12 21M3 12L6 12M18 12L21 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//     </svg>
// );

// const ScrollIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M4 4H20V20H4V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//         <path d="M8 7H16M8 11H14M8 15H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//     </svg>
// );

// const GraduateIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 3L2 9L12 15L22 9L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//         <path d="M6 12V16.5C6 17.5 8 19 12 19C16 19 18 17.5 18 16.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <path d="M20 10V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//     </svg>
// );

// const DiamondIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M6 3H18L21 9L12 21L3 9L6 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//         <path d="M12 3V21M3 9H21" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const AstrologyCoursesPage = () => {
//     const astrologyCourses = [
//         {
//             title: 'Complete Astrology Course',
//             price: '₹175,000.00',
//             description: 'Human Being is a curious creature; his curiosity draws him to understand every aspect of the universe. This curiosity is the only factor that leads the human to achieve various levels of development. Since its very existence on earth, human beings ponder about their relationship to the universe. As per Ancient Indian Mythology, the celestial bodies of the universe that include stars, planets, constellations and their position and movements are closely related to the life of every person. It further turned out into a separate stream of science known as astrology. It includes the study of time, space, and celestial influences on human life.',
//             type: 'Astrology Course',
//             image: 'https://images.unsplash.com/photo-1507484467459-0c91be303a5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//             duration: '12 months',
//             level: 'Beginner to Advanced',
//             modules: 24
//         },
//         {
//             title: 'Financial Astrology - Level 3',
//             price: '₹100,000.00',
//             description: 'What is Financial Astrology? The goal of Financial Astrology can be summed up in one word – "Profit". Ups and Downs of stock market are unpredictable and there is no system of candles to predict precisely for next 6 months or a year. Vedic Astrology helps us to understand the overall future of a nation including its economy. Using the most profound principles of vedic astrology we can understand possible future trends and plan accordingly.',
//             type: 'Advanced Astrology',
//             image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//             duration: '6 months',
//             level: 'Advanced',
//             modules: 16
//         },
//         {
//             title: 'Financial Astrology - Level 2',
//             price: '₹51,000.00',
//             description: 'What is Financial Astrology? The goal of Financial Astrology can be summed up in one word – "Profit". Ups and Downs of stock market are unpredictable and there is no system of candles to predict precisely for next 6 months or a year. Vedic Astrology helps us to understand the overall future of a nation including its economy. Using the most profound principles of vedic astrology we can understand possible future trends and plan accordingly.',
//             courseContent: 'Course Content: Indian Stock Exchange – Past, Present and Future | Use of Sarvatobhadra Chakra | Trend of sectors | Trend of markets | Planetary combinations for market movements',
//             type: 'Financial Astrology',
//             image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//             duration: '4 months',
//             level: 'Intermediate',
//             modules: 12
//         },
//         {
//             title: 'Financial Astrology - Level 1',
//             price: '₹35,000.00',
//             description: 'What is Financial Astrology? The goal of Financial Astrology can be summed up in one word – "Profit". Ups and Downs of stock market are unpredictable and there is no system of candles to predict precisely for next 6 months or a year. Vedic Astrology helps us to understand the overall future of a nation including its economy.',
//             courseContent: 'Course Content: Effect of Signs in Financial Astrology | Effect of Nakshatras in Financial Astrology | Effect of Houses in Financial Astrology | Basic planetary combinations',
//             type: 'Financial Astrology',
//             image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//             duration: '3 months',
//             level: 'Beginner',
//             modules: 8
//         }
//     ];

//     return (
//         <div className="bg-black">
//             {/* ============================================ */}
//             {/* HERO SECTION - PREMIUM LOOK */}
//             {/* ============================================ */}
//             <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
//                 {/* Background Image with Parallax Effect */}
//                 <div className="absolute inset-0">
//                     <img 
//                         src="https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
//                         alt="Astrology Courses"
//                         className="w-full h-full object-cover scale-105"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
//                     <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,black_100%)]"></div>
//                 </div>

//                 {/* Animated Stars Background */}
//                 <div className="absolute inset-0 overflow-hidden opacity-30">
//                     <div className="absolute top-10 left-10 animate-pulse">
//                         <StarIcon />
//                     </div>
//                     <div className="absolute top-1/3 right-20 animate-ping">
//                         <StarIcon />
//                     </div>
//                     <div className="absolute bottom-20 left-1/4 animate-pulse">
//                         <StarIcon />
//                     </div>
//                 </div>

//                 <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
//                     <div className="max-w-2xl">
//                         <div className="inline-flex items-center gap-3 p-3 bg-gradient-to-r from-[#00B7B3]/20 to-transparent rounded-full mb-6 backdrop-blur-sm border border-[#00B7B3]/30">
//                             <PlanetIcon />
//                             <span className="text-[#00B7B3] text-sm uppercase tracking-wider font-semibold">Ancient Wisdom Meets Modern Science</span>
//                         </div>
                        
//                         <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
//                             Master the Art of
//                             <span className="text-[#00B7B3] block mt-2">Astrology</span>
//                         </h1>
                        
//                         <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
//                             Embark on a transformative journey to decode the cosmic language. Become a certified astrologer with our comprehensive training programs.
//                         </p>

//                         <div className="flex gap-4 mt-8">
//                             <div className="w-16 h-1 bg-[#00B7B3]"></div>
//                             <div className="w-8 h-1 bg-[#00B7B3]/50"></div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
//             </div>

//             {/* ============================================ */}
//             {/* INTRO TEXT SECTION - PREMIUM STYLING */}
//             {/* ============================================ */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-20">
//                 <div className="relative group">
//                     <div className="absolute inset-0 bg-gradient-to-r from-[#00B7B3]/20 to-transparent blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
//                     <div className="relative bg-gradient-to-br from-black/80 via-black/60 to-black/80 border border-[#00B7B3]/20 rounded-3xl p-10 lg:p-12 backdrop-blur-sm">
//                         <div className="absolute top-0 right-0 w-40 h-40 bg-[#00B7B3]/5 rounded-full blur-3xl"></div>
                        
//                         <div className="flex items-center gap-3 mb-8">
//                             <ScrollIcon />
//                             <span className="text-[#00B7B3] text-sm uppercase tracking-wider font-semibold">The Cosmic Science</span>
//                         </div>
                        
//                         <p className="text-gray-300 text-lg leading-relaxed">
//                             Have you ever imagined about the unseen energies that regularize our life? Sometimes everything seems to
//                             be very supportive and compelling even when we put less or even no efforts. At the same time, we have
//                             evidence the time when even after putting our full strength and potential, we don't achieve success. It is
//                             nothing but an impact of astral and planetary changes. If we have a glance over the Hindu mythology, even
//                             the God and Goddess were not away from the effects of astral changes.
//                         </p>
//                         <p className="text-gray-300 text-lg leading-relaxed mt-6">
//                             Astrology and Vastu are not a new concept. It is one of the most ancient studies. Few people think it as just art that could be God gifted, but the
//                             truth is on the flipside. <span className="text-[#00B7B3]">Astrology is a complete study of science</span>, which results from proper
//                             research and analysis. These courses include all researches made by renowned astrologers and
//                             researchers during the Vedic period or even before that.
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             {/* ============================================ */}
//             {/* COURSES SECTION - PREMIUM CARDS */}
//             {/* ============================================ */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                 <div className="text-center mb-16">
//                     <div className="inline-flex items-center gap-2 bg-[#00B7B3]/10 px-4 py-2 rounded-full mb-4">
//                         <MoonIcon />
//                         <span className="text-[#00B7B3] text-sm uppercase tracking-wider">Celestial Curriculum</span>
//                     </div>
//                     <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//                         Our <span className="text-[#00B7B3]">Astrology Courses</span>
//                     </h2>
//                     <p className="text-gray-400 max-w-2xl mx-auto">
//                         Choose your path to become a certified astrologer with our structured learning programs
//                     </p>
//                 </div>

//                 <div className="space-y-20">
//                     {astrologyCourses.map((course, index) => (
//                         <div 
//                             key={index}
//                             className={`group flex flex-col ${
//                                 index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
//                             } gap-8 lg:gap-12 items-center bg-gradient-to-br from-black/40 to-black/20 rounded-2xl p-6 lg:p-8 border border-[#00B7B3]/10 hover:border-[#00B7B3]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#00B7B3]/5`}
//                         >
//                             <div className="lg:w-5/12">
//                                 <div className="relative overflow-hidden rounded-2xl group-hover:shadow-xl transition-all duration-500">
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10 group-hover:opacity-80 transition-opacity duration-500"></div>
//                                     <img 
//                                         src={course.image} 
//                                         alt={course.title}
//                                         className="w-full h-[280px] md:h-[350px] object-cover group-hover:scale-110 transition-transform duration-700"
//                                     />
//                                     <div className="absolute top-4 left-4 z-20">
//                                         <span className="px-4 py-2 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-full text-sm font-semibold shadow-lg">
//                                             {course.type}
//                                         </span>
//                                     </div>
//                                     <div className="absolute top-4 right-4 z-20 flex gap-2">
//                                         <span className="px-3 py-1 bg-black/70 backdrop-blur-sm border border-[#00B7B3]/40 text-[#00B7B3] rounded-full text-xs font-medium">
//                                             {course.duration}
//                                         </span>
//                                         <span className="px-3 py-1 bg-black/70 backdrop-blur-sm border border-[#00B7B3]/40 text-[#00B7B3] rounded-full text-xs font-medium">
//                                             {course.level}
//                                         </span>
//                                     </div>
//                                     <div className="absolute bottom-4 left-4 z-20">
//                                         <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white rounded-full text-xs">
//                                             {course.modules} Modules
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="lg:w-7/12 space-y-5">
//                                 <div>
//                                     <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-[#00B7B3] transition-colors duration-300">
//                                         {course.title}
//                                     </h2>
//                                     <div className="flex items-baseline gap-2">
//                                         <span className="text-3xl font-bold text-[#00B7B3]">{course.price}</span>
//                                         <span className="text-gray-500 text-sm">+ GST</span>
//                                     </div>
//                                 </div>

//                                 <p className="text-gray-400 leading-relaxed">
//                                     {course.description}
//                                 </p>

//                                 {course.courseContent && (
//                                     <div className="bg-black/40 rounded-xl p-4 border border-[#00B7B3]/10">
//                                         <p className="text-[#00B7B3] text-sm font-semibold mb-2">📖 What You'll Learn:</p>
//                                         <p className="text-gray-400 text-sm leading-relaxed">
//                                             {course.courseContent}
//                                         </p>
//                                     </div>
//                                 )}

//                                 <div className="flex flex-wrap items-center gap-4 pt-2">
//                                     <Link
//                                         href={`/astrology-courses/${course.title.toLowerCase().replace(/\s+/g, '-')}`}
//                                         className="group/btn px-8 py-3 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-full font-semibold hover:shadow-lg hover:shadow-[#00B7B3]/30 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
//                                     >
//                                         ENROLL NOW
//                                         <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                         </svg>
//                                     </Link>
//                                     <Link
//                                         href={`/courses/${course.title.toLowerCase().replace(/\s+/g, '-')}/details`}
//                                         className="px-8 py-3 border-2 border-[#00B7B3] text-[#00B7B3] rounded-full font-semibold hover:bg-[#00B7B3]/10 transform hover:scale-105 transition-all duration-300"
//                                     >
//                                         VIEW DETAILS
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* ============================================ */}
//             {/* WHY CHOOSE OUR COURSES - PREMIUM */}
//             {/* ============================================ */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                 <div className="relative overflow-hidden bg-gradient-to-br from-black/60 to-black/30 border border-[#00B7B3]/20 rounded-3xl p-12">
//                     <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B7B3]/5 rounded-full blur-3xl"></div>
//                     <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00B7B3]/5 rounded-full blur-3xl"></div>
                    
//                     <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
//                         Why Choose Our <span className="text-[#00B7B3]">Astrology Courses?</span>
//                     </h2>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
//                         <div className="text-center group">
//                             <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#00B7B3]/20 to-transparent flex items-center justify-center group-hover:bg-[#00B7B3] group-hover:scale-110 transition-all duration-500 border border-[#00B7B3]/30 group-hover:border-[#00B7B3]">
//                                 <div className="text-[#00B7B3] group-hover:text-black transition-colors duration-500">
//                                     <StarIcon />
//                                 </div>
//                             </div>
//                             <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00B7B3] transition-colors">Vedic Tradition</h3>
//                             <p className="text-gray-400 text-sm leading-relaxed">Authentic courses based on ancient Vedic texts and traditional knowledge passed down through generations</p>
//                         </div>
                        
//                         <div className="text-center group">
//                             <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#00B7B3]/20 to-transparent flex items-center justify-center group-hover:bg-[#00B7B3] group-hover:scale-110 transition-all duration-500 border border-[#00B7B3]/30 group-hover:border-[#00B7B3]">
//                                 <div className="text-[#00B7B3] group-hover:text-black transition-colors duration-500">
//                                     <GraduateIcon />
//                                 </div>
//                             </div>
//                             <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00B7B3] transition-colors">Expert Faculty</h3>
//                             <p className="text-gray-400 text-sm leading-relaxed">Learn from experienced astrologers with 20+ years of practice and real-world consultation experience</p>
//                         </div>
                        
//                         <div className="text-center group">
//                             <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#00B7B3]/20 to-transparent flex items-center justify-center group-hover:bg-[#00B7B3] group-hover:scale-110 transition-all duration-500 border border-[#00B7B3]/30 group-hover:border-[#00B7B3]">
//                                 <div className="text-[#00B7B3] group-hover:text-black transition-colors duration-500">
//                                     <DiamondIcon />
//                                 </div>
//                             </div>
//                             <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00B7B3] transition-colors">Practical Training</h3>
//                             <p className="text-gray-400 text-sm leading-relaxed">Hands-on practice with real birth charts, case studies, and live consultation simulations</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* ============================================ */}
//             {/* CTA SECTION - BONUS PREMIUM SECTION */}
//             {/* ============================================ */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                 <div className="relative rounded-3xl overflow-hidden">
//                     <div className="absolute inset-0 bg-gradient-to-r from-[#00B7B3] to-[#008080] opacity-90"></div>
//                     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-overlay"></div>
                    
//                     <div className="relative py-16 px-8 text-center">
//                         <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//                             Ready to Begin Your Cosmic Journey?
//                         </h2>
//                         <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
//                             Join thousands of successful astrologers who started their journey with us
//                         </p>
//                         <Link 
//                             href="/contact" 
//                             className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#00B7B3] rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl"
//                         >
//                             Get Free Consultation
//                             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                             </svg>
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AstrologyCoursesPage;


// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Loader2 } from 'lucide-react';
// import { courseAPI } from '../../admin/services/api';

// // SVG Icons Components
// const StarIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
// );

// const PlanetIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M12 4C10 6 8 8 8 12C8 16 10 18 12 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <path d="M12 4C14 6 16 8 16 12C16 16 14 18 12 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <ellipse cx="12" cy="12" rx="4" ry="6" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const MoonIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
// );

// const ScrollIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M4 4H20V20H4V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//         <path d="M8 7H16M8 11H14M8 15H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//     </svg>
// );

// const GraduateIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 3L2 9L12 15L22 9L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//         <path d="M6 12V16.5C6 17.5 8 19 12 19C16 19 18 17.5 18 16.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <path d="M20 10V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//     </svg>
// );

// const DiamondIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M6 3H18L21 9L12 21L3 9L6 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//         <path d="M12 3V21M3 9H21" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// // Pagination Component
// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//     const getPageNumbers = () => {
//         const pages = [];
//         const maxVisible = 5;
        
//         if (totalPages <= maxVisible) {
//             for (let i = 1; i <= totalPages; i++) {
//                 pages.push(i);
//             }
//         } else {
//             if (currentPage <= 3) {
//                 for (let i = 1; i <= 4; i++) pages.push(i);
//                 pages.push('...');
//                 pages.push(totalPages);
//             } else if (currentPage >= totalPages - 2) {
//                 pages.push(1);
//                 pages.push('...');
//                 for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
//             } else {
//                 pages.push(1);
//                 pages.push('...');
//                 for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
//                 pages.push('...');
//                 pages.push(totalPages);
//             }
//         }
        
//         return pages;
//     };

//     if (totalPages <= 1) return null;

//     return (
//         <div className="flex justify-center items-center gap-2 mt-12">
//             <button
//                 onClick={() => onPageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className={`px-4 py-2 rounded-lg border transition-all ${
//                     currentPage === 1
//                         ? 'border-gray-700 text-gray-600 cursor-not-allowed'
//                         : 'border-[#00B7B3]/30 text-[#00B7B3] hover:bg-[#00B7B3]/10 hover:border-[#00B7B3]'
//                 }`}
//             >
//                 Previous
//             </button>
            
//             {getPageNumbers().map((page, index) => (
//                 <button
//                     key={index}
//                     onClick={() => typeof page === 'number' && onPageChange(page)}
//                     className={`w-10 h-10 rounded-lg transition-all ${
//                         page === currentPage
//                             ? 'bg-[#00B7B3] text-black font-bold'
//                             : page === '...'
//                             ? 'text-gray-500 cursor-default'
//                             : 'border border-[#00B7B3]/30 text-[#00B7B3] hover:bg-[#00B7B3]/10 hover:border-[#00B7B3]'
//                     }`}
//                     disabled={page === '...'}
//                 >
//                     {page}
//                 </button>
//             ))}
            
//             <button
//                 onClick={() => onPageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className={`px-4 py-2 rounded-lg border transition-all ${
//                     currentPage === totalPages
//                         ? 'border-gray-700 text-gray-600 cursor-not-allowed'
//                         : 'border-[#00B7B3]/30 text-[#00B7B3] hover:bg-[#00B7B3]/10 hover:border-[#00B7B3]'
//                 }`}
//             >
//                 Next
//             </button>
//         </div>
//     );
// };

// const AstrologyCoursesPage = () => {
//     const [loading, setLoading] = useState(true);
//     const [courses, setCourses] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [totalCourses, setTotalCourses] = useState(0);
//     const coursesPerPage = 6;

//     useEffect(() => {
//         fetchCourses();
//     }, [currentPage]);

//     const fetchCourses = async () => {
//         setLoading(true);
//         try {
//             const { data } = await courseAPI.getAll();
//             let allCourses = data.courses || [];
//             const astrologyCourses = allCourses.filter(course => 
//                 course.category && course.category.includes('ASTROLOGY')
//             );
            
//             setTotalCourses(astrologyCourses.length);
//             const startIndex = (currentPage - 1) * coursesPerPage;
//             const endIndex = startIndex + coursesPerPage;
//             const paginatedCourses = astrologyCourses.slice(startIndex, endIndex);
            
//             setCourses(paginatedCourses);
//             setTotalPages(Math.ceil(astrologyCourses.length / coursesPerPage));
//         } catch (error) {
//             console.error('Error fetching courses:', error);
//             setCourses([]);
//             setTotalPages(1);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const stripHtml = (html) => {
//         if (!html) return '';
//         const temp = document.createElement('div');
//         temp.innerHTML = html;
//         return temp.textContent || temp.innerText || '';
//     };

//     const getCourseType = (course) => {
//         if (course.title?.toLowerCase().includes('financial')) {
//             return 'Financial Astrology';
//         }
//         if (course.title?.toLowerCase().includes('complete')) {
//             return 'Astrology Course';
//         }
//         return 'Astrology Course';
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-black flex items-center justify-center">
//                 <Loader2 className="w-12 h-12 text-[#00B7B3] animate-spin" />
//             </div>
//         );
//     }

//     return (
//         <div className="bg-black">
//             {/* ============================================ */}
//             {/* HERO SECTION */}
//             {/* ============================================ */}
//             <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
//                 <div className="absolute inset-0">
//                     <img 
//                         src="https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
//                         alt="Astrology Courses"
//                         className="w-full h-full object-cover scale-105"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
//                     <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,black_100%)]"></div>
//                 </div>

//                 <div className="absolute inset-0 overflow-hidden opacity-30">
//                     <div className="absolute top-10 left-10 animate-pulse">
//                         <StarIcon />
//                     </div>
//                     <div className="absolute top-1/3 right-20 animate-ping">
//                         <StarIcon />
//                     </div>
//                     <div className="absolute bottom-20 left-1/4 animate-pulse">
//                         <StarIcon />
//                     </div>
//                 </div>

//                 <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
//                     <div className="max-w-2xl">
//                         <div className="inline-flex items-center gap-3 p-3 bg-gradient-to-r from-[#00B7B3]/20 to-transparent rounded-full mb-6 backdrop-blur-sm border border-[#00B7B3]/30">
//                             <PlanetIcon />
//                             <span className="text-[#00B7B3] text-sm uppercase tracking-wider font-semibold">Ancient Wisdom Meets Modern Science</span>
//                         </div>
                        
//                         <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
//                             Master the Art of
//                             <span className="text-[#00B7B3] block mt-2">Astrology</span>
//                         </h1>
                        
//                         <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
//                             Embark on a transformative journey to decode the cosmic language. Become a certified astrologer with our comprehensive training programs.
//                         </p>

//                         <div className="flex gap-4 mt-8">
//                             <div className="w-16 h-1 bg-[#00B7B3]"></div>
//                             <div className="w-8 h-1 bg-[#00B7B3]/50"></div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
//             </div>

//             {/* ============================================ */}
//             {/* INTRO TEXT SECTION */}
//             {/* ============================================ */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-20">
//                 <div className="relative group">
//                     <div className="absolute inset-0 bg-gradient-to-r from-[#00B7B3]/20 to-transparent blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
//                     <div className="relative bg-gradient-to-br from-black/80 via-black/60 to-black/80 border border-[#00B7B3]/20 rounded-3xl p-10 lg:p-12 backdrop-blur-sm">
//                         <div className="absolute top-0 right-0 w-40 h-40 bg-[#00B7B3]/5 rounded-full blur-3xl"></div>
                        
//                         <div className="flex items-center gap-3 mb-8">
//                             <ScrollIcon />
//                             <span className="text-[#00B7B3] text-sm uppercase tracking-wider font-semibold">The Cosmic Science</span>
//                         </div>
                        
//                         <p className="text-gray-300 text-lg leading-relaxed">
//                             Have you ever imagined about the unseen energies that regularize our life? Sometimes everything seems to
//                             be very supportive and compelling even when we put less or even no efforts. At the same time, we have
//                             evidence the time when even after putting our full strength and potential, we don't achieve success. It is
//                             nothing but an impact of astral and planetary changes. If we have a glance over the Hindu mythology, even
//                             the God and Goddess were not away from the effects of astral changes.
//                         </p>
//                         <p className="text-gray-300 text-lg leading-relaxed mt-6">
//                             Astrology and Vastu are not a new concept. It is one of the most ancient studies. Few people think it as just art that could be God gifted, but the
//                             truth is on the flipside. <span className="text-[#00B7B3]">Astrology is a complete study of science</span>, which results from proper
//                             research and analysis. These courses include all researches made by renowned astrologers and
//                             researchers during the Vedic period or even before that.
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             {/* ============================================ */}
//             {/* COURSES SECTION - PREMIUM CARDS WITH CHIP HIGHLIGHTS */}
//             {/* ============================================ */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                 <div className="text-center mb-16">
//                     <div className="inline-flex items-center gap-2 bg-[#00B7B3]/10 px-4 py-2 rounded-full mb-4">
//                         <MoonIcon />
//                         <span className="text-[#00B7B3] text-sm uppercase tracking-wider">Celestial Curriculum</span>
//                     </div>
//                     <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//                         Our <span className="text-[#00B7B3]">Astrology Courses</span>
//                     </h2>
//                     <p className="text-gray-400 max-w-2xl mx-auto">
//                         Choose your path to become a certified astrologer with our structured learning programs
//                     </p>
//                     {totalCourses > 0 && (
//                         <p className="text-[#00B7B3] text-sm mt-2">
//                             Showing {courses.length} of {totalCourses} courses
//                         </p>
//                     )}
//                 </div>

//                 {courses.length === 0 ? (
//                     <div className="text-center py-20">
//                         <p className="text-gray-400 text-lg">No astrology courses available at the moment.</p>
//                         <p className="text-gray-500 mt-2">Please check back later for new courses.</p>
//                     </div>
//                 ) : (
//                     <>
//                         <div className="space-y-20">
//                             {courses.map((course, index) => (
//                                 <div 
//                                     key={course._id || index}
//                                     className={`group flex flex-col ${
//                                         index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
//                                     } gap-8 lg:gap-12 items-center bg-gradient-to-br from-black/40 to-black/20 rounded-2xl p-6 lg:p-8 border border-[#00B7B3]/10 hover:border-[#00B7B3]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#00B7B3]/5`}
//                                 >
//                                     <div className="lg:w-5/12">
//                                         <div className="relative overflow-hidden rounded-2xl group-hover:shadow-xl transition-all duration-500">
//                                             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10 group-hover:opacity-80 transition-opacity duration-500"></div>
//                                             <img 
//                                                 src={course.image ? `${course.image}` : 'https://images.unsplash.com/photo-1507484467459-0c91be303a5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'} 
//                                                 alt={course.title}
//                                                 className="w-full h-[280px] md:h-[350px] object-cover group-hover:scale-110 transition-transform duration-700"
//                                             />
//                                             <div className="absolute top-4 left-4 z-20">
//                                                 <span className="px-4 py-2 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-full text-sm font-semibold shadow-lg">
//                                                     {getCourseType(course)}
//                                                 </span>
//                                             </div>
//                                             <div className="absolute top-4 right-4 z-20 flex gap-2">
//                                                 <span className="px-3 py-1 bg-black/70 backdrop-blur-sm border border-[#00B7B3]/40 text-[#00B7B3] rounded-full text-xs font-medium">
//                                                     {course.courseDuration || 'Flexible'}
//                                                 </span>
//                                                 <span className="px-3 py-1 bg-black/70 backdrop-blur-sm border border-[#00B7B3]/40 text-[#00B7B3] rounded-full text-xs font-medium">
//                                                     {course.level || 'All Levels'}
//                                                 </span>
//                                             </div>
//                                             <div className="absolute bottom-4 left-4 z-20">
//                                                 <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white rounded-full text-xs">
//                                                     {course.modules || 'Multiple'} Modules
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="lg:w-7/12 space-y-5">
//                                         <div>
//                                             <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-[#00B7B3] transition-colors duration-300">
//                                                 {course.title}
//                                             </h2>
//                                             <div className="flex items-baseline gap-2">
//                                                 <span className="text-3xl font-bold text-[#00B7B3]">{course.price || course.courseFee || 'Contact Us'}</span>
//                                                 <span className="text-gray-500 text-sm">+ GST</span>
//                                             </div>
//                                         </div>

//                                         <p className="text-gray-400 leading-relaxed line-clamp-3">
//                                             {stripHtml(course.whatIs || course.aboutCourse) || 'Discover the ancient wisdom of Vedic astrology with our comprehensive course.'}
//                                         </p>

//                                         {/* Course Highlights - Clean Chip Design (No Label) */}
//                                         {course.highlights && course.highlights.length > 0 && course.highlights[0] !== '' && (
//                                             <div className="flex flex-wrap gap-2 pt-2">
//                                                 {course.highlights.slice(0, 6).map((highlight, idx) => (
//                                                     <span 
//                                                         key={idx} 
//                                                         className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#00B7B3]/10 to-transparent border border-[#00B7B3]/30 rounded-full text-sm text-gray-300 hover:border-[#00B7B3]/60 hover:bg-[#00B7B3]/20 transition-all duration-300"
//                                                     >
//                                                         <span className="w-1.5 h-1.5 bg-[#00B7B3] rounded-full"></span>
//                                                         {highlight}
//                                                     </span>
//                                                 ))}
//                                                 {course.highlights.length > 6 && (
//                                                     <span className="inline-flex items-center px-3 py-1.5 text-sm text-[#00B7B3]">
//                                                         +{course.highlights.length - 6} more
//                                                     </span>
//                                                 )}
//                                             </div>
//                                         )}

//                                         <div className="flex flex-wrap items-center gap-4 pt-4">
//                                             <Link
//                                                 href={`/astrology-courses/${course.slug || course.title.toLowerCase().replace(/\s+/g, '-')}`}
//                                                 className="group/btn px-8 py-3 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-full font-semibold hover:shadow-lg hover:shadow-[#00B7B3]/30 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
//                                             >
//                                                 ENROLL NOW
//                                                 <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                                 </svg>
//                                             </Link>
//                                             <Link
//                                                 href={`/courses/${course.slug || course.title.toLowerCase().replace(/\s+/g, '-')}/details`}
//                                                 className="px-8 py-3 border-2 border-[#00B7B3] text-[#00B7B3] rounded-full font-semibold hover:bg-[#00B7B3]/10 transform hover:scale-105 transition-all duration-300"
//                                             >
//                                                 VIEW DETAILS
//                                             </Link>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Pagination Component */}
//                         <Pagination
//                             currentPage={currentPage}
//                             totalPages={totalPages}
//                             onPageChange={setCurrentPage}
//                         />
//                     </>
//                 )}
//             </div>

//             {/* ============================================ */}
//             {/* WHY CHOOSE OUR COURSES */}
//             {/* ============================================ */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                 <div className="relative overflow-hidden bg-gradient-to-br from-black/60 to-black/30 border border-[#00B7B3]/20 rounded-3xl p-12">
//                     <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B7B3]/5 rounded-full blur-3xl"></div>
//                     <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00B7B3]/5 rounded-full blur-3xl"></div>
                    
//                     <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
//                         Why Choose Our <span className="text-[#00B7B3]">Astrology Courses?</span>
//                     </h2>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
//                         <div className="text-center group">
//                             <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#00B7B3]/20 to-transparent flex items-center justify-center group-hover:bg-[#00B7B3] group-hover:scale-110 transition-all duration-500 border border-[#00B7B3]/30 group-hover:border-[#00B7B3]">
//                                 <div className="text-[#00B7B3] group-hover:text-black transition-colors duration-500">
//                                     <StarIcon />
//                                 </div>
//                             </div>
//                             <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00B7B3] transition-colors">Vedic Tradition</h3>
//                             <p className="text-gray-400 text-sm leading-relaxed">Authentic courses based on ancient Vedic texts and traditional knowledge passed down through generations</p>
//                         </div>
                        
//                         <div className="text-center group">
//                             <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#00B7B3]/20 to-transparent flex items-center justify-center group-hover:bg-[#00B7B3] group-hover:scale-110 transition-all duration-500 border border-[#00B7B3]/30 group-hover:border-[#00B7B3]">
//                                 <div className="text-[#00B7B3] group-hover:text-black transition-colors duration-500">
//                                     <GraduateIcon />
//                                 </div>
//                             </div>
//                             <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00B7B3] transition-colors">Expert Faculty</h3>
//                             <p className="text-gray-400 text-sm leading-relaxed">Learn from experienced astrologers with 20+ years of practice and real-world consultation experience</p>
//                         </div>
                        
//                         <div className="text-center group">
//                             <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#00B7B3]/20 to-transparent flex items-center justify-center group-hover:bg-[#00B7B3] group-hover:scale-110 transition-all duration-500 border border-[#00B7B3]/30 group-hover:border-[#00B7B3]">
//                                 <div className="text-[#00B7B3] group-hover:text-black transition-colors duration-500">
//                                     <DiamondIcon />
//                                 </div>
//                             </div>
//                             <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00B7B3] transition-colors">Practical Training</h3>
//                             <p className="text-gray-400 text-sm leading-relaxed">Hands-on practice with real birth charts, case studies, and live consultation simulations</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* CTA SECTION */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                 <div className="relative rounded-3xl overflow-hidden">
//                     <div className="absolute inset-0 bg-gradient-to-r from-[#00B7B3] to-[#008080] opacity-90"></div>
//                     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-overlay"></div>
                    
//                     <div className="relative py-16 px-8 text-center">
//                         <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//                             Ready to Begin Your Cosmic Journey?
//                         </h2>
//                         <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
//                             Join thousands of successful astrologers who started their journey with us
//                         </p>
//                         <Link 
//                             href="/contact" 
//                             className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#00B7B3] rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl"
//                         >
//                             Get Free Consultation
//                             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                             </svg>
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AstrologyCoursesPage;


// // AstrologyCoursesPage.jsx
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Loader2 } from 'lucide-react';
// import { courseAPI, pageContentAPI } from '../../admin/services/api';

// // SVG Icons Components (keep all your existing icons)
// const StarIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
// );

// const PlanetIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M12 4C10 6 8 8 8 12C8 16 10 18 12 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <path d="M12 4C14 6 16 8 16 12C16 16 14 18 12 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <ellipse cx="12" cy="12" rx="4" ry="6" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const MoonIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
// );

// const ScrollIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M4 4H20V20H4V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//         <path d="M8 7H16M8 11H14M8 15H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//     </svg>
// );

// const GraduateIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 3L2 9L12 15L22 9L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//         <path d="M6 12V16.5C6 17.5 8 19 12 19C16 19 18 17.5 18 16.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <path d="M20 10V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//     </svg>
// );

// const DiamondIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M6 3H18L21 9L12 21L3 9L6 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//         <path d="M12 3V21M3 9H21" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// // Icon mapping for Why Choose Us
// const iconMap = {
//     StarIcon: StarIcon,
//     GraduateIcon: GraduateIcon,
//     DiamondIcon: DiamondIcon,
//     CompassIcon: StarIcon, // Fallback
//     BalanceIcon: StarIcon,
//     EnergyIcon: StarIcon,
//     PlanetIcon: PlanetIcon,
//     MoonIcon: MoonIcon,
//     ScrollIcon: ScrollIcon
// };

// const DefaultIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//         <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//     </svg>
// );

// const getIcon = (iconName) => {
//     if (!iconName) return DefaultIcon;
//     const IconComponent = iconMap[iconName];
//     return IconComponent || DefaultIcon;
// };

// // Pagination Component
// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//     const getPageNumbers = () => {
//         const pages = [];
//         const maxVisible = 5;
        
//         if (totalPages <= maxVisible) {
//             for (let i = 1; i <= totalPages; i++) {
//                 pages.push(i);
//             }
//         } else {
//             if (currentPage <= 3) {
//                 for (let i = 1; i <= 4; i++) pages.push(i);
//                 pages.push('...');
//                 pages.push(totalPages);
//             } else if (currentPage >= totalPages - 2) {
//                 pages.push(1);
//                 pages.push('...');
//                 for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
//             } else {
//                 pages.push(1);
//                 pages.push('...');
//                 for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
//                 pages.push('...');
//                 pages.push(totalPages);
//             }
//         }
        
//         return pages;
//     };

//     if (totalPages <= 1) return null;

//     return (
//         <div className="flex justify-center items-center gap-2 mt-12">
//             <button
//                 onClick={() => onPageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className={`px-4 py-2 rounded-lg border transition-all ${
//                     currentPage === 1
//                         ? 'border-gray-700 text-gray-600 cursor-not-allowed'
//                         : 'border-[#00B7B3]/30 text-[#00B7B3] hover:bg-[#00B7B3]/10 hover:border-[#00B7B3]'
//                 }`}
//             >
//                 Previous
//             </button>
            
//             {getPageNumbers().map((page, index) => (
//                 <button
//                     key={index}
//                     onClick={() => typeof page === 'number' && onPageChange(page)}
//                     className={`w-10 h-10 rounded-lg transition-all ${
//                         page === currentPage
//                             ? 'bg-[#00B7B3] text-black font-bold'
//                             : page === '...'
//                             ? 'text-gray-500 cursor-default'
//                             : 'border border-[#00B7B3]/30 text-[#00B7B3] hover:bg-[#00B7B3]/10 hover:border-[#00B7B3]'
//                     }`}
//                     disabled={page === '...'}
//                 >
//                     {page}
//                 </button>
//             ))}
            
//             <button
//                 onClick={() => onPageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className={`px-4 py-2 rounded-lg border transition-all ${
//                     currentPage === totalPages
//                         ? 'border-gray-700 text-gray-600 cursor-not-allowed'
//                         : 'border-[#00B7B3]/30 text-[#00B7B3] hover:bg-[#00B7B3]/10 hover:border-[#00B7B3]'
//                 }`}
//             >
//                 Next
//             </button>
//         </div>
//     );
// };

// const AstrologyCoursesPage = () => {
//     const [loading, setLoading] = useState(true);
//     const [courses, setCourses] = useState([]);
//     const [pageContent, setPageContent] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [totalCourses, setTotalCourses] = useState(0);
//     const coursesPerPage = 6;

//     useEffect(() => {
//         fetchAllData();
//     }, [currentPage]);

//     const fetchAllData = async () => {
//         setLoading(true);
//         try {
//             // Fetch page content from DB
//             const { data: pageData } = await pageContentAPI.getByType('astrology');
//             if (pageData.success && pageData.data) {
//                 setPageContent(pageData.data);
//                 console.log('✅ Page content loaded:', pageData.data.heroTitle);
//             }
            
//             // Fetch courses
//             const { data: courseData } = await courseAPI.getAll();
//             let allCourses = courseData.courses || [];
//             const astrologyCourses = allCourses.filter(course => 
//                 course.category && course.category.includes('ASTROLOGY')
//             );
            
//             setTotalCourses(astrologyCourses.length);
//             const startIndex = (currentPage - 1) * coursesPerPage;
//             const endIndex = startIndex + coursesPerPage;
//             const paginatedCourses = astrologyCourses.slice(startIndex, endIndex);
            
//             setCourses(paginatedCourses);
//             setTotalPages(Math.ceil(astrologyCourses.length / coursesPerPage));
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             setCourses([]);
//             setTotalPages(1);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const stripHtml = (html) => {
//         if (!html) return '';
//         const temp = document.createElement('div');
//         temp.innerHTML = html;
//         return temp.textContent || temp.innerText || '';
//     };

//     const getCourseType = (course) => {
//         if (course.title?.toLowerCase().includes('financial')) {
//             return 'Financial Astrology';
//         }
//         if (course.title?.toLowerCase().includes('complete')) {
//             return 'Astrology Course';
//         }
//         return 'Astrology Course';
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-black flex items-center justify-center">
//                 <Loader2 className="w-12 h-12 text-[#00B7B3] animate-spin" />
//             </div>
//         );
//     }

//     return (
//         <div className="bg-black">
//             {/* ============================================ */}
//             {/* HERO SECTION - DYNAMIC */}
//             {/* ============================================ */}
//             <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
//                 <div className="absolute inset-0">
//                     <img 
//                         src={pageContent?.heroImage || 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'} 
//                         alt="Astrology Courses"
//                         className="w-full h-full object-cover scale-105"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
//                     <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,black_100%)]"></div>
//                 </div>

//                 <div className="absolute inset-0 overflow-hidden opacity-30">
//                     <div className="absolute top-10 left-10 animate-pulse">
//                         <StarIcon />
//                     </div>
//                     <div className="absolute top-1/3 right-20 animate-ping">
//                         <StarIcon />
//                     </div>
//                     <div className="absolute bottom-20 left-1/4 animate-pulse">
//                         <StarIcon />
//                     </div>
//                 </div>

//                 <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
//                     <div className="max-w-2xl">
//                         <div className="inline-flex items-center gap-3 p-3 bg-gradient-to-r from-[#00B7B3]/20 to-transparent rounded-full mb-6 backdrop-blur-sm border border-[#00B7B3]/30">
//                             <PlanetIcon />
//                             <span className="text-[#00B7B3] text-sm uppercase tracking-wider font-semibold">
//                                 {pageContent?.heroBadgeText || 'Ancient Wisdom Meets Modern Science'}
//                             </span>
//                         </div>
                        
//                         <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
//                             {pageContent?.heroTitle || 'Master the Art of'}
//                             <span className="text-[#00B7B3] block mt-2">
//                                 {pageContent?.heroSubtitle || 'Astrology'}
//                             </span>
//                         </h1>
                        
//                         <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
//                             {pageContent?.heroDescription || 'Embark on a transformative journey to decode the cosmic language. Become a certified astrologer with our comprehensive training programs.'}
//                         </p>

//                         <div className="flex gap-4 mt-8">
//                             <div className="w-16 h-1 bg-[#00B7B3]"></div>
//                             <div className="w-8 h-1 bg-[#00B7B3]/50"></div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
//             </div>

//             {/* ============================================ */}
//             {/* INTRO TEXT SECTION - DYNAMIC */}
//             {/* ============================================ */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-20">
//                 <div className="relative group">
//                     <div className="absolute inset-0 bg-gradient-to-r from-[#00B7B3]/20 to-transparent blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
//                     <div className="relative bg-gradient-to-br from-black/80 via-black/60 to-black/80 border border-[#00B7B3]/20 rounded-3xl p-10 lg:p-12 backdrop-blur-sm">
//                         <div className="absolute top-0 right-0 w-40 h-40 bg-[#00B7B3]/5 rounded-full blur-3xl"></div>
                        
//                         <div className="flex items-center gap-3 mb-8">
//                             <ScrollIcon />
//                             <span className="text-[#00B7B3] text-sm uppercase tracking-wider font-semibold">
//                                 {pageContent?.introTitle || 'The Cosmic Science'}
//                             </span>
//                         </div>
                        
//                         <div 
//                             className="text-gray-300 text-lg leading-relaxed"
//                             dangerouslySetInnerHTML={{ 
//                                 __html: pageContent?.introContent || 'Have you ever imagined about the unseen energies that regularize our life? Sometimes everything seems to be very supportive and compelling even when we put less or even no efforts. At the same time, we have evidence the time when even after putting our full strength and potential, we don\'t achieve success. It is nothing but an impact of astral and planetary changes. If we have a glance over the Hindu mythology, even the God and Goddess were not away from the effects of astral changes.<br/><br/>Astrology and Vastu are not a new concept. It is one of the most ancient studies. Few people think it as just art that could be God gifted, but the truth is on the flipside. <strong>Astrology is a complete study of science</strong>, which results from proper research and analysis. These courses include all researches made by renowned astrologers and researchers during the Vedic period or even before that.'
//                             }} 
//                         />
//                     </div>
//                 </div>
//             </div>

//             {/* ============================================ */}
//             {/* COURSES SECTION - PREMIUM CARDS */}
//             {/* ============================================ */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                 <div className="text-center mb-16">
//                     <div className="inline-flex items-center gap-2 bg-[#00B7B3]/10 px-4 py-2 rounded-full mb-4">
//                         <MoonIcon />
//                         <span className="text-[#00B7B3] text-sm uppercase tracking-wider">Celestial Curriculum</span>
//                     </div>
//                     <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//                         Our <span className="text-[#00B7B3]">Astrology Courses</span>
//                     </h2>
//                     <p className="text-gray-400 max-w-2xl mx-auto">
//                         Choose your path to become a certified astrologer with our structured learning programs
//                     </p>
//                     {totalCourses > 0 && (
//                         <p className="text-[#00B7B3] text-sm mt-2">
//                             Showing {courses.length} of {totalCourses} courses
//                         </p>
//                     )}
//                 </div>

//                 {courses.length === 0 ? (
//                     <div className="text-center py-20">
//                         <p className="text-gray-400 text-lg">No astrology courses available at the moment.</p>
//                         <p className="text-gray-500 mt-2">Please check back later for new courses.</p>
//                     </div>
//                 ) : (
//                     <>
//                         <div className="space-y-20">
//                             {courses.map((course, index) => (
//                                 <div 
//                                     key={course._id || index}
//                                     className={`group flex flex-col ${
//                                         index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
//                                     } gap-8 lg:gap-12 items-center bg-gradient-to-br from-black/40 to-black/20 rounded-2xl p-6 lg:p-8 border border-[#00B7B3]/10 hover:border-[#00B7B3]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#00B7B3]/5`}
//                                 >
//                                     <div className="lg:w-5/12">
//                                         <div className="relative overflow-hidden rounded-2xl group-hover:shadow-xl transition-all duration-500">
//                                             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10 group-hover:opacity-80 transition-opacity duration-500"></div>
//                                             <img 
//                                                 src={course.image ? `${course.image}` : 'https://images.unsplash.com/photo-1507484467459-0c91be303a5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'} 
//                                                 alt={course.title}
//                                                 className="w-full h-[280px] md:h-[350px] object-cover group-hover:scale-110 transition-transform duration-700"
//                                             />
//                                             <div className="absolute top-4 left-4 z-20">
//                                                 <span className="px-4 py-2 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-full text-sm font-semibold shadow-lg">
//                                                     {getCourseType(course)}
//                                                 </span>
//                                             </div>
//                                             <div className="absolute top-4 right-4 z-20 flex gap-2">
//                                                 <span className="px-3 py-1 bg-black/70 backdrop-blur-sm border border-[#00B7B3]/40 text-[#00B7B3] rounded-full text-xs font-medium">
//                                                     {course.courseDuration || 'Flexible'}
//                                                 </span>
//                                                 <span className="px-3 py-1 bg-black/70 backdrop-blur-sm border border-[#00B7B3]/40 text-[#00B7B3] rounded-full text-xs font-medium">
//                                                     {course.level || 'All Levels'}
//                                                 </span>
//                                             </div>
//                                             <div className="absolute bottom-4 left-4 z-20">
//                                                 <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white rounded-full text-xs">
//                                                     {course.modules || 'Multiple'} Modules
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="lg:w-7/12 space-y-5">
//                                         <div>
//                                             <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-[#00B7B3] transition-colors duration-300">
//                                                 {course.title}
//                                             </h2>
//                                             <div className="flex items-baseline gap-2">
//                                                 <span className="text-3xl font-bold text-[#00B7B3]">{course.price || course.courseFee || 'Contact Us'}</span>
//                                                 <span className="text-gray-500 text-sm">+ GST</span>
//                                             </div>
//                                         </div>

//                                         <p className="text-gray-400 leading-relaxed line-clamp-3">
//                                             {stripHtml(course.whatIs || course.aboutCourse) || 'Discover the ancient wisdom of Vedic astrology with our comprehensive course.'}
//                                         </p>

//                                         {course.highlights && course.highlights.length > 0 && course.highlights[0] !== '' && (
//                                             <div className="flex flex-wrap gap-2 pt-2">
//                                                 {course.highlights.slice(0, 6).map((highlight, idx) => (
//                                                     <span 
//                                                         key={idx} 
//                                                         className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#00B7B3]/10 to-transparent border border-[#00B7B3]/30 rounded-full text-sm text-gray-300 hover:border-[#00B7B3]/60 hover:bg-[#00B7B3]/20 transition-all duration-300"
//                                                     >
//                                                         <span className="w-1.5 h-1.5 bg-[#00B7B3] rounded-full"></span>
//                                                         {highlight}
//                                                     </span>
//                                                 ))}
//                                                 {course.highlights.length > 6 && (
//                                                     <span className="inline-flex items-center px-3 py-1.5 text-sm text-[#00B7B3]">
//                                                         +{course.highlights.length - 6} more
//                                                     </span>
//                                                 )}
//                                             </div>
//                                         )}

//                                         <div className="flex flex-wrap items-center gap-4 pt-4">
//                                             <Link
//                                                 href={`/astrology-courses/${course.slug || course.title.toLowerCase().replace(/\s+/g, '-')}`}
//                                                 className="group/btn px-8 py-3 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-full font-semibold hover:shadow-lg hover:shadow-[#00B7B3]/30 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
//                                             >
//                                                 ENROLL NOW
//                                                 <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                                 </svg>
//                                             </Link>
//                                             <Link
//                                                 href={`/courses/${course.slug || course.title.toLowerCase().replace(/\s+/g, '-')}/details`}
//                                                 className="px-8 py-3 border-2 border-[#00B7B3] text-[#00B7B3] rounded-full font-semibold hover:bg-[#00B7B3]/10 transform hover:scale-105 transition-all duration-300"
//                                             >
//                                                 VIEW DETAILS
//                                             </Link>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>

//                         <Pagination
//                             currentPage={currentPage}
//                             totalPages={totalPages}
//                             onPageChange={setCurrentPage}
//                         />
//                     </>
//                 )}
//             </div>

//             {/* ============================================ */}
//             {/* WHY CHOOSE OUR COURSES - DYNAMIC */}
//             {/* ============================================ */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                 <div className="relative overflow-hidden bg-gradient-to-br from-black/60 to-black/30 border border-[#00B7B3]/20 rounded-3xl p-12">
//                     <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
//                         {pageContent?.whyChooseUsTitle || 'Why Choose Our Astrology Courses?'}
//                     </h2>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
//                         {pageContent?.whyChooseUsFeatures?.map((feature, idx) => {
//                             const IconComponent = getIcon(feature.icon);
//                             return (
//                                 <div key={idx} className="text-center group">
//                                     <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#00B7B3]/20 to-transparent flex items-center justify-center group-hover:bg-[#00B7B3] group-hover:scale-110 transition-all duration-500 border border-[#00B7B3]/30 group-hover:border-[#00B7B3]">
//                                         <div className="text-[#00B7B3] group-hover:text-black transition-colors duration-500">
//                                             <IconComponent />
//                                         </div>
//                                     </div>
//                                     <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00B7B3] transition-colors">
//                                         {feature.title}
//                                     </h3>
//                                     <p className="text-gray-400 text-sm leading-relaxed">
//                                         {feature.description}
//                                     </p>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </div>

//             {/* ============================================ */}
//             {/* CTA SECTION - DYNAMIC */}
//             {/* ============================================ */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                 <div className="relative rounded-3xl overflow-hidden">
//                     <div className="absolute inset-0 bg-gradient-to-r from-[#00B7B3] to-[#008080] opacity-90"></div>
//                     <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay" style={{ backgroundImage: `url(${pageContent?.ctaImage || ''})` }}></div>
                    
//                     <div className="relative py-16 px-8 text-center">
//                         <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//                             {pageContent?.ctaTitle || 'Ready to Begin Your Cosmic Journey?'}
//                         </h2>
//                         <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
//                             {pageContent?.ctaDescription || 'Join thousands of successful astrologers who started their journey with us'}
//                         </p>
//                         <Link 
//                             href={pageContent?.ctaButtonLink || '/contact'} 
//                             className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#00B7B3] rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl"
//                         >
//                             {pageContent?.ctaButtonText || 'Get Free Consultation'}
//                             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                             </svg>
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AstrologyCoursesPage;



// // AstrologyCoursesPage.jsx
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Loader2 } from 'lucide-react';
// import { courseAPI, pageContentAPI } from '../../admin/services/api';

// // ==================== SVG ICONS ====================
// const StarIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const PlanetIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M12 4C10 6 8 8 8 12C8 16 10 18 12 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <path d="M12 4C14 6 16 8 16 12C16 16 14 18 12 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <ellipse cx="12" cy="12" rx="4" ry="6" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const MoonIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const ScrollIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M4 4H20V20H4V4Z" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M8 7H16M8 11H14M8 15H12" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const GraduateIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 3L2 9L12 15L22 9L12 3Z" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M6 12V16.5C6 17.5 8 19 12 19C16 19 18 17.5 18 16.5V12" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M20 10V17" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const DiamondIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M6 3H18L21 9L12 21L3 9L6 3Z" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M12 3V21M3 9H21" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// // Icon mapping for Why Choose Us
// const iconMap = {
//     StarIcon: StarIcon,
//     GraduateIcon: GraduateIcon,
//     DiamondIcon: DiamondIcon,
//     PlanetIcon: PlanetIcon,
//     MoonIcon: MoonIcon,
//     ScrollIcon: ScrollIcon
// };

// const DefaultIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//         <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const getIcon = (iconName) => {
//     if (!iconName) return DefaultIcon;
//     return iconMap[iconName] || DefaultIcon;
// };

// // ✅ CSS - Only container styles, no color overrides
// const pageStyles = `
//   .intro-content {
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//     word-break: break-word;
//     max-width: 100%;
//     overflow-x: auto;
//   }
  
//   .intro-content p {
//     margin-bottom: 1rem;
//     line-height: 1.6;
//   }
  
//   .intro-content h1 {
//     font-size: 2rem;
//     margin: 1.5rem 0 1rem 0;
//   }
  
//   .intro-content h2 {
//     font-size: 1.75rem;
//     margin: 1.2rem 0 0.8rem 0;
//   }
  
//   .intro-content h3 {
//     font-size: 1.5rem;
//     margin: 1rem 0 0.6rem 0;
//   }
  
//   .intro-content ul, .intro-content ol {
//     margin: 0.8rem 0 0.8rem 1.8rem;
//   }
  
//   .intro-content li {
//     margin: 0.4rem 0;
//   }
  
//   .intro-content blockquote {
//     border-left: 4px solid #00B7B3;
//     background: rgba(0, 183, 179, 0.1);
//     padding: 0.8rem 1.2rem;
//     margin: 1rem 0;
//   }
  
//   .intro-content pre {
//     background: #1a1a2a;
//     border-radius: 8px;
//     padding: 1rem;
//     overflow-x: auto;
//   }
  
//   .intro-content img {
//     max-width: 100%;
//     height: auto;
//     border-radius: 8px;
//   }
  
//   .intro-content table {
//     max-width: 100%;
//     overflow-x: auto;
//     display: block;
//     border-collapse: collapse;
//   }
  
//   .intro-content td, .intro-content th {
//     border: 1px solid #333;
//     padding: 0.5rem;
//   }
// `;

// // Pagination Component
// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//     const getPageNumbers = () => {
//         const pages = [];
//         const maxVisible = 5;
        
//         if (totalPages <= maxVisible) {
//             for (let i = 1; i <= totalPages; i++) pages.push(i);
//         } else {
//             if (currentPage <= 3) {
//                 for (let i = 1; i <= 4; i++) pages.push(i);
//                 pages.push('...');
//                 pages.push(totalPages);
//             } else if (currentPage >= totalPages - 2) {
//                 pages.push(1);
//                 pages.push('...');
//                 for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
//             } else {
//                 pages.push(1);
//                 pages.push('...');
//                 for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
//                 pages.push('...');
//                 pages.push(totalPages);
//             }
//         }
//         return pages;
//     };

//     if (totalPages <= 1) return null;

//     return (
//         <div className="flex justify-center items-center gap-2 mt-12">
//             <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}
//                 className={`px-4 py-2 rounded-lg border transition-all ${currentPage === 1 ? 'border-gray-700 text-gray-600 cursor-not-allowed' : 'border-[#00B7B3]/30 text-[#00B7B3] hover:bg-[#00B7B3]/10'}`}>
//                 Previous
//             </button>
//             {getPageNumbers().map((page, index) => (
//                 <button key={index} onClick={() => typeof page === 'number' && onPageChange(page)}
//                     className={`w-10 h-10 rounded-lg transition-all ${page === currentPage ? 'bg-[#00B7B3] text-black font-bold' : page === '...' ? 'text-gray-500 cursor-default' : 'border border-[#00B7B3]/30 text-[#00B7B3] hover:bg-[#00B7B3]/10'}`}
//                     disabled={page === '...'}>
//                     {page}
//                 </button>
//             ))}
//             <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}
//                 className={`px-4 py-2 rounded-lg border transition-all ${currentPage === totalPages ? 'border-gray-700 text-gray-600 cursor-not-allowed' : 'border-[#00B7B3]/30 text-[#00B7B3] hover:bg-[#00B7B3]/10'}`}>
//                 Next
//             </button>
//         </div>
//     );
// };

// const AstrologyCoursesPage = () => {
//     const [loading, setLoading] = useState(true);
//     const [courses, setCourses] = useState([]);
//     const [pageContent, setPageContent] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [totalCourses, setTotalCourses] = useState(0);
//     const coursesPerPage = 6;

//     useEffect(() => {
//         fetchAllData();
//     }, [currentPage]);

//     const fetchAllData = async () => {
//         setLoading(true);
//         try {
//             const { data: pageData } = await pageContentAPI.getByType('astrology');
//             if (pageData.success && pageData.data) setPageContent(pageData.data);
            
//             const { data: courseData } = await courseAPI.getAll();
//             const astrologyCourses = (courseData.courses || []).filter(c => c.category?.includes('ASTROLOGY'));
            
//             setTotalCourses(astrologyCourses.length);
//             const startIndex = (currentPage - 1) * coursesPerPage;
//             setCourses(astrologyCourses.slice(startIndex, startIndex + coursesPerPage));
//             setTotalPages(Math.ceil(astrologyCourses.length / coursesPerPage));
//         } catch (error) {
//             console.error('Error:', error);
//             setCourses([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const stripHtml = (html) => {
//         if (!html) return '';
//         const temp = document.createElement('div');
//         temp.innerHTML = html;
//         return temp.textContent || temp.innerText || '';
//     };

//     const getCourseType = (course) => {
//         if (course.title?.toLowerCase().includes('financial')) return 'Financial Astrology';
//         if (course.title?.toLowerCase().includes('complete')) return 'Astrology Course';
//         return 'Astrology Course';
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-black flex items-center justify-center">
//                 <Loader2 className="w-12 h-12 text-[#00B7B3] animate-spin" />
//             </div>
//         );
//     }

//     return (
//         <>
//             <style>{pageStyles}</style>
//             <div className="bg-black">
//                 {/* HERO SECTION */}
//                 <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
//                     <div className="absolute inset-0">
//                         <img src={pageContent?.heroImage || 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'} 
//                             alt="Astrology Courses" className="w-full h-full object-cover scale-105" />
//                         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
//                         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,black_100%)]"></div>
//                     </div>
//                     <div className="absolute inset-0 overflow-hidden opacity-30">
//                         <div className="absolute top-10 left-10 animate-pulse"><StarIcon /></div>
//                         <div className="absolute top-1/3 right-20 animate-ping"><StarIcon /></div>
//                         <div className="absolute bottom-20 left-1/4 animate-pulse"><StarIcon /></div>
//                     </div>
//                     <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
//                         <div className="max-w-2xl">
//                             <div className="inline-flex items-center gap-3 p-3 bg-gradient-to-r from-[#00B7B3]/20 to-transparent rounded-full mb-6 backdrop-blur-sm border border-[#00B7B3]/30">
//                                 <PlanetIcon />
//                                 <span className="text-[#00B7B3] text-sm uppercase tracking-wider font-semibold">
//                                     {pageContent?.heroBadgeText || 'Ancient Wisdom Meets Modern Science'}
//                                 </span>
//                             </div>
//                             <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
//                                 {pageContent?.heroTitle || 'Master the Art of'}
//                                 <span className="text-[#00B7B3] block mt-2">{pageContent?.heroSubtitle || 'Astrology'}</span>
//                             </h1>
//                             <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
//                                 {pageContent?.heroDescription || 'Embark on a transformative journey to decode the cosmic language.'}
//                             </p>
//                             <div className="flex gap-4 mt-8">
//                                 <div className="w-16 h-1 bg-[#00B7B3]"></div>
//                                 <div className="w-8 h-1 bg-[#00B7B3]/50"></div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
//                 </div>

//                 {/* INTRO SECTION - Editor styles preserved */}
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-20">
//                     <div className="relative group">
//                         <div className="absolute inset-0 bg-gradient-to-r from-[#00B7B3]/20 to-transparent blur-3xl opacity-20 group-hover:opacity-40"></div>
//                         <div className="relative bg-gradient-to-br from-black/80 via-black/60 to-black/80 border border-[#00B7B3]/20 rounded-3xl p-10 lg:p-12 backdrop-blur-sm">
//                             <div className="absolute top-0 right-0 w-40 h-40 bg-[#00B7B3]/5 rounded-full blur-3xl"></div>
//                             <div className="flex items-center gap-3 mb-8">
//                                 <ScrollIcon />
//                                 <span className="text-[#00B7B3] text-sm uppercase tracking-wider font-semibold">
//                                     {pageContent?.introTitle || 'The Cosmic Science'}
//                                 </span>
//                             </div>
//                             <div 
//                                 className="intro-content text-gray-300 text-lg leading-relaxed"
//                                 dangerouslySetInnerHTML={{ 
//                                     __html: pageContent?.introContent || 'Default content...'
//                                 }} 
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* COURSES SECTION */}
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                     <div className="text-center mb-16">
//                         <div className="inline-flex items-center gap-2 bg-[#00B7B3]/10 px-4 py-2 rounded-full mb-4">
//                             <MoonIcon />
//                             <span className="text-[#00B7B3] text-sm uppercase tracking-wider">Celestial Curriculum</span>
//                         </div>
//                         <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//                             Our <span className="text-[#00B7B3]">Astrology Courses</span>
//                         </h2>
//                         <p className="text-gray-400 max-w-2xl mx-auto">
//                             Choose your path to become a certified astrologer with our structured learning programs
//                         </p>
//                         {totalCourses > 0 && (
//                             <p className="text-[#00B7B3] text-sm mt-2">Showing {courses.length} of {totalCourses} courses</p>
//                         )}
//                     </div>

//                     {courses.length === 0 ? (
//                         <div className="text-center py-20">
//                             <p className="text-gray-400 text-lg">No astrology courses available at the moment.</p>
//                             <p className="text-gray-500 mt-2">Please check back later for new courses.</p>
//                         </div>
//                     ) : (
//                         <>
//                             <div className="space-y-20">
//                                 {courses.map((course, index) => (
//                                     <div key={course._id || index} className={`group flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center bg-gradient-to-br from-black/40 to-black/20 rounded-2xl p-6 lg:p-8 border border-[#00B7B3]/10 hover:border-[#00B7B3]/40 transition-all duration-500`}>
//                                         <div className="lg:w-5/12">
//                                             <div className="relative overflow-hidden rounded-2xl">
//                                                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
//                                                 <img src={course.image ? `${course.image}` : 'https://images.unsplash.com/photo-1507484467459-0c91be303a5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'} 
//                                                     alt={course.title} className="w-full h-[280px] md:h-[350px] object-cover group-hover:scale-110 transition-transform duration-700" />
//                                                 <div className="absolute top-4 left-4 z-20">
//                                                     <span className="px-4 py-2 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-full text-sm font-semibold shadow-lg">
//                                                         {getCourseType(course)}
//                                                     </span>
//                                                 </div>
//                                                 <div className="absolute top-4 right-4 z-20 flex gap-2">
//                                                     <span className="px-3 py-1 bg-black/70 backdrop-blur-sm border border-[#00B7B3]/40 text-[#00B7B3] rounded-full text-xs">
//                                                         {course.courseDuration || 'Flexible'}
//                                                     </span>
//                                                     <span className="px-3 py-1 bg-black/70 backdrop-blur-sm border border-[#00B7B3]/40 text-[#00B7B3] rounded-full text-xs">
//                                                         {course.level || 'All Levels'}
//                                                     </span>
//                                                 </div>
//                                                 <div className="absolute bottom-4 left-4 z-20">
//                                                     <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white rounded-full text-xs">
//                                                         {course.modules || 'Multiple'} Modules
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="lg:w-7/12 space-y-5">
//                                             <div>
//                                                 <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-[#00B7B3] transition-colors">
//                                                     {course.title}
//                                                 </h2>
//                                                 <div className="flex items-baseline gap-2">
//                                                     <span className="text-3xl font-bold text-[#00B7B3]">{course.price || course.courseFee || 'Contact Us'}</span>
//                                                     <span className="text-gray-500 text-sm">+ GST</span>
//                                                 </div>
//                                             </div>
//                                             <p className="text-gray-400 leading-relaxed line-clamp-3">
//                                                 {stripHtml(course.whatIs || course.aboutCourse) || 'Discover the ancient wisdom of Vedic astrology.'}
//                                             </p>
//                                             {course.highlights?.length > 0 && course.highlights[0] !== '' && (
//                                                 <div className="flex flex-wrap gap-2 pt-2">
//                                                     {course.highlights.slice(0, 6).map((highlight, idx) => (
//                                                         <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#00B7B3]/10 to-transparent border border-[#00B7B3]/30 rounded-full text-sm text-gray-300">
//                                                             <span className="w-1.5 h-1.5 bg-[#00B7B3] rounded-full"></span>
//                                                             {highlight}
//                                                         </span>
//                                                     ))}
//                                                     {course.highlights.length > 6 && (
//                                                         <span className="inline-flex items-center px-3 py-1.5 text-sm text-[#00B7B3]">+{course.highlights.length - 6} more</span>
//                                                     )}
//                                                 </div>
//                                             )}
//                                             <div className="flex flex-wrap items-center gap-4 pt-4">
//                                                 <Link href={`/astrology-courses/${course.slug || course.title.toLowerCase().replace(/\s+/g, '-')}`}
//                                                     className="group/btn px-8 py-3 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-full font-semibold hover:shadow-lg flex items-center gap-2">
//                                                     ENROLL NOW
//                                                     <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                                     </svg>
//                                                 </Link>
//                                                 <Link href={`/courses/${course.slug || course.title.toLowerCase().replace(/\s+/g, '-')}/details`}
//                                                     className="px-8 py-3 border-2 border-[#00B7B3] text-[#00B7B3] rounded-full font-semibold hover:bg-[#00B7B3]/10">
//                                                     VIEW DETAILS
//                                                 </Link>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                             <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
//                         </>
//                     )}
//                 </div>

//                 {/* WHY CHOOSE US - DYNAMIC */}
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                     <div className="relative overflow-hidden bg-gradient-to-br from-black/60 to-black/30 border border-[#00B7B3]/20 rounded-3xl p-12">
//                         <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
//                             {pageContent?.whyChooseUsTitle || 'Why Choose Our Astrology Courses?'}
//                         </h2>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
//                             {pageContent?.whyChooseUsFeatures?.map((feature, idx) => {
//                                 const IconComponent = getIcon(feature.icon);
//                                 return (
//                                     <div key={idx} className="text-center group">
//                                         <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#00B7B3]/20 to-transparent flex items-center justify-center group-hover:bg-[#00B7B3] group-hover:scale-110 transition-all duration-500 border border-[#00B7B3]/30 group-hover:border-[#00B7B3]">
//                                             <div className="text-[#00B7B3] group-hover:text-black transition-colors duration-500">
//                                                 <IconComponent />
//                                             </div>
//                                         </div>
//                                         <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00B7B3] transition-colors">
//                                             {feature.title}
//                                         </h3>
//                                         <p className="text-gray-400 text-sm leading-relaxed">
//                                             {feature.description}
//                                         </p>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 </div>

//                 {/* CTA SECTION - DYNAMIC */}
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                     <div className="relative rounded-3xl overflow-hidden">
//                         <div className="absolute inset-0 bg-gradient-to-r from-[#00B7B3] to-[#008080] opacity-90"></div>
//                         <div className="relative py-16 px-8 text-center">
//                             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//                                 {pageContent?.ctaTitle || 'Ready to Begin Your Cosmic Journey?'}
//                             </h2>
//                             <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
//                                 {pageContent?.ctaDescription || 'Join thousands of successful astrologers who started their journey with us'}
//                             </p>
//                             <Link href={pageContent?.ctaButtonLink || '/contact'}
//                                 className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#00B7B3] rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl">
//                                 {pageContent?.ctaButtonText || 'Get Free Consultation'}
//                                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                                 </svg>
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AstrologyCoursesPage;




// // AstrologyCoursesPage.jsx
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Helmet } from 'react-helmet';
// import { Loader2 } from 'lucide-react';
// import { courseAPI, pageContentAPI } from '../../admin/services/api';

// // ==================== SVG ICONS ====================
// const StarIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const PlanetIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M12 4C10 6 8 8 8 12C8 16 10 18 12 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <path d="M12 4C14 6 16 8 16 12C16 16 14 18 12 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <ellipse cx="12" cy="12" rx="4" ry="6" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const MoonIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const ScrollIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M4 4H20V20H4V4Z" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M8 7H16M8 11H14M8 15H12" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const GraduateIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 3L2 9L12 15L22 9L12 3Z" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M6 12V16.5C6 17.5 8 19 12 19C16 19 18 17.5 18 16.5V12" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M20 10V17" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const DiamondIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M6 3H18L21 9L12 21L3 9L6 3Z" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M12 3V21M3 9H21" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// // Icon mapping for Why Choose Us
// const iconMap = {
//     StarIcon: StarIcon,
//     GraduateIcon: GraduateIcon,
//     DiamondIcon: DiamondIcon,
//     PlanetIcon: PlanetIcon,
//     MoonIcon: MoonIcon,
//     ScrollIcon: ScrollIcon
// };

// const DefaultIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//         <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const getIcon = (iconName) => {
//     if (!iconName) return DefaultIcon;
//     return iconMap[iconName] || DefaultIcon;
// };

// // ✅ CSS - Only container styles, no color overrides
// const pageStyles = `
//   .intro-content {
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//     word-break: break-word;
//     max-width: 100%;
//     overflow-x: auto;
//   }
  
//   .intro-content p {
//     margin-bottom: 1rem;
//     line-height: 1.6;
//   }
  
//   .intro-content h1 {
//     font-size: 2rem;
//     margin: 1.5rem 0 1rem 0;
//   }
  
//   .intro-content h2 {
//     font-size: 1.75rem;
//     margin: 1.2rem 0 0.8rem 0;
//   }
  
//   .intro-content h3 {
//     font-size: 1.5rem;
//     margin: 1rem 0 0.6rem 0;
//   }
  
//   .intro-content ul, .intro-content ol {
//     margin: 0.8rem 0 0.8rem 1.8rem;
//   }
  
//   .intro-content li {
//     margin: 0.4rem 0;
//   }
  
//   .intro-content blockquote {
//     border-left: 4px solid #00B7B3;
//     background: rgba(0, 183, 179, 0.1);
//     padding: 0.8rem 1.2rem;
//     margin: 1rem 0;
//   }
  
//   .intro-content pre {
//     background: #1a1a2a;
//     border-radius: 8px;
//     padding: 1rem;
//     overflow-x: auto;
//   }
  
//   .intro-content img {
//     max-width: 100%;
//     height: auto;
//     border-radius: 8px;
//   }
  
//   .intro-content table {
//     max-width: 100%;
//     overflow-x: auto;
//     display: block;
//     border-collapse: collapse;
//   }
  
//   .intro-content td, .intro-content th {
//     border: 1px solid #333;
//     padding: 0.5rem;
//   }
// `;

// // Pagination Component
// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//     const getPageNumbers = () => {
//         const pages = [];
//         const maxVisible = 5;
        
//         if (totalPages <= maxVisible) {
//             for (let i = 1; i <= totalPages; i++) pages.push(i);
//         } else {
//             if (currentPage <= 3) {
//                 for (let i = 1; i <= 4; i++) pages.push(i);
//                 pages.push('...');
//                 pages.push(totalPages);
//             } else if (currentPage >= totalPages - 2) {
//                 pages.push(1);
//                 pages.push('...');
//                 for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
//             } else {
//                 pages.push(1);
//                 pages.push('...');
//                 for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
//                 pages.push('...');
//                 pages.push(totalPages);
//             }
//         }
//         return pages;
//     };

//     if (totalPages <= 1) return null;

//     return (
//         <div className="flex justify-center items-center gap-2 mt-12">
//             <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}
//                 className={`px-4 py-2 rounded-lg border transition-all ${currentPage === 1 ? 'border-gray-700 text-gray-600 cursor-not-allowed' : 'border-[#00B7B3]/30 text-[#00B7B3] hover:bg-[#00B7B3]/10'}`}>
//                 Previous
//             </button>
//             {getPageNumbers().map((page, index) => (
//                 <button key={index} onClick={() => typeof page === 'number' && onPageChange(page)}
//                     className={`w-10 h-10 rounded-lg transition-all ${page === currentPage ? 'bg-[#00B7B3] text-black font-bold' : page === '...' ? 'text-gray-500 cursor-default' : 'border border-[#00B7B3]/30 text-[#00B7B3] hover:bg-[#00B7B3]/10'}`}
//                     disabled={page === '...'}>
//                     {page}
//                 </button>
//             ))}
//             <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}
//                 className={`px-4 py-2 rounded-lg border transition-all ${currentPage === totalPages ? 'border-gray-700 text-gray-600 cursor-not-allowed' : 'border-[#00B7B3]/30 text-[#00B7B3] hover:bg-[#00B7B3]/10'}`}>
//                 Next
//             </button>
//         </div>
//     );
// };

// const AstrologyCoursesPage = () => {
//     const [loading, setLoading] = useState(true);
//     const [courses, setCourses] = useState([]);
//     const [pageContent, setPageContent] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [totalCourses, setTotalCourses] = useState(0);
//     const coursesPerPage = 6;

//     useEffect(() => {
//         fetchAllData();
//     }, [currentPage]);

//     const fetchAllData = async () => {
//         setLoading(true);
//         try {
//             const { data: pageData } = await pageContentAPI.getByType('astrology');
//             if (pageData.success && pageData.data) setPageContent(pageData.data);
            
//             const { data: courseData } = await courseAPI.getAll();
//             const astrologyCourses = (courseData.courses || []).filter(c => c.category?.includes('ASTROLOGY'));
            
//             setTotalCourses(astrologyCourses.length);
//             const startIndex = (currentPage - 1) * coursesPerPage;
//             setCourses(astrologyCourses.slice(startIndex, startIndex + coursesPerPage));
//             setTotalPages(Math.ceil(astrologyCourses.length / coursesPerPage));
//         } catch (error) {
//             console.error('Error:', error);
//             setCourses([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const stripHtml = (html) => {
//         if (!html) return '';
//         const temp = document.createElement('div');
//         temp.innerHTML = html;
//         return temp.textContent || temp.innerText || '';
//     };

//     const getCourseType = (course) => {
//         if (course.title?.toLowerCase().includes('financial')) return 'Financial Astrology';
//         if (course.title?.toLowerCase().includes('complete')) return 'Astrology Course';
//         return 'Astrology Course';
//     };

//     // ✅ SEO Data from pageContent (just like admin panel fields)
//     const seoTitle = pageContent?.seoTitle || 'Astrology Courses | Learn Vedic Astrology Online | NB Astro';
//     const seoDescription = pageContent?.seoDescription || 'Join best astrology courses in Noida. Learn Vedic astrology from expert Naveen Bhagat with practical training and certification. Enroll now!';
//     const seoKeywords = pageContent?.seoKeywords || 'astrology course, vedic astrology course, astrology classes online, astrology training noida, learn astrology, astrology certification';

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-black flex items-center justify-center">
//                 <Loader2 className="w-12 h-12 text-[#00B7B3] animate-spin" />
//             </div>
//         );
//     }

//     return (
//         <>
//             {/* ✅ SEO Helmet - Only title, description, keywords */}
//             <Helmet>
//                 <title>{seoTitle}</title>
//                 <meta name="description" content={seoDescription} />
//                 <meta name="keywords" content={seoKeywords} />
//             </Helmet>
            
//             <style>{pageStyles}</style>
//             <div className="bg-black">
//                 {/* HERO SECTION */}
//                 <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
//                     <div className="absolute inset-0">
//                         <img src={pageContent?.heroImage || 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'} 
//                             alt="Astrology Courses" className="w-full h-full object-cover scale-105" />
//                         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
//                         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,black_100%)]"></div>
//                     </div>
//                     <div className="absolute inset-0 overflow-hidden opacity-30">
//                         <div className="absolute top-10 left-10 animate-pulse"><StarIcon /></div>
//                         <div className="absolute top-1/3 right-20 animate-ping"><StarIcon /></div>
//                         <div className="absolute bottom-20 left-1/4 animate-pulse"><StarIcon /></div>
//                     </div>
//                     <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
//                         <div className="max-w-2xl">
//                             <div className="inline-flex items-center gap-3 p-3 bg-gradient-to-r from-[#00B7B3]/20 to-transparent rounded-full mb-6 backdrop-blur-sm border border-[#00B7B3]/30">
//                                 <PlanetIcon />
//                                 <span className="text-[#00B7B3] text-sm uppercase tracking-wider font-semibold">
//                                     {pageContent?.heroBadgeText || 'Ancient Wisdom Meets Modern Science'}
//                                 </span>
//                             </div>
//                             <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
//                                 {pageContent?.heroTitle || 'Master the Art of'}
//                                 <span className="text-[#00B7B3] block mt-2">{pageContent?.heroSubtitle || 'Astrology'}</span>
//                             </h1>
//                             <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
//                                 {pageContent?.heroDescription || 'Embark on a transformative journey to decode the cosmic language.'}
//                             </p>
//                             <div className="flex gap-4 mt-8">
//                                 <div className="w-16 h-1 bg-[#00B7B3]"></div>
//                                 <div className="w-8 h-1 bg-[#00B7B3]/50"></div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
//                 </div>

//                 {/* INTRO SECTION */}
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-20">
//                     <div className="relative group">
//                         <div className="absolute inset-0 bg-gradient-to-r from-[#00B7B3]/20 to-transparent blur-3xl opacity-20 group-hover:opacity-40"></div>
//                         <div className="relative bg-gradient-to-br from-black/80 via-black/60 to-black/80 border border-[#00B7B3]/20 rounded-3xl p-10 lg:p-12 backdrop-blur-sm">
//                             <div className="absolute top-0 right-0 w-40 h-40 bg-[#00B7B3]/5 rounded-full blur-3xl"></div>
//                             <div className="flex items-center gap-3 mb-8">
//                                 <ScrollIcon />
//                                 <span className="text-[#00B7B3] text-sm uppercase tracking-wider font-semibold">
//                                     {pageContent?.introTitle || 'The Cosmic Science'}
//                                 </span>
//                             </div>
//                             <div 
//                                 className="intro-content text-gray-300 text-lg leading-relaxed"
//                                 dangerouslySetInnerHTML={{ 
//                                     __html: pageContent?.introContent || 'Default content...'
//                                 }} 
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* COURSES SECTION */}
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                     <div className="text-center mb-16">
//                         <div className="inline-flex items-center gap-2 bg-[#00B7B3]/10 px-4 py-2 rounded-full mb-4">
//                             <MoonIcon />
//                             <span className="text-[#00B7B3] text-sm uppercase tracking-wider">Celestial Curriculum</span>
//                         </div>
//                         <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//                             Our <span className="text-[#00B7B3]">Astrology Courses</span>
//                         </h2>
//                         <p className="text-gray-400 max-w-2xl mx-auto">
//                             Choose your path to become a certified astrologer with our structured learning programs
//                         </p>
//                         {totalCourses > 0 && (
//                             <p className="text-[#00B7B3] text-sm mt-2">Showing {courses.length} of {totalCourses} courses</p>
//                         )}
//                     </div>

//                     {courses.length === 0 ? (
//                         <div className="text-center py-20">
//                             <p className="text-gray-400 text-lg">No astrology courses available at the moment.</p>
//                             <p className="text-gray-500 mt-2">Please check back later for new courses.</p>
//                         </div>
//                     ) : (
//                         <>
//                             <div className="space-y-20">
//                                 {courses.map((course, index) => (
//                                     <div key={course._id || index} className={`group flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center bg-gradient-to-br from-black/40 to-black/20 rounded-2xl p-6 lg:p-8 border border-[#00B7B3]/10 hover:border-[#00B7B3]/40 transition-all duration-500`}>
//                                         <div className="lg:w-5/12">
//                                             <div className="relative overflow-hidden rounded-2xl">
//                                                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
//                                                 <img src={course.image ? `${course.image}` : 'https://images.unsplash.com/photo-1507484467459-0c91be303a5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'} 
//                                                     alt={course.title} className="w-full h-[280px] md:h-[350px] object-cover group-hover:scale-110 transition-transform duration-700" />
//                                                 <div className="absolute top-4 left-4 z-20">
//                                                     <span className="px-4 py-2 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-full text-sm font-semibold shadow-lg">
//                                                         {getCourseType(course)}
//                                                     </span>
//                                                 </div>
//                                                 <div className="absolute top-4 right-4 z-20 flex gap-2">
//                                                     <span className="px-3 py-1 bg-black/70 backdrop-blur-sm border border-[#00B7B3]/40 text-[#00B7B3] rounded-full text-xs">
//                                                         {course.courseDuration || 'Flexible'}
//                                                     </span>
//                                                     <span className="px-3 py-1 bg-black/70 backdrop-blur-sm border border-[#00B7B3]/40 text-[#00B7B3] rounded-full text-xs">
//                                                         {course.level || 'All Levels'}
//                                                     </span>
//                                                 </div>
//                                                 <div className="absolute bottom-4 left-4 z-20">
//                                                     <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white rounded-full text-xs">
//                                                         {course.modules || 'Multiple'} Modules
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="lg:w-7/12 space-y-5">
//                                             <div>
//                                                 <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-[#00B7B3] transition-colors">
//                                                     {course.title}
//                                                 </h2>
//                                                 <div className="flex items-baseline gap-2">
//                                                     <span className="text-3xl font-bold text-[#00B7B3]">{course.price || course.courseFee || 'Contact Us'}</span>
//                                                     <span className="text-gray-500 text-sm">+ GST</span>
//                                                 </div>
//                                             </div>
//                                             <p className="text-gray-400 leading-relaxed line-clamp-3">
//                                                 {stripHtml(course.whatIs || course.aboutCourse) || 'Discover the ancient wisdom of Vedic astrology.'}
//                                             </p>
//                                             {course.highlights?.length > 0 && course.highlights[0] !== '' && (
//                                                 <div className="flex flex-wrap gap-2 pt-2">
//                                                     {course.highlights.slice(0, 6).map((highlight, idx) => (
//                                                         <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#00B7B3]/10 to-transparent border border-[#00B7B3]/30 rounded-full text-sm text-gray-300">
//                                                             <span className="w-1.5 h-1.5 bg-[#00B7B3] rounded-full"></span>
//                                                             {highlight}
//                                                         </span>
//                                                     ))}
//                                                     {course.highlights.length > 6 && (
//                                                         <span className="inline-flex items-center px-3 py-1.5 text-sm text-[#00B7B3]">+{course.highlights.length - 6} more</span>
//                                                     )}
//                                                 </div>
//                                             )}
//                                             <div className="flex flex-wrap items-center gap-4 pt-4">
//                                                 <Link href={`/astrology-courses/${course.slug || course.title.toLowerCase().replace(/\s+/g, '-')}`}
//                                                     className="group/btn px-8 py-3 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-full font-semibold hover:shadow-lg flex items-center gap-2">
//                                                     ENROLL NOW
//                                                     <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                                     </svg>
//                                                 </Link>
//                                                 <Link href={`/courses/${course.slug || course.title.toLowerCase().replace(/\s+/g, '-')}/details`}
//                                                     className="px-8 py-3 border-2 border-[#00B7B3] text-[#00B7B3] rounded-full font-semibold hover:bg-[#00B7B3]/10">
//                                                     VIEW DETAILS
//                                                 </Link>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                             <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
//                         </>
//                     )}
//                 </div>

//                 {/* WHY CHOOSE US - DYNAMIC */}
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                     <div className="relative overflow-hidden bg-gradient-to-br from-black/60 to-black/30 border border-[#00B7B3]/20 rounded-3xl p-12">
//                         <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
//                             {pageContent?.whyChooseUsTitle || 'Why Choose Our Astrology Courses?'}
//                         </h2>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
//                             {pageContent?.whyChooseUsFeatures?.map((feature, idx) => {
//                                 const IconComponent = getIcon(feature.icon);
//                                 return (
//                                     <div key={idx} className="text-center group">
//                                         <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#00B7B3]/20 to-transparent flex items-center justify-center group-hover:bg-[#00B7B3] group-hover:scale-110 transition-all duration-500 border border-[#00B7B3]/30 group-hover:border-[#00B7B3]">
//                                             <div className="text-[#00B7B3] group-hover:text-black transition-colors duration-500">
//                                                 <IconComponent />
//                                             </div>
//                                         </div>
//                                         <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00B7B3] transition-colors">
//                                             {feature.title}
//                                         </h3>
//                                         <p className="text-gray-400 text-sm leading-relaxed">
//                                             {feature.description}
//                                         </p>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 </div>

//                 {/* CTA SECTION - DYNAMIC */}
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                     <div className="relative rounded-3xl overflow-hidden">
//                         <div className="absolute inset-0 bg-gradient-to-r from-[#00B7B3] to-[#008080] opacity-90"></div>
//                         <div className="relative py-16 px-8 text-center">
//                             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//                                 {pageContent?.ctaTitle || 'Ready to Begin Your Cosmic Journey?'}
//                             </h2>
//                             <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
//                                 {pageContent?.ctaDescription || 'Join thousands of successful astrologers who started their journey with us'}
//                             </p>
//                             <Link href={pageContent?.ctaButtonLink || '/contact'}
//                                 className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#00B7B3] rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl">
//                                 {pageContent?.ctaButtonText || 'Get Free Consultation'}
//                                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                                 </svg>
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AstrologyCoursesPage;





// // AstrologyCoursesPage.jsx
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Helmet } from 'react-helmet';
// import { Loader2 } from 'lucide-react';
// import { courseAPI, pageContentAPI } from '../../admin/services/api';

// // ==================== SVG ICONS ====================
// const StarIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const PlanetIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M12 4C10 6 8 8 8 12C8 16 10 18 12 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <path d="M12 4C14 6 16 8 16 12C16 16 14 18 12 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <ellipse cx="12" cy="12" rx="4" ry="6" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const MoonIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const ScrollIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M4 4H20V20H4V4Z" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M8 7H16M8 11H14M8 15H12" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const GraduateIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 3L2 9L12 15L22 9L12 3Z" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M6 12V16.5C6 17.5 8 19 12 19C16 19 18 17.5 18 16.5V12" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M20 10V17" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const DiamondIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M6 3H18L21 9L12 21L3 9L6 3Z" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M12 3V21M3 9H21" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// // Icon mapping for Why Choose Us
// const iconMap = {
//     StarIcon: StarIcon,
//     GraduateIcon: GraduateIcon,
//     DiamondIcon: DiamondIcon,
//     PlanetIcon: PlanetIcon,
//     MoonIcon: MoonIcon,
//     ScrollIcon: ScrollIcon
// };

// const DefaultIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//         <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const getIcon = (iconName) => {
//     if (!iconName) return DefaultIcon;
//     return iconMap[iconName] || DefaultIcon;
// };

// // ✅ CSS - Only container styles, no color overrides
// const pageStyles = `
//   .intro-content {
//     word-wrap: break-word;
//     overflow-wrap: break-word;
//     word-break: break-word;
//     max-width: 100%;
//     overflow-x: auto;
//   }
  
//   .intro-content p {
//     margin-bottom: 1rem;
//     line-height: 1.6;
//   }
  
//   .intro-content h1 {
//     font-size: 2rem;
//     margin: 1.5rem 0 1rem 0;
//   }
  
//   .intro-content h2 {
//     font-size: 1.75rem;
//     margin: 1.2rem 0 0.8rem 0;
//   }
  
//   .intro-content h3 {
//     font-size: 1.5rem;
//     margin: 1rem 0 0.6rem 0;
//   }
  
//   .intro-content ul, .intro-content ol {
//     margin: 0.8rem 0 0.8rem 1.8rem;
//   }
  
//   .intro-content li {
//     margin: 0.4rem 0;
//   }
  
//   .intro-content blockquote {
//     border-left: 4px solid #00B7B3;
//     background: rgba(0, 183, 179, 0.1);
//     padding: 0.8rem 1.2rem;
//     margin: 1rem 0;
//   }
  
//   .intro-content pre {
//     background: #1a1a2a;
//     border-radius: 8px;
//     padding: 1rem;
//     overflow-x: auto;
//   }
  
//   .intro-content img {
//     max-width: 100%;
//     height: auto;
//     border-radius: 8px;
//   }
  
//   .intro-content table {
//     max-width: 100%;
//     overflow-x: auto;
//     display: block;
//     border-collapse: collapse;
//   }
  
//   .intro-content td, .intro-content th {
//     border: 1px solid #333;
//     padding: 0.5rem;
//   }
// `;

// // Pagination Component
// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//     const getPageNumbers = () => {
//         const pages = [];
//         const maxVisible = 5;
        
//         if (totalPages <= maxVisible) {
//             for (let i = 1; i <= totalPages; i++) pages.push(i);
//         } else {
//             if (currentPage <= 3) {
//                 for (let i = 1; i <= 4; i++) pages.push(i);
//                 pages.push('...');
//                 pages.push(totalPages);
//             } else if (currentPage >= totalPages - 2) {
//                 pages.push(1);
//                 pages.push('...');
//                 for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
//             } else {
//                 pages.push(1);
//                 pages.push('...');
//                 for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
//                 pages.push('...');
//                 pages.push(totalPages);
//             }
//         }
//         return pages;
//     };

//     if (totalPages <= 1) return null;

//     return (
//         <div className="flex justify-center items-center gap-2 mt-12">
//             <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}
//                 className={`px-4 py-2 rounded-lg border transition-all ${currentPage === 1 ? 'border-gray-700 text-gray-600 cursor-not-allowed' : 'border-[#00B7B3]/30 text-[#00B7B3] hover:bg-[#00B7B3]/10'}`}>
//                 Previous
//             </button>
//             {getPageNumbers().map((page, index) => (
//                 <button key={index} onClick={() => typeof page === 'number' && onPageChange(page)}
//                     className={`w-10 h-10 rounded-lg transition-all ${page === currentPage ? 'bg-[#00B7B3] text-black font-bold' : page === '...' ? 'text-gray-500 cursor-default' : 'border border-[#00B7B3]/30 text-[#00B7B3] hover:bg-[#00B7B3]/10'}`}
//                     disabled={page === '...'}>
//                     {page}
//                 </button>
//             ))}
//             <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}
//                 className={`px-4 py-2 rounded-lg border transition-all ${currentPage === totalPages ? 'border-gray-700 text-gray-600 cursor-not-allowed' : 'border-[#00B7B3]/30 text-[#00B7B3] hover:bg-[#00B7B3]/10'}`}>
//                 Next
//             </button>
//         </div>
//     );
// };

// const AstrologyCoursesPage = () => {
//     const [loading, setLoading] = useState(true);
//     const [courses, setCourses] = useState([]);
//     const [pageContent, setPageContent] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [totalCourses, setTotalCourses] = useState(0);
//     const coursesPerPage = 6;

//     useEffect(() => {
//         fetchAllData();
//     }, [currentPage]);

//     const fetchAllData = async () => {
//         setLoading(true);
//         try {
//             const { data: pageData } = await pageContentAPI.getByType('astrology');
//             if (pageData.success && pageData.data) setPageContent(pageData.data);
            
//             const { data: courseData } = await courseAPI.getAll();
//             const astrologyCourses = (courseData.courses || []).filter(c => c.category?.includes('ASTROLOGY'));
            
//             setTotalCourses(astrologyCourses.length);
//             const startIndex = (currentPage - 1) * coursesPerPage;
//             setCourses(astrologyCourses.slice(startIndex, startIndex + coursesPerPage));
//             setTotalPages(Math.ceil(astrologyCourses.length / coursesPerPage));
//         } catch (error) {
//             console.error('Error:', error);
//             setCourses([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const stripHtml = (html) => {
//         if (!html) return '';
//         const temp = document.createElement('div');
//         temp.innerHTML = html;
//         return temp.textContent || temp.innerText || '';
//     };

//     const getCourseType = (course) => {
//         if (course.title?.toLowerCase().includes('financial')) return 'Financial Astrology';
//         if (course.title?.toLowerCase().includes('complete')) return 'Astrology Course';
//         return 'Astrology Course';
//     };

//     // ✅ SEO Data from pageContent
//     const seoTitle = pageContent?.seoTitle || 'Astrology Courses | Learn Vedic Astrology Online | NB Astro';
//     const seoDescription = pageContent?.seoDescription || 'Join best astrology courses in Noida. Learn Vedic astrology from expert Naveen Bhagat with practical training and certification. Enroll now!';
//     const seoKeywords = pageContent?.seoKeywords || 'astrology course, vedic astrology course, astrology classes online, astrology training noida, learn astrology, astrology certification';
//     const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://nbastro.com/astrology-courses';
//     const ogImage = pageContent?.heroImage || 'https://nbastro.com/astrology-og-image.jpg';

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-black flex items-center justify-center">
//                 <Loader2 className="w-12 h-12 text-[#00B7B3] animate-spin" />
//             </div>
//         );
//     }

//     return (
//         <>
//             {/* ✅ SEO Helmet with OG Tags */}
//             <Helmet>
//                 <title>{seoTitle}</title>
//                 <meta name="description" content={seoDescription} />
//                 <meta name="keywords" content={seoKeywords} />
                
//                 {/* OG Tags for Social Media (WhatsApp, Facebook, LinkedIn) */}
//                 <meta property="og:title" content={seoTitle} />
//                 <meta property="og:description" content={seoDescription} />
//                 <meta property="og:type" content="website" />
//                 <meta property="og:url" content={currentUrl} />
//                 <meta property="og:image" content={ogImage} />
//                 <meta property="og:site_name" content="NB Astro" />
                
//                 {/* Twitter Card */}
//                 <meta property="twitter:card" content="summary_large_image" />
//                 <meta property="twitter:title" content={seoTitle} />
//                 <meta property="twitter:description" content={seoDescription} />
//                 <meta property="twitter:image" content={ogImage} />
//             </Helmet>
            
//             <style>{pageStyles}</style>
//             <div className="bg-black">
//                 {/* HERO SECTION */}
//                 <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
//                     <div className="absolute inset-0">
//                         <img src={pageContent?.heroImage || 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'} 
//                             alt="Astrology Courses" className="w-full h-full object-cover scale-105" />
//                         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
//                         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,black_100%)]"></div>
//                     </div>
//                     <div className="absolute inset-0 overflow-hidden opacity-30">
//                         <div className="absolute top-10 left-10 animate-pulse"><StarIcon /></div>
//                         <div className="absolute top-1/3 right-20 animate-ping"><StarIcon /></div>
//                         <div className="absolute bottom-20 left-1/4 animate-pulse"><StarIcon /></div>
//                     </div>
//                     <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
//                         <div className="max-w-2xl">
//                             <div className="inline-flex items-center gap-3 p-3 bg-gradient-to-r from-[#00B7B3]/20 to-transparent rounded-full mb-6 backdrop-blur-sm border border-[#00B7B3]/30">
//                                 <PlanetIcon />
//                                 <span className="text-[#00B7B3] text-sm uppercase tracking-wider font-semibold">
//                                     {pageContent?.heroBadgeText || 'Ancient Wisdom Meets Modern Science'}
//                                 </span>
//                             </div>
//                             <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
//                                 {pageContent?.heroTitle || 'Master the Art of'}
//                                 <span className="text-[#00B7B3] block mt-2">{pageContent?.heroSubtitle || 'Astrology'}</span>
//                             </h1>
//                             <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
//                                 {pageContent?.heroDescription || 'Embark on a transformative journey to decode the cosmic language.'}
//                             </p>
//                             <div className="flex gap-4 mt-8">
//                                 <div className="w-16 h-1 bg-[#00B7B3]"></div>
//                                 <div className="w-8 h-1 bg-[#00B7B3]/50"></div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
//                 </div>

//                 {/* INTRO SECTION */}
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-20">
//                     <div className="relative group">
//                         <div className="absolute inset-0 bg-gradient-to-r from-[#00B7B3]/20 to-transparent blur-3xl opacity-20 group-hover:opacity-40"></div>
//                         <div className="relative bg-gradient-to-br from-black/80 via-black/60 to-black/80 border border-[#00B7B3]/20 rounded-3xl p-10 lg:p-12 backdrop-blur-sm">
//                             <div className="absolute top-0 right-0 w-40 h-40 bg-[#00B7B3]/5 rounded-full blur-3xl"></div>
//                             <div className="flex items-center gap-3 mb-8">
//                                 <ScrollIcon />
//                                 <span className="text-[#00B7B3] text-sm uppercase tracking-wider font-semibold">
//                                     {pageContent?.introTitle || 'The Cosmic Science'}
//                                 </span>
//                             </div>
//                             <div 
//                                 className="intro-content text-gray-300 text-lg leading-relaxed"
//                                 dangerouslySetInnerHTML={{ 
//                                     __html: pageContent?.introContent || 'Default content...'
//                                 }} 
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* COURSES SECTION */}
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                     <div className="text-center mb-16">
//                         <div className="inline-flex items-center gap-2 bg-[#00B7B3]/10 px-4 py-2 rounded-full mb-4">
//                             <MoonIcon />
//                             <span className="text-[#00B7B3] text-sm uppercase tracking-wider">Celestial Curriculum</span>
//                         </div>
//                         <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//                             Our <span className="text-[#00B7B3]">Astrology Courses</span>
//                         </h2>
//                         <p className="text-gray-400 max-w-2xl mx-auto">
//                             Choose your path to become a certified astrologer with our structured learning programs
//                         </p>
//                         {totalCourses > 0 && (
//                             <p className="text-[#00B7B3] text-sm mt-2">Showing {courses.length} of {totalCourses} courses</p>
//                         )}
//                     </div>

//                     {courses.length === 0 ? (
//                         <div className="text-center py-20">
//                             <p className="text-gray-400 text-lg">No astrology courses available at the moment.</p>
//                             <p className="text-gray-500 mt-2">Please check back later for new courses.</p>
//                         </div>
//                     ) : (
//                         <>
//                             <div className="space-y-20">
//                                 {courses.map((course, index) => (
//                                     <div key={course._id || index} className={`group flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center bg-gradient-to-br from-black/40 to-black/20 rounded-2xl p-6 lg:p-8 border border-[#00B7B3]/10 hover:border-[#00B7B3]/40 transition-all duration-500`}>
//                                         <div className="lg:w-5/12">
//                                             <div className="relative overflow-hidden rounded-2xl">
//                                                 <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
//                                                 <img src={course.image ? `${course.image}` : 'https://images.unsplash.com/photo-1507484467459-0c91be303a5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'} 
//                                                     alt={course.title} className="w-full h-[280px] md:h-[350px] object-cover group-hover:scale-110 transition-transform duration-700" />
//                                                 <div className="absolute top-4 left-4 z-20">
//                                                     <span className="px-4 py-2 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-full text-sm font-semibold shadow-lg">
//                                                         {getCourseType(course)}
//                                                     </span>
//                                                 </div>
//                                                 <div className="absolute top-4 right-4 z-20 flex gap-2">
//                                                     <span className="px-3 py-1 bg-black/70 backdrop-blur-sm border border-[#00B7B3]/40 text-[#00B7B3] rounded-full text-xs">
//                                                         {course.courseDuration || 'Flexible'}
//                                                     </span>
//                                                     <span className="px-3 py-1 bg-black/70 backdrop-blur-sm border border-[#00B7B3]/40 text-[#00B7B3] rounded-full text-xs">
//                                                         {course.level || 'All Levels'}
//                                                     </span>
//                                                 </div>
//                                                 <div className="absolute bottom-4 left-4 z-20">
//                                                     <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white rounded-full text-xs">
//                                                         {course.modules || 'Multiple'} Modules
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="lg:w-7/12 space-y-5">
//                                             <div>
//                                                 <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-[#00B7B3] transition-colors">
//                                                     {course.title}
//                                                 </h2>
//                                                 <div className="flex items-baseline gap-2">
//                                                     <span className="text-3xl font-bold text-[#00B7B3]">{course.price || course.courseFee || 'Contact Us'}</span>
//                                                     <span className="text-gray-500 text-sm">+ GST</span>
//                                                 </div>
//                                             </div>
//                                             <p className="text-gray-400 leading-relaxed line-clamp-3">
//                                                 {stripHtml(course.whatIs || course.aboutCourse) || 'Discover the ancient wisdom of Vedic astrology.'}
//                                             </p>
//                                             {course.highlights?.length > 0 && course.highlights[0] !== '' && (
//                                                 <div className="flex flex-wrap gap-2 pt-2">
//                                                     {course.highlights.slice(0, 6).map((highlight, idx) => (
//                                                         <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#00B7B3]/10 to-transparent border border-[#00B7B3]/30 rounded-full text-sm text-gray-300">
//                                                             <span className="w-1.5 h-1.5 bg-[#00B7B3] rounded-full"></span>
//                                                             {highlight}
//                                                         </span>
//                                                     ))}
//                                                     {course.highlights.length > 6 && (
//                                                         <span className="inline-flex items-center px-3 py-1.5 text-sm text-[#00B7B3]">+{course.highlights.length - 6} more</span>
//                                                     )}
//                                                 </div>
//                                             )}
//                                             <div className="flex flex-wrap items-center gap-4 pt-4">
//                                                 <Link href={`/astrology-courses/${course.slug || course.title.toLowerCase().replace(/\s+/g, '-')}`}
//                                                     className="group/btn px-8 py-3 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-full font-semibold hover:shadow-lg flex items-center gap-2">
//                                                     ENROLL NOW
//                                                     <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                                     </svg>
//                                                 </Link>
//                                                 <Link href={`/courses/${course.slug || course.title.toLowerCase().replace(/\s+/g, '-')}/details`}
//                                                     className="px-8 py-3 border-2 border-[#00B7B3] text-[#00B7B3] rounded-full font-semibold hover:bg-[#00B7B3]/10">
//                                                     VIEW DETAILS
//                                                 </Link>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                             <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
//                         </>
//                     )}
//                 </div>

//                 {/* WHY CHOOSE US - DYNAMIC */}
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                     <div className="relative overflow-hidden bg-gradient-to-br from-black/60 to-black/30 border border-[#00B7B3]/20 rounded-3xl p-12">
//                         <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
//                             {pageContent?.whyChooseUsTitle || 'Why Choose Our Astrology Courses?'}
//                         </h2>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
//                             {pageContent?.whyChooseUsFeatures?.map((feature, idx) => {
//                                 const IconComponent = getIcon(feature.icon);
//                                 return (
//                                     <div key={idx} className="text-center group">
//                                         <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#00B7B3]/20 to-transparent flex items-center justify-center group-hover:bg-[#00B7B3] group-hover:scale-110 transition-all duration-500 border border-[#00B7B3]/30 group-hover:border-[#00B7B3]">
//                                             <div className="text-[#00B7B3] group-hover:text-black transition-colors duration-500">
//                                                 <IconComponent />
//                                             </div>
//                                         </div>
//                                         <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00B7B3] transition-colors">
//                                             {feature.title}
//                                         </h3>
//                                         <p className="text-gray-400 text-sm leading-relaxed">
//                                             {feature.description}
//                                         </p>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 </div>

//                 {/* CTA SECTION - DYNAMIC */}
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                     <div className="relative rounded-3xl overflow-hidden">
//                         <div className="absolute inset-0 bg-gradient-to-r from-[#00B7B3] to-[#008080] opacity-90"></div>
//                         <div className="relative py-16 px-8 text-center">
//                             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//                                 {pageContent?.ctaTitle || 'Ready to Begin Your Cosmic Journey?'}
//                             </h2>
//                             <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
//                                 {pageContent?.ctaDescription || 'Join thousands of successful astrologers who started their journey with us'}
//                             </p>
//                             <Link href={pageContent?.ctaButtonLink || '/contact'}
//                                 className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#00B7B3] rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl">
//                                 {pageContent?.ctaButtonText || 'Get Free Consultation'}
//                                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                                 </svg>
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AstrologyCoursesPage;





// AstrologyCoursesPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Helmet } from 'react-helmet-async';  // ← CHANGE: react-helmet to react-helmet-async
import { Loader2 } from 'lucide-react';
import { courseAPI, pageContentAPI } from '../../admin/services/api';

// ==================== SVG ICONS ====================
const StarIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

const PlanetIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 4C10 6 8 8 8 12C8 16 10 18 12 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 4C14 6 16 8 16 12C16 16 14 18 12 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <ellipse cx="12" cy="12" rx="4" ry="6" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

const MoonIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

const ScrollIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4H20V20H4V4Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 7H16M8 11H14M8 15H12" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

const GraduateIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3L2 9L12 15L22 9L12 3Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 12V16.5C6 17.5 8 19 12 19C16 19 18 17.5 18 16.5V12" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M20 10V17" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

const DiamondIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 3H18L21 9L12 21L3 9L6 3Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 3V21M3 9H21" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

// Icon mapping for Why Choose Us
const iconMap = {
    StarIcon: StarIcon,
    GraduateIcon: GraduateIcon,
    DiamondIcon: DiamondIcon,
    PlanetIcon: PlanetIcon,
    MoonIcon: MoonIcon,
    ScrollIcon: ScrollIcon
};

const DefaultIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

const getIcon = (iconName) => {
    if (!iconName) return DefaultIcon;
    return iconMap[iconName] || DefaultIcon;
};

// ✅ CSS - Only container styles, no color overrides
const pageStyles = `
  .intro-content {
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
    max-width: 100%;
    overflow-x: auto;
  }
  
  .intro-content p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
  
  .intro-content h1 {
    font-size: 2rem;
    margin: 1.5rem 0 1rem 0;
  }
  
  .intro-content h2 {
    font-size: 1.75rem;
    margin: 1.2rem 0 0.8rem 0;
  }
  
  .intro-content h3 {
    font-size: 1.5rem;
    margin: 1rem 0 0.6rem 0;
  }
  
  .intro-content ul, .intro-content ol {
    margin: 0.8rem 0 0.8rem 1.8rem;
  }
  
  .intro-content li {
    margin: 0.4rem 0;
  }
  
  .intro-content blockquote {
    border-left: 4px solid #00B7B3;
    background: rgba(0, 183, 179, 0.1);
    padding: 0.8rem 1.2rem;
    margin: 1rem 0;
  }
  
  .intro-content pre {
    background: #1a1a2a;
    border-radius: 8px;
    padding: 1rem;
    overflow-x: auto;
  }
  
  .intro-content img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  .intro-content table {
    max-width: 100%;
    overflow-x: auto;
    display: block;
    border-collapse: collapse;
  }
  
  .intro-content td, .intro-content th {
    border: 1px solid #333;
    padding: 0.5rem;
  }
`;

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-2 mt-12">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg border transition-all ${currentPage === 1 ? 'border-gray-700 text-gray-600 cursor-not-allowed' : 'border-[#00B7B3]/30 text-[#00B7B3] hover:bg-[#00B7B3]/10'}`}>
                Previous
            </button>
            {getPageNumbers().map((page, index) => (
                <button key={index} onClick={() => typeof page === 'number' && onPageChange(page)}
                    className={`w-10 h-10 rounded-lg transition-all ${page === currentPage ? 'bg-[#00B7B3] text-black font-bold' : page === '...' ? 'text-gray-500 cursor-default' : 'border border-[#00B7B3]/30 text-[#00B7B3] hover:bg-[#00B7B3]/10'}`}
                    disabled={page === '...'}>
                    {page}
                </button>
            ))}
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg border transition-all ${currentPage === totalPages ? 'border-gray-700 text-gray-600 cursor-not-allowed' : 'border-[#00B7B3]/30 text-[#00B7B3] hover:bg-[#00B7B3]/10'}`}>
                Next
            </button>
        </div>
    );
};

const AstrologyCoursesPage = ({ initialPageContent }) => {
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);
    const [pageContent, setPageContent] = useState(initialPageContent || null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCourses, setTotalCourses] = useState(0);
    const coursesPerPage = 6;

    const fetchAllData = useCallback(async () => {
        setLoading(true);
        try {
            try {
                const { data: pageData } = await pageContentAPI.getByType('astrology');
                if (pageData.success && pageData.data) setPageContent(pageData.data);
            } catch (pageError) {
                if (pageError?.response?.status !== 404) {
                    console.warn('Unable to load astrology page content:', pageError?.message);
                }
                setPageContent(null);
            }
            
            const { data: courseData } = await courseAPI.getAll();
            const astrologyCourses = (courseData.courses || []).filter(c => c.category?.includes('ASTROLOGY'));
            
            setTotalCourses(astrologyCourses.length);
            const startIndex = (currentPage - 1) * coursesPerPage;
            setCourses(astrologyCourses.slice(startIndex, startIndex + coursesPerPage));
            setTotalPages(Math.ceil(astrologyCourses.length / coursesPerPage));
        } catch (error) {
            console.warn('Unable to load astrology courses:', error?.message);
            setCourses([]);
        } finally {
            setLoading(false);
        }
    }, [currentPage]);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    const stripHtml = (html) => {
        if (!html) return '';
        return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    };

    const getCourseType = (course) => {
        if (course.title?.toLowerCase().includes('financial')) return 'Financial Astrology';
        if (course.title?.toLowerCase().includes('complete')) return 'Astrology Course';
        return 'Astrology Course';
    };

    // ✅ SEO Data from pageContent
    const seoTitle = pageContent?.seoTitle || 'Astrology Courses | Learn Vedic Astrology Online | NB Astro';
    const seoDescription = pageContent?.seoDescription || 'Join best astrology courses in Noida. Learn Vedic astrology from expert Naveen Bhagat with practical training and certification. Enroll now!';
    const seoKeywords = pageContent?.seoKeywords || 'astrology course, vedic astrology course, astrology classes online, astrology training noida, learn astrology, astrology certification';
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://nbastro.com/astrology-courses';
    const ogImage = pageContent?.heroImage || 'https://nbastro.com/astrology-og-image.jpg';

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-[#00B7B3] animate-spin" />
            </div>
        );
    }

    return (
        <>
            {/* ✅ SEO Helmet with OG Tags - UPDATED */}
            <Helmet>
                <title>{seoTitle}</title>
                <meta name="description" content={seoDescription} />
                <meta name="keywords" content={seoKeywords} />
                <meta name="robots" content="index, follow" />
                
                {/* OG Tags for Social Media (WhatsApp, Facebook, LinkedIn) */}
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
            
            <style>{pageStyles}</style>
            <div className="bg-black">
                {/* HERO SECTION */}
                <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
                    <div className="absolute inset-0">
                        <img src={pageContent?.heroImage || 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'} 
                            alt="Astrology Courses" className="w-full h-full object-cover scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,black_100%)]"></div>
                    </div>
                    <div className="absolute inset-0 overflow-hidden opacity-30">
                        <div className="absolute top-10 left-10 animate-pulse"><StarIcon /></div>
                        <div className="absolute top-1/3 right-20 animate-ping"><StarIcon /></div>
                        <div className="absolute bottom-20 left-1/4 animate-pulse"><StarIcon /></div>
                    </div>
                    <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-3 p-3 bg-gradient-to-r from-[#00B7B3]/20 to-transparent rounded-full mb-6 backdrop-blur-sm border border-[#00B7B3]/30">
                                <PlanetIcon />
                                <span className="text-[#00B7B3] text-sm uppercase tracking-wider font-semibold">
                                    {pageContent?.heroBadgeText || 'Ancient Wisdom Meets Modern Science'}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                                {pageContent?.heroTitle || 'Master the Art of'}
                                <span className="text-[#00B7B3] block mt-2">{pageContent?.heroSubtitle || 'Astrology'}</span>
                            </h1>
                            <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
                                {pageContent?.heroDescription || 'Embark on a transformative journey to decode the cosmic language.'}
                            </p>
                            <div className="flex gap-4 mt-8">
                                <div className="w-16 h-1 bg-[#00B7B3]"></div>
                                <div className="w-8 h-1 bg-[#00B7B3]/50"></div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
                </div>

                {/* INTRO SECTION */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-20">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00B7B3]/20 to-transparent blur-3xl opacity-20 group-hover:opacity-40"></div>
                        <div className="relative bg-gradient-to-br from-black/80 via-black/60 to-black/80 border border-[#00B7B3]/20 rounded-3xl p-10 lg:p-12 backdrop-blur-sm">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-[#00B7B3]/5 rounded-full blur-3xl"></div>
                            <div className="flex items-center gap-3 mb-8">
                                <ScrollIcon />
                                <span className="text-[#00B7B3] text-sm uppercase tracking-wider font-semibold">
                                    {pageContent?.introTitle || 'The Cosmic Science'}
                                </span>
                            </div>
                            <div 
                                className="intro-content text-gray-300 text-lg leading-relaxed"
                                dangerouslySetInnerHTML={{ 
                                    __html: pageContent?.introContent || 'Default content...'
                                }} 
                            />
                        </div>
                    </div>
                </div>

                {/* COURSES SECTION */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-[#00B7B3]/10 px-4 py-2 rounded-full mb-4">
                            <MoonIcon />
                            <span className="text-[#00B7B3] text-sm uppercase tracking-wider">Celestial Curriculum</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Our <span className="text-[#00B7B3]">Astrology Courses</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Choose your path to become a certified astrologer with our structured learning programs
                        </p>
                        {totalCourses > 0 && (
                            <p className="text-[#00B7B3] text-sm mt-2">Showing {courses.length} of {totalCourses} courses</p>
                        )}
                    </div>

                    {courses.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-gray-400 text-lg">No astrology courses available at the moment.</p>
                            <p className="text-gray-500 mt-2">Please check back later for new courses.</p>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-20">
                                {courses.map((course, index) => (
                                    <div key={course._id || index} className={`group flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center bg-gradient-to-br from-black/40 to-black/20 rounded-2xl p-6 lg:p-8 border border-[#00B7B3]/10 hover:border-[#00B7B3]/40 transition-all duration-500`}>
                                        <div className="lg:w-5/12">
                                            <div className="relative overflow-hidden rounded-2xl">
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
                                                <img src={course.image ? `${course.image}` : 'https://images.unsplash.com/photo-1507484467459-0c91be303a5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'} 
                                                    alt={course.title} className="w-full h-[280px] md:h-[350px] object-cover group-hover:scale-110 transition-transform duration-700" />
                                                <div className="absolute top-4 left-4 z-20">
                                                    <span className="px-4 py-2 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-full text-sm font-semibold shadow-lg">
                                                        {getCourseType(course)}
                                                    </span>
                                                </div>
                                                <div className="absolute top-4 right-4 z-20 flex gap-2">
                                                    <span className="px-3 py-1 bg-black/70 backdrop-blur-sm border border-[#00B7B3]/40 text-[#00B7B3] rounded-full text-xs">
                                                        {course.courseDuration || 'Flexible'}
                                                    </span>
                                                    <span className="px-3 py-1 bg-black/70 backdrop-blur-sm border border-[#00B7B3]/40 text-[#00B7B3] rounded-full text-xs">
                                                        {course.level || 'All Levels'}
                                                    </span>
                                                </div>
                                                <div className="absolute bottom-4 left-4 z-20">
                                                    <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white rounded-full text-xs">
                                                        {course.modules || 'Multiple'} Modules
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="lg:w-7/12 space-y-5">
                                            <div>
                                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-[#00B7B3] transition-colors">
                                                    {course.title}
                                                </h2>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-3xl font-bold text-[#00B7B3]">{course.price || course.courseFee || 'Contact Us'}</span>
                                                    <span className="text-gray-500 text-sm">+ GST</span>
                                                </div>
                                            </div>
                                            <p className="text-gray-400 leading-relaxed line-clamp-3">
                                                {stripHtml(course.whatIs || course.aboutCourse) || 'Discover the ancient wisdom of Vedic astrology.'}
                                            </p>
                                            {course.highlights?.length > 0 && course.highlights[0] !== '' && (
                                                <div className="flex flex-wrap gap-2 pt-2">
                                                    {course.highlights.slice(0, 6).map((highlight, idx) => (
                                                        <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#00B7B3]/10 to-transparent border border-[#00B7B3]/30 rounded-full text-sm text-gray-300">
                                                            <span className="w-1.5 h-1.5 bg-[#00B7B3] rounded-full"></span>
                                                            {highlight}
                                                        </span>
                                                    ))}
                                                    {course.highlights.length > 6 && (
                                                        <span className="inline-flex items-center px-3 py-1.5 text-sm text-[#00B7B3]">+{course.highlights.length - 6} more</span>
                                                    )}
                                                </div>
                                            )}
                                            <div className="flex flex-wrap items-center gap-4 pt-4">
                                                <Link href={`/courses/${course.slug || course.title.toLowerCase().replace(/\s+/g, '-')}/book`}
                                                    className="group/btn px-8 py-3 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-full font-semibold hover:shadow-lg flex items-center gap-2">
                                                    BOOK A SEAT
                                                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </Link>
                                                <Link href={`/courses/${course.slug || course.title.toLowerCase().replace(/\s+/g, '-')}/details`}
                                                    className="px-8 py-3 border-2 border-[#00B7B3] text-[#00B7B3] rounded-full font-semibold hover:bg-[#00B7B3]/10">
                                                    VIEW DETAILS
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                        </>
                    )}
                </div>

                {/* WHY CHOOSE US - DYNAMIC */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="relative overflow-hidden bg-gradient-to-br from-black/60 to-black/30 border border-[#00B7B3]/20 rounded-3xl p-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                            {pageContent?.whyChooseUsTitle || 'Why Choose Our Astrology Courses?'}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                            {pageContent?.whyChooseUsFeatures?.map((feature, idx) => {
                                const IconComponent = getIcon(feature.icon);
                                return (
                                    <div key={idx} className="text-center group">
                                        <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#00B7B3]/20 to-transparent flex items-center justify-center group-hover:bg-[#00B7B3] group-hover:scale-110 transition-all duration-500 border border-[#00B7B3]/30 group-hover:border-[#00B7B3]">
                                            <div className="text-[#00B7B3] group-hover:text-black transition-colors duration-500">
                                                <IconComponent />
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00B7B3] transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* CTA SECTION - DYNAMIC */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="relative rounded-3xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00B7B3] to-[#008080] opacity-90"></div>
                        <div className="relative py-16 px-8 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                {pageContent?.ctaTitle || 'Ready to Begin Your Cosmic Journey?'}
                            </h2>
                            <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
                                {pageContent?.ctaDescription || 'Join thousands of successful astrologers who started their journey with us'}
                            </p>
                            <Link href={pageContent?.ctaButtonLink || '/contact'}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#00B7B3] rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl">
                                {pageContent?.ctaButtonText || 'Get Free Consultation'}
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AstrologyCoursesPage;
