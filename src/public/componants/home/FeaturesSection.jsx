


import React from 'react';

const FeaturesSection = () => {
  // SVG Icons Components
  const StarIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#00B7B3" strokeWidth="1.5" fill="none"/>
    </svg>
  );

  const CrystalBallIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V16c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z" stroke="#00B7B3" strokeWidth="1.5" fill="none"/>
      <path d="M10 18h4v2h-4z" stroke="#00B7B3" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="9" r="2" stroke="#00B7B3" strokeWidth="1.5" fill="none"/>
      <path d="M9 6L7 4M15 6L17 4" stroke="#00B7B3" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  const HomeIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9.5L12 4L21 9.5V20C21 20.5 20.5 21 20 21H4C3.5 21 3 20.5 3 20V9.5Z" stroke="#00B7B3" strokeWidth="1.5" fill="none"/>
      <path d="M8 21V12H16V21" stroke="#00B7B3" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="14" r="1" stroke="#00B7B3" strokeWidth="1.5" fill="none"/>
      <path d="M12 7V9" stroke="#00B7B3" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  const HeartIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21C12 21 4 15 4 9C4 5.5 7 3 10 3C12 3 12 4 12 4C12 4 12 3 14 3C17 3 20 5.5 20 9C20 15 12 21 12 21Z" stroke="#00B7B3" strokeWidth="1.5" fill="none"/>
    </svg>
  );

  const LeafIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C12 2 8 6 8 10C8 14 12 18 12 18C12 18 16 14 16 10C16 6 12 2 12 2Z" stroke="#00B7B3" strokeWidth="1.5" fill="none"/>
      <path d="M12 18V22" stroke="#00B7B3" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 21H15" stroke="#00B7B3" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="8" r="1" fill="#00B7B3"/>
    </svg>
  );

  const SupportIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" stroke="#00B7B3" strokeWidth="1.5" fill="none"/>
      <path d="M8 12H10M14 12H16M12 8V10M12 14V16" stroke="#00B7B3" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="2" stroke="#00B7B3" strokeWidth="1.5" fill="none"/>
    </svg>
  );

  const SparkleIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L14 8L20 9L15.5 13L17 20L12 16.5L7 20L8.5 13L4 9L10 8L12 2Z" stroke="#00B7B3" strokeWidth="1.5" fill="none"/>
    </svg>
  );

  const features = [
    {
      icon: StarIcon,
      title: 'Accurate Predictions',
      desc: '99% accuracy in predictions with years of experience',
      gradient: 'from-yellow-500/20 to-orange-500/20'
    },
    {
      icon: CrystalBallIcon,
      title: 'Vedic Astrology',
      desc: 'Pure Vedic techniques passed down through generations',
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      icon: HomeIcon,
      title: 'Vastu Expertise',
      desc: 'Scientific vastu solutions for harmony and prosperity',
      gradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: HeartIcon,
      title: 'Personalized Remedies',
      desc: 'Custom remedies based on your birth chart',
      gradient: 'from-red-500/20 to-pink-500/20'
    },
    {
      icon: LeafIcon,
      title: 'Holistic Approach',
      desc: 'Mind, body, and spirit healing combined',
      gradient: 'from-green-500/20 to-emerald-500/20'
    },
    {
      icon: SupportIcon,
      title: '24/7 Support',
      desc: 'Round the clock guidance and follow-up',
      gradient: 'from-indigo-500/20 to-blue-500/20'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-black/95 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00B7B3] rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#33C5C2] rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#00B7B3]/5 to-[#33C5C2]/5 rounded-full filter blur-3xl"></div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
       
         

          {/* Section Label */}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-sm uppercase tracking-[0.2em] font-bold mb-4 block">
            Why Choose Us
          </span>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Features That Make Us{' '}
            <span className="bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] bg-clip-text text-transparent relative inline-block">
              Different
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] rounded-full"></span>
            </span>
          </h2>

          {/* Description */}
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Discover what sets us apart with our unique approach to astrology and vastu
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group relative"
              >
                {/* Gradient Background Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`}></div>
                
                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm border border-[#00B7B3]/20 rounded-2xl p-8 hover:border-[#00B7B3]/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#00B7B3]/10 overflow-hidden">
                  
                  {/* Icon with Animated Background */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                    <div className="relative w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#00B7B3]/10 to-[#33C5C2]/10 border-2 border-[#00B7B3]/30 group-hover:border-[#00B7B3] flex items-center justify-center transition-all duration-500">
                      <div className="group-hover:scale-110 transition-transform duration-500">
                        <IconComponent />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00B7B3] transition-colors text-center">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 text-center leading-relaxed">
                    {feature.desc}
                  </p>

                  {/* Decorative Corner Elements */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#00B7B3]/20 group-hover:border-[#00B7B3]/40 rounded-tl-xl transition-all duration-500"></div>
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#00B7B3]/20 group-hover:border-[#00B7B3]/40 rounded-br-xl transition-all duration-500"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Decorative Line */}
        <div className="relative mt-16">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#00B7B3] to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
