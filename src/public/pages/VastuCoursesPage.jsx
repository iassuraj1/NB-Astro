// import React from 'react';
// import Link from 'next/link';

// // SVG Icons Components for Vastu
// const HomeIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M3 9L12 3L21 9L12 15L3 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//         <path d="M5 12V19H19V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <path d="M9 19V15H15V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//     </svg>
// );

// const CompassIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M12 3L12 5M12 19L12 21M21 12L19 12M5 12L3 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <path d="M12 8L14 10L12 16L10 10L12 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
// );

// const TempleIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 2L4 8H20L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//         <path d="M6 8V20H18V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <path d="M10 12H14V20H10V12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//     </svg>
// );

// const DirectionIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 2L12 22M12 2L8 6M12 2L16 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//         <path d="M2 12L22 12M22 12L18 8M22 12L18 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
// );

// const BuildingIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <rect x="4" y="8" width="16" height="12" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M8 4H16V8H8V4Z" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M10 12H14M10 16H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//     </svg>
// );

// const MandalaIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
//         <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
//         <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M12 1L12 4M12 20L12 23M1 12L4 12M20 12L23 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//     </svg>
// );

// const BalanceIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 2L12 22M12 2L8 5M12 2L16 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <path d="M5 12L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <path d="M3 19L21 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//     </svg>
// );

// const EnergyIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M13 2L4 14H12L11 22L20 10H12L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
// );

// const VastuCoursesPage = () => {
//     const vastuCourses = [
//         {
//             title: 'Complete Vastu Course',
//             price: '₹175,000.00',
//             description: 'Vastu Shastra is the ancient Indian science of architecture and space management. This comprehensive course covers everything from basic principles to advanced Vastu corrections. You will learn the profound wisdom of the five elements - Earth, Water, Fire, Air, and Space - and how they interact within any given space to create harmony, prosperity, and well-being. This course is designed to transform you into a certified Vastu consultant capable of analyzing and correcting any property, whether residential or commercial.',
//             type: 'Vastu Course',
//             image: 'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//             duration: '12 months',
//             level: 'Beginner to Advanced',
//             modules: 24,
//             features: ['Five Elements Theory', 'Directional Energy Flow', 'Plot Selection', 'Remedies']
//         },
//         {
//             title: 'Commercial Vastu - Level 2',
//             price: '₹100,000.00',
//             description: 'Learn specialized Vastu principles for commercial spaces including offices, factories, warehouses, retail stores, and corporate buildings. This advanced course focuses on maximizing productivity, employee well-being, financial growth, and business success through proper space planning and energy management. Understand how to analyze commercial properties, identify energy blocks, and implement effective Vastu remedies that translate into tangible business results.',
//             type: 'Commercial Vastu',
//             image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//             duration: '6 months',
//             level: 'Advanced',
//             modules: 16,
//             features: ['Office Layout', 'Factory Design', 'Warehouse Planning', 'Corporate Buildings']
//         },
//         {
//             title: 'Residential Vastu - Level 1',
//             price: '₹35,000.00',
//             description: 'Master the fundamentals of Vastu for residential properties. This foundational course covers everything from plot selection to room placements, door directions, and kitchen positioning. Learn how to analyze existing homes and provide practical remedies for common Vastu defects. Perfect for beginners who want to start their journey as Vastu consultants specializing in homes and apartments.',
//             courseContent: 'Course Content: Plot Selection Criteria | Directional Guidelines for Each Room | Kitchen Placement Rules | Bedroom Vastu | Pooja Room Placement | Staircase Positioning | Water Element Placement | Remedies for Vastu Defects',
//             type: 'Residential Vastu',
//             image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//             duration: '3 months',
//             level: 'Beginner',
//             modules: 12,
//             features: ['Plot Selection', 'Room Placement', 'Remedies', 'Case Studies']
//         },
//         {
//             title: 'Advanced Vastu Remedies & Corrections',
//             price: '₹75,000.00',
//             description: 'This specialized course focuses on advanced Vastu correction techniques for properties with severe Vastu defects. Learn how to use pyramids, yantras, mirrors, colors, and architectural modifications to balance energy without major structural changes. Master the art of providing cost-effective solutions that deliver powerful results.',
//             courseContent: 'Course Content: Pyramids and Their Applications | Yantras for Energy Correction | Mirror Remedies | Color Therapy | Five Element Balancing | Structural Remedies Without Demolition | Case Studies of Complex Properties',
//             type: 'Advanced Vastu',
//             image: 'https://images.unsplash.com/photo-1544923408-75c5cef46f14?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//             duration: '4 months',
//             level: 'Advanced',
//             modules: 14,
//             features: ['Pyramid Therapy', 'Yantra Applications', 'Color Balancing', 'Structural Remedies']
//         },
//         {
//             title: 'Land & Plot Selection Vastu',
//             price: '₹45,000.00',
//             description: 'Learn the ancient wisdom of selecting the perfect land or plot for construction. This course covers shape of land, soil testing, slope direction, surrounding influences, and auspicious timing for purchase. Essential knowledge for real estate professionals, architects, and aspiring Vastu consultants.',
//             type: 'Land Vastu',
//             image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
//             duration: '2 months',
//             level: 'Intermediate',
//             modules: 8,
//             features: ['Land Shapes', 'Soil Testing', 'Slope Analysis', 'Auspicious Timing']
//         }
//     ];

//     return (
//         <div className="bg-black">
//             {/* ============================================ */}
//             {/* HERO SECTION */}
//             {/* ============================================ */}
//             <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
//                 <div className="absolute inset-0">
//                     <img 
//                         src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
//                         alt="Vastu Courses"
//                         className="w-full h-full object-cover scale-105"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
//                     <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,black_100%)]"></div>
//                 </div>

//                 <div className="absolute inset-0 overflow-hidden opacity-30">
//                     <div className="absolute top-10 left-10 animate-pulse">
//                         <CompassIcon />
//                     </div>
//                     <div className="absolute top-1/3 right-20 animate-spin-slow">
//                         <DirectionIcon />
//                     </div>
//                     <div className="absolute bottom-20 left-1/4 animate-pulse">
//                         <HomeIcon />
//                     </div>
//                 </div>

//                 <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
//                     <div className="max-w-2xl">
//                         <div className="inline-flex items-center gap-3 p-3 bg-gradient-to-r from-[#00B7B3]/20 to-transparent rounded-full mb-6 backdrop-blur-sm border border-[#00B7B3]/30">
//                             <TempleIcon />
//                             <span className="text-[#00B7B3] text-sm uppercase tracking-wider font-semibold">Ancient Science of Space Harmony</span>
//                         </div>
                        
//                         <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
//                             Master the Art of
//                             <span className="text-[#00B7B3] block mt-2">Vastu Shastra</span>
//                         </h1>
                        
//                         <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
//                             Learn the ancient wisdom of creating harmonious spaces. Become a certified Vastu consultant and help others achieve prosperity, health, and happiness.
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
//                             <MandalaIcon />
//                             <span className="text-[#00B7B3] text-sm uppercase tracking-wider font-semibold">The Science of Directional Energy</span>
//                         </div>
                        
//                         <p className="text-gray-300 text-lg leading-relaxed">
//                             Vastu Shastra, the ancient Indian science of architecture, is based on the principle that every space has its own energy field. 
//                             Just as our bodies require balance for health, our living and working spaces need harmony for prosperity and well-being. 
//                             The five elements - Earth, Water, Fire, Air, and Space - form the foundation of Vastu wisdom, and their proper alignment creates 
//                             spaces that nurture and support their inhabitants.
//                         </p>
//                         <p className="text-gray-300 text-lg leading-relaxed mt-6">
//                             Our Vastu courses are designed to help you understand the <span className="text-[#00B7B3]">profound connection between space and consciousness</span>. 
//                             Whether you're looking to transform your own home or become a professional Vastu consultant, our comprehensive training 
//                             programs provide the knowledge and practical skills you need. Learn from experienced masters who have been practicing 
//                             and teaching Vastu Shastra for decades.
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             {/* ============================================ */}
//             {/* COURSES SECTION - VASTU CARDS */}
//             {/* ============================================ */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                 <div className="text-center mb-8">
//                     <div className="inline-flex items-center gap-2 bg-[#00B7B3]/10 px-4 py-2 rounded-full mb-4">
//                         <BuildingIcon />
//                         <span className="text-[#00B7B3] text-sm uppercase tracking-wider">Sacred Architecture</span>
//                     </div>
//                     <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//                         Our <span className="text-[#00B7B3]">Vastu Courses</span>
//                     </h2>
//                     <p className="text-gray-400 max-w-2xl mx-auto">
//                         Choose your path to become a certified Vastu consultant with our structured learning programs
//                     </p>
//                 </div>

