import SettingsPage from '../../src/admin/pages/SettingsPage';
import AdminLayout from '../../src/admin/layout/AdminLayout';

export default function SettingsRoute() {
  return (
    <AdminLayout>
      <SettingsPage />
    </AdminLayout>
  );
}
