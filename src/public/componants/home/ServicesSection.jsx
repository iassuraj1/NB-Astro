import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const getApiUrl = () => {
  if (typeof window === 'undefined') return '';

  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return '';
  }

  return '';
};

const resolveAssetUrl = (value) => {
  if (!value) return '';
  if (/^(https?:|data:|blob:)/i.test(value)) return value;

  const baseUrl = getApiUrl();
  const path = value.startsWith('/') ? value : `/${value}`;
  return `${baseUrl}${path}`;
};

const stripHtml = (value = '') => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const AstrologyIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#00B7B3" strokeWidth="1.5" fill="none" />
    <circle cx="12" cy="12" r="2" stroke="#00B7B3" strokeWidth="1.5" fill="none" />
    <path d="M12 6V8M12 16V18M18 12H16M8 12H6M16.5 7.5L15 9M9 15L7.5 16.5M16.5 16.5L15 15M9 9L7.5 7.5" stroke="#00B7B3" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const VastuIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9.5L12 4L21 9.5V20C21 20.5 20.5 21 20 21H4C3.5 21 3 20.5 3 20V9.5Z" stroke="#00B7B3" strokeWidth="1.5" fill="none" />
    <path d="M8 21V12H16V21" stroke="#00B7B3" strokeWidth="1.5" fill="none" />
    <path d="M12 7V9" stroke="#00B7B3" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="15" r="1" stroke="#00B7B3" strokeWidth="1.5" />
  </svg>
);

const CoursesIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" stroke="#00B7B3" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" stroke="#00B7B3" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M8 6H16M8 10H16M8 14H13" stroke="#00B7B3" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const VastuCoursesIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9.5L12 4L21 9.5V20C21 20.5 20.5 21 20 21H4C3.5 21 3 20.5 3 20V9.5Z" stroke="#00B7B3" strokeWidth="1.5" fill="none" />
    <path d="M8 21V12H16V21" stroke="#00B7B3" strokeWidth="1.5" fill="none" />
    <path d="M4 4L20 4" stroke="#00B7B3" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9 4L9 8M15 4L15 8" stroke="#00B7B3" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1L10 5.5L15 6L11 9.5L12 14.5L8 12L4 14.5L5 9.5L1 6L6 5.5L8 1Z" stroke="#00B7B3" strokeWidth="1.2" fill="none" />
  </svg>
);

const getIcon = (iconName, size = 48) => {
  switch (iconName) {
    case 'vastu':
      return <VastuIcon size={size} />;
    case 'astrologyCourses':
      return <CoursesIcon size={size} />;
    case 'vastuCourses':
      return <VastuCoursesIcon size={size} />;
    case 'astrology':
    default:
      return <AstrologyIcon size={size} />;
  }
};

const normalizeCards = (items) => {
  if (!Array.isArray(items)) return [];

  return items
    .map((item) => ({
      id: item.id || item._id || item.label,
      label: item.label || '',
      path: item.path || '/',
      icon: item.icon || 'astrology',
      description: stripHtml(item.description || ''),
      image: resolveAssetUrl(item.image)
    }))
    .filter((item) => item.id && item.label && item.path);
};

const ServicesSection = () => {
  const [mainServices, setMainServices] = useState([]);

  const fetchGuidanceCards = useCallback(async () => {
    try {
      const response = await fetch(`${getApiUrl()}/api/home/guidance-cards`, {
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error(`Guidance cards request failed with status ${response.status}`);
      }

      const result = await response.json();
      setMainServices(normalizeCards(result?.data));
    } catch (error) {
      console.error('Error fetching guidance cards:', error);
      setMainServices([]);
    }
  }, []);

  useEffect(() => {
    fetchGuidanceCards();
  }, [fetchGuidanceCards]);

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#0a0c12] to-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B7B3] rounded-full filter blur-[128px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#33C5C2] rounded-full filter blur-[128px] opacity-10 animate-pulse delay-1000"></div>
      </div>

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-[15%] w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-[25%] w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-100"></div>
        <div className="absolute bottom-32 left-[30%] w-1 h-1 bg-white rounded-full animate-pulse delay-200"></div>
        <div className="absolute top-60 left-[45%] w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-20 right-[20%] w-1 h-1 bg-white rounded-full animate-pulse delay-150"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#00B7B3] text-sm uppercase tracking-[0.3em] mb-4 block">
            Our Premium Services
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Cosmic <span className="bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] bg-clip-text text-transparent">Guidance</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Expert astrological and vastu solutions for every aspect of your life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {mainServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={service.path}
                className="group block relative h-[500px] rounded-2xl overflow-hidden"
              >
                <div className="absolute inset-0">
                  {service.image && (
                    <img
                      src={service.image}
                      alt={service.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00B7B3]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="mb-4 transform group-hover:scale-110 group-hover:translate-y-[-5px] transition-all duration-500">
                    <div className="w-20 h-20 rounded-2xl bg-black/40 backdrop-blur-sm border-2 border-[#00B7B3]/30 flex items-center justify-center group-hover:border-[#00B7B3] group-hover:bg-[#00B7B3]/10 transition-all duration-300">
                      {getIcon(service.icon)}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#00B7B3] transition-colors duration-300">
                    {service.label}
                  </h3>

                  <p className="text-gray-300 mb-6 text-sm leading-relaxed line-clamp-3">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-2 text-[#00B7B3] font-semibold">
                    <span>Explore Services</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-2 transition-transform duration-300">
                      <path d="M4.16666 10H15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M10.8333 5L15.8333 10L10.8333 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>

                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#00B7B3]/40 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#00B7B3]/40 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>
            </motion.div>
          ))}
        </div>

        {mainServices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#0a0c12] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#0a0c12] to-transparent z-10 pointer-events-none"></div>

            <div className="bg-gradient-to-r from-[#1a1f28] to-[#141a24] rounded-2xl border border-[#00B7B3]/20 p-8 overflow-hidden">
              <div className="flex items-center gap-2 mb-6">
                <SparkleIcon />
                <span className="text-[#00B7B3] text-sm uppercase tracking-wider">Specialized Services</span>
              </div>

              <motion.div
                className="flex gap-4 w-max"
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                {[...mainServices, ...mainServices, ...mainServices].map((service, index) => (
                  <Link
                    key={`${service.id}-${index}`}
                    href={service.path}
                    className="
                      group
                      relative
                      px-6 py-3
                      rounded-full
                      bg-white/5
                      border border-white/10
                      backdrop-blur-md
                      text-sm font-medium
                      text-gray-200
                      hover:bg-[#00B7B3]/15
                      hover:border-[#00B7B3]/40
                      hover:text-white
                      transition-all
                      duration-300
                      whitespace-nowrap
                      flex items-center gap-2
                    "
                  >
                    <span className="text-[#00B7B3]">
                      {getIcon(service.icon, 20)}
                    </span>
                    <span>{service.label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#00B7B3]">-&gt;</span>
                  </Link>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
