import React from 'react';
import { useAuth } from '../context/AuthContext';


const AdminHeader = () => {
    const { admin, logout } = useAuth();

    return (
        <header className="bg-black/40 backdrop-blur-sm border-b border-[#00B7B3]/20 px-6 py-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-white">Welcome back, {admin?.name}</h2>
                    <p className="text-xs text-gray-500">Role: {admin?.role}</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] flex items-center justify-center text-black font-bold">
                        {admin?.name?.charAt(0) || 'A'}
                    </div>
                    <button
                        onClick={logout}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;