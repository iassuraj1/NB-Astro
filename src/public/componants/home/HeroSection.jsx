// import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const HeroSection = () => {
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const [progress, setProgress] = useState(0);
//     const [slides, setSlides] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [imagesLoaded, setImagesLoaded] = useState({});
//     const navigate = useNavigate();
//     const slideTimerRef = useRef(null);
//     const progressIntervalRef = useRef(null);
    
//     const SLIDE_DURATION = 6000;
//     const TEAL_COLOR = "#00B7B3";
//     const API_BASE_URL = '';

//     // SVG Icons as components
//     const StarIcon = useMemo(() => () => (
//         <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#00B7B3" strokeWidth="1.5" fill="none"/>
//             <circle cx="12" cy="12" r="2" stroke="#00B7B3" strokeWidth="1.5" fill="none"/>
//         </svg>
//     ), []);

//     const CrystalBallIcon = useMemo(() => () => (
//         <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <circle cx="12" cy="12" r="8" stroke="#00B7B3" strokeWidth="1.5"/>
//             <path d="M12 4L12 6M12 18L12 20M20 12L18 12M6 12L4 12" stroke="#00B7B3" strokeWidth="1.5" strokeLinecap="round"/>
//             <path d="M12 8L14 10L12 16L10 10L12 8Z" stroke="#00B7B3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//         </svg>
//     ), []);

//     const HomeIcon = useMemo(() => () => (
//         <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M3 9.5L12 4L21 9.5V20C21 20.5 20.5 21 20 21H4C3.5 21 3 20.5 3 20V9.5Z" stroke="#00B7B3" strokeWidth="1.5" fill="none"/>
//             <path d="M8 21V12H16V21" stroke="#00B7B3" strokeWidth="1.5" fill="none"/>
//             <path d="M12 7V9" stroke="#00B7B3" strokeWidth="1.5" strokeLinecap="round"/>
//         </svg>
//     ), []);

//     const HeartIcon = useMemo(() => () => (
//         <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M12 21C12 21 4 15 4 9C4 5.5 7 3 10 3C12 3 12 4 12 4C12 4 12 3 14 3C17 3 20 5.5 20 9C20 15 12 21 12 21Z" stroke="#00B7B3" strokeWidth="1.5" fill="none"/>
//             <circle cx="12" cy="9" r="1" stroke="#00B7B3" strokeWidth="1.5"/>
//         </svg>
//     ), []);

//     const ArrowIcon = useMemo(() => () => (
//         <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M4.16666 10H15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
//             <path d="M10.8333 5L15.8333 10L10.8333 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//         </svg>
//     ), []);

//     const ChevronLeftIcon = useMemo(() => () => (
//         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//         </svg>
//     ), []);

//     const ChevronRightIcon = useMemo(() => () => (
//         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//         </svg>
//     ), []);

//     const BackgroundStarIcon = useMemo(() => () => (
//         <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#00B7B3" stroke="#00B7B3" strokeWidth="1"/>
//         </svg>
//     ), []);

//     // Map icon string to component
//     const getIconComponent = useCallback((iconName) => {
//         switch(iconName) {
//             case 'StarIcon':
//                 return StarIcon;
//             case 'CrystalBallIcon':
//                 return CrystalBallIcon;
//             case 'HomeIcon':
//                 return HomeIcon;
//             case 'HeartIcon':
//                 return HeartIcon;
//             default:
//                 return StarIcon;
//         }
//     }, [StarIcon, CrystalBallIcon, HomeIcon, HeartIcon]);

//     // Fetch slides from API
//     useEffect(() => {
//         fetchSlides();
//     }, []);

//     const fetchSlides = async () => {
//         try {
//             setLoading(true);
//             const response = await fetch(`${API_BASE_URL}/api/home/hero-slides`);
//             const result = await response.json();
            
//             console.log('Hero slides fetched:', result);
            
