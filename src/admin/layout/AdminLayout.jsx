import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import Sidebar from '../components/Sidebar';
import AdminHeader from './AdminHeader';
import { useAuth } from '../context/AuthContext';

const AdminLayout = ({ children }) => {
    const router = useRouter();
    const { admin, loading } = useAuth();

    useEffect(() => {
        if (!loading && !admin) {
            router.replace('/admin/login');
        }
    }, [admin, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#00B7B3] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!admin) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-[#0a0c12]">
            <Sidebar />
            <div className="lg:pl-64">
                <AdminHeader />
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;