//                 <div className="space-y-20">
//                     {vastuCourses.map((course, index) => (
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
//                                         <p className="text-[#00B7B3] text-sm font-semibold mb-2">🏯 What You'll Learn:</p>
//                                         <p className="text-gray-400 text-sm leading-relaxed">
//                                             {course.courseContent}
//                                         </p>
//                                     </div>
//                                 )}

//                                 {course.features && (
//                                     <div className="flex flex-wrap gap-2">
//                                         {course.features.map((feature, idx) => (
//                                             <span key={idx} className="px-3 py-1 bg-[#00B7B3]/10 border border-[#00B7B3]/20 text-[#00B7B3] text-xs rounded-full">
//                                                 {feature}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 )}

//                                 <div className="flex flex-wrap items-center gap-4 pt-2">
//                                     <Link
//                                         href={`/vastu-courses/${course.title.toLowerCase().replace(/\s+/g, '-')}`}
//                                         className="group/btn px-8 py-3 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-full font-semibold hover:shadow-lg hover:shadow-[#00B7B3]/30 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
//                                     >
//                                         ENROLL NOW
//                                         <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                         </svg>
//                                     </Link>
//                                     <Link
//                                         href={`/vastu-courses/${course.title.toLowerCase().replace(/\s+/g, '-')}/details`}
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
//             {/* WHY CHOOSE OUR VASTU COURSES */}
//             {/* ============================================ */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                 <div className="relative overflow-hidden bg-gradient-to-br from-black/60 to-black/30 border border-[#00B7B3]/20 rounded-3xl p-12">
//                     <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B7B3]/5 rounded-full blur-3xl"></div>
//                     <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00B7B3]/5 rounded-full blur-3xl"></div>
                    
//                     <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
//                         Why Choose Our <span className="text-[#00B7B3]">Vastu Courses?</span>
//                     </h2>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
//                         <div className="text-center group">
//                             <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#00B7B3]/20 to-transparent flex items-center justify-center group-hover:bg-[#00B7B3] group-hover:scale-110 transition-all duration-500 border border-[#00B7B3]/30 group-hover:border-[#00B7B3]">
//                                 <div className="text-[#00B7B3] group-hover:text-black transition-colors duration-500">
//                                     <CompassIcon />
//                                 </div>
//                             </div>
//                             <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00B7B3] transition-colors">Traditional Wisdom</h3>
//                             <p className="text-gray-400 text-sm leading-relaxed">Authentic Vastu knowledge passed down through generations, rooted in ancient texts and practical application</p>
//                         </div>
                        
//                         <div className="text-center group">
//                             <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#00B7B3]/20 to-transparent flex items-center justify-center group-hover:bg-[#00B7B3] group-hover:scale-110 transition-all duration-500 border border-[#00B7B3]/30 group-hover:border-[#00B7B3]">
//                                 <div className="text-[#00B7B3] group-hover:text-black transition-colors duration-500">
//                                     <BalanceIcon />
//                                 </div>
//                             </div>
//                             <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00B7B3] transition-colors">Practical Application</h3>
//                             <p className="text-gray-400 text-sm leading-relaxed">Learn through real-world case studies, site visits, and hands-on correction techniques</p>
//                         </div>
                        
//                         <div className="text-center group">
//                             <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#00B7B3]/20 to-transparent flex items-center justify-center group-hover:bg-[#00B7B3] group-hover:scale-110 transition-all duration-500 border border-[#00B7B3]/30 group-hover:border-[#00B7B3]">
//                                 <div className="text-[#00B7B3] group-hover:text-black transition-colors duration-500">
//                                     <EnergyIcon />
//                                 </div>
//                             </div>
//                             <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00B7B3] transition-colors">Holistic Approach</h3>
//                             <p className="text-gray-400 text-sm leading-relaxed">Integration of Vastu with astrology, color therapy, and modern architecture for complete solutions</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* ============================================ */}
//             {/* CTA SECTION */}
//             {/* ============================================ */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                 <div className="relative rounded-3xl overflow-hidden">
//                     <div className="absolute inset-0 bg-gradient-to-r from-[#00B7B3] to-[#008080] opacity-90"></div>
//                     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-overlay"></div>
                    
//                     <div className="relative py-16 px-8 text-center">
//                         <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//                             Ready to Create Harmonious Spaces?
//                         </h2>
//                         <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
//                             Join our Vastu certification program and transform lives through the power of balanced spaces
//                         </p>
//                         <Link 
//                             href="/contact" 
//                             className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#00B7B3] rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl"
//                         >
//                             Book Free Consultation
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

// export default VastuCoursesPage;





// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Loader2 } from 'lucide-react';
// import { courseAPI } from '../../admin/services/api';

// // SVG Icons Components for Vastu
// const HomeIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M3 9L12 3L21 9L12 15L3 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//         <path d="M5 12V19H19V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <path d="M9 19V15H15V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//     </svg>
// );

// const CompassIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M12 3L12 5M12 19L12 21M21 12L19 12M5 12L3 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <path d="M12 8L14 10L12 16L10 10L12 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
// );

// const TempleIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 2L4 8H20L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//         <path d="M6 8V20H18V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <path d="M10 12H14V20H10V12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//     </svg>
// );

// const DirectionIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 2L12 22M12 2L8 6M12 2L16 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//         <path d="M2 12L22 12M22 12L18 8M22 12L18 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
// );

// const BuildingIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <rect x="4" y="8" width="16" height="12" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M8 4H16V8H8V4Z" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M10 12H14M10 16H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//     </svg>
// );

// const MandalaIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
//         <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
//         <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M12 1L12 4M12 20L12 23M1 12L4 12M20 12L23 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//     </svg>
// );

// const BalanceIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 2L12 22M12 2L8 5M12 2L16 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <path d="M5 12L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <path d="M3 19L21 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//     </svg>
// );

// const EnergyIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M13 2L4 14H12L11 22L20 10H12L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

// const VastuCoursesPage = () => {
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
            
//             // Filter only Vastu courses (category includes VASTU)
//             const vastuCourses = allCourses.filter(course => 
//                 course.category && course.category.includes('VASTU')
//             );
            
//             setTotalCourses(vastuCourses.length);
//             const startIndex = (currentPage - 1) * coursesPerPage;
//             const endIndex = startIndex + coursesPerPage;
//             const paginatedCourses = vastuCourses.slice(startIndex, endIndex);
            
//             setCourses(paginatedCourses);
//             setTotalPages(Math.ceil(vastuCourses.length / coursesPerPage));
//         } catch (error) {
//             console.error('Error fetching Vastu courses:', error);
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
//         if (course.title?.toLowerCase().includes('commercial')) {
//             return 'Commercial Vastu';
//         }
//         if (course.title?.toLowerCase().includes('residential')) {
//             return 'Residential Vastu';
//         }
//         if (course.title?.toLowerCase().includes('land')) {
//             return 'Land Vastu';
//         }
//         if (course.title?.toLowerCase().includes('complete')) {
//             return 'Vastu Course';
//         }
//         return 'Vastu Course';
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
//                         src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
//                         alt="Vastu Courses"
//                         className="w-full h-full object-cover scale-105"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
//                     <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,black_100%)]"></div>
//                 </div>

//                 <div className="absolute inset-0 overflow-hidden opacity-30">
//                     <div className="absolute top-10 left-10 animate-pulse">
//                         <CompassIcon />
//                     </div>
//                     <div className="absolute top-1/3 right-20 animate-spin-slow">
//                         <DirectionIcon />
//                     </div>
//                     <div className="absolute bottom-20 left-1/4 animate-pulse">
//                         <HomeIcon />
//                     </div>
//                 </div>

//                 <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
//                     <div className="max-w-2xl">
//                         <div className="inline-flex items-center gap-3 p-3 bg-gradient-to-r from-[#00B7B3]/20 to-transparent rounded-full mb-6 backdrop-blur-sm border border-[#00B7B3]/30">
//                             <TempleIcon />
//                             <span className="text-[#00B7B3] text-sm uppercase tracking-wider font-semibold">Ancient Science of Space Harmony</span>
//                         </div>
                        
//                         <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
//                             Master the Art of
//                             <span className="text-[#00B7B3] block mt-2">Vastu Shastra</span>
//                         </h1>
                        
//                         <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
//                             Learn the ancient wisdom of creating harmonious spaces. Become a certified Vastu consultant and help others achieve prosperity, health, and happiness.
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
//                             <MandalaIcon />
//                             <span className="text-[#00B7B3] text-sm uppercase tracking-wider font-semibold">The Science of Directional Energy</span>
//                         </div>
                        
