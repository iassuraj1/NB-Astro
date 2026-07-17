import HomePageManager from '../../src/admin/pages/HomePageManager';
import AdminLayout from '../../src/admin/layout/AdminLayout';

export default function AdminHomePageRoute() {
  return <AdminLayout><HomePageManager /></AdminLayout>;
}
