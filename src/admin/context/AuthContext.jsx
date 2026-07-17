import React, { createContext, useState, useContext, useEffect } from 'react';
import { adminAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            loadAdmin();
        } else {
            setLoading(false);
        }
    }, []);

    const loadAdmin = async () => {
        try {
            const { data } = await adminAPI.getProfile();
            setAdmin(data.admin);
        } catch (error) {
            localStorage.removeItem('adminToken');
            setError(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const { data } = await adminAPI.login({ email, password });
            localStorage.setItem('adminToken', data.token);
            setAdmin(data.admin);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        setAdmin(null);
    };

    const updateProfile = async (profileData) => {
        try {
            const { data } = await adminAPI.updateProfile(profileData);
            setAdmin(data.admin);
            return { success: true, message: data.message };
        } catch (error) {
            return { success: false, error: error.response?.data?.message };
        }
    };

    const changePassword = async (currentPassword, newPassword) => {
        try {
            const { data } = await adminAPI.changePassword({ currentPassword, newPassword });
            return { success: true, message: data.message };
        } catch (error) {
            return { success: false, error: error.response?.data?.message };
        }
    };

    const value = {
        admin,
        loading,
        error,
        login,
        logout,
        updateProfile,
        changePassword
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};