//                         <p className="text-gray-300 text-lg leading-relaxed">
//                             Vastu Shastra, the ancient Indian science of architecture, is based on the principle that every space has its own energy field. 
//                             Just as our bodies require balance for health, our living and working spaces need harmony for prosperity and well-being. 
//                             The five elements - Earth, Water, Fire, Air, and Space - form the foundation of Vastu wisdom, and their proper alignment creates 
//                             spaces that nurture and support their inhabitants.
//                         </p>
//                         <p className="text-gray-300 text-lg leading-relaxed mt-6">
//                             Our Vastu courses are designed to help you understand the <span className="text-[#00B7B3]">profound connection between space and consciousness</span>. 
//                             Whether you're looking to transform your own home or become a professional Vastu consultant, our comprehensive training 
//                             programs provide the knowledge and practical skills you need. Learn from experienced masters who have been practicing 
//                             and teaching Vastu Shastra for decades.
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
//                         <BuildingIcon />
//                         <span className="text-[#00B7B3] text-sm uppercase tracking-wider">Sacred Architecture</span>
//                     </div>
//                     <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//                         Our <span className="text-[#00B7B3]">Vastu Courses</span>
//                     </h2>
//                     <p className="text-gray-400 max-w-2xl mx-auto">
//                         Choose your path to become a certified Vastu consultant with our structured learning programs
//                     </p>
//                     {totalCourses > 0 && (
//                         <p className="text-[#00B7B3] text-sm mt-2">
//                             Showing {courses.length} of {totalCourses} courses
//                         </p>
//                     )}
//                 </div>

//                 {courses.length === 0 ? (
//                     <div className="text-center py-20">
//                         <p className="text-gray-400 text-lg">No Vastu courses available at the moment.</p>
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
//                                                 src={course.image ? `${course.image}` : 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'} 
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
//                                             {stripHtml(course.whatIs || course.aboutCourse) || 'Discover the ancient wisdom of Vastu Shastra with our comprehensive course.'}
//                                         </p>

//                                         {/* Course Highlights - Clean Chip Design */}
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
//                                                 href={`/vastu-courses/${course.slug || course.title.toLowerCase().replace(/\s+/g, '-')}`}
//                                                 className="group/btn px-8 py-3 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-full font-semibold hover:shadow-lg hover:shadow-[#00B7B3]/30 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
//                                             >
//                                                 ENROLL NOW
//                                                 <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                                 </svg>
//                                             </Link>
//                                             <Link
//                                                 href={`/vastu-courses/${course.slug || course.title.toLowerCase().replace(/\s+/g, '-')}/details`}
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
//             {/* WHY CHOOSE OUR VASTU COURSES */}
//             {/* ============================================ */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                 <div className="relative overflow-hidden bg-gradient-to-br from-black/60 to-black/30 border border-[#00B7B3]/20 rounded-3xl p-12">
//                     <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B7B3]/5 rounded-full blur-3xl"></div>
//                     <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00B7B3]/5 rounded-full blur-3xl"></div>
                    
//                     <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
//                         Why Choose Our <span className="text-[#00B7B3]">Vastu Courses?</span>
//                     </h2>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
//                         <div className="text-center group">
//                             <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#00B7B3]/20 to-transparent flex items-center justify-center group-hover:bg-[#00B7B3] group-hover:scale-110 transition-all duration-500 border border-[#00B7B3]/30 group-hover:border-[#00B7B3]">
//                                 <div className="text-[#00B7B3] group-hover:text-black transition-colors duration-500">
//                                     <CompassIcon />
//                                 </div>
//                             </div>
//                             <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00B7B3] transition-colors">Traditional Wisdom</h3>
//                             <p className="text-gray-400 text-sm leading-relaxed">Authentic Vastu knowledge passed down through generations, rooted in ancient texts and practical application</p>
//                         </div>
                        
//                         <div className="text-center group">
//                             <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#00B7B3]/20 to-transparent flex items-center justify-center group-hover:bg-[#00B7B3] group-hover:scale-110 transition-all duration-500 border border-[#00B7B3]/30 group-hover:border-[#00B7B3]">
//                                 <div className="text-[#00B7B3] group-hover:text-black transition-colors duration-500">
//                                     <BalanceIcon />
//                                 </div>
//                             </div>
//                             <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00B7B3] transition-colors">Practical Application</h3>
//                             <p className="text-gray-400 text-sm leading-relaxed">Learn through real-world case studies, site visits, and hands-on correction techniques</p>
//                         </div>
                        
//                         <div className="text-center group">
//                             <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#00B7B3]/20 to-transparent flex items-center justify-center group-hover:bg-[#00B7B3] group-hover:scale-110 transition-all duration-500 border border-[#00B7B3]/30 group-hover:border-[#00B7B3]">
//                                 <div className="text-[#00B7B3] group-hover:text-black transition-colors duration-500">
//                                     <EnergyIcon />
//                                 </div>
//                             </div>
//                             <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#00B7B3] transition-colors">Holistic Approach</h3>
//                             <p className="text-gray-400 text-sm leading-relaxed">Integration of Vastu with astrology, color therapy, and modern architecture for complete solutions</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* ============================================ */}
//             {/* CTA SECTION */}
//             {/* ============================================ */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                 <div className="relative rounded-3xl overflow-hidden">
//                     <div className="absolute inset-0 bg-gradient-to-r from-[#00B7B3] to-[#008080] opacity-90"></div>
//                     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center mix-blend-overlay"></div>
                    
//                     <div className="relative py-16 px-8 text-center">
//                         <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//                             Ready to Create Harmonious Spaces?
//                         </h2>
//                         <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
//                             Join our Vastu certification program and transform lives through the power of balanced spaces
//                         </p>
//                         <Link 
//                             href="/contact" 
//                             className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#00B7B3] rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl"
//                         >
//                             Book Free Consultation
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

// export default VastuCoursesPage;




// // VastuCoursesPage.jsx
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Loader2 } from 'lucide-react';
// import { courseAPI, pageContentAPI } from '../../admin/services/api';

// // SVG Icons Components for Vastu
// const HomeIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M3 9L12 3L21 9L12 15L3 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//         <path d="M5 12V19H19V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <path d="M9 19V15H15V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//     </svg>
// );

// const CompassIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M12 3L12 5M12 19L12 21M21 12L19 12M5 12L3 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <path d="M12 8L14 10L12 16L10 10L12 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
// );

// const TempleIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 2L4 8H20L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//         <path d="M6 8V20H18V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <path d="M10 12H14V20H10V12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//     </svg>
// );

// const DirectionIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 2L12 22M12 2L8 6M12 2L16 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//         <path d="M2 12L22 12M22 12L18 8M22 12L18 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
// );

// const BuildingIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <rect x="4" y="8" width="16" height="12" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M8 4H16V8H8V4Z" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M10 12H14M10 16H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//     </svg>
// );

// const MandalaIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
//         <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
//         <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M12 1L12 4M12 20L12 23M1 12L4 12M20 12L23 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//     </svg>
// );

// const BalanceIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 2L12 22M12 2L8 5M12 2L16 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <path d="M5 12L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//         <path d="M3 19L21 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//     </svg>
// );

// const EnergyIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M13 2L4 14H12L11 22L20 10H12L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
// );

// // Icon mapping for Why Choose Us
// const iconMap = {
//     CompassIcon: CompassIcon,
//     BalanceIcon: BalanceIcon,
//     EnergyIcon: EnergyIcon,
//     StarIcon: CompassIcon, // Fallback
//     GraduateIcon: CompassIcon,
//     DiamondIcon: CompassIcon,
//     HomeIcon: HomeIcon,
//     TempleIcon: TempleIcon,
//     DirectionIcon: DirectionIcon,
//     BuildingIcon: BuildingIcon,
//     MandalaIcon: MandalaIcon
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

// const VastuCoursesPage = () => {
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
//             const { data: pageData } = await pageContentAPI.getByType('vastu');
//             if (pageData.success && pageData.data) {
//                 setPageContent(pageData.data);
//                 console.log('✅ Vastu page content loaded:', pageData.data.heroTitle);
//             }
            
//             // Fetch courses
//             const { data: courseData } = await courseAPI.getAll();
//             let allCourses = courseData.courses || [];
            
//             // Filter only Vastu courses
//             const vastuCourses = allCourses.filter(course => 
//                 course.category && course.category.includes('VASTU')
//             );
            
//             setTotalCourses(vastuCourses.length);
//             const startIndex = (currentPage - 1) * coursesPerPage;
//             const endIndex = startIndex + coursesPerPage;
//             const paginatedCourses = vastuCourses.slice(startIndex, endIndex);
            
