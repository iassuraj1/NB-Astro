import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, CreditCard, Loader2, Package, UserRound } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { appointmentAPI } from '../services/api';
import { buildBookingRow, formatBookingDate, getBookingStatusClass } from './AppointmentsManager';

const DetailItem = ({ label, value, wide = false }) => (
  <div className={wide ? 'md:col-span-2' : ''}>
    <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
    <p className="mt-1 break-words text-sm text-white">{value || 'N/A'}</p>
  </div>
);

const Section = ({ title, icon, children }) => {
  const IconComponent = icon;
  return (
  <section className="rounded-lg border border-gray-800 bg-gray-950">
    <div className="flex items-center gap-2 border-b border-gray-800 px-5 py-4">
      <IconComponent className="h-4 w-4 text-[#00B7B3]" />
      <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-300">{title}</h2>
    </div>
    <div className="grid gap-4 p-5 md:grid-cols-2">{children}</div>
  </section>
  );
};

const BookingDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooking = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await appointmentAPI.getById(id);
        setBooking(buildBookingRow(data.data));
      } catch (err) {
        setError(err?.response?.data?.message || 'Booking not found.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBooking();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center text-white">
        <Loader2 className="mr-2 h-5 w-5 animate-spin text-[#00B7B3]" />
        Loading booking...
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="p-6">
        <Link href="/admin/appointments" className="inline-flex items-center gap-2 text-sm font-semibold text-[#00B7B3]">
          <ArrowLeft className="h-4 w-4" />
          Back to bookings
        </Link>
        <div className="mt-6 rounded-lg border border-red-500/20 bg-red-500/10 p-5 text-red-200">{error}</div>
      </div>
    );
  }

  const raw = booking.raw;
  const customer = raw.customerInfo || {};
  const product = raw.productInfo || {};
  const payment = raw.paymentInfo || {};
  const razorpay = raw.razorpayInfo || {};
  const bookingInfo = raw.bookingInfo || {};

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <Link href="/admin/appointments" className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[#00B7B3]">
            <ArrowLeft className="h-4 w-4" />
            Back to bookings
          </Link>
          <h1 className="text-2xl font-bold text-white">Booking {booking.bookingId}</h1>
          <p className="mt-1 text-sm text-gray-400">Complete customer, product, booking, payment, and Razorpay details.</p>
        </div>
        <div className="rounded-lg border border-gray-800 bg-gray-950 px-4 py-3">
          <p className="text-xs uppercase tracking-wide text-gray-500">Payment Status</p>
          <span className={`mt-2 inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${getBookingStatusClass(booking.paymentStatus)}`}>
            {booking.paymentStatus}
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-4">
          <div className="overflow-hidden rounded-lg border border-gray-800 bg-gray-950">
            <div className="aspect-square bg-gray-900">
              {booking.productImage ? (
                <img src={booking.productImage} alt={booking.productName} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Package className="h-12 w-12 text-gray-600" />
                </div>
              )}
            </div>
            <div className="p-4">
              <p className="text-sm font-semibold text-white">{booking.productName}</p>
              <p className="mt-1 text-xs capitalize text-gray-500">{booking.productType}</p>
              <p className="mt-3 text-lg font-bold text-[#00B7B3]">{booking.productPrice}</p>
            </div>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
            <p className="text-xs uppercase tracking-wide text-gray-500">Booking Date</p>
            <div className="mt-2 flex items-center gap-2 text-sm text-white">
              <Calendar className="h-4 w-4 text-[#00B7B3]" />
              {formatBookingDate(booking.bookingDate)}
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <Section title="Booking Information" icon={Calendar}>
            <DetailItem label="Booking ID" value={booking.bookingId} />
            <DetailItem label="Booking Status" value={booking.status} />
            <DetailItem label="Booking Date" value={formatBookingDate(booking.bookingDate)} />
            <DetailItem label="Consultation / Class Date" value={formatBookingDate(bookingInfo.consultationDate || raw.consultationDate)} />
            <DetailItem label="Time Slot" value={bookingInfo.timeSlot || raw.timeSlot} />
            <DetailItem label="Remarks / Message" value={booking.remarks} wide />
          </Section>

          <Section title="Customer Information" icon={UserRound}>
            <DetailItem label="Customer Name" value={booking.customerName} />
            <DetailItem label="Email" value={booking.email} />
            <DetailItem label="Mobile Number" value={booking.phone} />
            <DetailItem label="Alternate Mobile Number" value={customer.alternatePhone || raw.alternatePhone} />
            <DetailItem label="Gender" value={customer.gender || raw.gender} />
            <DetailItem label="Date of Birth" value={formatBookingDate(customer.dateOfBirth || raw.dateOfBirth)} />
            <DetailItem label="Occupation" value={booking.occupation} />
            <DetailItem label="Country" value={customer.country || raw.country} />
            <DetailItem label="State" value={customer.state || raw.state} />
            <DetailItem label="City" value={customer.city || raw.city} />
            <DetailItem label="Pin Code" value={customer.pinCode || customer.postcode || raw.pinCode || raw.postcode} />
            <DetailItem label="Full Address" value={booking.address} wide />
          </Section>

          <Section title="Product Information" icon={Package}>
            <DetailItem label="Product ID" value={booking.productId} />
            <DetailItem label="Product Name" value={booking.productName} />
            <DetailItem label="Product Type" value={booking.productType} />
            <DetailItem label="Product Category" value={product.productCategory || raw.productCategory} />
            <DetailItem label="Product Price" value={booking.productPrice} />
            <DetailItem label="Product Image" value={booking.productImage} wide />
          </Section>

          <Section title="Payment Information" icon={CreditCard}>
            <DetailItem label="Payment Status" value={booking.paymentStatus} />
            <DetailItem label="Payment Amount" value={booking.amount} />
            <DetailItem label="Currency" value={payment.currency || raw.currency} />
            <DetailItem label="Payment Method" value={payment.method || razorpay.method} />
            <DetailItem label="Paid At" value={formatBookingDate(payment.paidAt)} />
            <DetailItem label="Failure / Refund Note" value={payment.failureReason || raw.paymentFailureReason} />
          </Section>

          <Section title="Razorpay Information" icon={CreditCard}>
            <DetailItem label="Razorpay Order ID" value={booking.razorpayOrderId} />
            <DetailItem label="Razorpay Payment ID" value={booking.razorpayPaymentId} />
            <DetailItem label="Receipt" value={razorpay.receipt} />
            <DetailItem label="Order Status" value={razorpay.orderStatus} />
            <DetailItem label="Payment Status" value={razorpay.paymentStatus} />
            <DetailItem label="Captured" value={razorpay.captured === undefined ? '' : String(razorpay.captured)} />
            <DetailItem label="Signature Verified" value={razorpay.signatureVerified === undefined ? '' : String(razorpay.signatureVerified)} />
            <DetailItem label="Verified At" value={formatBookingDate(razorpay.verifiedAt)} />
          </Section>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;
