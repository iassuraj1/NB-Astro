import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { courseAPI } from '../../services/api';
import { 
    Plus, 
    Edit, 
    Trash2, 
    Eye, 
    EyeOff, 
    Search,
    Filter,
    Loader2,
    BookOpen,
    Home
} from 'lucide-react';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const fetchCourses = useCallback(async () => {
        setLoading(true);
        try {
            const params = {};
            if (search) params.search = search;
            if (category) params.category = category;
            
            const { data } = await courseAPI.getAll(params);
            setCourses(data.courses);
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    }, [category, search]);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    const handleToggleStatus = async (id) => {
        try {
            await courseAPI.toggleStatus(id);
            fetchCourses();
        } catch (error) {
            console.error('Error toggling status:', error);
        }
    };

    const handleDelete = async () => {
        if (!selectedCourse) return;
        try {
            await courseAPI.delete(selectedCourse._id);
            setShowDeleteModal(false);
            setSelectedCourse(null);
            fetchCourses();
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    const getCategoryBadge = (category) => {
        if (category === 'ASTROLOGY COURSES') {
            return <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">Astrology</span>;
        }
        return <span className="px-2 py-1 text-xs rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">Vastu</span>;
    };

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Courses</h1>
                    <p className="text-gray-400 text-sm mt-1">Manage your astrology and vastu courses</p>
                </div>
                <Link
                    href="/admin/add-course"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                    <Plus className="w-4 h-4" />
                    Add New Course
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-black/40 border border-[#00B7B3]/20 rounded-xl p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-[#00B7B3] outline-none"
                        />
                    </div>
                    <div className="w-full sm:w-48 relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none appearance-none"
                        >
                            <option value="">All Categories</option>
                            <option value="ASTROLOGY COURSES">Astrology Courses</option>
                            <option value="VASTU COURSES">Vastu Courses</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Course Table */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-[#00B7B3] animate-spin" />
                </div>
            ) : courses.length === 0 ? (
                <div className="text-center py-12 bg-black/40 border border-[#00B7B3]/20 rounded-xl">
                    <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-400">No courses found</p>
                    <Link href="/admin/add-course" className="text-[#00B7B3] hover:underline text-sm mt-2 inline-block">
                        Create your first course
                    </Link>
                </div>
            ) : (
                <div className="bg-black/40 border border-[#00B7B3]/20 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-black/60 border-b border-[#00B7B3]/20">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Course</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Duration</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#00B7B3]/10">
                                {courses.map((course) => (
                                    <tr key={course._id} className="hover:bg-white/5 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img 
                                                    src={`${course.image}`} 
                                                    alt={course.title}
                                                    className="w-10 h-10 rounded-lg object-cover"
                                                />
                                                <div>
                                                    <p className="text-white font-medium">{course.title}</p>
                                                    <p className="text-gray-500 text-xs">Slug: {course.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{getCategoryBadge(course.category)}</td>
                                        <td className="px-6 py-4">
                                            <span className="text-[#00B7B3] font-semibold">{course.price || course.courseFee}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-gray-300 text-sm">{course.courseDuration || 'Flexible'}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleToggleStatus(course._id, course.isActive)}
                                                className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                                                    course.isActive 
                                                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                                }`}
                                            >
                                                {course.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                                {course.isActive ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/edit-course/${course._id}`}
                                                    className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        setSelectedCourse(course);
                                                        setShowDeleteModal(true);
                                                    }}
                                                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                    <div className="bg-black border border-[#00B7B3]/30 rounded-2xl max-w-md w-full p-6">
                        <h3 className="text-xl font-bold text-white mb-2">Delete Course</h3>
                        <p className="text-gray-400 mb-6">
                            Are you sure you want to delete <span className="text-[#00B7B3]">{selectedCourse?.title}</span>? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-white/5 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseList;
