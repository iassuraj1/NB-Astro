import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Astrology Consultation', href: '/astrology-consultation' },
    { name: 'Vastu Consultation', href: '/vastu-consultation' },
    { name: 'Courses', href: '/courses' },
    { name: 'About Guru Ji', href: '/about' },
    { name: 'Contact Us', href: '/contact' }
  ];

  const astrologyLinks = [
    { name: 'Marriage Astrology', href: '/consultation/astrology/marriage' },
    { name: 'Kundli Milan', href: '/consultation/astrology/kundli-milan' },
    { name: 'Career Horoscope', href: '/consultation/astrology/career' },
    { name: 'Medical Astrology', href: '/consultation/astrology/health' },
    { name: 'Birth Time Rectification', href: '/consultation/astrology/birth-time' },
    { name: 'Varshphal Horoscope', href: '/consultation/astrology/varshphal' }
  ];

  const vastuLinks = [
    { name: 'Astro Vastu', href: '/consultation/vastu/astro-vastu' },
    { name: 'Nakshatra Vastu', href: '/consultation/vastu/nakshatra-vastu' },
    { name: 'Vastu Shastra', href: '/consultation/vastu/vastu' },
    { name: 'Commercial Vastu', href: '/consultation/vastu/commercial' },
    { name: 'Residential Vastu', href: '/consultation/vastu/residential' }
  ];

  const courseLinks = [
    { name: 'Complete Astrology Course', href: '/courses/complete-astrology' },
    { name: 'Financial Astrology Level 3', href: '/courses/financial-astrology-3' },
    { name: 'Financial Astrology Level 2', href: '/courses/financial-astrology-2' },
    { name: 'Financial Astrology Level 1', href: '/courses/financial-astrology-1' },
    { name: 'Vastu Foundation Course', href: '/courses/vastu-foundation' },
    { name: 'Advanced Vastu', href: '/courses/advanced-vastu' }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-black to-black/95 border-t border-[#00B7B3]/20 pt-16 pb-8 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00B7B3] rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#33C5C2] rounded-full filter blur-3xl opacity-10"></div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          
          {/* Column 1: Logo & About */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4 group">
              <span className="text-2xl font-bold">
                <span className="text-[#00B7B3] group-hover:text-[#33C5C2] transition-colors">NB</span>
                <span className="text-white"> Astro</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Expert Astrology and Vastu consultations by Naveen Bhagat Ji with 10+ years of experience. Guiding you toward cosmic wisdom and harmonious living.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-lg bg-[#00B7B3]/10 border border-[#00B7B3]/30 flex items-center justify-center text-[#00B7B3] hover:bg-[#00B7B3] hover:text-black transition-all duration-300 hover:scale-110">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-[#00B7B3]/10 border border-[#00B7B3]/30 flex items-center justify-center text-[#00B7B3] hover:bg-[#00B7B3] hover:text-black transition-all duration-300 hover:scale-110">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-[#00B7B3]/10 border border-[#00B7B3]/30 flex items-center justify-center text-[#00B7B3] hover:bg-[#00B7B3] hover:text-black transition-all duration-300 hover:scale-110">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-[#00B7B3]/10 border border-[#00B7B3]/30 flex items-center justify-center text-[#00B7B3] hover:bg-[#00B7B3] hover:text-black transition-all duration-300 hover:scale-110">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#00B7B3] rounded-full"></span>
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-[#00B7B3] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="text-[#00B7B3] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Astrology Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
              Astrology
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#00B7B3] rounded-full"></span>
            </h3>
            <ul className="space-y-2">
              {astrologyLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-[#00B7B3] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="text-[#00B7B3] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Vastu Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
              Vastu
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#00B7B3] rounded-full"></span>
            </h3>
            <ul className="space-y-2">
              {vastuLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-[#00B7B3] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="text-[#00B7B3] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Courses */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 relative inline-block">
              Courses
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[#00B7B3] rounded-full"></span>
            </h3>
            <ul className="space-y-2">
              {courseLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-[#00B7B3] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="text-[#00B7B3] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info Strip */}
        <div className="border-t border-[#00B7B3]/20 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-[#00B7B3]/10 border border-[#00B7B3]/30 flex items-center justify-center text-[#00B7B3] group-hover:bg-[#00B7B3] group-hover:text-black transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Visit Us</p>
                <p className="text-sm text-white">Gurugram, Haryana</p>
              </div>
            </div>

            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-[#00B7B3]/10 border border-[#00B7B3]/30 flex items-center justify-center text-[#00B7B3] group-hover:bg-[#00B7B3] group-hover:text-black transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Call Us</p>
                <a href="tel:+919953442381" className="text-sm text-white hover:text-[#00B7B3] transition-colors">+91 995 344 2381</a>
              </div>
            </div>

            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-[#00B7B3]/10 border border-[#00B7B3]/30 flex items-center justify-center text-[#00B7B3] group-hover:bg-[#00B7B3] group-hover:text-black transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Email Us</p>
                <a href="mailto:nbastro108@gmail.com" className="text-sm text-white hover:text-[#00B7B3] transition-colors">nbastro108@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#00B7B3]/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} NB Astro. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-gray-500 hover:text-[#00B7B3] text-sm transition-colors">Privacy Policy</Link>
            <Link href="/terms-conditions" className="text-gray-500 hover:text-[#00B7B3] text-sm transition-colors">Terms & Conditions</Link>
            <Link href="/disclaimer" className="text-gray-500 hover:text-[#00B7B3] text-sm transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;