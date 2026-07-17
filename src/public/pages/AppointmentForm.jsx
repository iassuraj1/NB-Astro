// // public/pages/AppointmentForm.jsx
// import React, { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Loader2, Lock, Shield, Calendar, Clock, User, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
// import { consultationAPI } from '../../admin/services/api';

// // Load Razorpay Script
// const loadRazorpayScript = () => {
//   return new Promise((resolve) => {
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// };

// const AppointmentForm = () => {
//   const { category, slug } = useParams();
//   const navigate = useNavigate();
//   const [service, setService] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [razorpayReady, setRazorpayReady] = useState(false);
  
//   // Time slots
//   const timeSlots = [
//     '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM',
//     '12:00 PM - 01:00 PM', '02:00 PM - 03:00 PM',
//     '03:00 PM - 04:00 PM', '04:00 PM - 05:00 PM',
//     '05:00 PM - 06:00 PM', '06:00 PM - 07:00 PM',
//     '07:00 PM - 08:00 PM'
//   ];
  
//   // Form state
//   const [formData, setFormData] = useState({
//     name: '',
//     occupation: '',
//     email: '',
//     phone: '',
//     birthDetails: { day: '', month: '', year: '', hour: '', minute: '', second: '0', place: '' },
//     address: '',
//     city: '',
//     postcode: '',
//     consultationDate: '',
//     consultationTime: '',
//     timeSlot: '',
//     remarks: '',
//     acceptTerms: false
//   });
  
//   const [errors, setErrors] = useState({});
  
//   useEffect(() => {
//     fetchService();
//     loadRazorpayScript().then(loaded => setRazorpayReady(loaded));
//   }, [slug]);
  
//   const fetchService = async () => {
//     try {
//       const { data } = await consultationAPI.getBySlug(slug);
//       if (data.success && data.data) {
//         setService(data.data);
//       } else {
//         navigate(`/${category}-consultation`);
//       }
//     } catch (error) {
//       navigate(`/${category}-consultation`);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (name.includes('.')) {
//       const [parent, child] = name.split('.');
//       setFormData(prev => ({
//         ...prev,
//         [parent]: { ...prev[parent], [child]: value }
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }));
//     }
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
//   };
  
//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = 'Name is required';
//     if (!formData.email.trim()) newErrors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
//     if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
//     else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
//     if (!formData.address.trim()) newErrors.address = 'Address is required';
//     if (!formData.city.trim()) newErrors.city = 'City is required';
//     if (!formData.postcode.trim()) newErrors.postcode = 'Postcode is required';
//     if (!formData.consultationDate) newErrors.consultationDate = 'Preferred date is required';
//     if (!formData.consultationTime) newErrors.consultationTime = 'Preferred time is required';
//     if (!formData.timeSlot) newErrors.timeSlot = 'Time slot is required';
//     if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept terms and conditions';
    
//     // Birth details for astrology
//     if (category === 'astrology') {
//       if (!formData.birthDetails.day) newErrors['birthDetails.day'] = 'Birth day required';
//       if (!formData.birthDetails.month) newErrors['birthDetails.month'] = 'Birth month required';
//       if (!formData.birthDetails.year) newErrors['birthDetails.year'] = 'Birth year required';
//       if (!formData.birthDetails.hour) newErrors['birthDetails.hour'] = 'Birth hour required';
//       if (!formData.birthDetails.minute) newErrors['birthDetails.minute'] = 'Birth minute required';
//       if (!formData.birthDetails.place) newErrors['birthDetails.place'] = 'Birth place required';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
  
//   const handlePayment = async () => {
//     if (!validateForm()) return;
//     if (!razorpayReady) {
//       alert('Payment system is loading. Please try again.');
//       return;
//     }
    
//     setSubmitting(true);
    
//     try {
//       // Create Razorpay Order
//       const orderResponse = await fetch('/api/payment/create-order', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ amount: service.priceNumeric })
//       });
      
//       const order = await orderResponse.json();
      
//       const options = {
//         key: process.env.REACT_APP_RAZORPAY_KEY_ID,
//         amount: order.amount,
//         currency: 'INR',
//         name: 'NB Astro',
//         description: `${service.title} Consultation`,
//         image: '/logo.png',
//         order_id: order.id,
//         prefill: {
//           name: formData.name,
//           email: formData.email,
//           contact: formData.phone
//         },
//         theme: { color: '#00B7B3' },
//         handler: async (response) => {
//           // Verify Payment & Save Appointment
//           const verifyResponse = await fetch('/api/payment/verify-payment', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               formData: {
//                 ...formData,
//                 serviceId: service._id,
//                 consultationDate: formData.consultationDate,
//                 consultationTime: formData.consultationTime,
//                 timeSlot: formData.timeSlot
//               }
//             })
//           });
          
//           const result = await verifyResponse.json();
          
//           if (result.success) {
//             alert('✅ Appointment Booked Successfully!');
//             navigate(`/appointment/confirmation/${result.appointment.bookingId}`);
//           } else {
//             alert('Payment verification failed. Please contact support.');
//           }
//         },
//         modal: {
//           ondismiss: () => setSubmitting(false)
//         }
//       };
      
//       const razorpayInstance = new window.Razorpay(options);
//       razorpayInstance.open();
      
//     } catch (error) {
//       console.error('Payment error:', error);
//       alert('Something went wrong. Please try again.');
//     } finally {
//       setSubmitting(false);
//     }
//   };
  
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <Loader2 className="w-12 h-12 text-[#00B7B3] animate-spin" />
//       </div>
//     );
//   }
  
//   if (!service) return null;
  
//   return (
//     <>
//       <Helmet>
//         <title>Book {service.title} Consultation | NB Astro</title>
//         <meta name="description" content={`Book ${service.title} consultation with Naveen Bhagat Ji. Secure online booking with instant confirmation.`} />
//       </Helmet>
      
//       <div className="min-h-screen bg-gradient-to-b from-black via-black to-[#0a0c12]">
//         {/* Breadcrumb */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
//           <div className="flex items-center gap-2 text-sm flex-wrap">
//             <Link href="/" className="text-gray-500 hover:text-[#00B7B3]">Home</Link>
//             <span className="text-gray-600">/</span>
//             <Link href={`/${category}-consultation`} className="text-gray-500 hover:text-[#00B7B3]">{category === 'astrology' ? 'Astrology Consultation' : 'Vastu Consultation'}</Link>
//             <span className="text-gray-600">/</span>
//             <Link href={`/consultation/${category}/${slug}`} className="text-gray-500 hover:text-[#00B7B3]">{service.title}</Link>
//             <span className="text-gray-600">/</span>
//             <span className="text-[#00B7B3]">Make Appointment</span>
//           </div>
//         </div>
        
//         {/* Header */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
//             Consultation For <span className="text-[#00B7B3]">{service.title}</span>
//           </h1>
//           <p className="text-gray-400">Fill the form below to book your consultation. Secure payment via Razorpay.</p>
//         </div>
        