//             if (result.success && result.data) {
//                 // Filter only active slides and sort by order
//                 const activeSlides = result.data
//                     .filter(slide => slide.isActive === true)
//                     .sort((a, b) => a.order - b.order);
                
//                 // Transform slides data with icon components
//                 const transformedSlides = activeSlides.map((slide, index) => ({
//                     id: slide._id,
//                     image: slide.image,
//                     mobileImage: slide.mobileImage,
//                     title: slide.title,
//                     highlight: slide.highlight,
//                     description: slide.description,
//                     icon: getIconComponent(slide.icon),
//                     link: slide.link,
//                     order: slide.order
//                 }));
                
//                 setSlides(transformedSlides);
//             }
//         } catch (error) {
//             console.error('Error fetching hero slides:', error);
//             // Fallback to empty array
//             setSlides([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Preload images
//     useEffect(() => {
//         if (slides.length === 0) return;
        
//         slides.forEach((slide, index) => {
//             const img = new Image();
//             img.src = slide.image;
//             img.onload = () => {
//                 setImagesLoaded(prev => ({ ...prev, [index]: true }));
//             };
//             // Also preload mobile image
//             const mobileImg = new Image();
//             mobileImg.src = slide.mobileImage;
//         });
//     }, [slides]);

//     // Clean up timers
//     useEffect(() => {
//         return () => {
//             if (slideTimerRef.current) clearTimeout(slideTimerRef.current);
//             if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
//         };
//     }, []);

//     // Auto carousel with cleanup
//     useEffect(() => {
//         if (slides.length === 0) return;
        
//         slideTimerRef.current = setTimeout(() => {
//             setCurrentSlide((prev) => (prev + 1) % slides.length);
//         }, SLIDE_DURATION);

//         return () => {
//             if (slideTimerRef.current) clearTimeout(slideTimerRef.current);
//         };
//     }, [currentSlide, slides.length]);

//     // Progress bar with cleanup
//     useEffect(() => {
//         if (slides.length === 0) return;
        
//         setProgress(0);
//         progressIntervalRef.current = setInterval(() => {
//             setProgress((p) => (p >= 100 ? 100 : p + 1));
//         }, SLIDE_DURATION / 100);

//         return () => {
//             if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
//         };
//     }, [currentSlide, slides.length]);

//     // Memoized navigation handlers
//     const goToSlide = useCallback((index) => {
//         setCurrentSlide(index);
//     }, []);

//     const nextSlide = useCallback(() => {
//         if (slides.length === 0) return;
//         setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, [slides.length]);

//     const prevSlide = useCallback(() => {
//         if (slides.length === 0) return;
//         setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//     }, [slides.length]);

//     const handleNavigation = useCallback((path) => {
//         navigate(path);
//     }, [navigate]);

//     // Optimized star generation
//     const stars = useMemo(() => {
//         const starCount = typeof window !== 'undefined' && window.innerWidth < 768 ? 30 : 50;
//         return [...Array(starCount)].map((_, i) => {
//             const sizes = [6, 8, 10];
//             const size = sizes[Math.floor(Math.random() * sizes.length)];
//             const baseOpacity = 0.1 + Math.random() * 0.3;
//             const durations = [8, 10, 12, 14];
//             const duration = durations[Math.floor(Math.random() * durations.length)];
            
//             return {
//                 id: i,
//                 top: `${Math.random() * 100}%`,
//                 left: `${Math.random() * 100}%`,
//                 width: `${size}px`,
//                 height: `${size}px`,
//                 duration: `${duration}s`,
//                 delay: `${Math.random() * 10}s`,
//                 opacity: baseOpacity,
//             };
//         });
//     }, []);

//     // Memoized slide variants
//     const slideVariants = useMemo(() => ({
//         initial: { opacity: 0, scale: 1.05 },
//         animate: {
//             opacity: 1,
//             scale: 1,
//             transition: { duration: 1.2, ease: "easeOut" }
//         },
//         exit: {
//             opacity: 0,
//             scale: 1.05,
//             transition: { duration: 0.8, ease: "easeIn" }
//         }
//     }), []);