//             setCourses(paginatedCourses);
//             setTotalPages(Math.ceil(vastuCourses.length / coursesPerPage));
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
//         if (course.title?.toLowerCase().includes('commercial')) {
//             return 'Commercial Vastu';
//         }
//         if (course.title?.toLowerCase().includes('residential')) {
//             return 'Residential Vastu';
//         }
//         if (course.title?.toLowerCase().includes('land')) {
//             return 'Land Vastu';
//         }
//         if (course.title?.toLowerCase().includes('complete')) {
//             return 'Vastu Course';
//         }
//         return 'Vastu Course';
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
//                         src={pageContent?.heroImage || 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'} 
//                         alt="Vastu Courses"
//                         className="w-full h-full object-cover scale-105"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
//                     <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,black_100%)]"></div>
//                 </div>

//                 <div className="absolute inset-0 overflow-hidden opacity-30">
//                     <div className="absolute top-10 left-10 animate-pulse">
//                         <CompassIcon />
//                     </div>
//                     <div className="absolute top-1/3 right-20 animate-spin-slow">
//                         <DirectionIcon />
//                     </div>
//                     <div className="absolute bottom-20 left-1/4 animate-pulse">
//                         <HomeIcon />
//                     </div>
//                 </div>

//                 <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
//                     <div className="max-w-2xl">
//                         <div className="inline-flex items-center gap-3 p-3 bg-gradient-to-r from-[#00B7B3]/20 to-transparent rounded-full mb-6 backdrop-blur-sm border border-[#00B7B3]/30">
//                             <TempleIcon />
//                             <span className="text-[#00B7B3] text-sm uppercase tracking-wider font-semibold">
//                                 {pageContent?.heroBadgeText || 'Ancient Science of Space Harmony'}
//                             </span>
//                         </div>
                        
//                         <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
//                             {pageContent?.heroTitle || 'Master the Art of'}
//                             <span className="text-[#00B7B3] block mt-2">
//                                 {pageContent?.heroSubtitle || 'Vastu Shastra'}
//                             </span>
//                         </h1>
                        
//                         <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
//                             {pageContent?.heroDescription || 'Learn the ancient wisdom of creating harmonious spaces. Become a certified Vastu consultant and help others achieve prosperity, health, and happiness.'}
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
//                             <MandalaIcon />
//                             <span className="text-[#00B7B3] text-sm uppercase tracking-wider font-semibold">
//                                 {pageContent?.introTitle || 'The Science of Directional Energy'}
//                             </span>
//                         </div>
                        
//                         <div 
//                             className="text-gray-300 text-lg leading-relaxed"
//                             dangerouslySetInnerHTML={{ 
//                                 __html: pageContent?.introContent || 'Vastu Shastra, the ancient Indian science of architecture, is based on the principle that every space has its own energy field. Just as our bodies require balance for health, our living and working spaces need harmony for prosperity and well-being. The five elements - Earth, Water, Fire, Air, and Space - form the foundation of Vastu wisdom, and their proper alignment creates spaces that nurture and support their inhabitants.<br/><br/>Our Vastu courses are designed to help you understand the <strong>profound connection between space and consciousness</strong>. Whether you\'re looking to transform your own home or become a professional Vastu consultant, our comprehensive training programs provide the knowledge and practical skills you need. Learn from experienced masters who have been practicing and teaching Vastu Shastra for decades.'
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
//                         <BuildingIcon />
//                         <span className="text-[#00B7B3] text-sm uppercase tracking-wider">Sacred Architecture</span>
//                     </div>
//                     <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//                         Our <span className="text-[#00B7B3]">Vastu Courses</span>
//                     </h2>
//                     <p className="text-gray-400 max-w-2xl mx-auto">
//                         Choose your path to become a certified Vastu consultant with our structured learning programs
//                     </p>
//                     {totalCourses > 0 && (
//                         <p className="text-[#00B7B3] text-sm mt-2">
//                             Showing {courses.length} of {totalCourses} courses
//                         </p>
//                     )}
//                 </div>

//                 {courses.length === 0 ? (
//                     <div className="text-center py-20">
//                         <p className="text-gray-400 text-lg">No Vastu courses available at the moment.</p>
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
//                                                 src={course.image ? `${course.image}` : 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'} 
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
//                                             {stripHtml(course.whatIs || course.aboutCourse) || 'Discover the ancient wisdom of Vastu Shastra with our comprehensive course.'}
//                                         </p>

//                                         {/* Course Highlights - Clean Chip Design */}
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
//                                                 href={`/vastu-courses/${course.slug || course.title.toLowerCase().replace(/\s+/g, '-')}`}
//                                                 className="group/btn px-8 py-3 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-full font-semibold hover:shadow-lg hover:shadow-[#00B7B3]/30 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
//                                             >
//                                                 ENROLL NOW
//                                                 <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                                 </svg>
//                                             </Link>
//                                             <Link
//                                                 href={`/vastu-courses/${course.slug || course.title.toLowerCase().replace(/\s+/g, '-')}/details`}
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
//             {/* WHY CHOOSE OUR COURSES - DYNAMIC */}
//             {/* ============================================ */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                 <div className="relative overflow-hidden bg-gradient-to-br from-black/60 to-black/30 border border-[#00B7B3]/20 rounded-3xl p-12">
//                     <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
//                         {pageContent?.whyChooseUsTitle || 'Why Choose Our Vastu Courses?'}
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
//                             {pageContent?.ctaTitle || 'Ready to Create Harmonious Spaces?'}
//                         </h2>
//                         <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
//                             {pageContent?.ctaDescription || 'Join our Vastu certification program and transform lives through the power of balanced spaces'}
//                         </p>
//                         <Link 
//                             href={pageContent?.ctaButtonLink || '/contact'} 
//                             className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#00B7B3] rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl"
//                         >
//                             {pageContent?.ctaButtonText || 'Book Free Consultation'}
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

// export default VastuCoursesPage;



// // VastuCoursesPage.jsx
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Loader2 } from 'lucide-react';
// import { courseAPI, pageContentAPI } from '../../admin/services/api';

// // ✅ Add this CSS at the top
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
  
//   .intro-content h1, .intro-content h2, .intro-content h3, .intro-content h4 {
//     margin-top: 1rem;
//     margin-bottom: 0.5rem;
//   }
  
//   .intro-content ul, .intro-content ol {
//     margin: 0.8rem 0 0.8rem 1.8rem;
//   }
  
//   .intro-content img {
//     max-width: 100%;
//     height: auto;
//   }
// `;

// // SVG Icons Components (keep all your existing icons)
// const HomeIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M3 9L12 3L21 9L12 15L3 9Z" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M5 12V19H19V12" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M9 19V15H15V19" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const CompassIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M12 3L12 5M12 19L12 21M21 12L19 12M5 12L3 12" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M12 8L14 10L12 16L10 10L12 8Z" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const TempleIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 2L4 8H20L12 2Z" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M6 8V20H18V8" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M10 12H14V20H10V12Z" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const DirectionIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 2L12 22M12 2L8 6M12 2L16 6" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M2 12L22 12M22 12L18 8M22 12L18 16" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const BuildingIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <rect x="4" y="8" width="16" height="12" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M8 4H16V8H8V4Z" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M10 12H14M10 16H12" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const MandalaIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
//         <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
//         <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M12 1L12 4M12 20L12 23M1 12L4 12M20 12L23 12" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const BalanceIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 2L12 22M12 2L8 5M12 2L16 5" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M5 12L19 12" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M3 19L21 19" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const EnergyIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M13 2L4 14H12L11 22L20 10H12L13 2Z" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// // Icon mapping for Why Choose Us
// const iconMap = {
//     CompassIcon: CompassIcon,
//     BalanceIcon: BalanceIcon,
//     EnergyIcon: EnergyIcon,
//     HomeIcon: HomeIcon,
//     TempleIcon: TempleIcon,
//     DirectionIcon: DirectionIcon,
//     BuildingIcon: BuildingIcon,
//     MandalaIcon: MandalaIcon
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

// const VastuCoursesPage = () => {
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
//             const { data: pageData } = await pageContentAPI.getByType('vastu');
//             if (pageData.success && pageData.data) {
//                 setPageContent(pageData.data);
//             }
            
//             const { data: courseData } = await courseAPI.getAll();
//             const vastuCourses = (courseData.courses || []).filter(c => c.category?.includes('VASTU'));
            