//         {/* Form */}
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//           <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6 md:p-8">
//             {/* Personal Information */}
//             <div className="mb-8">
//               <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
//                 <User className="w-5 h-5 text-[#00B7B3]" /> Personal Information
//               </h2>
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-gray-300 mb-1 text-sm">Full Name *</label>
//                   <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" />
//                   {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-gray-300 mb-1 text-sm">Occupation</label>
//                   <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" />
//                 </div>
//                 <div>
//                   <label className="block text-gray-300 mb-1 text-sm">Email Address *</label>
//                   <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" />
//                   {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-gray-300 mb-1 text-sm">Phone Number *</label>
//                   <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" />
//                   {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
//                 </div>
//               </div>
//             </div>
            
//             {/* Birth Details - Only for Astrology */}
//             {category === 'astrology' && (
//               <div className="mb-8">
//                 <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
//                   <Calendar className="w-5 h-5 text-[#00B7B3]" /> Birth Details
//                 </h2>
//                 <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 mb-4">
//                   <p className="text-yellow-500 text-sm">⚠️ Accurate birth details are essential for precise astrological analysis.</p>
//                 </div>
//                 <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
//                   <div><label className="block text-gray-300 mb-1 text-xs">Day</label><input type="number" name="birthDetails.day" value={formData.birthDetails.day} onChange={handleChange} min="1" max="31" className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                   <div><label className="block text-gray-300 mb-1 text-xs">Month</label><input type="number" name="birthDetails.month" value={formData.birthDetails.month} onChange={handleChange} min="1" max="12" className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                   <div><label className="block text-gray-300 mb-1 text-xs">Year</label><input type="number" name="birthDetails.year" value={formData.birthDetails.year} onChange={handleChange} min="1900" max="2024" className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                   <div><label className="block text-gray-300 mb-1 text-xs">Hour</label><input type="number" name="birthDetails.hour" value={formData.birthDetails.hour} onChange={handleChange} min="0" max="23" className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                   <div><label className="block text-gray-300 mb-1 text-xs">Minute</label><input type="number" name="birthDetails.minute" value={formData.birthDetails.minute} onChange={handleChange} min="0" max="59" className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                   <div><label className="block text-gray-300 mb-1 text-xs">Second</label><input type="number" name="birthDetails.second" value={formData.birthDetails.second} onChange={handleChange} min="0" max="59" className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                 </div>
//                 <div className="mt-3"><label className="block text-gray-300 mb-1 text-sm">Birth Place *</label><input type="text" name="birthDetails.place" value={formData.birthDetails.place} onChange={handleChange} className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" /></div>
//               </div>
//             )}
            
//             {/* Address Details */}
//             <div className="mb-8">
//               <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
//                 <MapPin className="w-5 h-5 text-[#00B7B3]" /> Address Details
//               </h2>
//               <div className="space-y-4">
//                 <div><label className="block text-gray-300 mb-1 text-sm">Address *</label><textarea name="address" value={formData.address} onChange={handleChange} rows="2" className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none"></textarea>{errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}</div>
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div><label className="block text-gray-300 mb-1 text-sm">City *</label><input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" /></div>
//                   <div><label className="block text-gray-300 mb-1 text-sm">Post Code *</label><input type="text" name="postcode" value={formData.postcode} onChange={handleChange} className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" /></div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Appointment Details */}
//             <div className="mb-8">
//               <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
//                 <Clock className="w-5 h-5 text-[#00B7B3]" /> Appointment Details
//               </h2>
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div><label className="block text-gray-300 mb-1 text-sm">Preferred Date *</label><input type="date" name="consultationDate" value={formData.consultationDate} onChange={handleChange} className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" /></div>
//                 <div><label className="block text-gray-300 mb-1 text-sm">Preferred Time *</label><input type="time" name="consultationTime" value={formData.consultationTime} onChange={handleChange} className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" /></div>
//                 <div><label className="block text-gray-300 mb-1 text-sm">Select Time Slot *</label><select name="timeSlot" value={formData.timeSlot} onChange={handleChange} className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none"><option value="">Select Your Time Slot</option>{timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}</select></div>
//                 <div><label className="block text-gray-300 mb-1 text-sm">Remarks</label><textarea name="remarks" value={formData.remarks} onChange={handleChange} rows="1" className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" placeholder="Any specific questions?"></textarea></div>
//               </div>
//             </div>
            
//             {/* Payment Section */}
//             <div className="mb-8">
//               <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
//                 <Lock className="w-5 h-5 text-[#00B7B3]" /> Payment Details
//               </h2>
//               <div className="bg-gradient-to-r from-[#00B7B3]/10 to-transparent border border-[#00B7B3]/20 rounded-xl p-4">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="text-gray-300">Consultation Fee</span>
//                   <span className="text-2xl font-bold text-[#00B7B3]">{service.price}</span>
//                 </div>
//                 <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#00B7B3]/20">
//                   <img src="https://razorpay.com/favicon.png" alt="Razorpay" className="w-5 h-5" />
//                   <span className="text-gray-400 text-sm">Secure payment powered by Razorpay</span>
//                 </div>
//                 <div className="mt-4">
//                   <label className="flex items-center gap-2 cursor-pointer">
//                     <input type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} className="w-4 h-4 accent-[#00B7B3]" />
//                     <span className="text-gray-300 text-sm">I accept all <Link href="/terms" className="text-[#00B7B3] hover:underline">Terms and Conditions</Link></span>
//                   </label>
//                   {errors.acceptTerms && <p className="text-red-400 text-xs mt-1">{errors.acceptTerms}</p>}
//                 </div>
//               </div>
//             </div>
            
//             {/* Submit Button */}
//             <button onClick={handlePayment} disabled={submitting} className="w-full py-4 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-[#00B7B3]/30 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
//               {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Shield className="w-5 h-5" />}
//               {submitting ? 'Processing...' : `Pay ${service.price} via Razorpay`}
//             </button>
            
//             <p className="text-center text-gray-500 text-xs mt-4">🔒 256-bit SSL Secure | Razorpay Trusted Payment Gateway</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AppointmentForm;


// import React, { useState, useEffect } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { 
//   Loader2, Lock, Shield, Calendar, Clock, User, Mail, Phone, 
//   MapPin, Briefcase, DollarSign, CreditCard, ChevronDown, 
//   CheckCircle, AlertCircle, CalendarDays 
// } from 'lucide-react';
// import { consultationAPI } from '../../admin/services/api';

// // ==================== CONSTANTS ====================

