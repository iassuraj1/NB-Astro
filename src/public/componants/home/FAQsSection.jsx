import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const STARS = Array.from({ length: 30 }, (_, index) => ({
  id: index,
  top: `${(index * 37) % 100}%`,
  left: `${(index * 61) % 100}%`,
  delay: `${(index % 5) * 0.8}s`,
  opacity: 0.2 + (index % 6) * 0.08
}));

const getApiUrl = () => {
  if (typeof window === 'undefined') return '';

  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return '';
  }

  return '';
};

const normalizeFAQs = (items) => {
  if (!Array.isArray(items)) return [];

  return items
    .filter((faq) => faq && faq.isActive !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((faq, index) => ({
      id: faq._id || faq.id || `faq-${index + 1}`,
      question: faq.question || faq.title || '',
      answer: faq.answer || faq.description || ''
    }))
    .filter((faq) => faq.question && faq.answer);
};

const QuestionIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="17" r="1" fill="currentColor" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L13.5 7.5L18 9L13.5 10.5L12 15L10.5 10.5L6 9L10.5 7.5L12 3Z" fill="#00B7B3" fillOpacity="0.5" stroke="#00B7B3" strokeWidth="1" />
    <path d="M19 4L19.5 5.5L21 6L19.5 6.5L19 8L18.5 6.5L17 6L18.5 5.5L19 4Z" fill="#00B7B3" stroke="#00B7B3" strokeWidth="1" />
    <path d="M5 16L5.5 17.5L7 18L5.5 18.5L5 20L4.5 18.5L3 18L4.5 17.5L5 16Z" fill="#00B7B3" stroke="#00B7B3" strokeWidth="1" />
  </svg>
);

const CosmicIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="8" stroke="#00B7B3" strokeWidth="1.5" />
    <path d="M12 4L12 6M12 18L12 20M20 12L18 12M6 12L4 12" stroke="#00B7B3" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const StarIcon = () => (
  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#00B7B3" stroke="#00B7B3" strokeWidth="1" />
  </svg>
);

const FAQsSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);

  const fetchFAQs = useCallback(async () => {
    try {
      const response = await fetch(`${getApiUrl()}/api/home/faqs`, {
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error(`FAQ request failed with status ${response.status}`);
      }

      const result = await response.json();
      const activeFaqs = normalizeFAQs(result?.data);

      setFaqs(activeFaqs);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      setFaqs([]);
    }
  }, []);

  useEffect(() => {
    fetchFAQs();
  }, [fetchFAQs]);

  const toggleFAQ = useCallback((index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0c12] to-black"></div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00B7B3]/20 rounded-full filter blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#33C5C2]/10 rounded-full filter blur-[120px] animate-pulse-slow delay-1000"></div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {STARS.map((star) => (
          <div
            key={star.id}
            className="absolute animate-twinkle"
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
              opacity: star.opacity
            }}
          >
            <StarIcon />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#00B7B3]/10 backdrop-blur-sm px-5 py-2 rounded-full mb-6 border border-[#00B7B3]/20">
            <CosmicIcon />
            <span className="text-[#00B7B3] text-sm uppercase tracking-wider">Got Questions?</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Frequently Asked <span className="bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] bg-clip-text text-transparent">Questions</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to know about our services and courses
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.5) }}
                className="group"
              >
                <div
                  className={`
                    relative rounded-2xl transition-all duration-500 backdrop-blur-sm
                    ${openIndex === index
                      ? 'bg-gradient-to-br from-[#00B7B3]/20 via-black/90 to-black/90 border-[#00B7B3]/60 shadow-2xl shadow-[#00B7B3]/20'
                      : 'bg-black/40 backdrop-blur-sm border border-white/10 hover:border-[#00B7B3]/40 hover:bg-black/60 hover:backdrop-blur-md'
                    }
                  `}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left"
                    aria-expanded={openIndex === index}
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div
                        className={`
                          flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                          ${openIndex === index
                            ? 'bg-gradient-to-br from-[#00B7B3] to-[#33C5C2] text-black shadow-lg shadow-[#00B7B3]/30'
                            : 'bg-[#00B7B3]/10 text-[#00B7B3] group-hover:bg-[#00B7B3]/20 group-hover:scale-110'
                          }
                        `}
                      >
                        <QuestionIcon />
                      </div>
                      <span
                        className={`
                          text-lg font-semibold transition-colors duration-300 flex-1
                          ${openIndex === index ? 'text-[#00B7B3]' : 'text-white group-hover:text-[#00B7B3]'}
                        `}
                      >
                        {faq.question}
                      </span>
                    </div>

                    <div
                      className={`
                        flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                        ${openIndex === index
                          ? 'bg-gradient-to-br from-[#00B7B3] to-[#33C5C2] text-black rotate-180 shadow-lg'
                          : 'bg-[#00B7B3]/10 text-[#00B7B3] group-hover:bg-[#00B7B3]/20'
                        }
                      `}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </button>

                  <AnimatePresence mode="wait">
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-2 border-t border-[#00B7B3]/20">
                          <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 mt-1">
                              <SparkleIcon />
                            </div>
                            <p className="text-gray-300 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {openIndex === index && (
                    <>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00B7B3]/10 via-transparent to-[#00B7B3]/10 opacity-50 pointer-events-none"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00B7B3] via-[#33C5C2] to-[#00B7B3] rounded-full"></div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(FAQsSection);
