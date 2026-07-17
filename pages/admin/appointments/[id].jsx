import BookingDetailsPage from '../../../src/admin/pages/BookingDetailsPage';
import AdminLayout from '../../../src/admin/layout/AdminLayout';

export default function AdminBookingDetailsRoute() {
  return <AdminLayout><BookingDetailsPage /></AdminLayout>;
}

export async function getServerSideProps() {
  return { props: {} };
}
