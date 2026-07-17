import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';
import { courseAPI } from '../services/api';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const { data } = await courseAPI.getStats();
            setStats(data.stats);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { title: 'Total Courses', value: stats?.totalCourses || 0, icon: '📚', color: 'from-blue-500/20 to-blue-600/10' },
        { title: 'Active Courses', value: stats?.activeCourses || 0, icon: '✅', color: 'from-green-500/20 to-green-600/10' },
        { title: 'Astrology Courses', value: stats?.astrologyCourses || 0, icon: '✨', color: 'from-purple-500/20 to-purple-600/10' },
        { title: 'Vastu Courses', value: stats?.vastuCourses || 0, icon: '🏠', color: 'from-amber-500/20 to-amber-600/10' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-2 border-[#00B7B3] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((card, index) => (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-gradient-to-br ${card.color} border border-[#00B7B3]/20 rounded-2xl p-6`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">{card.title}</p>
                                <p className="text-3xl font-bold text-white mt-2">{card.value}</p>
                            </div>
                            <div className="text-4xl">{card.icon}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                    <a href="/admin/add-course" className="px-4 py-2 bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg hover:bg-[#00B7B3]/30 transition">
                        + Add New Course
                    </a>
                    <a href="/admin/courses" className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition">
                        Manage Courses
                    </a>
                    {stats?.admin?.role === 'superadmin' && (
                        <a href="/admin/admins" className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition">
                            Manage Admins
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;