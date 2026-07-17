import React from 'react';
import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00B7B3]/10 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Life?
          </h2>
          
          <p className="text-gray-400 text-lg mb-10">
            Get personalized astrological guidance and vastu solutions for your problems
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/consultation/astrology"
              className="px-8 py-4 bg-[#00B7B3] text-black rounded-xl font-semibold hover:bg-[#33C5C2] transform hover:scale-105 transition-all duration-300"
            >
              Book Consultation Now
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-[#00B7B3] text-[#00B7B3] rounded-xl font-semibold hover:bg-[#00B7B3]/10 transform hover:scale-105 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>

          {/* Guarantee Badge */}
          <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-black/60 border border-[#00B7B3]/20 rounded-full">
            <span className="text-[#00B7B3]">✓</span>
            <span className="text-sm text-gray-400">Satisfaction Guaranteed</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;