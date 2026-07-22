import React, { useEffect, useState } from 'react';

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'Naveen Bhagat ji predicted my marriage timeline accurately. Got married within 6 months of consultation!',
    service: 'Marriage Astrology',
    image: 'https://images.unsplash.com/photo-1494790108777-466d829a6c3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Rahul Mehta',
    location: 'Delhi',
    rating: 5,
    text: 'The vastu remedies suggested by him brought positive energy to our office. Business improved significantly.',
    service: 'Vastu Consultation',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Anita Desai',
    location: 'Pune',
    rating: 5,
    text: 'His career guidance was spot on. Got promotion within 3 months as he predicted.',
    service: 'Career Horoscope',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Vikram Singh',
    location: 'Jaipur',
    rating: 5,
    text: 'Very accurate kundli matching for my daughter. The couple is living happily.',
    service: 'Kundli Milan',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Neha Gupta',
    location: 'Bangalore',
    rating: 5,
    text: 'The remedies for health issues worked wonders. Feeling much better now. Highly recommended!',
    service: 'Medical Astrology',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Amit Kumar',
    location: 'Chennai',
    rating: 5,
    text: 'Accurate predictions about my business expansion. Followed his advice and got excellent results.',
    service: 'Business Astrology',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  }
];

const TestimonialsSection = () => {
  const [testimonialsList, setTestimonialsList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/home/testimonials');
        const result = await response.json();
        if (result.success && result.data) {
          const activeOnly = result.data.filter(t => t.isActive !== false);
          setTestimonialsList(activeOnly.length > 0 ? activeOnly : testimonials);
        } else {
          setTestimonialsList(testimonials);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setTestimonialsList(testimonials);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || testimonialsList.length === 0) return undefined;

    const interval = setInterval(() => {
      setCurrentIndex((index) => (index + 1) % testimonialsList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonialsList]);

  const pauseAutoPlay = () => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const nextTestimonial = () => {
    if (testimonialsList.length === 0) return;
    pauseAutoPlay();
    setCurrentIndex((index) => (index + 1) % testimonialsList.length);
  };

  const previousTestimonial = () => {
    if (testimonialsList.length === 0) return;
    pauseAutoPlay();
    setCurrentIndex((index) => (index - 1 + testimonialsList.length) % testimonialsList.length);
  };

  const goToTestimonial = (index) => {
    pauseAutoPlay();
    setCurrentIndex(index);
  };

  if (testimonialsList.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-b from-black to-black/95 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00B7B3] rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#33C5C2] rounded-full filter blur-3xl opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-sm uppercase tracking-[0.2em] font-bold mb-4 block">
            Client Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our <span className="text-[#00B7B3]">Clients Say</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real experiences from people whose lives have been transformed by our guidance
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonialsList.map((testimonial, idx) => (
                <div key={testimonial._id || idx} className="w-full flex-shrink-0 px-4">
                  <div className="bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm border-2 border-[#00B7B3]/20 rounded-2xl p-8 md:p-10 hover:border-[#00B7B3]/40 transition-all duration-500">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="md:w-1/3 flex justify-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] rounded-full blur-xl opacity-30 animate-pulse"></div>
                          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-[#00B7B3]/30 overflow-hidden">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                              onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src = `https://ui-avatars.com/api/?name=${testimonial.name}&background=00B7B3&color=000&size=128`;
                              }}
                            />
                          </div>
                          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#00B7B3] rounded-full flex items-center justify-center text-black text-sm font-bold">
                            {testimonial.rating}
                          </div>
                        </div>
                      </div>

                      <div className="md:w-2/3 text-center md:text-left">
                        <div className="flex justify-center md:justify-start gap-1 mb-4">
                          {[...Array(5)].map((_, index) => (
                            <span key={index} className="text-[#00B7B3] text-xl">&#9733;</span>
                          ))}
                        </div>
                        <p className="text-gray-300 text-lg mb-6 italic leading-relaxed">
                          &quot;{testimonial.text}&quot;
                        </p>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                          <div>
                            <span className="font-semibold text-[#00B7B3] text-xl">
                              {testimonial.name}
                            </span>
                          </div>
                          <span className="text-gray-500 hidden md:block">&bull;</span>
                          <div className="text-gray-400">{testimonial.location}</div>
                        </div>
                        <div className="mt-4">
                          <span className="inline-block px-4 py-1.5 bg-[#00B7B3]/10 border border-[#00B7B3]/30 rounded-full text-sm text-[#00B7B3]">
                            {testimonial.service}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={previousTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 border-2 border-[#00B7B3]/30 text-[#00B7B3] hover:bg-[#00B7B3] hover:text-black transition-all duration-300 flex items-center justify-center hover:scale-110"
            aria-label="Previous testimonial"
          >
            <span className="text-3xl">&lsaquo;</span>
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 border-2 border-[#00B7B3]/30 text-[#00B7B3] hover:bg-[#00B7B3] hover:text-black transition-all duration-300 flex items-center justify-center hover:scale-110"
            aria-label="Next testimonial"
          >
            <span className="text-3xl">&rsaquo;</span>
          </button>

          <div className="flex justify-center gap-3 mt-8">
            {testimonialsList.map((testimonial, index) => (
              <button
                key={testimonial._id || index}
                onClick={() => goToTestimonial(index)}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-10 h-3 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] rounded-full shadow-lg shadow-[#00B7B3]/50'
                    : 'w-3 h-3 bg-[#00B7B3]/30 rounded-full hover:bg-[#00B7B3]/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <div className="text-center mt-4">
            <span className="text-xs text-gray-500">
              {isAutoPlaying ? 'Auto-playing' : 'Paused'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
