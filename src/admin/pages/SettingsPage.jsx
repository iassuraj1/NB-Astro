import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../services/api';
import { User, Lock, Shield, Trash2, Plus, Check, X, Key, Mail, RefreshCw } from 'lucide-react';

const SettingsPage = () => {
    const { admin, updateProfile, changePassword } = useAuth();
    
    // Active Settings Tab ('profile', 'password', 'admins')
    const [activeTab, setActiveTab] = useState('profile');
    
    // Status banners
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // Profile State
    const [profileForm, setProfileForm] = useState({
        name: '',
        email: ''
    });

    // Password State
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Admin List / Creation State
    const [admins, setAdmins] = useState([]);
    const [adminsLoading, setAdminsLoading] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newAdminForm, setNewAdminForm] = useState({
        name: '',
        email: '',
        password: '',
        role: 'admin'
    });

    // Load user details into profile form once loaded
    useEffect(() => {
        if (admin) {
            setProfileForm({
                name: admin.name || '',
                email: admin.email || ''
            });
        }
    }, [admin]);

    // Fetch all admins if user is superadmin and on the admins tab
    useEffect(() => {
        if (admin?.role === 'superadmin' && activeTab === 'admins') {
            fetchAdmins();
        }
    }, [admin, activeTab]);

    const fetchAdmins = async () => {
        setAdminsLoading(true);
        try {
            const { data } = await adminAPI.getAllAdmins();
            if (data.success) {
                setAdmins(data.admins);
            }
        } catch (err) {
            console.error('Error fetching admins:', err);
            setErrorMsg(err.response?.data?.message || 'Failed to fetch administrator list');
        } finally {
            setAdminsLoading(false);
        }
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setSuccessMsg('');
        setErrorMsg('');
        setSubmitting(true);
        try {
            const res = await updateProfile(profileForm);
            if (res.success) {
                setSuccessMsg(res.message || 'Profile updated successfully');
            } else {
                setErrorMsg(res.error || 'Failed to update profile');
            }
        } catch (err) {
            setErrorMsg('An unexpected error occurred.');
        } finally {
            setSubmitting(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setSuccessMsg('');
        setErrorMsg('');
        
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setErrorMsg('New passwords do not match');
            return;
        }

        if (passwordForm.newPassword.length < 6) {
            setErrorMsg('Password must be at least 6 characters long');
            return;
        }

        setSubmitting(true);
        try {
            const res = await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
            if (res.success) {
                setSuccessMsg(res.message || 'Password updated successfully');
                setPasswordForm({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            } else {
                setErrorMsg(res.error || 'Failed to change password');
            }
        } catch (err) {
            setErrorMsg('An unexpected error occurred.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleCreateAdmin = async (e) => {
        e.preventDefault();
        setSuccessMsg('');
        setErrorMsg('');
        setSubmitting(true);
        try {
            const { data } = await adminAPI.createAdmin(newAdminForm);
            if (data.success) {
                setSuccessMsg(data.message || 'Admin user created successfully');
                setShowCreateModal(false);
                setNewAdminForm({
                    name: '',
                    email: '',
                    password: '',
                    role: 'admin'
                });
                fetchAdmins();
            }
        } catch (err) {
            setErrorMsg(err.response?.data?.message || 'Failed to create admin user');
        } finally {
            setSubmitting(false);
        }
    };

    const handleToggleStatus = async (id) => {
        setSuccessMsg('');
        setErrorMsg('');
        try {
            const { data } = await adminAPI.toggleAdminStatus(id);
            if (data.success) {
                setSuccessMsg(data.message);
                fetchAdmins();
            }
        } catch (err) {
            setErrorMsg(err.response?.data?.message || 'Failed to toggle status');
        }
    };

    const handleDeleteAdmin = async (id, name) => {
        if (!confirm(`Are you sure you want to delete administrator "${name}"? This action cannot be undone.`)) {
            return;
        }
        setSuccessMsg('');
        setErrorMsg('');
        try {
            const { data } = await adminAPI.deleteAdmin(id);
            if (data.success) {
                setSuccessMsg(data.message);
                fetchAdmins();
            }
        } catch (err) {
            setErrorMsg(err.response?.data?.message || 'Failed to delete admin');
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">Settings</h1>
                    <p className="text-gray-400 text-sm mt-1">Manage your admin profile, passwords, and security options.</p>
                </div>
            </div>

            {/* Notification Banners */}
            {successMsg && (
                <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 flex items-center gap-3">
                    <Check className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-medium">{successMsg}</span>
                </div>
            )}
            {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-3">
                    <X className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-medium">{errorMsg}</span>
                </div>
            )}

            {/* Tabs & Content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Tabs Sidebar */}
                <div className="lg:col-span-1 space-y-2">
                    <button
                        onClick={() => { setActiveTab('profile'); setSuccessMsg(''); setErrorMsg(''); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                            activeTab === 'profile'
                                ? 'bg-[#00B7B3]/10 border border-[#00B7B3]/30 text-[#00B7B3]'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white border border-transparent'
                        }`}
                    >
                        <User className="w-5 h-5" />
                        <span className="text-sm font-semibold">Profile Info</span>
                    </button>
                    <button
                        onClick={() => { setActiveTab('password'); setSuccessMsg(''); setErrorMsg(''); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                            activeTab === 'password'
                                ? 'bg-[#00B7B3]/10 border border-[#00B7B3]/30 text-[#00B7B3]'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white border border-transparent'
                        }`}
                    >
                        <Lock className="w-5 h-5" />
                        <span className="text-sm font-semibold">Change Password</span>
                    </button>
                    {admin?.role === 'superadmin' && (
                        <button
                            onClick={() => { setActiveTab('admins'); setSuccessMsg(''); setErrorMsg(''); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                activeTab === 'admins'
                                    ? 'bg-[#00B7B3]/10 border border-[#00B7B3]/30 text-[#00B7B3]'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white border border-transparent'
                            }`}
                        >
                            <Shield className="w-5 h-5" />
                            <span className="text-sm font-semibold">Admin Management</span>
                        </button>
                    )}
                </div>

                {/* Content Panel */}
                <div className="lg:col-span-3 bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-2xl p-6 md:p-8">
                    
                    {/* PROFILE TAB */}
                    {activeTab === 'profile' && (
                        <div>
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <User className="text-[#00B7B3]" /> Profile Details
                            </h2>
                            <form onSubmit={handleProfileSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Display Name</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                                                <User className="w-4 h-4" />
                                            </span>
                                            <input
                                                type="text"
                                                required
                                                value={profileForm.name}
                                                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                                                className="w-full bg-black/40 border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#00B7B3] transition-all"
                                                placeholder="Guru Ji"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                                                <Mail className="w-4 h-4" />
                                            </span>
                                            <input
                                                type="email"
                                                required
                                                value={profileForm.email}
                                                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                                                className="w-full bg-black/40 border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#00B7B3] transition-all"
                                                placeholder="admin@nbastro.com"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-6 py-3 bg-[#00B7B3] text-black font-semibold rounded-xl hover:bg-[#009c98] transition-all disabled:opacity-50 flex items-center gap-2"
                                >
                                    {submitting ? 'Saving Changes...' : 'Save Changes'}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* PASSWORD TAB */}
                    {activeTab === 'password' && (
                        <div>
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Lock className="text-[#00B7B3]" /> Change Password
                            </h2>
                            <form onSubmit={handlePasswordSubmit} className="space-y-6">
                                <div className="space-y-4 max-w-md">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Current Password</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                                                <Key className="w-4 h-4" />
                                            </span>
                                            <input
                                                type="password"
                                                required
                                                value={passwordForm.currentPassword}
                                                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                                className="w-full bg-black/40 border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#00B7B3] transition-all"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">New Password</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                                                <Lock className="w-4 h-4" />
                                            </span>
                                            <input
                                                type="password"
                                                required
                                                value={passwordForm.newPassword}
                                                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                                className="w-full bg-black/40 border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#00B7B3] transition-all"
                                                placeholder="Min. 6 characters"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Confirm New Password</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                                                <Lock className="w-4 h-4" />
                                            </span>
                                            <input
                                                type="password"
                                                required
                                                value={passwordForm.confirmPassword}
                                                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                                className="w-full bg-black/40 border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#00B7B3] transition-all"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-6 py-3 bg-[#00B7B3] text-black font-semibold rounded-xl hover:bg-[#009c98] transition-all disabled:opacity-50 flex items-center gap-2"
                                >
                                    {submitting ? 'Updating Password...' : 'Update Password'}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* ADMIN MANAGEMENT TAB (Superadmin Only) */}
                    {activeTab === 'admins' && admin?.role === 'superadmin' && (
                        <div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Shield className="text-[#00B7B3]" /> Administrator Users
                                </h2>
                                <button
                                    onClick={() => setShowCreateModal(true)}
                                    className="px-4 py-2.5 bg-[#00B7B3] text-black text-sm font-semibold rounded-xl hover:bg-[#009c98] transition-all flex items-center gap-2 self-start"
                                >
                                    <Plus className="w-4 h-4" /> Add Admin / Editor
                                </button>
                            </div>

                            {adminsLoading ? (
                                <div className="flex items-center justify-center py-12">
                                    <RefreshCw className="w-8 h-8 text-[#00B7B3] animate-spin" />
                                </div>
                            ) : (
                                <div className="overflow-x-auto rounded-xl border border-gray-800 bg-black/20">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-gray-800 text-gray-400 text-xs font-semibold uppercase bg-gray-900/40">
                                                <th className="px-6 py-4">Name</th>
                                                <th className="px-6 py-4">Email</th>
                                                <th className="px-6 py-4">Role</th>
                                                <th className="px-6 py-4">Status</th>
                                                <th className="px-6 py-4">Last Login</th>
                                                <th className="px-6 py-4 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-800/60 text-sm text-gray-300">
                                            {admins.map((u) => (
                                                <tr key={u._id} className="hover:bg-gray-800/10">
                                                    <td className="px-6 py-4 font-semibold text-white">{u.name}</td>
                                                    <td className="px-6 py-4">{u.email}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase ${
                                                            u.role === 'superadmin' 
                                                                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
                                                                : u.role === 'admin'
                                                                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                        }`}>
                                                            {u.role}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {u.role === 'superadmin' ? (
                                                            <span className="text-green-400 text-xs flex items-center gap-1.5 font-medium">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Always Active
                                                            </span>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleToggleStatus(u._id)}
                                                                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full transition-all border ${
                                                                    u.isActive 
                                                                        ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20' 
                                                                        : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
                                                                }`}
                                                            >
                                                                <span className={`w-1.5 h-1.5 rounded-full ${u.isActive ? 'bg-green-400' : 'bg-red-400'}`}></span>
                                                                {u.isActive ? 'Active' : 'Deactivated'}
                                                            </button>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-xs text-gray-500">
                                                        {u.lastLogin ? new Date(u.lastLogin).toLocaleString() : 'Never logged in'}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        {u.role !== 'superadmin' && (
                                                            <button
                                                                onClick={() => handleDeleteAdmin(u._id, u.name)}
                                                                className="p-1.5 text-gray-500 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all inline-flex items-center justify-center"
                                                                title="Delete Administrator"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                            {admins.length === 0 && (
                                                <tr>
                                                    <td colSpan="6" className="text-center py-8 text-gray-500 font-medium">No other administrators found.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* CREATE MODAL */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="relative w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl">
                        <button
                            onClick={() => setShowCreateModal(false)}
                            className="absolute top-4 right-4 p-1 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Plus className="text-[#00B7B3]" /> Add Admin / Editor
                        </h3>

                        <form onSubmit={handleCreateAdmin} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Display Name</label>
                                <input
                                    type="text"
                                    required
                                    value={newAdminForm.name}
                                    onChange={(e) => setNewAdminForm({ ...newAdminForm, name: e.target.value })}
                                    className="w-full bg-black/40 border border-gray-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00B7B3] transition-all"
                                    placeholder="Enter full name"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={newAdminForm.email}
                                    onChange={(e) => setNewAdminForm({ ...newAdminForm, email: e.target.value })}
                                    className="w-full bg-black/40 border border-gray-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00B7B3] transition-all"
                                    placeholder="email@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Temp Password</label>
                                <input
                                    type="password"
                                    required
                                    value={newAdminForm.password}
                                    onChange={(e) => setNewAdminForm({ ...newAdminForm, password: e.target.value })}
                                    className="w-full bg-black/40 border border-gray-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00B7B3] transition-all"
                                    placeholder="Min. 6 characters"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Permission Role</label>
                                <select
                                    value={newAdminForm.role}
                                    onChange={(e) => setNewAdminForm({ ...newAdminForm, role: e.target.value })}
                                    className="w-full bg-black/40 border border-gray-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00B7B3] transition-all"
                                >
                                    <option value="admin" className="bg-gray-900">Administrator</option>
                                    <option value="editor" className="bg-gray-900">Editor</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-3 bg-[#00B7B3] text-black font-semibold rounded-xl hover:bg-[#009c98] transition-all disabled:opacity-50 mt-4"
                            >
                                {submitting ? 'Creating Administrator...' : 'Create Account'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingsPage;