//             setTotalCourses(vastuCourses.length);
//             const startIndex = (currentPage - 1) * coursesPerPage;
//             setCourses(vastuCourses.slice(startIndex, startIndex + coursesPerPage));
//             setTotalPages(Math.ceil(vastuCourses.length / coursesPerPage));
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
//         if (course.title?.toLowerCase().includes('commercial')) return 'Commercial Vastu';
//         if (course.title?.toLowerCase().includes('residential')) return 'Residential Vastu';
//         if (course.title?.toLowerCase().includes('land')) return 'Land Vastu';
//         if (course.title?.toLowerCase().includes('complete')) return 'Vastu Course';
//         return 'Vastu Course';
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
//                 {/* HERO SECTION - DYNAMIC */}
//                 <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
//                     <div className="absolute inset-0">
//                         <img 
//                             src={pageContent?.heroImage || 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'} 
//                             alt="Vastu Courses"
//                             className="w-full h-full object-cover scale-105"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
//                         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,black_100%)]"></div>
//                     </div>
//                     <div className="absolute inset-0 overflow-hidden opacity-30">
//                         <div className="absolute top-10 left-10 animate-pulse"><CompassIcon /></div>
//                         <div className="absolute top-1/3 right-20 animate-spin-slow"><DirectionIcon /></div>
//                         <div className="absolute bottom-20 left-1/4 animate-pulse"><HomeIcon /></div>
//                     </div>
//                     <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
//                         <div className="max-w-2xl">
//                             <div className="inline-flex items-center gap-3 p-3 bg-gradient-to-r from-[#00B7B3]/20 to-transparent rounded-full mb-6 backdrop-blur-sm border border-[#00B7B3]/30">
//                                 <TempleIcon />
//                                 <span className="text-[#00B7B3] text-sm uppercase tracking-wider font-semibold">
//                                     {pageContent?.heroBadgeText || 'Ancient Science of Space Harmony'}
//                                 </span>
//                             </div>
//                             <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
//                                 {pageContent?.heroTitle || 'Master the Art of'}
//                                 <span className="text-[#00B7B3] block mt-2">
//                                     {pageContent?.heroSubtitle || 'Vastu Shastra'}
//                                 </span>
//                             </h1>
//                             <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
//                                 {pageContent?.heroDescription || 'Learn the ancient wisdom of creating harmonious spaces.'}
//                             </p>
//                             <div className="flex gap-4 mt-8">
//                                 <div className="w-16 h-1 bg-[#00B7B3]"></div>
//                                 <div className="w-8 h-1 bg-[#00B7B3]/50"></div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
//                 </div>

//                 {/* INTRO TEXT SECTION - DYNAMIC with proper overflow */}
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-20">
//                     <div className="relative group">
//                         <div className="absolute inset-0 bg-gradient-to-r from-[#00B7B3]/20 to-transparent blur-3xl opacity-20 group-hover:opacity-40"></div>
//                         <div className="relative bg-gradient-to-br from-black/80 via-black/60 to-black/80 border border-[#00B7B3]/20 rounded-3xl p-10 lg:p-12 backdrop-blur-sm overflow-hidden">
//                             <div className="absolute top-0 right-0 w-40 h-40 bg-[#00B7B3]/5 rounded-full blur-3xl"></div>
//                             <div className="flex items-center gap-3 mb-8">
//                                 <MandalaIcon />
//                                 <span className="text-[#00B7B3] text-sm uppercase tracking-wider font-semibold">
//                                     {pageContent?.introTitle || 'The Science of Directional Energy'}
//                                 </span>
//                             </div>
//                             <div 
//                                 className="intro-content text-gray-300 text-lg leading-relaxed"
//                                 dangerouslySetInnerHTML={{ 
//                                     __html: pageContent?.introContent || 'Vastu Shastra, the ancient Indian science of architecture...'
//                                 }} 
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* COURSES SECTION */}
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                     <div className="text-center mb-16">
//                         <div className="inline-flex items-center gap-2 bg-[#00B7B3]/10 px-4 py-2 rounded-full mb-4">
//                             <BuildingIcon />
//                             <span className="text-[#00B7B3] text-sm uppercase tracking-wider">Sacred Architecture</span>
//                         </div>
//                         <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//                             Our <span className="text-[#00B7B3]">Vastu Courses</span>
//                         </h2>
//                         <p className="text-gray-400 max-w-2xl mx-auto">
//                             Choose your path to become a certified Vastu consultant with our structured learning programs
//                         </p>
//                         {totalCourses > 0 && (
//                             <p className="text-[#00B7B3] text-sm mt-2">Showing {courses.length} of {totalCourses} courses</p>
//                         )}
//                     </div>

//                     {courses.length === 0 ? (
//                         <div className="text-center py-20">
//                             <p className="text-gray-400 text-lg">No Vastu courses available at the moment.</p>
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
//                                                 <img src={course.image ? `${course.image}` : 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'} 
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
//                                                 {stripHtml(course.whatIs || course.aboutCourse) || 'Discover the ancient wisdom of Vastu Shastra.'}
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
//                                                 <Link href={`/vastu-courses/${course.slug || course.title.toLowerCase().replace(/\s+/g, '-')}`}
//                                                     className="group/btn px-8 py-3 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-full font-semibold hover:shadow-lg flex items-center gap-2">
//                                                     ENROLL NOW
//                                                     <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                                     </svg>
//                                                 </Link>
//                                                 <Link href={`/vastu-courses/${course.slug || course.title.toLowerCase().replace(/\s+/g, '-')}/details`}
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

//                 {/* WHY CHOOSE OUR COURSES - DYNAMIC */}
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                     <div className="relative overflow-hidden bg-gradient-to-br from-black/60 to-black/30 border border-[#00B7B3]/20 rounded-3xl p-12">
//                         <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
//                             {pageContent?.whyChooseUsTitle || 'Why Choose Our Vastu Courses?'}
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
//                                 {pageContent?.ctaTitle || 'Ready to Create Harmonious Spaces?'}
//                             </h2>
//                             <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
//                                 {pageContent?.ctaDescription || 'Join our Vastu certification program and transform lives through the power of balanced spaces'}
//                             </p>
//                             <Link href={pageContent?.ctaButtonLink || '/contact'}
//                                 className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#00B7B3] rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl">
//                                 {pageContent?.ctaButtonText || 'Book Free Consultation'}
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

// export default VastuCoursesPage;




// // VastuCoursesPage.jsx
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Helmet } from 'react-helmet';
// import { Loader2 } from 'lucide-react';
// import { courseAPI, pageContentAPI } from '../../admin/services/api';

// // ✅ Add this CSS at the top
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
  
//   .intro-content h1, .intro-content h2, .intro-content h3, .intro-content h4 {
//     margin-top: 1rem;
//     margin-bottom: 0.5rem;
//   }
  
//   .intro-content ul, .intro-content ol {
//     margin: 0.8rem 0 0.8rem 1.8rem;
//   }
  
//   .intro-content img {
//     max-width: 100%;
//     height: auto;
//   }
// `;

// // SVG Icons Components (keep all your existing icons)
// const HomeIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M3 9L12 3L21 9L12 15L3 9Z" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M5 12V19H19V12" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M9 19V15H15V19" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const CompassIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M12 3L12 5M12 19L12 21M21 12L19 12M5 12L3 12" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M12 8L14 10L12 16L10 10L12 8Z" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const TempleIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 2L4 8H20L12 2Z" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M6 8V20H18V8" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M10 12H14V20H10V12Z" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const DirectionIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 2L12 22M12 2L8 6M12 2L16 6" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M2 12L22 12M22 12L18 8M22 12L18 16" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const BuildingIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <rect x="4" y="8" width="16" height="12" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M8 4H16V8H8V4Z" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M10 12H14M10 16H12" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const MandalaIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
//         <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
//         <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M12 1L12 4M12 20L12 23M1 12L4 12M20 12L23 12" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const BalanceIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 2L12 22M12 2L8 5M12 2L16 5" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M5 12L19 12" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M3 19L21 19" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const EnergyIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M13 2L4 14H12L11 22L20 10H12L13 2Z" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// // Icon mapping for Why Choose Us
// const iconMap = {
//     CompassIcon: CompassIcon,
//     BalanceIcon: BalanceIcon,
//     EnergyIcon: EnergyIcon,
//     HomeIcon: HomeIcon,
//     TempleIcon: TempleIcon,
//     DirectionIcon: DirectionIcon,
//     BuildingIcon: BuildingIcon,
//     MandalaIcon: MandalaIcon
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

// const VastuCoursesPage = () => {
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
//             const { data: pageData } = await pageContentAPI.getByType('vastu');
//             if (pageData.success && pageData.data) {
//                 setPageContent(pageData.data);
//             }
            
//             const { data: courseData } = await courseAPI.getAll();
//             const vastuCourses = (courseData.courses || []).filter(c => c.category?.includes('VASTU'));
            
