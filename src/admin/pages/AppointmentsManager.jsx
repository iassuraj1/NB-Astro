import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Calendar, Download, Eye, FileSpreadsheet, Loader2, Package, Search } from 'lucide-react';
import Link from 'next/link';
import { appointmentAPI } from '../services/api';

const API_BASE_URL = '';

const getNested = (item, path, fallback = '') => (
  path.split('.').reduce((value, key) => value?.[key], item) ?? fallback
);

const getImageUrl = (image) => {
  if (!image) return '';
  return image.startsWith('http') ? image : `${API_BASE_URL}${image}`;
};

export const formatBookingDate = (value) => {
  if (!value) return 'N/A';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'N/A';
  return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: '2-digit' });
};

const formatAmount = (appointment) => {
  const currency = getNested(appointment, 'paymentInfo.currency', appointment.currency || 'INR');
  const amount = getNested(appointment, 'paymentInfo.amount', appointment.amount || 0);
  return `${currency} ${Number(amount || 0).toLocaleString('en-IN')}`;
};

export const getBookingStatusClass = (status) => {
  const classes = {
    pending: 'bg-amber-500/15 text-amber-300 border-amber-500/20',
    success: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
    confirmed: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
    completed: 'bg-blue-500/15 text-blue-300 border-blue-500/20',
    failed: 'bg-red-500/15 text-red-300 border-red-500/20',
    cancelled: 'bg-red-500/15 text-red-300 border-red-500/20',
    refunded: 'bg-purple-500/15 text-purple-300 border-purple-500/20',
  };
  return classes[status] || 'bg-gray-500/15 text-gray-300 border-gray-500/20';
};

export const buildBookingRow = (appointment) => {
  const product = appointment.productInfo || {};
  const customer = appointment.customerInfo || {};
  const booking = appointment.bookingInfo || {};
  const payment = appointment.paymentInfo || {};
  const razorpay = appointment.razorpayInfo || {};

  return {
    id: appointment._id,
    raw: appointment,
    bookingId: booking.bookingId || appointment.bookingId || 'N/A',
    productId: product.productId || appointment.productId || 'N/A',
    productName: product.productName || appointment.productName || appointment.serviceTitle || 'N/A',
    productImage: getImageUrl(product.productImage || appointment.productImage || appointment.service?.image || appointment.course?.image || ''),
    productPrice: product.productPrice || appointment.productPrice || formatAmount(appointment),
    productType: product.productType || appointment.productType || 'N/A',
    customerName: customer.name || appointment.name || 'N/A',
    email: customer.email || appointment.email || 'N/A',
    phone: customer.phone || appointment.phone || 'N/A',
    address: [
      customer.address || appointment.address,
      customer.city || appointment.city,
      customer.state || appointment.state,
      customer.country || appointment.country,
      customer.pinCode || customer.postcode || appointment.pinCode || appointment.postcode,
    ].filter(Boolean).join(', ') || 'N/A',
    occupation: customer.occupation || appointment.occupation || 'N/A',
    remarks: booking.remarks || appointment.remarks || 'N/A',
    razorpayOrderId: razorpay.orderId || payment.orderId || appointment.orderId || 'N/A',
    razorpayPaymentId: razorpay.paymentId || payment.paymentId || appointment.paymentId || 'N/A',
    paymentStatus: payment.paymentStatus || appointment.paymentStatus || 'pending',
    bookingDate: booking.bookingDate || appointment.bookingDate || appointment.createdAt,
    status: booking.status || appointment.status || 'pending',
    amount: formatAmount(appointment),
  };
};

const exportColumns = [
  ['Booking ID', 'bookingId'],
  ['Product ID', 'productId'],
  ['Product Name', 'productName'],
  ['Product Price', 'productPrice'],
  ['Product Type', 'productType'],
  ['Customer Name', 'customerName'],
  ['Email', 'email'],
  ['Mobile Number', 'phone'],
  ['Full Address', 'address'],
  ['Occupation', 'occupation'],
  ['Remarks / Message', 'remarks'],
  ['Razorpay Order ID', 'razorpayOrderId'],
  ['Razorpay Payment ID', 'razorpayPaymentId'],
  ['Payment Status', 'paymentStatus'],
  ['Booking Status', 'status'],
  ['Booking Date', 'bookingDate'],
];

