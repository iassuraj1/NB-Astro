import AppointmentsManager from '../../src/admin/pages/AppointmentsManager';
import AdminLayout from '../../src/admin/layout/AdminLayout';

export default function AdminAppointmentsRoute() {
  return <AdminLayout><AppointmentsManager /></AdminLayout>;
}
