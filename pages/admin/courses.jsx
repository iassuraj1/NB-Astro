import CourseList from '../../src/admin/pages/courses/CourseList';
import AdminLayout from '../../src/admin/layout/AdminLayout';

export default function AdminCoursesRoute() {
  return <AdminLayout><CourseList /></AdminLayout>;
}