//     const textVariants = useMemo(() => ({
//         initial: { opacity: 0, y: 30 },
//         animate: { opacity: 1, y: 0 },
//         exit: { opacity: 0, y: -30 }
//     }), []);

//     // Add CSS to head for animations
//     useEffect(() => {
//         const style = document.createElement('style');
//         style.textContent = `
//             @keyframes twinkleNatural {
//                 0%, 100% { opacity: 0.1; transform: scale(0.8); }
//                 50% { opacity: 0.5; transform: scale(1); }
//             }
            
//             .star-natural {
//                 animation: twinkleNatural 60s ease-in-out infinite;
//                 display: inline-block;
//                 will-change: opacity, transform;
//             }
            
//             .star-natural svg {
//                 width: 100%;
//                 height: 100%;
//             }
//         `;
//         document.head.appendChild(style);
        
//         return () => {
//             document.head.removeChild(style);
//         };
//     }, []);

//     // Loading state
//     if (loading) {
//         return (
//             <section className="relative h-[60vh] min-h-[550px] w-full overflow-hidden bg-black flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B7B3]"></div>
//             </section>
//         );
//     }

//     // No slides available
//     if (slides.length === 0) {
//         return (
//             <section className="relative h-[60vh] min-h-[550px] w-full overflow-hidden bg-black flex items-center justify-center">
//                 <div className="text-center text-white">
//                     <p className="text-gray-400">No slides available</p>
//                 </div>
//             </section>
//         );
//     }

//     return (
//         <section className="relative h-[60vh] min-h-[550px] w-full overflow-hidden bg-black">
//             <AnimatePresence mode="wait">
//                 <motion.div
//                     key={slides[currentSlide].id}
//                     variants={slideVariants}
//                     initial="initial"
//                     animate="animate"
//                     exit="exit"
//                     className="absolute inset-0"
//                 >
//                     <motion.div
//                         className="absolute inset-0 will-change-transform"
//                         initial={{ scale: 1 }}
//                         animate={{ scale: 1.1 }}
//                         transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
//                     >
//                         <picture>
//                             <source 
//                                 media="(max-width: 768px)" 
//                                 srcSet={slides[currentSlide].mobileImage}
//                             />
//                             <img
//                                 src={slides[currentSlide].image}
//                                 alt={slides[currentSlide].highlight}
//                                 className="w-full h-full object-cover"
//                                 loading={currentSlide === 0 ? "eager" : "lazy"}
//                                 fetchPriority={currentSlide === 0 ? "high" : "low"}
//                             />
//                         </picture>
//                     </motion.div>

//                     <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
//                     <div className="absolute inset-0">
//                         {stars.map((star) => (
//                             <div
//                                 key={star.id}
//                                 className="absolute star-natural"
//                                 style={{
//                                     top: star.top,
//                                     left: star.left,
//                                     width: star.width,
//                                     height: star.height,
//                                     animationDuration: star.duration,
//                                     animationDelay: star.delay,
//                                     opacity: star.opacity,
//                                 }}
//                             >
//                                 <BackgroundStarIcon />
//                             </div>
//                         ))}
//                     </div>
//                 </motion.div>
//             </AnimatePresence>

//             <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
//                 <div className="max-w-2xl text-white">
//                     <div className="mb-6">
//                         <div className="h-[2px] w-28 bg-white/20">
//                             <motion.div
//                                 className="h-full"
//                                 animate={{ width: `${progress}%` }}
//                                 style={{ backgroundColor: TEAL_COLOR }}
//                                 transition={{ duration: 0.1 }}
//                             />
//                         </div>
//                     </div>

//                     <motion.div
//                         key={`icon-${currentSlide}`}
//                         initial={{ opacity: 0, scale: 0.5 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.5 }}
//                         className="inline-block p-3 bg-gradient-to-br from-[#00B7B3]/20 to-transparent rounded-2xl mb-4 border border-[#00B7B3]/30"
//                     >
//                         <div className="w-8 h-8 text-[#00B7B3]">
//                             {slides[currentSlide].icon()}
//                         </div>
//                     </motion.div>