//             setTotalCourses(vastuCourses.length);
//             const startIndex = (currentPage - 1) * coursesPerPage;
//             setCourses(vastuCourses.slice(startIndex, startIndex + coursesPerPage));
//             setTotalPages(Math.ceil(vastuCourses.length / coursesPerPage));
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
//         if (course.title?.toLowerCase().includes('commercial')) return 'Commercial Vastu';
//         if (course.title?.toLowerCase().includes('residential')) return 'Residential Vastu';
//         if (course.title?.toLowerCase().includes('land')) return 'Land Vastu';
//         if (course.title?.toLowerCase().includes('complete')) return 'Vastu Course';
//         return 'Vastu Course';
//     };

//     // ✅ SEO Data from pageContent (just like admin panel fields)
//     const seoTitle = pageContent?.seoTitle || 'Vastu Courses | Learn Vastu Shastra Online | NB Astro';
//     const seoDescription = pageContent?.seoDescription || 'Join best Vastu courses in Noida. Learn Vastu Shastra from expert Naveen Bhagat with practical training and certification. Enroll now!';
//     const seoKeywords = pageContent?.seoKeywords || 'vastu course, vastu shastra course, vastu classes online, vastu training noida, learn vastu, vastu certification';

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
//                 {/* HERO SECTION - DYNAMIC */}
//                 <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
//                     <div className="absolute inset-0">
//                         <img 
//                             src={pageContent?.heroImage || 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'} 
//                             alt="Vastu Courses"
//                             className="w-full h-full object-cover scale-105"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
//                         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,black_100%)]"></div>
//                     </div>
//                     <div className="absolute inset-0 overflow-hidden opacity-30">
//                         <div className="absolute top-10 left-10 animate-pulse"><CompassIcon /></div>
//                         <div className="absolute top-1/3 right-20 animate-spin-slow"><DirectionIcon /></div>
//                         <div className="absolute bottom-20 left-1/4 animate-pulse"><HomeIcon /></div>
//                     </div>
//                     <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
//                         <div className="max-w-2xl">
//                             <div className="inline-flex items-center gap-3 p-3 bg-gradient-to-r from-[#00B7B3]/20 to-transparent rounded-full mb-6 backdrop-blur-sm border border-[#00B7B3]/30">
//                                 <TempleIcon />
//                                 <span className="text-[#00B7B3] text-sm uppercase tracking-wider font-semibold">
//                                     {pageContent?.heroBadgeText || 'Ancient Science of Space Harmony'}
//                                 </span>
//                             </div>
//                             <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
//                                 {pageContent?.heroTitle || 'Master the Art of'}
//                                 <span className="text-[#00B7B3] block mt-2">
//                                     {pageContent?.heroSubtitle || 'Vastu Shastra'}
//                                 </span>
//                             </h1>
//                             <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
//                                 {pageContent?.heroDescription || 'Learn the ancient wisdom of creating harmonious spaces.'}
//                             </p>
//                             <div className="flex gap-4 mt-8">
//                                 <div className="w-16 h-1 bg-[#00B7B3]"></div>
//                                 <div className="w-8 h-1 bg-[#00B7B3]/50"></div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
//                 </div>

//                 {/* INTRO TEXT SECTION - DYNAMIC with proper overflow */}
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-20">
//                     <div className="relative group">
//                         <div className="absolute inset-0 bg-gradient-to-r from-[#00B7B3]/20 to-transparent blur-3xl opacity-20 group-hover:opacity-40"></div>
//                         <div className="relative bg-gradient-to-br from-black/80 via-black/60 to-black/80 border border-[#00B7B3]/20 rounded-3xl p-10 lg:p-12 backdrop-blur-sm overflow-hidden">
//                             <div className="absolute top-0 right-0 w-40 h-40 bg-[#00B7B3]/5 rounded-full blur-3xl"></div>
//                             <div className="flex items-center gap-3 mb-8">
//                                 <MandalaIcon />
//                                 <span className="text-[#00B7B3] text-sm uppercase tracking-wider font-semibold">
//                                     {pageContent?.introTitle || 'The Science of Directional Energy'}
//                                 </span>
//                             </div>
//                             <div 
//                                 className="intro-content text-gray-300 text-lg leading-relaxed"
//                                 dangerouslySetInnerHTML={{ 
//                                     __html: pageContent?.introContent || 'Vastu Shastra, the ancient Indian science of architecture...'
//                                 }} 
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* COURSES SECTION */}
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                     <div className="text-center mb-16">
//                         <div className="inline-flex items-center gap-2 bg-[#00B7B3]/10 px-4 py-2 rounded-full mb-4">
//                             <BuildingIcon />
//                             <span className="text-[#00B7B3] text-sm uppercase tracking-wider">Sacred Architecture</span>
//                         </div>
//                         <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//                             Our <span className="text-[#00B7B3]">Vastu Courses</span>
//                         </h2>
//                         <p className="text-gray-400 max-w-2xl mx-auto">
//                             Choose your path to become a certified Vastu consultant with our structured learning programs
//                         </p>
//                         {totalCourses > 0 && (
//                             <p className="text-[#00B7B3] text-sm mt-2">Showing {courses.length} of {totalCourses} courses</p>
//                         )}
//                     </div>

//                     {courses.length === 0 ? (
//                         <div className="text-center py-20">
//                             <p className="text-gray-400 text-lg">No Vastu courses available at the moment.</p>
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
//                                                 <img src={course.image ? `${course.image}` : 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'} 
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
//                                                 {stripHtml(course.whatIs || course.aboutCourse) || 'Discover the ancient wisdom of Vastu Shastra.'}
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
//                                                 <Link href={`/vastu-courses/${course.slug || course.title.toLowerCase().replace(/\s+/g, '-')}`}
//                                                     className="group/btn px-8 py-3 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-full font-semibold hover:shadow-lg flex items-center gap-2">
//                                                     ENROLL NOW
//                                                     <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                                     </svg>
//                                                 </Link>
//                                                 <Link href={`/vastu-courses/${course.slug || course.title.toLowerCase().replace(/\s+/g, '-')}/details`}
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

//                 {/* WHY CHOOSE OUR COURSES - DYNAMIC */}
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                     <div className="relative overflow-hidden bg-gradient-to-br from-black/60 to-black/30 border border-[#00B7B3]/20 rounded-3xl p-12">
//                         <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
//                             {pageContent?.whyChooseUsTitle || 'Why Choose Our Vastu Courses?'}
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
//                                 {pageContent?.ctaTitle || 'Ready to Create Harmonious Spaces?'}
//                             </h2>
//                             <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
//                                 {pageContent?.ctaDescription || 'Join our Vastu certification program and transform lives through the power of balanced spaces'}
//                             </p>
//                             <Link href={pageContent?.ctaButtonLink || '/contact'}
//                                 className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#00B7B3] rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl">
//                                 {pageContent?.ctaButtonText || 'Book Free Consultation'}
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

// export default VastuCoursesPage;




// // VastuCoursesPage.jsx
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Helmet } from 'react-helmet';
// import { Loader2 } from 'lucide-react';
// import { courseAPI, pageContentAPI } from '../../admin/services/api';

// // ✅ Add this CSS at the top
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
  
//   .intro-content h1, .intro-content h2, .intro-content h3, .intro-content h4 {
//     margin-top: 1rem;
//     margin-bottom: 0.5rem;
//   }
  
//   .intro-content ul, .intro-content ol {
//     margin: 0.8rem 0 0.8rem 1.8rem;
//   }
  
//   .intro-content img {
//     max-width: 100%;
//     height: auto;
//   }
// `;

// // SVG Icons Components (keep all your existing icons)
// const HomeIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M3 9L12 3L21 9L12 15L3 9Z" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M5 12V19H19V12" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M9 19V15H15V19" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const CompassIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M12 3L12 5M12 19L12 21M21 12L19 12M5 12L3 12" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M12 8L14 10L12 16L10 10L12 8Z" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const TempleIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 2L4 8H20L12 2Z" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M6 8V20H18V8" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M10 12H14V20H10V12Z" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const DirectionIcon = () => (
//     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 2L12 22M12 2L8 6M12 2L16 6" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M2 12L22 12M22 12L18 8M22 12L18 16" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const BuildingIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <rect x="4" y="8" width="16" height="12" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M8 4H16V8H8V4Z" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M10 12H14M10 16H12" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const MandalaIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
//         <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
//         <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M12 1L12 4M12 20L12 23M1 12L4 12M20 12L23 12" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const BalanceIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M12 2L12 22M12 2L8 5M12 2L16 5" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M5 12L19 12" stroke="currentColor" strokeWidth="1.5"/>
//         <path d="M3 19L21 19" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// const EnergyIcon = () => (
//     <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//         <path d="M13 2L4 14H12L11 22L20 10H12L13 2Z" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
// );