// // All Countries Currency List
// const CURRENCIES = [
//   { code: 'INR', symbol: '₹', name: 'Indian Rupee', country: 'India', rate: 1.00 },
//   { code: 'USD', symbol: '$', name: 'US Dollar', country: 'United States', rate: 0.012 },
//   { code: 'EUR', symbol: '€', name: 'Euro', country: 'European Union', rate: 0.011 },
//   { code: 'GBP', symbol: '£', name: 'British Pound', country: 'United Kingdom', rate: 0.0095 },
//   { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', country: 'UAE', rate: 0.044 },
//   { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', country: 'Saudi Arabia', rate: 0.045 },
//   { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', country: 'Canada', rate: 0.016 },
//   { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', country: 'Australia', rate: 0.018 },
//   { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', country: 'Singapore', rate: 0.016 },
//   { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', country: 'Malaysia', rate: 0.056 },
//   { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', country: 'New Zealand', rate: 0.019 },
//   { code: 'JPY', symbol: '¥', name: 'Japanese Yen', country: 'Japan', rate: 1.80 },
//   { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', country: 'China', rate: 0.086 },
//   { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', country: 'Hong Kong', rate: 0.093 },
//   { code: 'KRW', symbol: '₩', name: 'South Korean Won', country: 'South Korea', rate: 16.2 },
//   { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc', country: 'Switzerland', rate: 0.0105 },
//   { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', country: 'Sweden', rate: 0.125 },
//   { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', country: 'Norway', rate: 0.127 },
//   { code: 'DKK', symbol: 'kr', name: 'Danish Krone', country: 'Denmark', rate: 0.083 },
//   { code: 'ZAR', symbol: 'R', name: 'South African Rand', country: 'South Africa', rate: 0.22 },
//   { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', country: 'Brazil', rate: 0.065 },
//   { code: 'MXN', symbol: '$', name: 'Mexican Peso', country: 'Mexico', rate: 0.20 },
//   { code: 'TRY', symbol: '₺', name: 'Turkish Lira', country: 'Turkey', rate: 0.38 },
//   { code: 'RUB', symbol: '₽', name: 'Russian Ruble', country: 'Russia', rate: 1.05 },
//   { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', country: 'Indonesia', rate: 192 },
//   { code: 'THB', symbol: '฿', name: 'Thai Baht', country: 'Thailand', rate: 0.43 },
//   { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', country: 'Vietnam', rate: 298 },
//   { code: 'PHP', symbol: '₱', name: 'Philippine Peso', country: 'Philippines', rate: 0.68 },
//   { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee', country: 'Pakistan', rate: 3.33 },
//   { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', country: 'Bangladesh', rate: 1.32 },
//   { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee', country: 'Sri Lanka', rate: 3.60 },
//   { code: 'NPR', symbol: 'रु', name: 'Nepalese Rupee', country: 'Nepal', rate: 1.60 },
// ];

// // Time Slots
// const TIME_SLOTS = [
//   '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM',
//   '12:00 PM - 01:00 PM', '02:00 PM - 03:00 PM',
//   '03:00 PM - 04:00 PM', '04:00 PM - 05:00 PM',
//   '05:00 PM - 06:00 PM', '06:00 PM - 07:00 PM',
//   '07:00 PM - 08:00 PM'
// ];

// // Load Razorpay Script
// const loadRazorpayScript = () => {
//   return new Promise((resolve) => {
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// };

// // Helper: Get current date in YYYY-MM-DD
// const getTodayDate = () => {
//   const today = new Date();
//   return today.toISOString().split('T')[0];
// };

// // Helper: Get max date (60 days from now)
// const getMaxDate = () => {
//   const max = new Date();
//   max.setDate(max.getDate() + 60);
//   return max.toISOString().split('T')[0];
// };

// const AppointmentForm = () => {
//   const { category, slug } = useParams();
//   const navigate = useNavigate();
//   const [service, setService] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [razorpayReady, setRazorpayReady] = useState(false);
  
//   // Currency State
//   const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]); // INR by default
//   const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  
//   // Calendar State
//   const [selectedDate, setSelectedDate] = useState('');
//   const [availableDates, setAvailableDates] = useState([]);
  
//   // Form state
//   const [formData, setFormData] = useState({
//     name: '',
//     occupation: '',
//     email: '',
//     phone: '',
//     birthDetails: { day: '', month: '', year: '', hour: '', minute: '', second: '0', place: '' },
//     address: '',
//     city: '',
//     postcode: '',
//     consultationDate: '',
//     consultationTime: '',
//     timeSlot: '',
//     remarks: '',
//     acceptTerms: false
//   });
  
//   const [errors, setErrors] = useState({});
  
//   // Calculate converted price
//   const getConvertedPrice = () => {
//     if (!service) return { amount: 0, display: '₹0' };
//     const converted = service.priceNumeric * selectedCurrency.rate;
//     return {
//       amount: Math.round(converted),
//       display: `${selectedCurrency.symbol}${Math.round(converted)}`,
//       symbol: selectedCurrency.symbol,
//       code: selectedCurrency.code
//     };
//   };
  
//   useEffect(() => {
//     fetchService();
//     loadRazorpayScript().then(loaded => setRazorpayReady(loaded));
//     generateAvailableDates();
//   }, [slug]);
  
//   const fetchService = async () => {
//     try {
//       const { data } = await consultationAPI.getBySlug(slug);
//       if (data.success && data.data) {
//         setService(data.data);
//       } else {
//         navigate(`/${category}-consultation`);
//       }
//     } catch (error) {
//       navigate(`/${category}-consultation`);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   // Generate next 30 available dates
//   const generateAvailableDates = () => {
//     const dates = [];
//     const today = new Date();
//     for (let i = 1; i <= 30; i++) {
//       const date = new Date(today);
//       date.setDate(today.getDate() + i);
//       const dateStr = date.toISOString().split('T')[0];
//       dates.push({
//         value: dateStr,
//         label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
//         dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
//         fullDate: date
//       });
//     }
//     setAvailableDates(dates);
//   };
  
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (name.includes('.')) {
//       const [parent, child] = name.split('.');
//       setFormData(prev => ({
//         ...prev,
//         [parent]: { ...prev[parent], [child]: value }
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }));
//     }
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
//   };
  
//   const handleDateSelect = (dateValue) => {
//     setFormData(prev => ({ ...prev, consultationDate: dateValue }));
//     setSelectedDate(dateValue);
//     if (errors.consultationDate) setErrors(prev => ({ ...prev, consultationDate: '' }));
//   };
  
//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = 'Name is required';
//     if (!formData.email.trim()) newErrors.email = 'Email is required';
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
//     if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
//     else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
//     if (!formData.address.trim()) newErrors.address = 'Address is required';
//     if (!formData.city.trim()) newErrors.city = 'City is required';
//     if (!formData.postcode.trim()) newErrors.postcode = 'Postcode is required';
//     if (!formData.consultationDate) newErrors.consultationDate = 'Please select a date';
//     if (!formData.consultationTime) newErrors.consultationTime = 'Preferred time is required';
//     if (!formData.timeSlot) newErrors.timeSlot = 'Time slot is required';
//     if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept terms and conditions';
    
//     // Birth details for astrology
//     if (category === 'astrology') {
//       if (!formData.birthDetails.day) newErrors['birthDetails.day'] = 'Birth day required';
//       if (!formData.birthDetails.month) newErrors['birthDetails.month'] = 'Birth month required';
//       if (!formData.birthDetails.year) newErrors['birthDetails.year'] = 'Birth year required';
//       if (!formData.birthDetails.hour) newErrors['birthDetails.hour'] = 'Birth hour required';
//       if (!formData.birthDetails.minute) newErrors['birthDetails.minute'] = 'Birth minute required';
//       if (!formData.birthDetails.place) newErrors['birthDetails.place'] = 'Birth place required';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
  
//   const handlePayment = async () => {
//     if (!validateForm()) return;
//     if (!razorpayReady) {
//       alert('Payment system is loading. Please try again.');
//       return;
//     }
    
//     setSubmitting(true);
    
//     try {
//       const convertedPrice = getConvertedPrice();
      
//       // Create Razorpay Order
//       const orderResponse = await fetch('/api/payment/create-order', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//           amount: convertedPrice.amount,
//           currency: selectedCurrency.code
//         })
//       });
      
//       const order = await orderResponse.json();
      