//                     <motion.span
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.6 }}
//                         className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00B7B3]/10 backdrop-blur-sm border border-[#00B7B3]/30 text-[#00B7B3] text-xs mb-4 tracking-wider"
//                     >
//                         <BackgroundStarIcon />
//                         <span>✦ Naveen Bhagat Ji ✦</span>
//                     </motion.span>

//                     <AnimatePresence mode="wait">
//                         <motion.div
//                             key={slides[currentSlide].title}
//                             variants={textVariants}
//                             initial="initial"
//                             animate="animate"
//                             exit="exit"
//                             transition={{ duration: 0.8 }}
//                         >
//                             <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
//                                 <span className="text-white">{slides[currentSlide].title}</span>
//                                 <br />
//                                 <span className="bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] bg-clip-text text-transparent">
//                                     {slides[currentSlide].highlight}
//                                 </span>
//                             </h1>
//                         </motion.div>
//                     </AnimatePresence>

//                     <AnimatePresence mode="wait">
//                         <motion.p
//                             key={slides[currentSlide].description}
//                             variants={textVariants}
//                             initial="initial"
//                             animate="animate"
//                             exit="exit"
//                             transition={{ duration: 0.8, delay: 0.2 }}
//                             className="mt-4 text-sm lg:text-base text-gray-300 max-w-xl font-light leading-relaxed"
//                         >
//                             {slides[currentSlide].description}
//                         </motion.p>
//                     </AnimatePresence>

//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8, delay: 0.4 }}
//                         className="mt-8 flex flex-col sm:flex-row gap-4"
//                     >
//                         <button
//                             onClick={() => handleNavigation(slides[currentSlide].link)}
//                             className="group px-6 py-3 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-full font-semibold hover:shadow-lg hover:shadow-[#00B7B3]/30 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
//                         >
//                             Book Consultation
//                             <span className="group-hover:translate-x-1 transition-transform">
//                                 <ArrowIcon />
//                             </span>
//                         </button>
//                         <button
//                             onClick={() => handleNavigation('/about')}
//                             className="px-6 py-3 border-2 border-[#00B7B3] text-[#00B7B3] rounded-full font-semibold hover:bg-[#00B7B3]/10 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm backdrop-blur-sm"
//                         >
//                             Know More
//                         </button>
//                     </motion.div>
//                 </div>
//             </div>

//             <button
//                 onClick={prevSlide}
//                 className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-[#00B7B3]/30 text-[#00B7B3] hover:bg-[#00B7B3] hover:text-black transition-all duration-300 flex items-center justify-center z-20 group"
//                 aria-label="Previous slide"
//             >
//                 <ChevronLeftIcon />
//             </button>
//             <button
//                 onClick={nextSlide}
//                 className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-[#00B7B3]/30 text-[#00B7B3] hover:bg-[#00B7B3] hover:text-black transition-all duration-300 flex items-center justify-center z-20 group"
//                 aria-label="Next slide"
//             >
//                 <ChevronRightIcon />
//             </button>

//             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
//                 {slides.map((_, index) => (
//                     <button
//                         key={index}
//                         onClick={() => goToSlide(index)}
//                         className={`transition-all duration-300 ${
//                             index === currentSlide
//                                 ? 'w-8 h-2 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] rounded-full'
//                                 : 'w-2 h-2 bg-[#00B7B3]/30 rounded-full hover:bg-[#00B7B3]/50'
//                         }`}
//                         aria-label={`Go to slide ${index + 1}`}
//                     />
//                 ))}
//             </div>

//             <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />

//             <div className="absolute bottom-4 left-4 text-[10px] text-white/40 tracking-[0.3em] uppercase z-10 font-light">
//                 NB Astro — Cosmic Guidance
//             </div>
//         </section>
//     );
// };

// export default React.memo(HeroSection);


