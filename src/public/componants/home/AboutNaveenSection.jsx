



import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ServicesMarquee from './ServicesMarquee';

const AboutNaveenSection = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = '';

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      setLoading(true);
      // Direct fetch to backend API
      const response = await fetch(`${API_BASE_URL}/api/home/about-section`);
      const result = await response.json();
      console.log('About data fetched:', result);
      
      if (result.success && result.data) {
        setAboutData(result.data);
      } else {
        // Fallback data if API returns empty
        setAboutData({
          name: 'Naveen Bhagat',
          title: 'Vedic Astrologer & Vastu Consultant',
          description: 'Naveen Bhagat Ji is a renowned astrologer and vastu consultant who has helped thousands of people find solutions to their life problems through Vedic astrology and ancient vastu principles.',
          experience: 10,
          clients: 7000,
          satisfaction: 100,
          principles: ['Vedic Accuracy', 'Compassionate Guidance', 'Client Privacy', 'Ethical Practices', 'Timely Solutions', 'Spiritual Integrity'],
          quote: 'With a deep understanding of planetary positions and their effects on human life, I provide personalized solutions that bring positive changes in my clients\' lives.',
          image: null
        });
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
      // Fallback data on error
      setAboutData({
        name: 'Naveen Bhagat',
        title: 'Vedic Astrologer & Vastu Consultant',
        description: 'Naveen Bhagat Ji is a renowned astrologer and vastu consultant who has helped thousands of people find solutions to their life problems through Vedic astrology and ancient vastu principles.',
        experience: 10,
        clients: 7000,
        satisfaction: 100,
        principles: ['Vedic Accuracy', 'Compassionate Guidance', 'Client Privacy', 'Ethical Practices', 'Timely Solutions', 'Spiritual Integrity'],
        quote: 'With a deep understanding of planetary positions and their effects on human life, I provide personalized solutions that bring positive changes in my clients\' lives.',
        image: null
      });
    } finally {
      setLoading(false);
    }
  };

  // Framer Motion variants
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay,
        ease: "easeOut",
      },
    }),
  };

  // Default image URLs
  const defaultImageUrl = "https://www.nbastro.com/attachments/pages_images/1766729644765_(1)1.png";
  const fallbackImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80";

  // Get image URL from API or use default
  const getImageUrl = () => {
    if (aboutData?.image) {
      return `${API_BASE_URL}${aboutData.image}`;
    }
    return defaultImageUrl;
  };

  // SVG Icons as components
  const CrystalBallIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V16c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z" stroke="#00B7B3" strokeWidth="1.5" fill="none"/>
      <path d="M10 18h4v2h-4z" stroke="#00B7B3" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="9" r="2" stroke="#00B7B3" strokeWidth="1.5" fill="none"/>
    </svg>
  );

  const StarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#00B7B3" strokeWidth="1.5" fill="none"/>
    </svg>
  );

  const ExperienceIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="8" r="4" stroke="#00B7B3" strokeWidth="1.5"/>
      <path d="M5 18v2h14v-2c0-2.8-2.2-5-5-5h-4c-2.8 0-5 2.2-5 5z" stroke="#00B7B3" strokeWidth="1.5"/>
      <path d="M16 4l2 2 4-4" stroke="#00B7B3" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  const ClientsIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="8" r="4" stroke="#00B7B3" strokeWidth="1.5"/>
      <circle cx="15" cy="8" r="4" stroke="#00B7B3" strokeWidth="1.5"/>
      <path d="M3 18v2h12v-2c0-2.8-2.2-5-5-5H8c-2.8 0-5 2.2-5 5z" stroke="#00B7B3" strokeWidth="1.5"/>
      <path d="M17 16c2.8 0 5 2.2 5 5v1h-5" stroke="#00B7B3" strokeWidth="1.5"/>
    </svg>
  );

  const SatisfactionIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="#00B7B3" strokeWidth="1.5"/>
      <path d="M8 14c.5 1.5 2 2.5 4 2.5s3.5-1 4-2.5" stroke="#00B7B3" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="9" cy="9" r="1" fill="#00B7B3"/>
      <circle cx="15" cy="9" r="1" fill="#00B7B3"/>
    </svg>
  );

  const GuidingPrincipleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="3" stroke="#00B7B3" strokeWidth="1.5"/>
      <path d="M8 2L10 5H6L8 2Z" stroke="#00B7B3" strokeWidth="1.5"/>
      <path d="M8 14L6 11H10L8 14Z" stroke="#00B7B3" strokeWidth="1.5"/>
    </svg>
  );

  const QuoteIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 11H6V7H10V11Z" stroke="#00B7B3" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M18 11H14V7H18V11Z" stroke="#00B7B3" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M4 17L8 13" stroke="#00B7B3" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 17L16 13" stroke="#00B7B3" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  if (loading) {
    return (
      <section className="relative bg-[#0f141c] text-white py-20 overflow-hidden">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B7B3]"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-[#0f141c] text-white pb-20 overflow-hidden">
      {/* Services Marquee at the top */}
      <div className="mb-16">
        <ServicesMarquee />
      </div>
      
      {/* Background Glow Effects */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-teal-500/20 rounded-full blur-[120px]" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-cyan-400/10 rounded-full blur-[100px]" />
      
      {/* Decorative Stars Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-[10%] w-1 h-1 bg-white rounded-full animate-pulse" />
        <div className="absolute top-40 right-[20%] w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-100" />
        <div className="absolute bottom-32 left-[25%] w-1 h-1 bg-white rounded-full animate-pulse delay-200" />
        <div className="absolute top-60 left-[33%] w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-300" />
        <div className="absolute bottom-20 right-[15%] w-1 h-1 bg-white rounded-full animate-pulse delay-150" />
        <div className="absolute top-1/2 left-[60%] w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-400" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* LEFT – PREMIUM CONTENT */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="order-2 lg:order-1 relative z-50 py-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#00B7B3]/10 flex items-center justify-center border border-[#00B7B3]/20">
                <CrystalBallIcon />
              </div>
              <span className="text-[#00B7B3] text-sm uppercase tracking-wider font-semibold">
                About {aboutData?.name || 'Naveen Bhagat Ji'}
              </span>
            </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                  Master Astrologer with{' '}
                  <span className="bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] bg-clip-text text-transparent">
                    {aboutData?.experience || 10}+ Years
                  </span>
                  <br />of Experience
                </h2>

                <div className="space-y-4 text-gray-300 leading-relaxed mb-8">
                  <p className="text-lg">
                    <span className="text-[#00B7B3] font-semibold">{aboutData?.name || 'Naveen Bhagat Ji'}</span> {aboutData?.description}
                  </p>
                  
                  <div className="flex gap-3 mt-6 p-5 bg-white/5 rounded-xl border-l-4 border-[#00B7B3]">
                    <div className="flex-shrink-0 mt-1">
                      <QuoteIcon />
                    </div>
                    <p className="italic text-gray-200 text-sm md:text-base">
                      "{aboutData?.quote}"
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 rounded-xl p-4 text-center border border-white/10 hover:border-[#00B7B3]/30 transition-all duration-300"
                  >
                    <div className="flex justify-center mb-2 text-[#00B7B3]">
                      <ExperienceIcon />
                    </div>
                    <span className="text-xl md:text-2xl font-bold text-[#00B7B3] block">{aboutData?.experience || 10}+</span>
                    <span className="text-xs text-gray-400">Years Experience</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white/5 rounded-xl p-4 text-center border border-white/10 hover:border-[#00B7B3]/30 transition-all duration-300"
                  >
                    <div className="flex justify-center mb-2 text-[#00B7B3]">
                      <ClientsIcon />
                    </div>
                    <span className="text-xl md:text-2xl font-bold text-[#00B7B3] block">{aboutData?.clients || 7000}+</span>
                    <span className="text-xs text-gray-400">Happy Clients</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                    className="bg-white/5 rounded-xl p-4 text-center border border-white/10 hover:border-[#00B7B3]/30 transition-all duration-300"
                  >
                    <div className="flex justify-center mb-2 text-[#00B7B3]">
                      <SatisfactionIcon />
                    </div>
                    <span className="text-xl md:text-2xl font-bold text-[#00B7B3] block">{aboutData?.satisfaction || 100}%</span>
                    <span className="text-xs text-gray-400">Satisfaction</span>
                  </motion.div>
                </div>

                <div className="mb-10">
                  <h3 className="text-lg font-semibold mb-5 text-[#00B7B3] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#00B7B3] rounded-full"></span>
                    GUIDING PRINCIPLES
                    <span className="w-1.5 h-1.5 bg-[#00B7B3] rounded-full"></span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(aboutData?.principles || []).map((item, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-gray-200 bg-white/5 rounded-lg px-3 py-2 border border-white/5 hover:border-[#00B7B3]/20 transition-all duration-300"
                      >
                        <GuidingPrincipleIcon />
                        <span className="text-sm">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#00B7B3] px-8 py-4 text-black font-semibold hover:bg-[#00C2BE] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,183,179,0.3)]"
                >
                  Read Full Story 
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-2 transition-transform">
                    <path d="M4.16666 10H15.8333" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M10.8333 5L15.8333 10L10.8333 15" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
          </motion.div>

          {/* RIGHT – IMAGE */}
          <motion.div
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="order-1 lg:order-2 md:pt-50"
          >
            <div className="relative h-[500px] md:h-[750px] rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src={getImageUrl()}
                alt={aboutData?.name || 'Naveen Bhagat Ji'}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = fallbackImage;
                }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-3 bg-black/60 backdrop-blur-sm border border-[#00B7B3]/30 rounded-full px-5 py-2.5 mb-4"
                >
                  <StarIcon />
                  <div>
                    <div className="text-white font-bold">{aboutData?.experience || 10}+ Years</div>
                    <div className="text-xs text-[#00B7B3]">of Excellence</div>
                  </div>
                </motion.div>

                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl md:text-3xl font-bold text-white mb-2"
                >
                  {aboutData?.name || 'Naveen Bhagat Ji'}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-[#00B7B3] text-sm md:text-base"
                >
                  {aboutData?.title || 'Vedic Astrologer & Vastu Consultant'}
                </motion.p>
              </div>

              <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-[#00B7B3]/40 rounded-tl-2xl"></div>
              <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-[#00B7B3]/40 rounded-br-2xl"></div>
              
              <div className="absolute top-6 right-6 bg-[#00B7B3]/20 backdrop-blur-sm border border-[#00B7B3]/30 rounded-lg px-4 py-2 z-20">
                <span className="text-[#00B7B3] font-semibold text-sm">✦ Trusted ✦</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutNaveenSection;