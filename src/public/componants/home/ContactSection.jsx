import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const ContactSection = () => {
  const [contactInfo, setContactInfo] = useState({
    address: '',
    phone: '',
    email: '',
    socialLinks: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: ''
    }
  });
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    cityState: '',
    country: '',
    message: ''
  });

  // Static WhatsApp and YouTube links - FIXED WhatsApp
  const WHATSAPP_LINK = "https://wa.me/919953442381?text=Namaskar!%20I%20would%20like%20to%20connect%20with%20you.";
  const YOUTUBE_LINK = "https://www.youtube.com/channel/UCSIePQfbI4wvLg6JH5J-AaQ";

  // Dynamic API URL
  const getApiUrl = () => {
    if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      return '';
    }
    return '';
  };
  
  const API_BASE_URL = getApiUrl();

  const fetchContactInfo = useCallback(async () => {
    try {
      setLoading(true);
      const url = `${API_BASE_URL}/api/home/contact-info`;
      console.log('Fetching contact info from:', url);
      
      const response = await fetch(url);
      const result = await response.json();
      
      console.log('Contact info fetched:', result);
      
      if (result.success && result.data) {
        setContactInfo({
          address: result.data.address || 'B-153, 40ft Road, Sai Kunj, New Palam Vihar - Phase 3, Sector 110A Gurugram 122017 (Haryana)',
          phone: result.data.phone || '+91 995 344 2381',
          email: result.data.email || 'nbastro108@gmail.com',
          socialLinks: {
            facebook: result.data.socialLinks?.facebook || '',
            twitter: result.data.socialLinks?.twitter || '',
            instagram: result.data.socialLinks?.instagram || '',
            linkedin: result.data.socialLinks?.linkedin || ''
          }
        });
      } else {
        console.log('No contact data found, using defaults');
      }
    } catch (error) {
      console.error('Error fetching contact info:', error);
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  // Fetch contact info from API
  useEffect(() => {
    fetchContactInfo();
  }, [fetchContactInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      fullName: '',
      phoneNumber: '',
      email: '',
      cityState: '',
      country: '',
      message: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Professional Icons
  const LocationIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21C12 21 4 15 4 9C4 5 7 2 12 2C17 2 20 5 20 9C20 15 12 21 12 21Z" stroke="#00B7B3" strokeWidth="1.5"/>
      <circle cx="12" cy="9" r="3" stroke="#00B7B3" strokeWidth="1.5"/>
    </svg>
  );

  const PhoneIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.352 21.4019C21.1467 21.5901 20.9041 21.7335 20.6401 21.8227C20.3761 21.9119 20.0962 21.945 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.7738 17.3147 6.72533 15.2662 5.19 12.85C3.49877 10.2412 2.44579 7.27096 2.12 4.18C2.09509 3.90399 2.1281 3.62424 2.21713 3.36036C2.30616 3.09648 2.44928 2.8539 2.63735 2.64856C2.82541 2.44322 3.05432 2.27947 3.30928 2.16766C3.56425 2.05584 3.83977 1.9986 4.118 2H7.118C7.59728 1.99486 8.06264 2.15079 8.437 2.43877C8.81136 2.72675 9.06983 3.12731 9.165 3.58C9.30501 4.2581 9.5165 4.91974 9.796 5.55C9.93872 5.88256 9.99075 6.24663 9.94738 6.60491C9.90401 6.96319 9.76679 7.30355 9.551 7.59L8.411 9.08C9.65265 11.3482 11.3997 13.3066 13.52 14.73L15.03 13.59C15.3164 13.3742 15.6568 13.237 16.0151 13.1936C16.3734 13.1502 16.7374 13.2023 17.07 13.345C17.7003 13.6245 18.3619 13.836 19.04 13.976C19.4927 14.0712 19.8933 14.3296 20.1812 14.704C20.4692 15.0784 20.6251 15.5437 20.62 16.023V16.92H22Z" stroke="#00B7B3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const EmailIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 6L12 13L2 6M22 6V18C22 18.5304 21.7893 19.0391 21.4142 19.4142C21.0391 19.7893 20.5304 20 20 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V6M22 6L12 13L2 6" stroke="#00B7B3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const WhatsAppIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.032 2.00146C6.99602 1.99946 2.85402 6.04946 2.79202 11.0855C2.77002 12.9335 3.33902 14.7285 4.40402 16.2315L2.90602 21.1465L7.91402 19.6585C9.35002 20.5635 11.013 21.0685 12.72 21.0775H12.735C17.771 21.0775 21.921 17.0275 21.983 11.9915C22.045 6.95546 18.027 2.97346 12.99 2.97346L12.032 2.00146ZM12.032 3.97346C16.292 3.97346 19.847 7.49646 19.795 11.7565C19.743 16.0165 16.098 19.5455 11.838 19.4975C10.351 19.4815 8.91202 19.0405 7.67702 18.2325L7.22802 17.9475L4.41802 18.6455L5.12402 15.9095L4.80402 15.4415C3.87702 14.0065 3.40502 12.3025 3.44402 10.5605C3.49602 6.30046 7.01402 2.82646 11.274 2.82646L12.032 3.97346ZM9.01902 8.36846C8.76602 8.86946 8.50402 9.79046 9.23802 10.8415C9.97202 11.8925 10.975 12.9185 12.069 13.6595C12.627 14.0375 13.127 14.2595 13.561 14.3705C14.122 14.5165 14.632 14.4635 15.045 14.2485C15.527 14.0005 15.86 13.5465 16.017 13.0085C16.118 12.6605 16.038 12.4005 15.865 12.2615L14.461 11.2295C14.288 11.0905 14.044 11.0985 13.885 11.2465L13.159 11.9285C13.045 12.0345 12.867 12.0465 12.74 11.9585C11.886 11.3755 11.007 10.5895 10.541 9.79746C10.475 9.69146 10.489 9.55346 10.572 9.46346L11.149 8.83446C11.299 8.67046 11.326 8.42946 11.217 8.23646L10.286 6.62446C10.17 6.41746 9.95102 6.28846 9.71402 6.28846C9.57202 6.28846 9.43402 6.33446 9.31902 6.42146C8.74702 6.85346 8.35502 7.46146 9.01902 8.36846Z" fill="currentColor"/>
    </svg>
  );

  const YouTubeIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.5401 6.85546C22.4201 6.41246 22.2001 6.00446 21.9001 5.66546C21.6001 5.32646 21.2401 5.07146 20.8301 4.92446C19.0201 4.28146 12.0001 4.28146 12.0001 4.28146C12.0001 4.28146 4.98012 4.28146 3.17012 4.92446C2.76012 5.07146 2.40012 5.32646 2.10012 5.66546C1.80012 6.00446 1.58012 6.41246 1.46012 6.85546C1.00012 8.70646 0.875122 12.0005 1.00012 15.1455C1.12012 15.5885 1.34012 15.9965 1.64012 16.3355C1.94012 16.6745 2.30012 16.9295 2.71012 17.0765C4.52012 17.7195 12.0001 17.7195 12.0001 17.7195C12.0001 17.7195 19.0201 17.7195 20.8301 17.0765C21.2401 16.9295 21.6001 16.6745 21.9001 16.3355C22.2001 15.9965 22.4201 15.5885 22.5401 15.1455C23.0001 13.2945 23.1251 10.0005 23.0001 6.85546H22.5401ZM9.75012 14.0005V7.50046L15.5001 10.7505L9.75012 14.0005Z" fill="currentColor"/>
    </svg>
  );

  const FacebookIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const TwitterIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23 3.01001C22.0424 3.67553 20.9821 4.19211 19.86 4.54001C19.2577 3.83757 18.4573 3.33713 17.5669 3.10297C16.6765 2.86881 15.7395 2.91241 14.874 3.22868C14.0085 3.54495 13.2557 4.11848 12.7142 4.86814C12.1727 5.6178 11.8695 6.50717 11.844 7.43001V8.43001C10.243 8.46273 8.65846 8.11464 7.209 7.41601C5.75954 6.71738 4.48411 5.68998 3.482 4.41001C3.482 4.41001 -0.517998 13.31 8.482 17.31C6.27854 18.816 3.61357 19.558 0.982002 19.41C9.982 24.41 21.982 19.41 21.982 7.41001C21.981 7.06977 21.941 6.73114 21.862 6.40001C22.866 5.39846 23.476 4.05987 23.586 2.63001L23 3.01001Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const InstagramIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
    </svg>
  );

  const LinkedInIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 8H8V20H4V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 4C6.55228 4 7 4.44772 7 5C7 5.55228 6.55228 6 6 6C5.44772 6 5 5.55228 5 5C5 4.44772 5.44772 4 6 4Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9 8H13V10C13 10 14.5 7.5 17 8.5C19.5 9.5 20 12 20 15V20H16V15C16 13.5 15.5 12 14 12C12.5 12 12 13.5 12 15V20H8V8H9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-black to-black/95 relative overflow-hidden">
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B7B3]"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-black to-black/95 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00B7B3] rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#33C5C2] rounded-full filter blur-3xl opacity-10"></div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#00B7B3] text-sm uppercase tracking-wider mb-4 block">
            Get In Touch
          </span>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Have Questions?{' '}
            <span className="text-[#00B7B3]">Contact Us</span>
          </h2>
          
          <p className="text-gray-400 max-w-2xl mx-auto">
            Feel free to reach out for any queries about astrology consultations, vastu solutions, or our courses.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* ============================================ */}
          {/* CONTACT INFO - LEFT SIDE */}
          {/* ============================================ */}
          <div className="space-y-6">
            {/* Address */}
            <div className="flex items-start gap-4 p-5 bg-black/40 border border-gray-800 rounded-xl hover:border-[#00B7B3]/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#00B7B3]/10 flex items-center justify-center text-[#00B7B3] flex-shrink-0">
                <LocationIcon />
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Address</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {contactInfo.address}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 p-5 bg-black/40 border border-gray-800 rounded-xl hover:border-[#00B7B3]/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#00B7B3]/10 flex items-center justify-center text-[#00B7B3] flex-shrink-0">
                <PhoneIcon />
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Phone</h3>
                <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="text-gray-400 hover:text-[#00B7B3] transition-colors text-sm">
                  {contactInfo.phone}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 p-5 bg-black/40 border border-gray-800 rounded-xl hover:border-[#00B7B3]/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#00B7B3]/10 flex items-center justify-center text-[#00B7B3] flex-shrink-0">
                <EmailIcon />
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Email</h3>
                <a href={`mailto:${contactInfo.email}`} className="text-gray-400 hover:text-[#00B7B3] transition-colors text-sm">
                  {contactInfo.email}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="p-5 bg-black/40 border border-gray-800 rounded-xl">
              <h3 className="text-white font-medium mb-4">Follow Us</h3>
              <div className="flex flex-wrap gap-3">
                {/* WhatsApp */}
                <a 
                  href={WHATSAPP_LINK} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white hover:scale-110 transition-all duration-300 group"
                  title="WhatsApp"
                >
                  <WhatsAppIcon />
                </a>

                {/* YouTube */}
                <a 
                  href={YOUTUBE_LINK} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-xl bg-[#FF0000]/10 flex items-center justify-center text-[#FF0000] hover:bg-[#FF0000] hover:text-white hover:scale-110 transition-all duration-300 group"
                  title="YouTube"
                >
                  <YouTubeIcon />
                </a>

                {/* Facebook */}
                {contactInfo.socialLinks.facebook && contactInfo.socialLinks.facebook !== '#' && (
                  <a href={contactInfo.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-[#1877F2]/10 flex items-center justify-center text-[#1877F2] hover:bg-[#1877F2] hover:text-white hover:scale-110 transition-all duration-300" title="Facebook">
                    <FacebookIcon />
                  </a>
                )}

                {/* Twitter */}
                {contactInfo.socialLinks.twitter && contactInfo.socialLinks.twitter !== '#' && (
                  <a href={contactInfo.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-[#1DA1F2]/10 flex items-center justify-center text-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white hover:scale-110 transition-all duration-300" title="Twitter">
                    <TwitterIcon />
                  </a>
                )}

                {/* Instagram */}
                {contactInfo.socialLinks.instagram && contactInfo.socialLinks.instagram !== '#' && (
                  <a href={contactInfo.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-[#E4405F]/10 flex items-center justify-center text-[#E4405F] hover:bg-[#E4405F] hover:text-white hover:scale-110 transition-all duration-300" title="Instagram">
                    <InstagramIcon />
                  </a>
                )}

                {/* LinkedIn */}
                {contactInfo.socialLinks.linkedin && contactInfo.socialLinks.linkedin !== '#' && (
                  <a href={contactInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-[#0A66C2]/10 flex items-center justify-center text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white hover:scale-110 transition-all duration-300" title="LinkedIn">
                    <LinkedInIcon />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ============================================ */}
          {/* CONTACT FORM - RIGHT SIDE */}
          {/* ============================================ */}
          <div className="bg-black/40 border border-gray-800 rounded-2xl p-6 lg:p-8">
            <h3 className="text-xl font-semibold text-white mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Full Name <span className="text-[#00B7B3]">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:border-[#00B7B3] outline-none transition-all text-sm"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Phone Number <span className="text-[#00B7B3]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="+91 98765 43210"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:border-[#00B7B3] outline-none transition-all text-sm"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Email Address <span className="text-[#00B7B3]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:border-[#00B7B3] outline-none transition-all text-sm"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    City/State <span className="text-[#00B7B3]">*</span>
                  </label>
                  <input
                    type="text"
                    name="cityState"
                    placeholder="Delhi"
                    value={formData.cityState}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:border-[#00B7B3] outline-none transition-all text-sm"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Country <span className="text-[#00B7B3]">*</span>
                </label>
                <input
                  type="text"
                  name="country"
                  placeholder="India"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:border-[#00B7B3] outline-none transition-all text-sm"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  placeholder="Your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:border-[#00B7B3] outline-none transition-all resize-none text-sm"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#00B7B3] text-black rounded-lg font-medium hover:bg-[#33C5C2] transition-all duration-300 mt-2"
              >
                Send Message
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-4">
              <span className="text-[#00B7B3]">*</span> Required fields
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