// // Icon mapping for Why Choose Us
// const iconMap = {
//     CompassIcon: CompassIcon,
//     BalanceIcon: BalanceIcon,
//     EnergyIcon: EnergyIcon,
//     HomeIcon: HomeIcon,
//     TempleIcon: TempleIcon,
//     DirectionIcon: DirectionIcon,
//     BuildingIcon: BuildingIcon,
//     MandalaIcon: MandalaIcon
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

// const VastuCoursesPage = () => {
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
//             const { data: pageData } = await pageContentAPI.getByType('vastu');
//             if (pageData.success && pageData.data) {
//                 setPageContent(pageData.data);
//             }
            
//             const { data: courseData } = await courseAPI.getAll();
//             const vastuCourses = (courseData.courses || []).filter(c => c.category?.includes('VASTU'));
            
//             setTotalCourses(vastuCourses.length);
//             const startIndex = (currentPage - 1) * coursesPerPage;
//             setCourses(vastuCourses.slice(startIndex, startIndex + coursesPerPage));
//             setTotalPages(Math.ceil(vastuCourses.length / coursesPerPage));
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
//         if (course.title?.toLowerCase().includes('commercial')) return 'Commercial Vastu';
//         if (course.title?.toLowerCase().includes('residential')) return 'Residential Vastu';
//         if (course.title?.toLowerCase().includes('land')) return 'Land Vastu';
//         if (course.title?.toLowerCase().includes('complete')) return 'Vastu Course';
//         return 'Vastu Course';
//     };

//     // ✅ SEO Data from pageContent
//     const seoTitle = pageContent?.seoTitle || 'Vastu Courses | Learn Vastu Shastra Online | NB Astro';
//     const seoDescription = pageContent?.seoDescription || 'Join best Vastu courses in Noida. Learn Vastu Shastra from expert Naveen Bhagat with practical training and certification. Enroll now!';
//     const seoKeywords = pageContent?.seoKeywords || 'vastu course, vastu shastra course, vastu classes online, vastu training noida, learn vastu, vastu certification';
//     const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://nbastro.com/vastu-courses';
//     const ogImage = pageContent?.heroImage || 'https://nbastro.com/vastu-og-image.jpg';

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
//                 {/* HERO SECTION - DYNAMIC */}
//                 <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
//                     <div className="absolute inset-0">
//                         <img 
//                             src={pageContent?.heroImage || 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'} 
//                             alt="Vastu Courses"
//                             className="w-full h-full object-cover scale-105"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
//                         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,black_100%)]"></div>
//                     </div>
//                     <div className="absolute inset-0 overflow-hidden opacity-30">
//                         <div className="absolute top-10 left-10 animate-pulse"><CompassIcon /></div>
//                         <div className="absolute top-1/3 right-20 animate-spin-slow"><DirectionIcon /></div>
//                         <div className="absolute bottom-20 left-1/4 animate-pulse"><HomeIcon /></div>
//                     </div>
//                     <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
//                         <div className="max-w-2xl">
//                             <div className="inline-flex items-center gap-3 p-3 bg-gradient-to-r from-[#00B7B3]/20 to-transparent rounded-full mb-6 backdrop-blur-sm border border-[#00B7B3]/30">
//                                 <TempleIcon />
//                                 <span className="text-[#00B7B3] text-sm uppercase tracking-wider font-semibold">
//                                     {pageContent?.heroBadgeText || 'Ancient Science of Space Harmony'}
//                                 </span>
//                             </div>
//                             <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
//                                 {pageContent?.heroTitle || 'Master the Art of'}
//                                 <span className="text-[#00B7B3] block mt-2">
//                                     {pageContent?.heroSubtitle || 'Vastu Shastra'}
//                                 </span>
//                             </h1>
//                             <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
//                                 {pageContent?.heroDescription || 'Learn the ancient wisdom of creating harmonious spaces.'}
//                             </p>
//                             <div className="flex gap-4 mt-8">
//                                 <div className="w-16 h-1 bg-[#00B7B3]"></div>
//                                 <div className="w-8 h-1 bg-[#00B7B3]/50"></div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
//                 </div>

//                 {/* INTRO TEXT SECTION - DYNAMIC with proper overflow */}
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-20">
//                     <div className="relative group">
//                         <div className="absolute inset-0 bg-gradient-to-r from-[#00B7B3]/20 to-transparent blur-3xl opacity-20 group-hover:opacity-40"></div>
//                         <div className="relative bg-gradient-to-br from-black/80 via-black/60 to-black/80 border border-[#00B7B3]/20 rounded-3xl p-10 lg:p-12 backdrop-blur-sm overflow-hidden">
//                             <div className="absolute top-0 right-0 w-40 h-40 bg-[#00B7B3]/5 rounded-full blur-3xl"></div>
//                             <div className="flex items-center gap-3 mb-8">
//                                 <MandalaIcon />
//                                 <span className="text-[#00B7B3] text-sm uppercase tracking-wider font-semibold">
//                                     {pageContent?.introTitle || 'The Science of Directional Energy'}
//                                 </span>
//                             </div>
//                             <div 
//                                 className="intro-content text-gray-300 text-lg leading-relaxed"
//                                 dangerouslySetInnerHTML={{ 
//                                     __html: pageContent?.introContent || 'Vastu Shastra, the ancient Indian science of architecture...'
//                                 }} 
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* COURSES SECTION */}
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                     <div className="text-center mb-16">
//                         <div className="inline-flex items-center gap-2 bg-[#00B7B3]/10 px-4 py-2 rounded-full mb-4">
//                             <BuildingIcon />
//                             <span className="text-[#00B7B3] text-sm uppercase tracking-wider">Sacred Architecture</span>
//                         </div>
//                         <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//                             Our <span className="text-[#00B7B3]">Vastu Courses</span>
//                         </h2>
//                         <p className="text-gray-400 max-w-2xl mx-auto">
//                             Choose your path to become a certified Vastu consultant with our structured learning programs
//                         </p>
//                         {totalCourses > 0 && (
//                             <p className="text-[#00B7B3] text-sm mt-2">Showing {courses.length} of {totalCourses} courses</p>
//                         )}
//                     </div>

//                     {courses.length === 0 ? (
//                         <div className="text-center py-20">
//                             <p className="text-gray-400 text-lg">No Vastu courses available at the moment.</p>
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
//                                                 <img src={course.image ? `${course.image}` : 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'} 
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
//                                                 {stripHtml(course.whatIs || course.aboutCourse) || 'Discover the ancient wisdom of Vastu Shastra.'}
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
//                                                 <Link href={`/vastu-courses/${course.slug || course.title.toLowerCase().replace(/\s+/g, '-')}`}
//                                                     className="group/btn px-8 py-3 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-full font-semibold hover:shadow-lg flex items-center gap-2">
//                                                     ENROLL NOW
//                                                     <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                                     </svg>
//                                                 </Link>
//                                                 <Link href={`/vastu-courses/${course.slug || course.title.toLowerCase().replace(/\s+/g, '-')}/details`}
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

//                 {/* WHY CHOOSE OUR COURSES - DYNAMIC */}
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//                     <div className="relative overflow-hidden bg-gradient-to-br from-black/60 to-black/30 border border-[#00B7B3]/20 rounded-3xl p-12">
//                         <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
//                             {pageContent?.whyChooseUsTitle || 'Why Choose Our Vastu Courses?'}
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
//                                 {pageContent?.ctaTitle || 'Ready to Create Harmonious Spaces?'}
//                             </h2>
//                             <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
//                                 {pageContent?.ctaDescription || 'Join our Vastu certification program and transform lives through the power of balanced spaces'}
//                             </p>
//                             <Link href={pageContent?.ctaButtonLink || '/contact'}
//                                 className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#00B7B3] rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl">
//                                 {pageContent?.ctaButtonText || 'Book Free Consultation'}
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

// export default VastuCoursesPage;






// VastuCoursesPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Helmet } from 'react-helmet-async';  // ← CHANGE: react-helmet to react-helmet-async
import { Loader2 } from 'lucide-react';
import { courseAPI, pageContentAPI } from '../../admin/services/api';

