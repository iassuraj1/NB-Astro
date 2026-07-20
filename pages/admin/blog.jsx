import AdminLayout from '../../src/admin/layout/AdminLayout';
import BlogManager from '../../src/admin/pages/BlogManager';

export default function BlogPage() {
    return (
        <AdminLayout>
            <BlogManager />
        </AdminLayout>
    );
}