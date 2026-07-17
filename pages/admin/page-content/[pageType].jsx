import AdminPageContent from '../../../src/admin/pages/courses/AdminPageContent';
import AdminLayout from '../../../src/admin/layout/AdminLayout';

export default function AdminPageContentRoute() {
  return <AdminLayout><AdminPageContent /></AdminLayout>;
}

export const getServerSideProps = () => ({
  props: {},
});