// ✅ Add this CSS at the top
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
  
  .intro-content h1, .intro-content h2, .intro-content h3, .intro-content h4 {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .intro-content ul, .intro-content ol {
    margin: 0.8rem 0 0.8rem 1.8rem;
  }
  
  .intro-content img {
    max-width: 100%;
    height: auto;
  }
`;

// SVG Icons Components (keep all your existing icons)
const HomeIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9L12 3L21 9L12 15L3 9Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 12V19H19V12" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 19V15H15V19" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

const CompassIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 3L12 5M12 19L12 21M21 12L19 12M5 12L3 12" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 8L14 10L12 16L10 10L12 8Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

const TempleIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L4 8H20L12 2Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 8V20H18V8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 12H14V20H10V12Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

const DirectionIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L12 22M12 2L8 6M12 2L16 6" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 12L22 12M22 12L18 8M22 12L18 16" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

const BuildingIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="16" height="12" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 4H16V8H8V4Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 12H14M10 16H12" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

const MandalaIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 1L12 4M12 20L12 23M1 12L4 12M20 12L23 12" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

const BalanceIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L12 22M12 2L8 5M12 2L16 5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 12L19 12" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 19L21 19" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

const EnergyIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2L4 14H12L11 22L20 10H12L13 2Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

// Icon mapping for Why Choose Us
const iconMap = {
    CompassIcon: CompassIcon,
    BalanceIcon: BalanceIcon,
    EnergyIcon: EnergyIcon,
    HomeIcon: HomeIcon,
    TempleIcon: TempleIcon,
    DirectionIcon: DirectionIcon,
    BuildingIcon: BuildingIcon,
    MandalaIcon: MandalaIcon
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

const VastuCoursesPage = ({ initialPageContent }) => {
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
                const { data: pageData } = await pageContentAPI.getByType('vastu');
                if (pageData.success && pageData.data) {
                    setPageContent(pageData.data);
                }
            } catch (pageError) {
                if (pageError?.response?.status !== 404) {
                    console.warn('Unable to load vastu page content:', pageError?.message);
                }
                setPageContent(null);
            }
            
            const { data: courseData } = await courseAPI.getAll();
            const vastuCourses = (courseData.courses || []).filter(c => c.category?.includes('VASTU'));
            
            setTotalCourses(vastuCourses.length);
            const startIndex = (currentPage - 1) * coursesPerPage;
            setCourses(vastuCourses.slice(startIndex, startIndex + coursesPerPage));
            setTotalPages(Math.ceil(vastuCourses.length / coursesPerPage));
        } catch (error) {
            console.warn('Unable to load vastu courses:', error?.message);
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
        if (course.title?.toLowerCase().includes('commercial')) return 'Commercial Vastu';
        if (course.title?.toLowerCase().includes('residential')) return 'Residential Vastu';
        if (course.title?.toLowerCase().includes('land')) return 'Land Vastu';
        if (course.title?.toLowerCase().includes('complete')) return 'Vastu Course';
        return 'Vastu Course';
    };

    // ✅ SEO Data from pageContent
    const seoTitle = pageContent?.seoTitle || 'Vastu Courses | Learn Vastu Shastra Online | NB Astro';
    const seoDescription = pageContent?.seoDescription || 'Join best Vastu courses in Noida. Learn Vastu Shastra from expert Naveen Bhagat with practical training and certification. Enroll now!';
    const seoKeywords = pageContent?.seoKeywords || 'vastu course, vastu shastra course, vastu classes online, vastu training noida, learn vastu, vastu certification';
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://nbastro.com/vastu-courses';
    const ogImage = pageContent?.heroImage || 'https://nbastro.com/vastu-og-image.jpg';

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
                {/* HERO SECTION - DYNAMIC */}
                <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
                    <div className="absolute inset-0">
                        <img 
                            src={pageContent?.heroImage || 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'} 
                            alt="Vastu Courses"
                            className="w-full h-full object-cover scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,black_100%)]"></div>
                    </div>
                    <div className="absolute inset-0 overflow-hidden opacity-30">
                        <div className="absolute top-10 left-10 animate-pulse"><CompassIcon /></div>
                        <div className="absolute top-1/3 right-20 animate-spin-slow"><DirectionIcon /></div>
                        <div className="absolute bottom-20 left-1/4 animate-pulse"><HomeIcon /></div>
                    </div>
                    <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-3 p-3 bg-gradient-to-r from-[#00B7B3]/20 to-transparent rounded-full mb-6 backdrop-blur-sm border border-[#00B7B3]/30">
                                <TempleIcon />
                                <span className="text-[#00B7B3] text-sm uppercase tracking-wider font-semibold">
                                    {pageContent?.heroBadgeText || 'Ancient Science of Space Harmony'}
                                </span>
                            </div>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                                {pageContent?.heroTitle || 'Master the Art of'}
                                <span className="text-[#00B7B3] block mt-2">
                                    {pageContent?.heroSubtitle || 'Vastu Shastra'}
                                </span>
                            </h1>
                            <p className="text-gray-300 text-lg max-w-xl leading-relaxed">
                                {pageContent?.heroDescription || 'Learn the ancient wisdom of creating harmonious spaces.'}
                            </p>
                            <div className="flex gap-4 mt-8">
                                <div className="w-16 h-1 bg-[#00B7B3]"></div>
                                <div className="w-8 h-1 bg-[#00B7B3]/50"></div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
                </div>

                {/* INTRO TEXT SECTION - DYNAMIC with proper overflow */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-20">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#00B7B3]/20 to-transparent blur-3xl opacity-20 group-hover:opacity-40"></div>
                        <div className="relative bg-gradient-to-br from-black/80 via-black/60 to-black/80 border border-[#00B7B3]/20 rounded-3xl p-5 sm:p-10 lg:p-12 backdrop-blur-sm overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-[#00B7B3]/5 rounded-full blur-3xl"></div>
                            <div className="flex items-center gap-3 mb-8">
                                <MandalaIcon />
                                <span className="text-[#00B7B3] text-sm uppercase tracking-wider font-semibold">
                                    {pageContent?.introTitle || 'The Science of Directional Energy'}
                                </span>
                            </div>
                            <div 
                                className="intro-content text-gray-300 text-lg leading-relaxed"
                                dangerouslySetInnerHTML={{ 
                                    __html: pageContent?.introContent || 'Vastu Shastra, the ancient Indian science of architecture...'
                                }} 
                            />
                        </div>
                    </div>
                </div>

                {/* COURSES SECTION */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-[#00B7B3]/10 px-4 py-2 rounded-full mb-4">
                            <BuildingIcon />
                            <span className="text-[#00B7B3] text-sm uppercase tracking-wider">Sacred Architecture</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Our <span className="text-[#00B7B3]">Vastu Courses</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Choose your path to become a certified Vastu consultant with our structured learning programs
                        </p>
                        {totalCourses > 0 && (
                            <p className="text-[#00B7B3] text-sm mt-2">Showing {courses.length} of {totalCourses} courses</p>
                        )}
                    </div>

                    {courses.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-gray-400 text-lg">No Vastu courses available at the moment.</p>
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
                                                <img src={course.image ? `${course.image}` : 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'} 
                                                    alt={course.title} 
                                                    className="w-full h-[280px] md:h-[350px] object-cover group-hover:scale-110 transition-transform duration-700" 
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
                                                    }}
                                                />
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
                                                {stripHtml(course.whatIs || course.aboutCourse) || 'Discover the ancient wisdom of Vastu Shastra.'}
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
                                            <div className="grid grid-cols-2 gap-2 pt-4 w-full">
                                                <Link href={`/courses/${course.slug || course.title.toLowerCase().replace(/\s+/g, '-')}/book`}
                                                    className="group/btn px-1 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-lg font-semibold hover:shadow-lg flex items-center justify-center gap-1 text-[11px] sm:text-sm text-center">
                                                    BOOK A SEAT
                                                    <svg className="hidden sm:inline-block w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </Link>
                                                <Link href={`/courses/${course.slug || course.title.toLowerCase().replace(/\s+/g, '-')}/details`}
                                                    className="px-1 sm:px-8 py-2.5 sm:py-3 border-2 border-[#00B7B3] text-[#00B7B3] rounded-lg font-semibold hover:bg-[#00B7B3]/10 text-[11px] sm:text-sm text-center">
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

                {/* WHY CHOOSE OUR COURSES - DYNAMIC */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    <div className="relative overflow-hidden bg-gradient-to-br from-black/60 to-black/30 border border-[#00B7B3]/20 rounded-3xl p-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                            {pageContent?.whyChooseUsTitle || 'Why Choose Our Vastu Courses?'}
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
                                {pageContent?.ctaTitle || 'Ready to Create Harmonious Spaces?'}
                            </h2>
                            <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
                                {pageContent?.ctaDescription || 'Join our Vastu certification program and transform lives through the power of balanced spaces'}
                            </p>
                            <Link href={pageContent?.ctaButtonLink || '/contact'}
                                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-[#00B7B3] rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-xl text-xs sm:text-base">
                                {pageContent?.ctaButtonText || 'Book Free Consultation'}
                                <svg className="hidden sm:inline-block w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

export default VastuCoursesPage;
