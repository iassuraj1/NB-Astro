import React, { useState } from 'react';
import { CheckCircle, Clock as ClockIcon, Loader2, Search, XCircle } from 'lucide-react';

const API_BASE_URL = '';
const getImageUrl = (image) => {
  if (!image) return '';
  return image.startsWith('http') ? image : `${API_BASE_URL}${image}`;
};

const TrackAppointment = () => {
  const [bookingId, setBookingId] = useState('');
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!bookingId.trim()) return;
    setLoading(true);
    setError(null);
    setAppointment(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/payment/track/${bookingId.trim()}`);
      const result = await response.json();
      if (result.success) setAppointment(result.data);
      else setError('No booking found with this Booking ID');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'completed': return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'cancelled': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <ClockIcon className="w-5 h-5 text-yellow-500" />;
    }
  };

  const productName = appointment?.productName || appointment?.serviceTitle;
  const productCategory = appointment?.productCategory || appointment?.serviceCategory;
  const productImage = getImageUrl(appointment?.productImage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-[#0a0c12] py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white text-center mb-2">Track Your <span className="text-[#00B7B3]">Booking</span></h1>
        <p className="text-gray-400 text-center mb-8">Enter your Booking ID to check status</p>

        <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6 mb-6">
          <form onSubmit={handleSearch} className="flex gap-3">
            <input type="text" value={bookingId} onChange={(event) => setBookingId(event.target.value)} placeholder="Enter Booking ID (e.g., NB12345678)" className="flex-1 px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" />
            <button type="submit" disabled={loading} className="px-6 py-3 bg-[#00B7B3] text-black rounded-xl font-semibold hover:bg-[#33C5C2] disabled:opacity-50 flex items-center gap-2">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              Track
            </button>
          </form>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center mb-6"><p className="text-red-400">{error}</p></div>}

        {appointment && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-[#00B7B3]/10 to-transparent border border-[#00B7B3]/30 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div><p className="text-gray-400 text-sm">Status</p><p className="text-xl font-bold flex items-center gap-2 text-white">{getStatusIcon(appointment.status)} {appointment.status}</p></div>
                <div><p className="text-gray-400 text-sm">Booking ID</p><p className="text-[#00B7B3] font-bold">{appointment.bookingId}</p></div>
              </div>
            </div>
            <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6">
              <h2 className="text-lg font-bold text-white mb-4">Booking Details</h2>
              <div className="flex gap-4 mb-4">
                {productImage && <img src={productImage} alt={productName} className="w-20 h-20 rounded-xl object-cover border border-[#00B7B3]/20" />}
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-400">Product ID:</span> <span className="text-white break-all">{appointment.productId}</span></p>
                  <p><span className="text-gray-400">Product Name:</span> <span className="text-white">{productName}</span></p>
                  <p><span className="text-gray-400">Product Price:</span> <span className="text-white">{appointment.productPrice}</span></p>
                  <p><span className="text-gray-400">Product Category:</span> <span className="text-white">{productCategory}</span></p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between"><span className="text-gray-400">Amount</span><span className="text-[#00B7B3] font-bold">{appointment.currency || 'INR'} {appointment.amount}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">Name</span><span className="text-white">{appointment.name}</span></div>
              </div>
            </div>
            {appointment.consultationLink && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6">
                <h2 className="text-lg font-bold text-white mb-2">Consultation Link</h2>
                <a href={appointment.consultationLink} target="_blank" rel="noreferrer" className="text-[#00B7B3] hover:underline break-all">{appointment.consultationLink}</a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackAppointment;
