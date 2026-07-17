import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { CreditCard, Loader2, Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { courseAPI } from '../../admin/services/api';

const API_BASE_URL = '';

const CURRENCIES = [
  { code: 'INR', symbol: 'Rs.', name: 'Indian Rupee', rate: 1 },
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 0.012 },
  { code: 'EUR', symbol: 'EUR', name: 'Euro', rate: 0.011 },
  { code: 'GBP', symbol: 'GBP', name: 'British Pound', rate: 0.0095 },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham', rate: 0.044 },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rate: 0.016 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 0.018 },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 0.016 },
];

const loadRazorpayScript = () => new Promise((resolve) => {
  if (typeof window !== 'undefined' && window.Razorpay) {
    resolve(true);
    return;
  }
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.onload = () => resolve(true);
  script.onerror = () => resolve(false);
  document.body.appendChild(script);
});

const getImageUrl = (image) => {
  if (!image) return '';
  return image.startsWith('http') ? image : `${API_BASE_URL}${image}`;
};

const parseAmount = (course) => {
  const raw = course?.price || course?.courseFee || course?.discountPrice || '';
  const value = String(raw).replace(/[^\d.]/g, '');
  return Number(value) || 0;
};

const CourseRegistrationPage = () => {
  const router = useRouter();
  const { courseSlug } = router.query;
  const navigate = (target) => router.push(target);

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [razorpayReady, setRazorpayReady] = useState(false);
  const [razorpayKey, setRazorpayKey] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState(null);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    occupation: '',
    email: '',
    phone: '',
    alternatePhone: '',
    gender: '',
    dateOfBirth: '',
    country: '',
    state: '',
    address: '',
    city: '',
    pinCode: '',
    remarks: '',
    currency: 'INR',
  });

  const selectedCurrency = useMemo(
    () => CURRENCIES.find((currency) => currency.code === registrationData.currency) || CURRENCIES[0],
    [registrationData.currency]
  );

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const { data } = await courseAPI.getBySlug(courseSlug);
        setCourse(data.course || data.data || null);
      } catch {
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

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
            text: result?.message || 'Razorpay is not configured correctly. Use a Key ID starting with rzp_test_ or rzp_live_ and the matching Key Secret.',
          });
        }
      } catch {
        setRazorpayKey('');
        setPaymentMessage({
          type: 'failed',
          text: 'Could not connect to payment configuration. Please make sure the backend server is running.',
        });
      }
    };

    if (courseSlug) fetchCourse();
    loadRazorpayScript().then(setRazorpayReady);
    fetchPaymentConfig();
  }, [courseSlug]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegistrationData((prev) => ({ ...prev, [name]: value }));
  };

  const convertedPrice = useMemo(() => {
    const amount = Math.round(parseAmount(course) * selectedCurrency.rate);
    return {
      amount,
      display: `${selectedCurrency.symbol}${amount.toLocaleString()}`,
    };
  }, [course, selectedCurrency]);

  const productInfo = course ? {
    id: course._id,
    name: course.title,
    image: getImageUrl(course.image),
    price: course.price || course.courseFee || 'Contact Us',
    category: course.category || 'Course',
  } : null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!acceptTerms) {
      alert('Please accept the terms and conditions.');
      return;
    }
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
    setPaymentMessage({ type: 'pending', text: 'Opening secure Razorpay payment window. Please complete the payment to confirm your course seat.' });
    try {
      const bookingFormData = {
        ...registrationData,
        productType: 'course',
        courseId: course._id,
        productId: course._id,
        productName: course.title,
        productImage: course.image || '',
        productPrice: course.price || course.courseFee || '',
        productCategory: course.category || 'Course',
        postcode: registrationData.pinCode,
        currency: selectedCurrency.code,
        amountPaid: convertedPrice.amount,
        consultationDate: new Date().toISOString(),
        timeSlot: course.timing || 'Course registration',
      };
      const orderResponse = await fetch(`${API_BASE_URL}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: convertedPrice.amount,
          currency: selectedCurrency.code,
          formData: bookingFormData,
        }),
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

      const razorpay = new window.Razorpay({
        key: razorpayKey,
        amount: order.amount,
        currency: selectedCurrency.code,
        name: 'NB Astro',
        description: `${course.title} Course Booking`,
        image: '/logo.png',
        order_id: order.id,
        prefill: {
          name: registrationData.name,
          email: registrationData.email,
          contact: registrationData.phone,
        },
        theme: { color: '#00B7B3' },
        handler: async (response) => {
          paymentCompleted = true;
          const verifyResponse = await fetch(`${API_BASE_URL}/api/payment/verify-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              formData: bookingFormData,
            }),
          });
          const result = await verifyResponse.json();

          if (result.success) {
            setPaymentMessage({ type: 'success', text: result.message || 'Payment successful. Your course seat is booked.' });
            alert(result.message || 'Payment successful. Your course seat is booked.');
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
              await fetch(`${API_BASE_URL}/api/payment/payment-cancelled`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId: order.id, reason: 'Payment window closed before completion' }),
              }).catch(() => null);
              setPaymentMessage({ type: 'cancelled', text: 'Payment was cancelled. Your course seat has not been booked.' });
              alert('Payment was cancelled. Your course seat has not been booked.');
            }
          },
        },
      });

      razorpay.on('payment.failed', async (response) => {
        paymentCompleted = true;
        const reason = response?.error?.description || response?.error?.reason || 'Payment failed';
        await fetch(`${API_BASE_URL}/api/payment/payment-failed`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: order.id,
            paymentId: response?.error?.metadata?.payment_id,
            reason,
          }),
        }).catch(() => null);
        setSubmitting(false);
        setPaymentMessage({ type: 'failed', text: `${reason}. Please try again or contact support.` });
        alert(`${reason}. Please try again or contact support.`);
      });

      razorpay.open();
    } catch (error) {
      console.error('Course booking error:', error);
      setPaymentMessage({ type: 'failed', text: error.message || 'Something went wrong. Please try again.' });
      alert(error.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#00B7B3] animate-spin" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Course Not Found</h2>
          <Link href="/astrology-courses" className="text-[#00B7B3] hover:underline">Back to Courses</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Book A Seat - {course.title} | NB Astro</title>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-black to-[#0a0c12] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#00B7B3]">Home</Link>
            <span className="text-gray-500">/</span>
            <Link href={course.category?.includes('VASTU') ? '/vastu-courses' : '/astrology-courses'} className="text-gray-500 hover:text-[#00B7B3]">Courses</Link>
            <span className="text-gray-500">/</span>
            <span className="text-[#00B7B3]">Book A Seat</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/40 backdrop-blur-sm border border-[#00B7B3]/20 rounded-2xl p-6 lg:p-8"
              >
                <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  Book A Seat For <span className="text-[#00B7B3]">{course.title}</span>
                </h1>
                <p className="text-gray-400 text-sm mb-6">Confirm the course below, then enter your details to complete booking.</p>

                {productInfo && (
                  <div className="mb-6 rounded-2xl border border-[#00B7B3]/20 bg-[#00B7B3]/10 p-4">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-[#00B7B3] mb-3">You are booking</h2>
                    <div className="grid md:grid-cols-[112px_1fr] gap-4">
                      <div>
                        <span className="block text-gray-500 text-sm mb-1">Product Image</span>
                        <div className="h-28 w-28 overflow-hidden rounded-xl bg-black/50 border border-[#00B7B3]/20">
                          {productInfo.image ? (
                            <img src={productInfo.image} alt={productInfo.name} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-[#00B7B3] font-bold">NB</div>
                          )}
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        <div><span className="block text-gray-500">Product ID</span><span className="font-semibold text-white break-all">{productInfo.id}</span></div>
                        <div><span className="block text-gray-500">Product Name</span><span className="font-semibold text-white">{productInfo.name}</span></div>
                        <div><span className="block text-gray-500">Product Price</span><span className="font-semibold text-white">{productInfo.price}</span></div>
                        <div><span className="block text-gray-500">Product Category</span><span className="font-semibold text-white">{productInfo.category}</span></div>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input name="name" value={registrationData.name} onChange={handleChange} placeholder="Full Name" className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none" required />
                    <input type="email" name="email" value={registrationData.email} onChange={handleChange} placeholder="Email Address" className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none" required />
                    <input type="tel" name="phone" value={registrationData.phone} onChange={handleChange} placeholder="Mobile Number" className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none" required />
                    <input type="tel" name="alternatePhone" value={registrationData.alternatePhone} onChange={handleChange} placeholder="Alternate Mobile Number" className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none" required />
                    <select name="gender" value={registrationData.gender} onChange={handleChange} className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none" required>
                      <option value="" className="bg-black">Gender</option>
                      <option value="male" className="bg-black">Male</option>
                      <option value="female" className="bg-black">Female</option>
                      <option value="other" className="bg-black">Other</option>
                      <option value="prefer-not-to-say" className="bg-black">Prefer not to say</option>
                    </select>
                    <input type="date" name="dateOfBirth" value={registrationData.dateOfBirth} onChange={handleChange} className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none" required />
                    <input name="occupation" value={registrationData.occupation} onChange={handleChange} placeholder="Occupation" className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none" required />
                    <input name="country" value={registrationData.country} onChange={handleChange} placeholder="Country" className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none" required />
                    <input name="state" value={registrationData.state} onChange={handleChange} placeholder="State" className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none" required />
                    <input name="city" value={registrationData.city} onChange={handleChange} placeholder="City" className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none" required />
                    <input name="pinCode" value={registrationData.pinCode} onChange={handleChange} placeholder="Pin Code" className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none" required />
                  </div>

                  <input name="address" value={registrationData.address} onChange={handleChange} placeholder="Full Address" className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none" required />
                  <textarea name="remarks" value={registrationData.remarks} onChange={handleChange} placeholder="Message / Remarks" rows="3" className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none resize-none" required />

                  <div className="grid md:grid-cols-2 gap-4 items-end">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Choose Currency</label>
                      <select name="currency" value={registrationData.currency} onChange={handleChange} className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none">
                        {CURRENCIES.map((currency) => (
                          <option key={currency.code} value={currency.code} className="bg-black">{currency.name} ({currency.code})</option>
                        ))}
                      </select>
                    </div>
                    <div className="rounded-xl border border-[#00B7B3]/20 bg-[#00B7B3]/10 p-4">
                      <div className="flex items-center gap-2 text-gray-400 text-sm mb-1"><CreditCard className="w-4 h-4 text-[#00B7B3]" /> Total Amount</div>
                      <div className="text-2xl font-bold text-[#00B7B3]">{convertedPrice.display}</div>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 text-gray-400 text-sm cursor-pointer">
                    <input type="checkbox" checked={acceptTerms} onChange={(event) => setAcceptTerms(event.target.checked)} className="w-4 h-4 accent-[#00B7B3]" />
                    Accept All Terms And Conditions
                  </label>

                  {paymentMessage && (
                    <div className={`rounded-lg border px-4 py-3 text-sm ${
                      paymentMessage.type === 'success'
                        ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200'
                        : paymentMessage.type === 'pending'
                          ? 'border-amber-400/30 bg-amber-400/10 text-amber-100'
                          : 'border-red-400/30 bg-red-400/10 text-red-200'
                    }`}>
                      {paymentMessage.text}
                    </div>
                  )}

                  <button type="submit" disabled={submitting} className="w-full py-3.5 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00B7B3]/30 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lock className="w-4 h-4" />}
                    {submitting ? 'Processing...' : `Pay ${convertedPrice.display} & Book A Seat`}
                  </button>
                </form>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="sticky top-24 bg-gradient-to-br from-black/60 to-black/80 border border-[#00B7B3]/20 rounded-2xl p-6 backdrop-blur-sm"
              >
                <h3 className="text-xl font-bold text-white mb-1">{course.title}</h3>
                <p className="text-[#00B7B3] text-sm mb-5">Course Details</p>
                <div className="space-y-4 text-sm">
                  <div><p className="text-gray-500 uppercase text-xs">Date Of Class</p><p className="text-white">{course.date || 'Flexible'}</p></div>
                  <div><p className="text-gray-500 uppercase text-xs">Class Time</p><p className="text-white">{course.timing || 'Flexible'}</p></div>
                  <div><p className="text-gray-500 uppercase text-xs">Course Duration</p><p className="text-white">{course.courseDuration || 'Flexible'}</p></div>
                  <div><p className="text-gray-500 uppercase text-xs">Course Fee</p><p className="text-[#00B7B3] text-lg font-bold">{course.courseFee || course.price || 'Contact Us'}</p></div>
                  <div><p className="text-gray-500 uppercase text-xs">Type Of Classes</p><p className="text-white">{course.type || 'Online'}</p></div>
                  <div><p className="text-gray-500 uppercase text-xs">Location</p><p className="text-white">{course.location || 'Zoom'}</p></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseRegistrationPage;