//       const options = {
//         key: process.env.REACT_APP_RAZORPAY_KEY_ID,
//         amount: order.amount,
//         currency: selectedCurrency.code,
//         name: 'NB Astro',
//         description: `${service.title} Consultation`,
//         image: '/logo.png',
//         order_id: order.id,
//         prefill: {
//           name: formData.name,
//           email: formData.email,
//           contact: formData.phone
//         },
//         theme: { color: '#00B7B3' },
//         handler: async (response) => {
//           // Verify Payment & Save Appointment
//           const verifyResponse = await fetch('/api/payment/verify-payment', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               formData: {
//                 ...formData,
//                 serviceId: service._id,
//                 consultationDate: formData.consultationDate,
//                 consultationTime: formData.consultationTime,
//                 timeSlot: formData.timeSlot,
//                 currency: selectedCurrency.code,
//                 amountPaid: convertedPrice.amount
//               }
//             })
//           });
          
//           const result = await verifyResponse.json();
          
//           if (result.success) {
//             alert('✅ Appointment Booked Successfully!');
//             navigate(`/appointment/confirmation/${result.appointment.bookingId}`);
//           } else {
//             alert('Payment verification failed. Please contact support.');
//           }
//         },
//         modal: {
//           ondismiss: () => setSubmitting(false)
//         }
//       };
      
//       const razorpayInstance = new window.Razorpay(options);
//       razorpayInstance.open();
      
//     } catch (error) {
//       console.error('Payment error:', error);
//       alert('Something went wrong. Please try again.');
//     } finally {
//       setSubmitting(false);
//     }
//   };
  
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <Loader2 className="w-12 h-12 text-[#00B7B3] animate-spin" />
//       </div>
//     );
//   }
  
//   if (!service) return null;
  
//   const convertedPrice = getConvertedPrice();
  
//   return (
//     <>
//       <Helmet>
//         <title>Book {service.title} Consultation | NB Astro</title>
//         <meta name="description" content={`Book ${service.title} consultation with Naveen Bhagat Ji. Secure online booking with instant confirmation.`} />
//       </Helmet>
      
//       <div className="min-h-screen bg-gradient-to-b from-black via-black to-[#0a0c12]">
//         {/* Breadcrumb */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
//           <div className="flex items-center gap-2 text-sm flex-wrap">
//             <Link href="/" className="text-gray-500 hover:text-[#00B7B3]">Home</Link>
//             <span className="text-gray-600">/</span>
//             <Link href={`/${category}-consultation`} className="text-gray-500 hover:text-[#00B7B3]">{category === 'astrology' ? 'Astrology Consultation' : 'Vastu Consultation'}</Link>
//             <span className="text-gray-600">/</span>
//             <Link href={`/consultation/${category}/${slug}`} className="text-gray-500 hover:text-[#00B7B3]">{service.title}</Link>
//             <span className="text-gray-600">/</span>
//             <span className="text-[#00B7B3]">Make Appointment</span>
//           </div>
//         </div>
        
//         {/* Header */}
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
//             Consultation For <span className="text-[#00B7B3]">{service.title}</span>
//           </h1>
//           <p className="text-gray-400">Fill the form below to book your consultation. Secure payment via Razorpay.</p>
//         </div>
        
//         {/* Form */}
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//           <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6 md:p-8">
//             {/* Personal Information */}
//             <div className="mb-8">
//               <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
//                 <User className="w-5 h-5 text-[#00B7B3]" /> Personal Information
//               </h2>
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-gray-300 mb-1 text-sm">Full Name *</label>
//                   <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" />
//                   {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-gray-300 mb-1 text-sm">Occupation</label>
//                   <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" />
//                 </div>
//                 <div>
//                   <label className="block text-gray-300 mb-1 text-sm">Email Address *</label>
//                   <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" />
//                   {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-gray-300 mb-1 text-sm">Phone Number *</label>
//                   <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" />
//                   {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
//                 </div>
//               </div>
//             </div>
            
//             {/* Birth Details - Only for Astrology */}
//             {category === 'astrology' && (
//               <div className="mb-8">
//                 <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
//                   <Calendar className="w-5 h-5 text-[#00B7B3]" /> Birth Details
//                 </h2>
//                 <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 mb-4">
//                   <p className="text-yellow-500 text-sm flex items-center gap-2">
//                     <AlertCircle className="w-4 h-4" />
//                     Accurate birth details are essential for precise astrological analysis.
//                   </p>
//                 </div>
//                 <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
//                   <div><label className="block text-gray-300 mb-1 text-xs">Day</label><input type="number" name="birthDetails.day" value={formData.birthDetails.day} onChange={handleChange} min="1" max="31" className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                   <div><label className="block text-gray-300 mb-1 text-xs">Month</label><input type="number" name="birthDetails.month" value={formData.birthDetails.month} onChange={handleChange} min="1" max="12" className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                   <div><label className="block text-gray-300 mb-1 text-xs">Year</label><input type="number" name="birthDetails.year" value={formData.birthDetails.year} onChange={handleChange} min="1900" max="2024" className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                   <div><label className="block text-gray-300 mb-1 text-xs">Hour</label><input type="number" name="birthDetails.hour" value={formData.birthDetails.hour} onChange={handleChange} min="0" max="23" className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                   <div><label className="block text-gray-300 mb-1 text-xs">Minute</label><input type="number" name="birthDetails.minute" value={formData.birthDetails.minute} onChange={handleChange} min="0" max="59" className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                   <div><label className="block text-gray-300 mb-1 text-xs">Second</label><input type="number" name="birthDetails.second" value={formData.birthDetails.second} onChange={handleChange} min="0" max="59" className="w-full px-3 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                 </div>
//                 <div className="mt-3"><label className="block text-gray-300 mb-1 text-sm">Birth Place *</label><input type="text" name="birthDetails.place" value={formData.birthDetails.place} onChange={handleChange} className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" placeholder="City, State, Country" /></div>
//                 {errors['birthDetails.place'] && <p className="text-red-400 text-xs mt-1">{errors['birthDetails.place']}</p>}
//               </div>
//             )}
            
//             {/* Address Details */}
//             <div className="mb-8">
//               <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
//                 <MapPin className="w-5 h-5 text-[#00B7B3]" /> Address Details
//               </h2>
//               <div className="space-y-4">
//                 <div><label className="block text-gray-300 mb-1 text-sm">Address *</label><textarea name="address" value={formData.address} onChange={handleChange} rows="2" className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none"></textarea>{errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}</div>
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <div><label className="block text-gray-300 mb-1 text-sm">City *</label><input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" /></div>
//                   <div><label className="block text-gray-300 mb-1 text-sm">Post Code *</label><input type="text" name="postcode" value={formData.postcode} onChange={handleChange} className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" /></div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Appointment Details with Calendar */}
//             <div className="mb-8">
//               <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
//                 <CalendarDays className="w-5 h-5 text-[#00B7B3]" /> Select Date & Time
//               </h2>
              