import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [progress, setProgress] = useState(0);
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [, setImagesLoaded] = useState({});
    const router = useRouter();
    const navigate = useCallback((target) => router.push(target), [router]);
    const slideTimerRef = useRef(null);
    const progressIntervalRef = useRef(null);
    
    const SLIDE_DURATION = 6000;
    const TEAL_COLOR = "#00B7B3";
    
    // Dynamic API URL - works for both local and production
    const getApiUrl = () => {
        // If running on localhost frontend, use localhost backend
        if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
            return '';
        }
        // For production, use relative URL (same domain)
        return '';
    };
    
    const API_BASE_URL = getApiUrl();

    // SVG Icons as components
    const StarIcon = useMemo(() => () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#00B7B3" strokeWidth="1.5" fill="none"/>
        </svg>
    ), []);

    const CrystalBallIcon = useMemo(() => () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V16c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z" stroke="#00B7B3" strokeWidth="1.5" fill="none"/>
            <path d="M10 18h4v2h-4z" stroke="#00B7B3" strokeWidth="1.5" fill="none"/>
            <circle cx="12" cy="9" r="2" stroke="#00B7B3" strokeWidth="1.5" fill="none"/>
        </svg>
    ), []);

    const HomeIcon = useMemo(() => () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9.5L12 4L21 9.5V20C21 20.5 20.5 21 20 21H4C3.5 21 3 20.5 3 20V9.5Z" stroke="#00B7B3" strokeWidth="1.5" fill="none"/>
            <path d="M8 21V12H16V21" stroke="#00B7B3" strokeWidth="1.5" fill="none"/>
        </svg>
    ), []);

    const HeartIcon = useMemo(() => () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21C12 21 4 15 4 9C4 5.5 7 3 10 3C12 3 12 4 12 4C12 4 12 3 14 3C17 3 20 5.5 20 9C20 15 12 21 12 21Z" stroke="#00B7B3" strokeWidth="1.5" fill="none"/>
        </svg>
    ), []);

    const ArrowIcon = useMemo(() => () => (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.16666 10H15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M10.8333 5L15.8333 10L10.8333 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ), []);

    const ChevronLeftIcon = useMemo(() => () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ), []);

    const ChevronRightIcon = useMemo(() => () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    ), []);

    // Map icon string to component
    const getIconComponent = useCallback((iconName) => {
        switch(iconName) {
            case 'StarIcon':
                return StarIcon;
            case 'CrystalBallIcon':
                return CrystalBallIcon;
            case 'HomeIcon':
                return HomeIcon;
            case 'HeartIcon':
                return HeartIcon;
            default:
                return StarIcon;
        }
    }, [StarIcon, CrystalBallIcon, HomeIcon, HeartIcon]);

    // Helper function to get full image URL
    const getFullImageUrl = useCallback((imagePath) => {
        if (!imagePath) return '';
        // If it's already a full URL (starts with http), return as is
        if (imagePath.startsWith('http')) {
            return imagePath;
        }
        // If it's a relative path, add base URL
        if (imagePath.startsWith('/uploads/')) {
            return `${API_BASE_URL}${imagePath}`;
        }
        // Otherwise, assume it's a relative path
        return `${API_BASE_URL}/${imagePath}`;
    }, [API_BASE_URL]);

    const fetchSlides = useCallback(async () => {
        try {
            setLoading(true);
            const url = `${API_BASE_URL}/api/home/hero-slides?withDefaults=true`;
            console.log('Fetching from:', url);
            
            const response = await fetch(url);
            const result = await response.json();
            
            console.log('Hero slides fetched:', result);
            
            if (result.success && result.data) {
                // Filter only active slides and sort by order
                const activeSlides = result.data
                    .filter(slide => slide.isActive !== false)
                    .sort((a, b) => (a.order || 0) - (b.order || 0));

                // Transform slides data with icon components and full image URLs
                const transformedSlides = activeSlides.map((slide) => ({
                    id: slide._id || slide.id,
                    image: getFullImageUrl(slide.image),
                    mobileImage: getFullImageUrl(slide.mobileImage),
                    title: slide.title,
                    highlight: slide.highlight,
                    description: slide.description,
                    icon: getIconComponent(slide.icon),
                    link: slide.link,
                    order: slide.order
                }));
                
                console.log('Transformed slides with URLs:', transformedSlides);
                setSlides(transformedSlides);
            } else {
                setSlides([]);
            }
        } catch (error) {
            console.error('Error fetching hero slides:', error);
            setSlides([]);
        } finally {
            setLoading(false);
        }
    }, [API_BASE_URL, getFullImageUrl, getIconComponent]);

    // Fetch slides from API
    useEffect(() => {
        fetchSlides();
    }, [fetchSlides]);

    // Preload images
    useEffect(() => {
        if (slides.length === 0) return;
        
        slides.forEach((slide, index) => {
            if (slide.image) {
                const img = new Image();
                img.src = slide.image;
                img.onload = () => {
                    setImagesLoaded(prev => ({ ...prev, [index]: true }));
                };
            }
            if (slide.mobileImage) {
                const mobileImg = new Image();
                mobileImg.src = slide.mobileImage;
            }
        });
    }, [slides]);

    // Clean up timers
    useEffect(() => {
        return () => {
            if (slideTimerRef.current) clearTimeout(slideTimerRef.current);
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        };
    }, []);

    // Auto carousel with cleanup
    useEffect(() => {
        if (slides.length === 0) return;
        
        slideTimerRef.current = setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, SLIDE_DURATION);

        return () => {
            if (slideTimerRef.current) clearTimeout(slideTimerRef.current);
        };
    }, [currentSlide, slides.length]);

    // Progress bar with cleanup
    useEffect(() => {
        if (slides.length === 0) return;
        
        setProgress(0);
        progressIntervalRef.current = setInterval(() => {
            setProgress((p) => (p >= 100 ? 100 : p + 1));
        }, SLIDE_DURATION / 100);

        return () => {
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        };
    }, [currentSlide, slides.length]);

    // Memoized navigation handlers
    const goToSlide = useCallback((index) => {
        setCurrentSlide(index);
    }, []);

    const nextSlide = useCallback(() => {
        if (slides.length === 0) return;
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        if (slides.length === 0) return;
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

    const handleNavigation = useCallback((path) => {
        navigate(path);
    }, [navigate]);

    // Memoized slide variants
    const slideVariants = useMemo(() => ({
        initial: { opacity: 0, scale: 1.05 },
        animate: {
            opacity: 1,
            scale: 1,
            transition: { duration: 1.2, ease: "easeOut" }
        },
        exit: {
            opacity: 0,
            scale: 1.05,
            transition: { duration: 0.8, ease: "easeIn" }
        }
    }), []);

    const textVariants = useMemo(() => ({
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -30 }
    }), []);

    // Loading state
    if (loading) {
        return (
            <section className="relative h-[60vh] min-h-[550px] w-full overflow-hidden bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B7B3]"></div>
            </section>
        );
    }

    // No slides available
    if (slides.length === 0) {
        return (
            <section className="relative h-[60vh] min-h-[550px] w-full overflow-hidden bg-black flex items-center justify-center">
                <div className="text-center text-white">
                    <p className="text-gray-400">No slides available</p>
                </div>
            </section>
        );
    }

    return (
        <section className="relative h-[60vh] min-h-[550px] w-full overflow-hidden bg-black">
            <AnimatePresence mode="wait">
                <motion.div
                    key={slides[currentSlide].id}
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0"
                >
                    <motion.div
                        className="absolute inset-0 will-change-transform"
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.1 }}
                        transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                    >
                        <picture>
                            <source 
                                media="(max-width: 768px)" 
                                srcSet={slides[currentSlide].mobileImage}
                            />
                            <img
                                src={slides[currentSlide].image}
                                alt={slides[currentSlide].highlight}
                                className="w-full h-full object-cover"
                                loading={currentSlide === 0 ? "eager" : "lazy"}
                                fetchPriority={currentSlide === 0 ? "high" : "low"}
                                onError={(e) => {
                                    console.error('Image failed to load:', slides[currentSlide].image);
                                    e.target.src = 'https://via.placeholder.com/1920x1080?text=Image+Not+Found';
                                }}
                            />
                        </picture>
                    </motion.div>

                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-20 left-10 w-1 h-1 bg-white rounded-full animate-pulse" />
                        <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-100" />
                        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-200" />
                        <div className="absolute top-60 left-1/3 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-300" />
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="max-w-2xl text-white">
                    <div className="mb-6">
                        <div className="h-[2px] w-28 bg-white/20">
                            <motion.div
                                className="h-full"
                                animate={{ width: `${progress}%` }}
                                style={{ backgroundColor: TEAL_COLOR }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>
                    </div>

                    <motion.div
                        key={`icon-${currentSlide}`}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block p-2.5 bg-[#00B7B3]/10 rounded-full mb-3"
                    >
                        <div className="w-7 h-7 text-[#00B7B3] animate-pulse">
                            {slides[currentSlide].icon()}
                        </div>
                    </motion.div>

                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block px-3 py-1 rounded-full border border-[#00B7B3]/30 text-[#00B7B3] text-xs mb-3 tracking-wider"
                    >
                        <span>✦ Naveen Bhagat Ji ✦</span>
                    </motion.span>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={slides[currentSlide].title}
                            variants={textVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                                <span className="text-white">{slides[currentSlide].title}</span>
                                <br />
                                <span className="bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] bg-clip-text text-transparent">
                                    {slides[currentSlide].highlight}
                                </span>
                            </h1>
                        </motion.div>
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                        <motion.p
                            key={slides[currentSlide].description}
                            variants={textVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mt-3 text-sm lg:text-base text-gray-300 max-w-xl font-light leading-relaxed"
                        >
                            {slides[currentSlide].description}
                        </motion.p>
                    </AnimatePresence>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-6 flex flex-col sm:flex-row gap-3"
                    >
                        <button
                            onClick={() => handleNavigation(slides[currentSlide].link)}
                            className="group px-5 py-2.5 bg-[#00B7B3] text-black rounded-full font-semibold hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-xs md:text-sm"
                        >
                            Book Consultation
                            <span className="group-hover:translate-x-1 transition-transform">
                                <ArrowIcon />
                            </span>
                        </button>
                        <button
                            onClick={() => handleNavigation('/about')}
                            className="px-5 py-2.5 border-2 border-[#00B7B3] text-[#00B7B3] rounded-full font-semibold hover:bg-[#00B7B3]/10 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-xs md:text-sm"
                        >
                            Know More
                        </button>
                    </motion.div>
                </div>
            </div>

            <button
                onClick={prevSlide}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/50 border border-[#00B7B3]/30 text-[#00B7B3] hover:bg-[#00B7B3] hover:text-black transition-all duration-300 flex items-center justify-center z-20 group"
                aria-label="Previous slide"
            >
                <ChevronLeftIcon />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full bg-black/50 border border-[#00B7B3]/30 text-[#00B7B3] hover:bg-[#00B7B3] hover:text-black transition-all duration-300 flex items-center justify-center z-20 group"
                aria-label="Next slide"
            >
                <ChevronRightIcon />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all duration-300 ${
                            index === currentSlide
                                ? 'w-8 h-1.5 bg-[#00B7B3] rounded-full'
                                : 'w-1.5 h-1.5 bg-[#00B7B3]/30 rounded-full hover:bg-[#00B7B3]/50'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none" />

            <div className="absolute bottom-3 left-3 text-[10px] text-white/50 tracking-[0.3em] uppercase z-10">
                NB Astro — Cosmic Guidance
            </div>
        </section>
    );
};

export default React.memo(HeroSection);
