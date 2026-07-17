import CourseForm from '../../../src/admin/pages/courses/CourseForm';
import AdminLayout from '../../../src/admin/layout/AdminLayout';

export default function AdminEditCourseRoute() {
  return <AdminLayout><CourseForm /></AdminLayout>;
}

export const getServerSideProps = () => ({
  props: {},
});
