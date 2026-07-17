import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, X, Send, Clock, Calendar, CheckCircle } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    cityState: '',
    country: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/contact/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          fullName: '',
          phoneNumber: '',
          email: '',
          cityState: '',
          country: '',
          message: ''
        });
      }, 3000);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // SVG Icons
  const SparkleIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#00B7B3" strokeWidth="1.5" fill="none"/>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0c12] to-black">
      {/* ============================================ */}
      {/* HERO SECTION - PREMIUM STYLE */}
      {/* ============================================ */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Contact Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#00B7B3] rounded-full filter blur-[100px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-[#33C5C2] rounded-full filter blur-[100px] opacity-20 animate-pulse delay-1000"></div>

        {/* Hero Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00B7B3]/30 bg-black/40 backdrop-blur-sm mb-6">
              <SparkleIcon />
              <span className="text-[#00B7B3] text-sm uppercase tracking-wider">Get In Touch</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Let's Start a{' '}
              <span className="bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] bg-clip-text text-transparent">
                Conversation
              </span>
            </h1>
            
            <p className="text-gray-300 text-xl max-w-2xl leading-relaxed">
              Connect with us for any queries about astrology consultations, vastu solutions, or our courses
            </p>

            <div className="flex items-center gap-4 mt-8">
              <div className="w-16 h-1 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] rounded-full"></div>
              <span className="text-gray-400 text-sm tracking-wider">REACH OUT TODAY</span>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0c12] to-transparent"></div>
      </div>

      {/* ============================================ */}
      {/* MAIN CONTENT - PREMIUM STYLE */}
      {/* ============================================ */}
      <div className="relative -mt-20 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-[#121a22]/90 via-[#0f1f26]/90 to-[#0a0c12]/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="grid lg:grid-cols-2">
            
            {/* ============================================ */}
            {/* LEFT SIDE - CONTACT INFO - PREMIUM STYLE */}
            {/* ============================================ */}
            <div className="p-8 md:p-12 lg:p-16 border-r border-white/10 bg-gradient-to-br from-[#0b0f14] to-[#0e131a]">
              <div className="space-y-8">
                {/* Section Header */}
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Contact{' '}
                    <span className="bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] bg-clip-text text-transparent">
                      Information
                    </span>
                  </h2>
                  <p className="text-gray-400 text-lg">
                    Feel free to reach out through any of these channels
                  </p>
                </div>

                {/* Address Card */}
                <motion.div
                  whileHover={{ x: 10 }}
                  className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#00B7B3]/40 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00B7B3]/0 to-[#33C5C2]/0 group-hover:from-[#00B7B3]/5 group-hover:to-[#33C5C2]/5 rounded-2xl transition-all duration-500"></div>
                  <div className="relative flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00B7B3]/20 to-[#33C5C2]/20 border border-[#00B7B3]/30 flex items-center justify-center text-[#00B7B3] group-hover:bg-[#00B7B3] group-hover:text-black transition-all duration-300">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-2 flex items-center gap-2">
                        Address
                        <span className="text-xs px-2 py-0.5 bg-[#00B7B3]/20 border border-[#00B7B3]/30 rounded-full text-[#00B7B3]">Main Office</span>
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        B-153, 40ft Road, Sai Kunj,<br />
                        New Palam Vihar - Phase 3,<br />
                        Sector 110A Gurugram 122017<br />
                        (Haryana)
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Phone Card */}
                <motion.div
                  whileHover={{ x: 10 }}
                  className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#00B7B3]/40 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00B7B3]/0 to-[#33C5C2]/0 group-hover:from-[#00B7B3]/5 group-hover:to-[#33C5C2]/5 rounded-2xl transition-all duration-500"></div>
                  <div className="relative flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00B7B3]/20 to-[#33C5C2]/20 border border-[#00B7B3]/30 flex items-center justify-center text-[#00B7B3] group-hover:bg-[#00B7B3] group-hover:text-black transition-all duration-300">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-2">Phone</h3>
                      <a href="tel:+919953442381" className="text-gray-400 hover:text-[#00B7B3] transition-colors text-lg flex items-center gap-2">
                        <span>+91 995 344 2381</span>
                        <span className="text-xs px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded-full text-green-400">24/7</span>
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Email Card */}
                <motion.div
                  whileHover={{ x: 10 }}
                  className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#00B7B3]/40 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00B7B3]/0 to-[#33C5C2]/0 group-hover:from-[#00B7B3]/5 group-hover:to-[#33C5C2]/5 rounded-2xl transition-all duration-500"></div>
                  <div className="relative flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00B7B3]/20 to-[#33C5C2]/20 border border-[#00B7B3]/30 flex items-center justify-center text-[#00B7B3] group-hover:bg-[#00B7B3] group-hover:text-black transition-all duration-300">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-2">Email</h3>
                      <a href="mailto:nbastro108@gmail.com" className="text-gray-400 hover:text-[#00B7B3] transition-colors text-lg break-all">
                        nbastro108@gmail.com
                      </a>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Response within 24h
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Follow Us Section */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-white font-semibold text-lg mb-4">Follow Us</h3>
                  <div className="flex gap-3">
                    {[
                      { icon: 'facebook', href: '#' },
                      { icon: 'instagram', href: '#' },
                      { icon: 'twitter', href: '#' },
                      { icon: 'linkedin', href: '#' },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        whileHover={{ scale: 1.1, y: -5 }}
                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00B7B3]/20 to-[#33C5C2]/20 border border-[#00B7B3]/30 flex items-center justify-center text-[#00B7B3] hover:bg-[#00B7B3] hover:text-black transition-all duration-300"
                      >
                        {social.icon === 'facebook' && (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z"/>
                          </svg>
                        )}
                        {social.icon === 'instagram' && (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63z"/>
                          </svg>
                        )}
                        {social.icon === 'twitter' && (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                          </svg>
                        )}
                        {social.icon === 'linkedin' && (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        )}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================ */}
            {/* RIGHT SIDE - CONTACT FORM - PREMIUM STYLE */}
            {/* ============================================ */}
            <div className="p-8 md:p-12 lg:p-16 bg-gradient-to-br from-[#0a0c12] to-[#0e131a]">
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Send a{' '}
                  <span className="bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] bg-clip-text text-transparent">
                    Message
                  </span>
                </h3>
                <p className="text-gray-400">We'll get back to you within 24 hours</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="group">
                    <label className="block text-sm text-gray-400 mb-2 group-focus-within:text-[#00B7B3] transition-colors">
                      Full Name <span className="text-[#00B7B3]">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#00B7B3] focus:ring-2 focus:ring-[#00B7B3]/20 outline-none transition-all hover:border-white/20"
                      required
                    />
                  </div>
                  
                  {/* Phone Number */}
                  <div className="group">
                    <label className="block text-sm text-gray-400 mb-2 group-focus-within:text-[#00B7B3] transition-colors">
                      Phone Number <span className="text-[#00B7B3]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="+91 98765 43210"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#00B7B3] focus:ring-2 focus:ring-[#00B7B3]/20 outline-none transition-all hover:border-white/20"
                      required
                    />
                  </div>
                  
                  {/* Email Address */}
                  <div className="group">
                    <label className="block text-sm text-gray-400 mb-2 group-focus-within:text-[#00B7B3] transition-colors">
                      Email Address <span className="text-[#00B7B3]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#00B7B3] focus:ring-2 focus:ring-[#00B7B3]/20 outline-none transition-all hover:border-white/20"
                      required
                    />
                  </div>
                  
                  {/* City/State */}
                  <div className="group">
                    <label className="block text-sm text-gray-400 mb-2 group-focus-within:text-[#00B7B3] transition-colors">
                      City/State <span className="text-[#00B7B3]">*</span>
                    </label>
                    <input
                      type="text"
                      name="cityState"
                      placeholder="Delhi"
                      value={formData.cityState}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#00B7B3] focus:ring-2 focus:ring-[#00B7B3]/20 outline-none transition-all hover:border-white/20"
                      required
                    />
                  </div>
                </div>

                {/* Country */}
                <div className="group">
                  <label className="block text-sm text-gray-400 mb-2 group-focus-within:text-[#00B7B3] transition-colors">
                    Country <span className="text-[#00B7B3]">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    placeholder="India"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#00B7B3] focus:ring-2 focus:ring-[#00B7B3]/20 outline-none transition-all hover:border-white/20"
                    required
                  />
                </div>
                
                {/* Message */}
                <div className="group">
                  <label className="block text-sm text-gray-400 mb-2 group-focus-within:text-[#00B7B3] transition-colors">
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#00B7B3] focus:ring-2 focus:ring-[#00B7B3]/20 outline-none transition-all hover:border-white/20 resize-none"
                  ></textarea>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3"
                  >
                    {error}
                  </motion.p>
                )}

                {/* Success Message */}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Message sent successfully! We'll get back to you soon.
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-[#00B7B3]/25 transition-all duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </motion.button>

                {/* Form Note */}
                <p className="text-xs text-gray-500 text-center">
                  Fields marked with <span className="text-[#00B7B3]">*</span> are required
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