//               {/* Calendar Date Picker */}
//               <div className="mb-4">
//                 <label className="block text-gray-300 mb-2 text-sm">Select Consultation Date *</label>
//                 <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
//                   {availableDates.map((date) => (
//                     <button
//                       key={date.value}
//                       type="button"
//                       onClick={() => handleDateSelect(date.value)}
//                       className={`p-3 rounded-xl text-center transition-all ${
//                         formData.consultationDate === date.value
//                           ? 'bg-[#00B7B3] text-black font-bold shadow-lg shadow-[#00B7B3]/30'
//                           : 'bg-gray-800/50 border border-gray-700 text-gray-300 hover:border-[#00B7B3] hover:bg-gray-800'
//                       }`}
//                     >
//                       <div className="text-xs font-medium">{date.dayName.substring(0, 3)}</div>
//                       <div className="text-lg font-bold">{date.label.split(' ')[2]}</div>
//                       <div className="text-xs opacity-70">{date.label.split(' ')[1]}</div>
//                     </button>
//                   ))}
//                 </div>
//                 {errors.consultationDate && <p className="text-red-400 text-xs mt-2">{errors.consultationDate}</p>}
//               </div>
              
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-gray-300 mb-1 text-sm">Preferred Time *</label>
//                   <input type="time" name="consultationTime" value={formData.consultationTime} onChange={handleChange} className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" />
//                   {errors.consultationTime && <p className="text-red-400 text-xs mt-1">{errors.consultationTime}</p>}
//                 </div>
//                 <div>
//                   <label className="block text-gray-300 mb-1 text-sm">Select Time Slot *</label>
//                   <select name="timeSlot" value={formData.timeSlot} onChange={handleChange} className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none">
//                     <option value="">Select Your Time Slot</option>
//                     {TIME_SLOTS.map(slot => (
//                       <option key={slot} value={slot}>{slot}</option>
//                     ))}
//                   </select>
//                   {errors.timeSlot && <p className="text-red-400 text-xs mt-1">{errors.timeSlot}</p>}
//                 </div>
//                 <div className="md:col-span-2">
//                   <label className="block text-gray-300 mb-1 text-sm">Remarks (Optional)</label>
//                   <textarea name="remarks" value={formData.remarks} onChange={handleChange} rows="1" className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" placeholder="Any specific questions or instructions?" />
//                 </div>
//               </div>
//             </div>
            
//             {/* Payment Section with Currency Dropdown */}
//             <div className="mb-8">
//               <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
//                 <CreditCard className="w-5 h-5 text-[#00B7B3]" /> Payment Details
//               </h2>
//               <div className="bg-gradient-to-r from-[#00B7B3]/10 to-transparent border border-[#00B7B3]/20 rounded-xl p-4">
//                 {/* Currency Selector */}
//                 <div className="mb-4">
//                   <label className="block text-gray-300 mb-2 text-sm">Choose Currency For Payments *</label>
//                   <div className="relative">
//                     <button
//                       type="button"
//                       onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
//                       className="w-full flex items-center justify-between px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white hover:border-[#00B7B3] transition-all"
//                     >
//                       <div className="flex items-center gap-3">
//                         <span className="text-xl">{selectedCurrency.symbol}</span>
//                         <span>{selectedCurrency.name}</span>
//                         <span className="text-gray-400 text-sm">({selectedCurrency.code})</span>
//                       </div>
//                       <ChevronDown className={`w-4 h-4 transition-transform ${showCurrencyDropdown ? 'rotate-180' : ''}`} />
//                     </button>
                    
//                     {showCurrencyDropdown && (
//                       <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
//                         {CURRENCIES.map((currency) => (
//                           <button
//                             key={currency.code}
//                             type="button"
//                             onClick={() => {
//                               setSelectedCurrency(currency);
//                               setShowCurrencyDropdown(false);
//                             }}
//                             className={`w-full flex items-center justify-between px-4 py-2.5 hover:bg-gray-800 transition-colors ${
//                               selectedCurrency.code === currency.code ? 'bg-gray-800 text-[#00B7B3]' : 'text-gray-300'
//                             }`}
//                           >
//                             <div className="flex items-center gap-3">
//                               <span className="text-lg">{currency.symbol}</span>
//                               <span>{currency.name}</span>
//                               <span className="text-gray-500 text-xs">({currency.code})</span>
//                             </div>
//                             {selectedCurrency.code === currency.code && (
//                               <CheckCircle className="w-4 h-4 text-[#00B7B3]" />
//                             )}
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 </div>
                
//                 {/* Price Display */}
//                 <div className="flex justify-between items-center mb-3">
//                   <span className="text-gray-300">Consultation Fee</span>
//                   <div className="text-right">
//                     <span className="text-gray-400 text-sm line-through mr-2">{service.price}</span>
//                     <span className="text-2xl font-bold text-[#00B7B3]">{convertedPrice.display}</span>
//                     <span className="text-gray-400 text-xs ml-1">{selectedCurrency.code}</span>
//                   </div>
//                 </div>
                
//                 <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#00B7B3]/20">
//                   <img src="https://razorpay.com/favicon.png" alt="Razorpay" className="w-5 h-5" />
//                   <span className="text-gray-400 text-sm">Secure payment powered by Razorpay</span>
//                 </div>
                
//                 <div className="mt-4">
//                   <label className="flex items-center gap-2 cursor-pointer">
//                     <input type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} className="w-4 h-4 accent-[#00B7B3]" />
//                     <span className="text-gray-300 text-sm">I accept all <Link href="/terms" className="text-[#00B7B3] hover:underline">Terms and Conditions</Link></span>
//                   </label>
//                   {errors.acceptTerms && <p className="text-red-400 text-xs mt-1">{errors.acceptTerms}</p>}
//                 </div>
//               </div>
//             </div>
            
//             {/* Submit Button */}
//             <button 
//               onClick={handlePayment} 
//               disabled={submitting} 
//               className="w-full py-4 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-[#00B7B3]/30 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//             >
//               {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <DollarSign className="w-5 h-5" />}
//               {submitting ? 'Processing...' : `Make Payment Of ${convertedPrice.display} →`}
//             </button>
            
//             <p className="text-center text-gray-500 text-xs mt-4 flex items-center justify-center gap-2">
//               <Lock className="w-3 h-3" /> 256-bit SSL Secure | Razorpay Trusted Payment Gateway
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AppointmentForm;

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet-async';
import { 
  Loader2, Lock, Calendar, User, Mail, Phone, 
  MapPin, CreditCard, ChevronDown, 
  CheckCircle, AlertCircle, ChevronLeft, ChevronRight,
  Clock, Briefcase, MapPinHouse, CalendarDays
} from 'lucide-react';
import { consultationAPI } from '../../admin/services/api';

// ==================== CONSTANTS ====================