const downloadFile = (content, fileName, type) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
};

const csvEscape = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;

const AppointmentsManager = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    paymentStatus: 'all',
    productType: 'all',
  });

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(Object.entries(filters).filter(([, value]) => value && value !== 'all'));
      const { data } = await appointmentAPI.getAll(params);
      setAppointments(data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchStats = async () => {
    try {
      const { data } = await appointmentAPI.getStats();
      setStats(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchStats();
  }, [fetchAppointments]);

  const bookingRows = useMemo(() => appointments.map(buildBookingRow), [appointments]);

  const filteredBookings = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return bookingRows.filter((booking) => !query || [
      booking.bookingId,
      booking.productId,
      booking.productName,
      booking.customerName,
      booking.email,
      booking.phone,
      booking.razorpayOrderId,
      booking.razorpayPaymentId,
    ].some((value) => String(value || '').toLowerCase().includes(query)));
  }, [bookingRows, searchTerm]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const exportRows = (format) => {
    const rows = filteredBookings.map((booking) => ({
      ...booking,
    bookingDate: formatBookingDate(booking.bookingDate),
    }));

    if (format === 'csv') {
      const header = exportColumns.map(([label]) => csvEscape(label)).join(',');
      const body = rows.map((row) => exportColumns.map(([, key]) => csvEscape(row[key])).join(',')).join('\n');
      downloadFile(`${header}\n${body}`, 'bookings-export.csv', 'text/csv;charset=utf-8;');
      return;
    }

    const tableRows = rows.map((row) => (
      `<tr>${exportColumns.map(([, key]) => `<td>${String(row[key] ?? '').replace(/</g, '&lt;')}</td>`).join('')}</tr>`
    )).join('');
    const tableHead = `<tr>${exportColumns.map(([label]) => `<th>${label}</th>`).join('')}</tr>`;
    downloadFile(
      `<html><head><meta charset="utf-8"></head><body><table>${tableHead}${tableRows}</table></body></html>`,
      'bookings-export.xls',
      'application/vnd.ms-excel;charset=utf-8;'
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Booking Management</h1>
          <p className="mt-1 text-sm text-gray-400">Open bookings, filter records, and export booking data.</p>
        </div>
        <div className="relative w-full lg:w-96">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search bookings, customer, Razorpay ID"
            className="w-full rounded-lg border border-gray-700 bg-black/50 py-2.5 pl-10 pr-4 text-sm text-white outline-none focus:border-[#00B7B3]"
          />
        </div>
      </div>

      {stats && (
        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
          {[
            ['Total', stats.total, 'text-[#00B7B3]'],
            ['Pending', stats.pending, 'text-amber-300'],
            ['Success', stats.success, 'text-emerald-300'],
            ['Failed', stats.failed, 'text-red-300'],
            ['Confirmed', stats.confirmed, 'text-emerald-300'],
            ['Completed', stats.completed, 'text-blue-300'],
            ['Refunded', stats.refunded, 'text-purple-300'],
            ['Revenue', `INR ${Number(stats.totalRevenue || 0).toLocaleString('en-IN')}`, 'text-[#00B7B3]'],
          ].map(([label, value, color]) => (
            <div key={label} className="rounded-lg border border-gray-800 bg-gray-900 p-3">
              <p className={`text-xl font-bold ${color}`}>{value ?? 0}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mb-4 grid gap-3 rounded-lg border border-gray-800 bg-gray-950 p-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1fr_auto_auto_auto]">
        <input type="date" name="dateFrom" value={filters.dateFrom} onChange={handleFilterChange} className="rounded-lg border border-gray-700 bg-black/50 px-3 py-2 text-sm text-white outline-none focus:border-[#00B7B3]" />
        <input type="date" name="dateTo" value={filters.dateTo} onChange={handleFilterChange} className="rounded-lg border border-gray-700 bg-black/50 px-3 py-2 text-sm text-white outline-none focus:border-[#00B7B3]" />
        <select name="paymentStatus" value={filters.paymentStatus} onChange={handleFilterChange} className="rounded-lg border border-gray-700 bg-black/50 px-3 py-2 text-sm text-white outline-none focus:border-[#00B7B3]">
          <option value="all">All Payment Status</option>
          <option value="pending">Pending</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
          <option value="cancelled">Cancelled</option>
          <option value="refunded">Refunded</option>
        </select>
        <select name="productType" value={filters.productType} onChange={handleFilterChange} className="rounded-lg border border-gray-700 bg-black/50 px-3 py-2 text-sm text-white outline-none focus:border-[#00B7B3]">
          <option value="all">All Product Types</option>
          <option value="consultation">Consultation</option>
          <option value="course">Course</option>
        </select>
        <button type="button" onClick={fetchAppointments} className="rounded-lg bg-[#00B7B3] px-4 py-2 text-sm font-semibold text-black">
          Apply
        </button>
        <button type="button" onClick={() => exportRows('csv')} className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-200 hover:bg-gray-700">
          <Download className="h-4 w-4" />
          CSV
        </button>
        <button type="button" onClick={() => exportRows('excel')} className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-200 hover:bg-gray-700">
          <FileSpreadsheet className="h-4 w-4" />
          Excel
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-800 bg-gray-950">
        {loading ? (
          <div className="flex min-h-[260px] items-center justify-center text-white">
            <Loader2 className="mr-2 h-5 w-5 animate-spin text-[#00B7B3]" />
            Loading bookings...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[1800px] text-left">
              <thead className="bg-gray-900">
                <tr>
                  {[
                    'Booking ID',
                    'Product ID',
                    'Product',
                    'Product Price',
                    'Customer Name',
                    'Email',
                    'Mobile Number',
                    'Full Address',
                    'Occupation',
                    'Remarks / Message',
                    'Razorpay Order ID',
                    'Razorpay Payment ID',
                    'Payment Status',
                    'Booking Date',
                    'Actions',
                  ].map((heading) => (
                    <th key={heading} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-t border-gray-800 align-top hover:bg-gray-900/70">
                    <td className="px-4 py-4 text-sm font-semibold text-[#00B7B3]">{booking.bookingId}</td>
                    <td className="max-w-[160px] px-4 py-4 text-xs text-gray-300"><span className="break-all">{booking.productId}</span></td>
                    <td className="px-4 py-4">
                      <div className="flex min-w-[240px] items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-gray-700 bg-gray-900">
                          {booking.productImage ? <img src={booking.productImage} alt={booking.productName} className="h-full w-full object-cover" /> : <Package className="h-5 w-5 text-gray-500" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{booking.productName}</p>
                          <p className="text-xs capitalize text-gray-500">{booking.productType}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-[#00B7B3]">{booking.productPrice}</td>
                    <td className="px-4 py-4 text-sm text-white">{booking.customerName}</td>
                    <td className="max-w-[220px] px-4 py-4 text-sm text-gray-300"><span className="break-all">{booking.email}</span></td>
                    <td className="px-4 py-4 text-sm text-gray-300">{booking.phone}</td>
                    <td className="max-w-[300px] px-4 py-4 text-sm text-gray-300">{booking.address}</td>
                    <td className="px-4 py-4 text-sm text-gray-300">{booking.occupation}</td>
                    <td className="max-w-[260px] px-4 py-4 text-sm text-gray-300">{booking.remarks}</td>
                    <td className="max-w-[220px] px-4 py-4 text-xs text-gray-300"><span className="break-all">{booking.razorpayOrderId}</span></td>
                    <td className="max-w-[220px] px-4 py-4 text-xs text-gray-300"><span className="break-all">{booking.razorpayPaymentId}</span></td>
                    <td className="px-4 py-4"><span className={`rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${getBookingStatusClass(booking.paymentStatus)}`}>{booking.paymentStatus}</span></td>
                    <td className="px-4 py-4 text-sm text-gray-300"><div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-gray-500" />{formatBookingDate(booking.bookingDate)}</div></td>
                    <td className="px-4 py-4">
                      <Link href={`/admin/appointments/${booking.id}`} className="inline-flex items-center gap-2 rounded-md bg-blue-500/15 px-3 py-1.5 text-xs font-semibold text-blue-300 hover:bg-blue-500/25">
                        <Eye className="h-3.5 w-3.5" />
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
                {!filteredBookings.length && (
                  <tr><td colSpan="15" className="px-4 py-12 text-center text-sm text-gray-500">No bookings found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsManager;
