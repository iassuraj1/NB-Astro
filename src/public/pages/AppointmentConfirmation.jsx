import React, { useCallback, useEffect, useState } from 'react';
import { Check, CheckCircle, Copy, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const API_BASE_URL = '';
const getImageUrl = (image) => {
  if (!image) return '';
  return image.startsWith('http') ? image : `${API_BASE_URL}${image}`;
};

const AppointmentConfirmation = () => {
  const router = useRouter();
  const { bookingId } = router.query;
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const fetchAppointment = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/payment/track/${bookingId}`);
      const result = await response.json();
      if (result.success) setAppointment(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    fetchAppointment();
  }, [fetchAppointment]);

  const copyBookingId = () => {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#00B7B3] animate-spin" />
      </div>
    );
  }

  const productName = appointment?.productName || appointment?.serviceTitle;
  const productCategory = appointment?.productCategory || appointment?.serviceCategory;
  const productImage = getImageUrl(appointment?.productImage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-[#0a0c12] py-12">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h1>
        <p className="text-gray-400 mb-6">Your {appointment?.productType === 'course' ? 'course seat' : 'consultation'} has been successfully booked.</p>

        <div className="bg-gradient-to-r from-[#00B7B3]/10 to-transparent border border-[#00B7B3]/30 rounded-2xl p-6 mb-6">
          <p className="text-gray-400 text-sm mb-2">Your Booking ID</p>
          <div className="flex items-center justify-center gap-3">
            <p className="text-2xl font-bold text-[#00B7B3]">{bookingId}</p>
            <button onClick={copyBookingId} className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
              {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} className="text-gray-400" />}
            </button>
          </div>
          <p className="text-gray-500 text-xs mt-2">Save this ID to track your booking</p>
        </div>

        <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6 mb-6 text-left">
          <h2 className="text-lg font-bold text-white mb-4">Booking Summary</h2>
          <div className="flex gap-4 mb-4">
            {productImage && (
              <img src={productImage} alt={productName} className="w-20 h-20 rounded-xl object-cover border border-[#00B7B3]/20" />
            )}
            <div className="space-y-1 text-sm">
              <p><span className="text-gray-400">Product ID:</span> <span className="text-white break-all">{appointment?.productId}</span></p>
              <p><span className="text-gray-400">Product Name:</span> <span className="text-white">{productName}</span></p>
              <p><span className="text-gray-400">Product Price:</span> <span className="text-white">{appointment?.productPrice}</span></p>
              <p><span className="text-gray-400">Product Category:</span> <span className="text-white">{productCategory}</span></p>
            </div>
          </div>
          <div className="space-y-2">
            <p><span className="text-gray-400">Amount Paid:</span> <span className="text-[#00B7B3] font-bold">{appointment?.currency || 'INR'} {appointment?.amount}</span></p>
            <p><span className="text-gray-400">Status:</span> <span className="text-green-400">Confirmed</span></p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/track-appointment" className="flex-1 px-6 py-3 border border-[#00B7B3] text-[#00B7B3] rounded-xl font-semibold hover:bg-[#00B7B3]/10">Track Status</Link>
          <Link href="/" className="flex-1 px-6 py-3 bg-[#00B7B3] text-black rounded-xl font-semibold hover:bg-[#33C5C2]">Go to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;