// All Countries Currency List
const CURRENCIES = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', country: 'India', rate: 1.00 },
  { code: 'USD', symbol: '$', name: 'US Dollar', country: 'United States', rate: 0.012 },
  { code: 'EUR', symbol: '€', name: 'Euro', country: 'European Union', rate: 0.011 },
  { code: 'GBP', symbol: '£', name: 'British Pound', country: 'United Kingdom', rate: 0.0095 },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', country: 'UAE', rate: 0.044 },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', country: 'Saudi Arabia', rate: 0.045 },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', country: 'Canada', rate: 0.016 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', country: 'Australia', rate: 0.018 },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', country: 'Singapore', rate: 0.016 },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', country: 'Malaysia', rate: 0.056 },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar', country: 'New Zealand', rate: 0.019 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', country: 'Japan', rate: 1.80 },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', country: 'China', rate: 0.086 },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar', country: 'Hong Kong', rate: 0.093 },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won', country: 'South Korea', rate: 16.2 },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc', country: 'Switzerland', rate: 0.0105 },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona', country: 'Sweden', rate: 0.125 },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone', country: 'Norway', rate: 0.127 },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone', country: 'Denmark', rate: 0.083 },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', country: 'South Africa', rate: 0.22 },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', country: 'Brazil', rate: 0.065 },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso', country: 'Mexico', rate: 0.20 },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira', country: 'Turkey', rate: 0.38 },
  { code: 'RUB', symbol: '₽', name: 'Russian Ruble', country: 'Russia', rate: 1.05 },
  { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', country: 'Indonesia', rate: 192 },
  { code: 'THB', symbol: '฿', name: 'Thai Baht', country: 'Thailand', rate: 0.43 },
  { code: 'VND', symbol: '₫', name: 'Vietnamese Dong', country: 'Vietnam', rate: 298 },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso', country: 'Philippines', rate: 0.68 },
  { code: 'PKR', symbol: '₨', name: 'Pakistani Rupee', country: 'Pakistan', rate: 3.33 },
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', country: 'Bangladesh', rate: 1.32 },
  { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee', country: 'Sri Lanka', rate: 3.60 },
  { code: 'NPR', symbol: 'रु', name: 'Nepalese Rupee', country: 'Nepal', rate: 1.60 },
];

// Time Slots
const TIME_SLOTS = [
  '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM',
  '12:00 PM - 01:00 PM', '02:00 PM - 03:00 PM',
  '03:00 PM - 04:00 PM', '04:00 PM - 05:00 PM',
  '05:00 PM - 06:00 PM', '06:00 PM - 07:00 PM',
  '07:00 PM - 08:00 PM'
];

// Load Razorpay Script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const API_BASE_URL = '';
const getImageUrl = (image) => {
  if (!image) return '';
  return image.startsWith('http') ? image : `${API_BASE_URL}${image}`;
};

const AppointmentForm = () => {
  const router = useRouter();
  const { category, slug } = router.query;
  const navigate = useCallback((target) => router.push(target), [router]);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [razorpayReady, setRazorpayReady] = useState(false);
  const [razorpayKey, setRazorpayKey] = useState('');
  const [paymentMessage, setPaymentMessage] = useState(null);
  
  // Currency State
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  
  // Calendar State
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [, setSelectedDate] = useState('');
  const [datesArray, setDatesArray] = useState([]);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    occupation: '',
    email: '',
    phone: '',
    alternatePhone: '',
    gender: '',
    dateOfBirth: '',
    country: '',
    state: '',
    birthDetails: { day: '', month: '', year: '', hour: '', minute: '', second: '0', place: '' },
    address: '',
    city: '',
    pinCode: '',
    consultationDate: '',
    timeSlot: '',
    remarks: '',
    acceptTerms: false
  });
  
  const [errors, setErrors] = useState({});
  
  // Generate calendar dates
  const generateCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayIndex = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    const dates = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayIndex - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      dates.push({
        day: day,
        fullDate: new Date(year, month - 1, day),
        isCurrentMonth: false,
        isPast: new Date(year, month - 1, day) < today,
        value: new Date(year, month - 1, day).toISOString().split('T')[0]
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const fullDate = new Date(year, month, i);
      dates.push({
        day: i,
        fullDate: fullDate,
        isCurrentMonth: true,
        isPast: fullDate < today,
        isToday: fullDate.toDateString() === today.toDateString(),
        value: fullDate.toISOString().split('T')[0]
      });
    }
    
    // Next month days
    const remainingDays = 42 - dates.length;
    for (let i = 1; i <= remainingDays; i++) {
      dates.push({
        day: i,
        fullDate: new Date(year, month + 1, i),
        isCurrentMonth: false,
        isPast: new Date(year, month + 1, i) < today,
        value: new Date(year, month + 1, i).toISOString().split('T')[0]
      });
    }
    
    setDatesArray(dates);
  };
  
  useEffect(() => {
    generateCalendar(currentMonth);
  }, [currentMonth]);
  
  const fetchService = useCallback(async () => {
    try {
      const { data } = await consultationAPI.getBySlug(slug);
      if (data.success && data.data) {
        setService(data.data);
      } else {
        navigate(`/${category}-consultation`);
      }
    } catch {
      navigate(`/${category}-consultation`);
    } finally {
      setLoading(false);
    }
  }, [category, navigate, slug]);
  
  useEffect(() => {
    fetchService();
    loadRazorpayScript().then(loaded => setRazorpayReady(loaded));
    const fetchPaymentConfig = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/payment/config`);
        const result = await response.json();
        if (result?.success && result?.configured && result?.keyId) {
          setRazorpayKey(result.keyId);
        } else {
          setRazorpayKey('');
          setPaymentMessage({
            type: 'failed',
            text: result?.message || 'Razorpay is not configured correctly. Use a Key ID starting with rzp_test_ or rzp_live_ and the matching Key Secret.'
          });
        }
      } catch {
        setRazorpayKey('');
        setPaymentMessage({
          type: 'failed',
          text: 'Could not connect to payment configuration. Please make sure the backend server is running.'
        });
      }
    };
    fetchPaymentConfig();
  }, [fetchService]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };
  
  const handleDateSelect = (dateValue, isPast) => {
    if (isPast) return;
    setFormData(prev => ({ ...prev, consultationDate: dateValue }));
    setSelectedDate(dateValue);
    if (errors.consultationDate) setErrors(prev => ({ ...prev, consultationDate: '' }));
  };
  
  const changeMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };
  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Mobile number is required';
    else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Enter a valid mobile number';
    if (!formData.alternatePhone.trim()) newErrors.alternatePhone = 'Alternate mobile number is required';
    else if (!/^\d{10,15}$/.test(formData.alternatePhone.replace(/\D/g, ''))) newErrors.alternatePhone = 'Enter a valid alternate mobile number';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.occupation.trim()) newErrors.occupation = 'Occupation is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pinCode.trim()) newErrors.pinCode = 'Pin code is required';
    if (!formData.address.trim()) newErrors.address = 'Full address is required';
    if (!formData.remarks.trim()) newErrors.remarks = 'Message / remarks is required';
    if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept terms and conditions';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const getConvertedPrice = () => {
    if (!service) return { amount: 0, display: '₹0' };
    const converted = service.priceNumeric * selectedCurrency.rate;
    return {
      amount: Math.round(converted),
      display: `${selectedCurrency.symbol}${Math.round(converted)}`,
      symbol: selectedCurrency.symbol,
      code: selectedCurrency.code
    };
  };

  const productInfo = service ? {
    id: service._id,
    name: service.title,
    image: getImageUrl(service.image),
    price: service.price || `${service.priceNumeric || 0}`,
    category: service.category || category,
  } : null;
  
  const handlePayment = async () => {
    if (!validateForm()) return;
    if (!razorpayReady) {
      alert('Payment system is loading. Please try again.');
      return;
    }
    if (!razorpayKey) {
      const message = 'Razorpay is not configured correctly. Use a Key ID starting with rzp_test_ or rzp_live_ and the matching Key Secret from Razorpay Dashboard.';
      setPaymentMessage({ type: 'failed', text: message });
      alert(message);
      return;
    }
    
    setSubmitting(true);
    setPaymentMessage({ type: 'pending', text: 'Opening secure Razorpay payment window. Please complete the payment to confirm your booking.' });
    
    try {
      const convertedPrice = getConvertedPrice();
      const bookingFormData = {
        ...formData,
        serviceId: service._id,
        productType: 'consultation',
        productId: service._id,
        productName: service.title,
        productImage: service.image || '',
        productPrice: service.price || String(service.priceNumeric || ''),
        productCategory: service.category || category,
        postcode: formData.pinCode,
        consultationDate: formData.consultationDate,
        timeSlot: formData.timeSlot,
        currency: selectedCurrency.code,
        amountPaid: convertedPrice.amount
      };
      
      const orderResponse = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: convertedPrice.amount,
          currency: selectedCurrency.code,
          formData: bookingFormData
        })
      });
      
      const orderResult = await orderResponse.json();
      if (!orderResponse.ok || orderResult.success === false) {
        const message = orderResult.message || orderResult.error || 'Could not create payment order.';
        setPaymentMessage({ type: 'failed', text: message });
        alert(message);
        return;
      }
      const order = orderResult.order || orderResult;
      if (!order?.id) {
        const message = 'Could not create payment order. Razorpay order ID was not returned.';
        setPaymentMessage({ type: 'failed', text: message });
        alert(message);
        return;
      }
      let paymentCompleted = false;
      
      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: selectedCurrency.code,
        name: 'NB Astro',
        description: `${service.title} Consultation`,
        image: '/logo.png',
        order_id: order.id,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: { color: '#00B7B3' },
        handler: async (response) => {
          paymentCompleted = true;
          const verifyResponse = await fetch('/api/payment/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              formData: bookingFormData
            })
          });
          
          const result = await verifyResponse.json();
          
          if (result.success) {
            setPaymentMessage({ type: 'success', text: result.message || 'Payment successful. Your booking is confirmed.' });
            alert(result.message || 'Payment successful. Your booking is confirmed.');
            navigate(`/appointment/confirmation/${result.appointment.bookingId}`);
          } else {
            setPaymentMessage({ type: 'failed', text: result.message || 'Payment verification failed. Please contact support.' });
            alert(result.message || 'Payment verification failed. Please contact support.');
          }
        },
        modal: {
          ondismiss: async () => {
            setSubmitting(false);
            if (!paymentCompleted) {
              await fetch('/api/payment/payment-cancelled', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId: order.id, reason: 'Payment window closed before completion' })
              }).catch(() => null);
              setPaymentMessage({ type: 'cancelled', text: 'Payment was cancelled. Your booking has not been confirmed.' });
              alert('Payment was cancelled. Your booking has not been confirmed.');
            }
          }
        }
      };
      
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.on('payment.failed', async (response) => {
        paymentCompleted = true;
        const reason = response?.error?.description || response?.error?.reason || 'Payment failed';
        await fetch('/api/payment/payment-failed', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: order.id,
            paymentId: response?.error?.metadata?.payment_id,
            reason
          })
        }).catch(() => null);
        setSubmitting(false);
        setPaymentMessage({ type: 'failed', text: `${reason}. Please try again or contact support.` });
        alert(`${reason}. Please try again or contact support.`);
      });
      razorpayInstance.open();
      
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentMessage({ type: 'failed', text: error.message || 'Something went wrong. Please try again.' });
      alert(error.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#00B7B3] animate-spin" />
      </div>
    );
  }
  
  if (!service) return null;
  
  const convertedPrice = getConvertedPrice();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  return (
    <>
      <Helmet>
        <title>Book {service.title} Consultation | NB Astro</title>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6">
        <div className="max-w-5xl mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-[#00B7B3]">Home</Link>
            <span>/</span>
            <Link href={`/${category}-consultation`} className="hover:text-[#00B7B3]">{category === 'astrology' ? 'Astrology' : 'Vastu'}</Link>
            <span>/</span>
            <span className="text-[#00B7B3] truncate max-w-[250px]">{service.title}</span>
            <span>/</span>
            <span className="text-gray-700">Book Appointment</span>
          </div>
          
          {/* Main Form Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header with Service Image & Details */}
            <div className="bg-gradient-to-r from-[#00B7B3] to-teal-600 px-6 py-5">
              <div className="flex items-center gap-5">
                {/* Service Image */}
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center overflow-hidden backdrop-blur-sm">
                  {service.image ? (
                    <img src={getImageUrl(service.image)} alt={service.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-white text-3xl font-bold">
                      {category === 'astrology' ? '⭐' : '🏠'}
                    </div>
                  )}
                </div>
                
                {/* Service Info */}
                <div className="flex-1">
                  <h1 className="text-xl font-bold text-white mb-1">{service.title}</h1>
                  <p className="text-teal-100 text-sm">{service.quickDescription?.substring(0, 100)}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-white/80">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 60 mins</span>
                    <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {service.expert || 'Naveen Bhagat Ji'}</span>
                  </div>
                </div>
                
                {/* Price Tag */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{service.price}</div>
                  <div className="text-teal-100 text-xs">Inclusive of taxes</div>
                </div>
              </div>
            </div>
            
            {/* Form Body */}
            <div className="p-6">
              {productInfo && (
                <div className="mb-6 rounded-xl border border-teal-200 bg-teal-50/70 p-4">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-[#007f7b] mb-3">
                    You are booking
                  </h2>
                  <div className="grid md:grid-cols-[96px_1fr] gap-4">
                    <div>
                      <span className="block text-gray-500 text-sm mb-1">Product Image</span>
                      <div className="h-24 w-24 overflow-hidden rounded-xl bg-white border border-teal-100">
                        {productInfo.image ? (
                          <img src={productInfo.image} alt={productInfo.name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-[#00B7B3] font-bold">NB</div>
                        )}
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3 text-sm">
                      <div><span className="block text-gray-500">Product ID</span><span className="font-semibold text-gray-900 break-all">{productInfo.id}</span></div>
                      <div><span className="block text-gray-500">Product Name</span><span className="font-semibold text-gray-900">{productInfo.name}</span></div>
                      <div><span className="block text-gray-500">Product Price</span><span className="font-semibold text-gray-900">{productInfo.price}</span></div>
                      <div><span className="block text-gray-500">Product Category</span><span className="font-semibold text-gray-900 capitalize">{productInfo.category}</span></div>
                    </div>
                  </div>
                </div>
              )}

              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-[#00B7B3]" /> Personal & Contact Details
              </h2>
              
              {/* 2 Column Grid Form */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Full Name <span className="text-red-500">*</span></label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#00B7B3] focus:ring-1 focus:ring-[#00B7B3] outline-none transition" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Email Address <span className="text-red-500">*</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#00B7B3] focus:ring-1 focus:ring-[#00B7B3] outline-none transition" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Mobile Number <span className="text-red-500">*</span></label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#00B7B3] focus:ring-1 focus:ring-[#00B7B3] outline-none transition" />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Alternate Mobile Number <span className="text-red-500">*</span></label>
                  <input type="tel" name="alternatePhone" value={formData.alternatePhone} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#00B7B3] focus:ring-1 focus:ring-[#00B7B3] outline-none transition" />
                  {errors.alternatePhone && <p className="text-red-500 text-xs mt-1">{errors.alternatePhone}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Gender <span className="text-red-500">*</span></label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#00B7B3] focus:ring-1 focus:ring-[#00B7B3] outline-none transition">
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Date of Birth <span className="text-red-500">*</span></label>
                  <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#00B7B3] focus:ring-1 focus:ring-[#00B7B3] outline-none transition" />
                  {errors.dateOfBirth && <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Occupation <span className="text-red-500">*</span></label>
                  <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#00B7B3] focus:ring-1 focus:ring-[#00B7B3] outline-none transition" />
                  {errors.occupation && <p className="text-red-500 text-xs mt-1">{errors.occupation}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Country <span className="text-red-500">*</span></label>
                  <input type="text" name="country" value={formData.country} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#00B7B3] focus:ring-1 focus:ring-[#00B7B3] outline-none transition" />
                  {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">State <span className="text-red-500">*</span></label>
                  <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#00B7B3] focus:ring-1 focus:ring-[#00B7B3] outline-none transition" />
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">City <span className="text-red-500">*</span></label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#00B7B3] focus:ring-1 focus:ring-[#00B7B3] outline-none transition" />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-1">Pin Code <span className="text-red-500">*</span></label>
                  <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#00B7B3] focus:ring-1 focus:ring-[#00B7B3] outline-none transition" />
                  {errors.pinCode && <p className="text-red-500 text-xs mt-1">{errors.pinCode}</p>}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 text-sm mb-1">Full Address <span className="text-red-500">*</span></label>
                <textarea name="address" value={formData.address} onChange={handleChange} rows="2" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#00B7B3] focus:ring-1 focus:ring-[#00B7B3] outline-none transition"></textarea>
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
              
              {/* Date & Time Selection */}
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#00B7B3]" /> Preferred Date & Time
                </h2>
                
                {/* Calendar */}
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-3">
                  <div className="flex justify-between items-center mb-3">
                    <button type="button" onClick={() => changeMonth(-1)} className="p-1 hover:bg-gray-200 rounded-lg">
                      <ChevronLeft className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="text-gray-800 font-medium">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
                    <button type="button" onClick={() => changeMonth(1)} className="p-1 hover:bg-gray-200 rounded-lg">
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                      <div key={day} className="text-center text-gray-500 text-xs py-1">{day}</div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1">
                    {datesArray.map((date, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleDateSelect(date.value, date.isPast)}
                        disabled={date.isPast}
                        className={`
                          text-center py-2 rounded-lg text-sm transition-all
                          ${date.isPast ? 'text-gray-400 cursor-not-allowed bg-gray-100' : 'cursor-pointer'}
                          ${!date.isPast && date.value === formData.consultationDate ? 'bg-[#00B7B3] text-white font-bold' : ''}
                          ${!date.isPast && date.value !== formData.consultationDate && date.isCurrentMonth ? 'text-gray-700 hover:bg-gray-200' : ''}
                          ${!date.isPast && !date.isCurrentMonth ? 'text-gray-400 hover:bg-gray-200' : ''}
                          ${date.isToday && !date.isPast && date.value !== formData.consultationDate ? 'border border-[#00B7B3]' : ''}
                        `}
                      >
                        {date.day}
                      </button>
                    ))}
                  </div>
                </div>
                {errors.consultationDate && <p className="text-red-500 text-xs mt-1">{errors.consultationDate}</p>}
              </div>
              
              {/* Time Slot Dropdown */}
              <div className="mt-4">
                <label className="block text-gray-700 text-sm mb-1">Select Time Slot</label>
                <select name="timeSlot" value={formData.timeSlot} onChange={handleChange} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#00B7B3] focus:ring-1 focus:ring-[#00B7B3] outline-none transition">
                  <option value="">Select Your Time Slot</option>
                  {TIME_SLOTS.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
                {errors.timeSlot && <p className="text-red-500 text-xs mt-1">{errors.timeSlot}</p>}
              </div>
              
              {/* Remarks */}
              <div className="mt-4">
                <label className="block text-gray-700 text-sm mb-1">Message / Remarks <span className="text-red-500">*</span></label>
                <textarea name="remarks" value={formData.remarks} onChange={handleChange} rows="2" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#00B7B3] focus:ring-1 focus:ring-[#00B7B3] outline-none transition" placeholder="Any specific questions or instructions?"></textarea>
                {errors.remarks && <p className="text-red-500 text-xs mt-1">{errors.remarks}</p>}
              </div>
              
              {/* Payment Section */}
              <div className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-white border border-teal-200 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#00B7B3]" /> Payment Details
                </h3>
                
                <div className="relative mb-3">
                  <label className="block text-gray-700 text-sm mb-1">Choose Currency</label>
                  <button
                    type="button"
                    onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                    className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-800"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{selectedCurrency.symbol}</span>
                      <span>{selectedCurrency.name}</span>
                      <span className="text-gray-400 text-xs">({selectedCurrency.code})</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showCurrencyDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showCurrencyDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto">
                      {CURRENCIES.map(currency => (
                        <button
                          key={currency.code}
                          type="button"
                          onClick={() => { setSelectedCurrency(currency); setShowCurrencyDropdown(false); }}
                          className={`w-full flex items-center justify-between px-4 py-2 hover:bg-gray-50 text-left ${selectedCurrency.code === currency.code ? 'bg-teal-50 text-[#00B7B3]' : 'text-gray-700'}`}
                        >
                          <span>{currency.symbol} {currency.name}</span>
                          <span className="text-xs text-gray-400">{currency.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t border-teal-200">
                  <span className="text-gray-600">Total Amount</span>
                  <div>
                    <span className="text-2xl font-bold text-[#00B7B3]">{convertedPrice.display}</span>
                    <span className="text-gray-400 text-xs ml-1">({selectedCurrency.code})</span>
                  </div>
                </div>
              </div>
              
              {/* Terms */}
              <label className="flex items-center gap-2 mt-4 cursor-pointer">
                <input type="checkbox" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} className="w-4 h-4 accent-[#00B7B3]" />
                <span className="text-gray-600 text-sm">I accept all <Link href="/terms" className="text-[#00B7B3] hover:underline">Terms and Conditions</Link></span>
              </label>
              {errors.acceptTerms && <p className="text-red-500 text-xs mt-1">{errors.acceptTerms}</p>}

              {paymentMessage && (
                <div className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
                  paymentMessage.type === 'success'
                    ? 'border-green-200 bg-green-50 text-green-700'
                    : paymentMessage.type === 'failed' || paymentMessage.type === 'cancelled'
                      ? 'border-red-200 bg-red-50 text-red-700'
                      : 'border-yellow-200 bg-yellow-50 text-yellow-700'
                }`}>
                  {paymentMessage.text}
                </div>
              )}
              
              {/* Submit Button */}
              <button 
                onClick={handlePayment} 
                disabled={submitting} 
                className="w-full mt-6 py-3.5 bg-gradient-to-r from-[#00B7B3] to-teal-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lock className="w-4 h-4" />}
                {submitting ? 'Processing...' : `Pay ${convertedPrice.display} & Book Appointment`}
              </button>
              
              <p className="text-center text-gray-400 text-xs mt-3 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" /> 256-bit SSL Secure | Powered by Razorpay
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentForm;
