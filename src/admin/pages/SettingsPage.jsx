import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../services/api';
import { 
    User, 
    Lock, 
    Shield, 
    Trash2, 
    Plus, 
    Check, 
    X, 
    Key, 
    Mail, 
    RefreshCw, 
    Edit, 
    Info, 
    Eye, 
    AlertCircle,
    UserCheck,
    CheckCircle2
} from 'lucide-react';

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

    // Edit Admin State
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState({
        _id: '',
        name: '',
        email: '',
        role: 'admin',
        password: ''
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

    const handleEditClick = (adminToEdit) => {
        setEditingAdmin({
            _id: adminToEdit._id,
            name: adminToEdit.name || '',
            email: adminToEdit.email || '',
            role: adminToEdit.role || 'admin',
            password: ''
        });
        setShowEditModal(true);
    };

    const handleEditAdminSubmit = async (e) => {
        e.preventDefault();
        setSuccessMsg('');
        setErrorMsg('');
        setSubmitting(true);
        try {
            const updateData = {
                name: editingAdmin.name,
                email: editingAdmin.email,
                role: editingAdmin.role
            };
            if (editingAdmin.password && editingAdmin.password.trim() !== '') {
                updateData.password = editingAdmin.password;
            }

            const { data } = await adminAPI.updateAdmin(editingAdmin._id, updateData);
            if (data.success) {
                setSuccessMsg(data.message || 'Admin user updated successfully');
                setShowEditModal(false);
                fetchAdmins();
            }
        } catch (err) {
            setErrorMsg(err.response?.data?.message || 'Failed to update admin user');
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
        <div className="max-w-6xl mx-auto px-4 py-2">
            {/* Header Redesign */}
            <div className="relative overflow-hidden mb-8 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-gray-900 via-gray-950 to-[#00B7B3]/5 border border-gray-800 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00B7B3]/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00B7B3] mb-2 bg-[#00B7B3]/10 px-3 py-1 rounded-full w-fit">
                            <Shield className="w-3.5 h-3.5" /> Control Center
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">System Settings</h1>
                        <p className="text-gray-400 text-sm mt-1 max-w-xl">
                            Configure your administrator credentials, secure your account details, and delegate specific roles and permissions to other team members.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 bg-gray-900/80 border border-gray-800 p-3 rounded-2xl w-fit self-start md:self-auto">
                        <div className="w-10 h-10 rounded-xl bg-[#00B7B3]/15 flex items-center justify-center text-[#00B7B3]">
                            <UserCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-semibold uppercase">Logged In As</p>
                            <p className="text-sm font-bold text-white">{admin?.name || 'Loading...'}</p>
                            <span className="text-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-md font-bold uppercase mt-0.5 inline-block">
                                {admin?.role}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notification Banners */}
            {successMsg && (
                <div className="mb-6 p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-3 animate-fadeIn">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm font-medium">{successMsg}</span>
                </div>
            )}
            {errorMsg && (
                <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3 animate-fadeIn">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span className="text-sm font-medium">{errorMsg}</span>
                </div>
            )}

            {/* Tabs & Content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Tabs Sidebar */}
                <div className="lg:col-span-1 space-y-2.5">
                    <button
                        onClick={() => { setActiveTab('profile'); setSuccessMsg(''); setErrorMsg(''); }}
                        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                            activeTab === 'profile'
                                ? 'bg-[#00B7B3] text-black font-bold shadow-lg shadow-[#00B7B3]/10 transform translate-x-1'
                                : 'text-gray-400 hover:bg-gray-900 hover:text-white border border-transparent'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <User className="w-5 h-5" />
                            <span className="text-sm">Profile Details</span>
                        </div>
                        <span className={`text-[10px] uppercase px-2 py-0.5 rounded ${activeTab === 'profile' ? 'bg-black/20 text-black' : 'bg-gray-800 text-gray-400'}`}>Edit</span>
                    </button>
                    
                    <button
                        onClick={() => { setActiveTab('password'); setSuccessMsg(''); setErrorMsg(''); }}
                        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                            activeTab === 'password'
                                ? 'bg-[#00B7B3] text-black font-bold shadow-lg shadow-[#00B7B3]/10 transform translate-x-1'
                                : 'text-gray-400 hover:bg-gray-900 hover:text-white border border-transparent'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <Lock className="w-5 h-5" />
                            <span className="text-sm">Security Key</span>
                        </div>
                        <span className={`text-[10px] uppercase px-2 py-0.5 rounded ${activeTab === 'password' ? 'bg-black/20 text-black' : 'bg-gray-800 text-gray-400'}`}>Secure</span>
                    </button>
                    
                    {admin?.role === 'superadmin' && (
                        <button
                            onClick={() => { setActiveTab('admins'); setSuccessMsg(''); setErrorMsg(''); }}
                            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                                activeTab === 'admins'
                                    ? 'bg-[#00B7B3] text-black font-bold shadow-lg shadow-[#00B7B3]/10 transform translate-x-1'
                                    : 'text-gray-400 hover:bg-gray-900 hover:text-white border border-transparent'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <Shield className="w-5 h-5" />
                                <span className="text-sm">Manage Rights</span>
                            </div>
                            <span className={`text-[10px] uppercase px-2 py-0.5 rounded ${activeTab === 'admins' ? 'bg-black/20 text-black' : 'bg-gray-850 text-gray-400'}`}>Users</span>
                        </button>
                    )}

                    {/* Quick Guidance Box */}
                    <div className="mt-8 p-4 rounded-2xl bg-gray-900/40 border border-gray-800/80">
                        <h4 className="text-xs font-bold text-gray-300 mb-2 flex items-center gap-1.5">
                            <Info className="w-3.5 h-3.5 text-[#00B7B3]" /> Quick Guide
                        </h4>
                        <p className="text-[11px] text-gray-400 leading-relaxed">
                            Keep your profile info updated. Setting a secure password protects the administrative dashboard from unauthorized entry.
                        </p>
                    </div>
                </div>
 
                {/* Content Panel */}
                <div className="lg:col-span-3 bg-gray-950/40 backdrop-blur-xl border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl relative">
                    
                    {/* PROFILE TAB */}
                    {activeTab === 'profile' && (
                        <div>
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <User className="text-[#00B7B3] w-5 h-5" /> Profile Details
                                </h2>
                                <p className="text-xs text-gray-400 mt-1">Change your admin username and primary contact email address here.</p>
                            </div>
                            
                            <form onSubmit={handleProfileSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Display Name</label>
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
                                        <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Email Address</label>
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
 
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="px-6 py-3 bg-[#00B7B3] text-black font-bold rounded-xl hover:bg-[#009c98] transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-[#00B7B3]/10"
                                    >
                                        {submitting ? (
                                            <>
                                                <RefreshCw className="w-4 h-4 animate-spin" /> Saving...
                                            </>
                                        ) : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
 
                    {/* PASSWORD TAB */}
                    {activeTab === 'password' && (
                        <div>
                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Lock className="text-[#00B7B3] w-5 h-5" /> Change Password
                                </h2>
                                <p className="text-xs text-gray-400 mt-1">To ensure security, please do not use passwords that you use on other sites.</p>
                            </div>
                            
                            <form onSubmit={handlePasswordSubmit} className="space-y-6">
                                <div className="space-y-4 max-w-md">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Current Password</label>
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
                                        <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">New Password</label>
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
                                        <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Confirm New Password</label>
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
 
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="px-6 py-3 bg-[#00B7B3] text-black font-bold rounded-xl hover:bg-[#009c98] transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-[#00B7B3]/10"
                                    >
                                        {submitting ? (
                                            <>
                                                <RefreshCw className="w-4 h-4 animate-spin" /> Updating...
                                            </>
                                        ) : 'Update Password'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
 
                    {/* ADMIN MANAGEMENT TAB (Superadmin Only) */}
                    {activeTab === 'admins' && admin?.role === 'superadmin' && (
                        <div className="space-y-8">
                            
                            {/* Role Permission Guidelines for easy visitor understanding */}
                            <div className="p-5 rounded-2xl bg-gradient-to-r from-gray-900/60 to-gray-900/20 border border-gray-800">
                                <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                                    <Info className="w-4 h-4 text-[#00B7B3]" /> Understanding Administrator Roles & Rights
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                                    <div className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/10">
                                        <p className="font-bold text-purple-400 uppercase tracking-wider mb-1">Super Admin</p>
                                        <p className="text-gray-400 leading-relaxed">Full access. Can manage administrators, configure payment settings, edit website templates, and view all system logs.</p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                                        <p className="font-bold text-blue-400 uppercase tracking-wider mb-1">Admin</p>
                                        <p className="text-gray-400 leading-relaxed">Mid-level. Can schedule appointments, add/modify courses, handle consultations, but cannot manage other administrators.</p>
                                    </div>
                                    <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                                        <p className="font-bold text-amber-400 uppercase tracking-wider mb-1">Editor</p>
                                        <p className="text-gray-400 leading-relaxed">Content only. Can create/publish blog posts and update static page texts. Cannot edit services, bookings, or settings.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                        <Shield className="text-[#00B7B3] w-5 h-5" /> Administrator Accounts
                                    </h2>
                                    <p className="text-xs text-gray-400 mt-1">Add, update, suspend, or delete team members from accessing the dashboard.</p>
                                </div>
                                <button
                                    onClick={() => setShowCreateModal(true)}
                                    className="px-4 py-2.5 bg-[#00B7B3] text-black text-sm font-bold rounded-xl hover:bg-[#009c98] transition-all flex items-center gap-2 self-start shadow-lg shadow-[#00B7B3]/10"
                                >
                                    <Plus className="w-4 h-4" /> Add Admin / Editor
                                </button>
                            </div>
 
                            {adminsLoading ? (
                                <div className="flex items-center justify-center py-12">
                                    <RefreshCw className="w-8 h-8 text-[#00B7B3] animate-spin" />
                                </div>
                            ) : (
                                <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-black/20">
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
                                                <tr key={u._id} className="hover:bg-gray-800/5 transition-all">
                                                    <td className="px-6 py-4">
                                                        <div className="font-semibold text-white">{u.name}</div>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-400">{u.email}</td>
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
                                                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> System Active
                                                            </span>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleToggleStatus(u._id)}
                                                                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full transition-all border ${
                                                                    u.isActive 
                                                                        ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20' 
                                                                        : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
                                                                }`}
                                                                title={u.isActive ? "Click to deactivate" : "Click to activate"}
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
                                                        <div className="flex justify-end gap-2">
                                                            <button
                                                                onClick={() => handleEditClick(u)}
                                                                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-all inline-flex items-center justify-center"
                                                                title="Edit Administrator"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                            {u.role !== 'superadmin' && (
                                                                <button
                                                                    onClick={() => handleDeleteAdmin(u._id, u.name)}
                                                                    className="p-1.5 text-gray-500 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all inline-flex items-center justify-center"
                                                                    title="Delete Administrator"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            )}
                                                        </div>
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
                    <div className="relative w-full max-w-md bg-gray-950 border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl">
                        <button
                            onClick={() => setShowCreateModal(false)}
                            className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-900 transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <Plus className="text-[#00B7B3] w-5 h-5" /> Add Admin / Editor
                        </h3>
                        <p className="text-xs text-gray-400 mb-6">Create a new dashboard access profile. Make sure to choose the correct role privileges.</p>
 
                        <form onSubmit={handleCreateAdmin} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Display Name</label>
                                <input
                                    type="text"
                                    required
                                    value={newAdminForm.name}
                                    onChange={(e) => setNewAdminForm({ ...newAdminForm, name: e.target.value })}
                                    className="w-full bg-black/40 border border-gray-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00B7B3] transition-all placeholder-gray-700"
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
                                    className="w-full bg-black/40 border border-gray-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00B7B3] transition-all placeholder-gray-700"
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
                                    className="w-full bg-black/40 border border-gray-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00B7B3] transition-all placeholder-gray-700"
                                    placeholder="Min. 6 characters"
                                />
                            </div>
 
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Permission Role</label>
                                <select
                                    value={newAdminForm.role}
                                    onChange={(e) => setNewAdminForm({ ...newAdminForm, role: e.target.value })}
                                    className="w-full bg-black border border-gray-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00B7B3] transition-all"
                                >
                                    <option value="admin" className="bg-gray-950">Administrator (Mid-level)</option>
                                    <option value="editor" className="bg-gray-950">Editor (Content only)</option>
                                </select>
                            </div>
 
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-3.5 bg-[#00B7B3] text-black font-bold rounded-xl hover:bg-[#009c98] transition-all disabled:opacity-50 mt-6 shadow-lg shadow-[#00B7B3]/10"
                            >
                                {submitting ? 'Creating Administrator...' : 'Create Account'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* EDIT MODAL */}
            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
                    <div className="relative w-full max-w-md bg-gray-950 border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl">
                        <button
                            onClick={() => setShowEditModal(false)}
                            className="absolute top-5 right-5 p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-900 transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <Edit className="text-[#00B7B3] w-5 h-5" /> Edit Administrator
                        </h3>
                        <p className="text-xs text-gray-400 mb-6">Modify user profile, change access level roles, or optionally assign a new password.</p>
 
                        <form onSubmit={handleEditAdminSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Display Name</label>
                                <input
                                    type="text"
                                    required
                                    value={editingAdmin.name}
                                    onChange={(e) => setEditingAdmin({ ...editingAdmin, name: e.target.value })}
                                    className="w-full bg-black/40 border border-gray-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00B7B3] transition-all"
                                    placeholder="Enter full name"
                                />
                            </div>
 
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={editingAdmin.email}
                                    onChange={(e) => setEditingAdmin({ ...editingAdmin, email: e.target.value })}
                                    className="w-full bg-black/40 border border-gray-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00B7B3] transition-all"
                                    placeholder="email@example.com"
                                />
                            </div>
 
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                    New Password <span className="text-[10px] text-gray-500 normal-case">(Leave blank to keep current)</span>
                                </label>
                                <input
                                    type="password"
                                    value={editingAdmin.password}
                                    onChange={(e) => setEditingAdmin({ ...editingAdmin, password: e.target.value })}
                                    className="w-full bg-black/40 border border-gray-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00B7B3] transition-all placeholder-gray-800"
                                    placeholder="Enter new password (optional)"
                                />
                            </div>
 
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Permission Role</label>
                                <select
                                    value={editingAdmin.role}
                                    disabled={editingAdmin.role === 'superadmin'}
                                    onChange={(e) => setEditingAdmin({ ...editingAdmin, role: e.target.value })}
                                    className="w-full bg-black border border-gray-800 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[#00B7B3] transition-all disabled:opacity-50"
                                >
                                    {editingAdmin.role === 'superadmin' ? (
                                        <option value="superadmin" className="bg-gray-950">Super Administrator</option>
                                    ) : (
                                        <>
                                            <option value="admin" className="bg-gray-950">Administrator (Mid-level)</option>
                                            <option value="editor" className="bg-gray-950">Editor (Content only)</option>
                                        </>
                                    )}
                                </select>
                            </div>
 
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-3.5 bg-[#00B7B3] text-black font-bold rounded-xl hover:bg-[#009c98] transition-all disabled:opacity-50 mt-6 shadow-lg shadow-[#00B7B3]/10"
                            >
                                {submitting ? 'Updating Account...' : 'Save Settings'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingsPage;
