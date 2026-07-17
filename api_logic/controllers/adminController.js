const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d'
    });
};

// ==================== Create Super Admin ====================
const createSuperAdmin = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if any admin exists
        const adminExists = await Admin.findOne();
        
        if (adminExists) {
            return res.status(400).json({
                success: false,
                message: 'Admin already exists'
            });
        }

        const superAdmin = await Admin.create({
            name: name || 'Super Admin',
            email: email || 'superadmin@nbastro.com',
            password: password || 'SuperAdmin@123',
            role: 'superadmin'
        });

        res.status(201).json({
            success: true,
            message: 'Super admin created successfully',
            admin: {
                _id: superAdmin._id,
                name: superAdmin.name,
                email: superAdmin.email,
                role: superAdmin.role
            }
        });
    } catch (error) {
        next(error);
    }
};

// ==================== Create Admin/Editor ====================
const createAdmin = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        // Only super admin can create
        if (req.admin.role !== 'superadmin') {
            return res.status(403).json({
                success: false,
                message: 'Only super admin can create new admins'
            });
        }

        // Check if admin already exists
        const adminExists = await Admin.findOne({ email });
        if (adminExists) {
            return res.status(400).json({
                success: false,
                message: 'Admin with this email already exists'
            });
        }

        const admin = await Admin.create({
            name,
            email,
            password,
            role: role || 'admin'
        });

        res.status(201).json({
            success: true,
            message: `${role || 'admin'} created successfully`,
            admin: {
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {
        next(error);
    }
};

// ==================== Login ====================
const loginAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        if (!admin.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Your account is deactivated. Contact super admin.'
            });
        }

        const isPasswordMatch = await admin.matchPassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        admin.lastLogin = Date.now();
        await admin.save();

        res.json({
            success: true,
            message: 'Login successful',
            admin: {
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            },
            token: generateToken(admin._id)
        });
    } catch (error) {
        next(error);
    }
};

// ==================== Get Profile ====================
const getAdminProfile = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.admin._id).select('-password');
        
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }

        res.json({
            success: true,
            admin
        });
    } catch (error) {
        next(error);
    }
};

// ==================== Update Profile ====================
const updateAdminProfile = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.admin._id);

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }

        admin.name = req.body.name || admin.name;

        if (req.body.password) {
            admin.password = req.body.password;
        }

        await admin.save();

        res.json({
            success: true,
            message: 'Profile updated successfully',
            admin: {
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {
        next(error);
    }
};

// ==================== Get All Admins ====================
const getAllAdmins = async (req, res, next) => {
    try {
        if (req.admin.role !== 'superadmin') {
            return res.status(403).json({
                success: false,
                message: 'Only super admin can view all admins'
            });
        }

        const admins = await Admin.find().select('-password');
        
        res.json({
            success: true,
            admins
        });
    } catch (error) {
        next(error);
    }
};

// ==================== Toggle Admin Status ====================
const toggleAdminStatus = async (req, res, next) => {
    try {
        if (req.admin.role !== 'superadmin') {
            return res.status(403).json({
                success: false,
                message: 'Only super admin can change admin status'
            });
        }

        const admin = await Admin.findById(req.params.id);
        
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }

        if (admin.role === 'superadmin') {
            return res.status(400).json({
                success: false,
                message: 'Cannot deactivate super admin'
            });
        }

        admin.isActive = !admin.isActive;
        await admin.save();

        res.json({
            success: true,
            message: `Admin ${admin.isActive ? 'activated' : 'deactivated'} successfully`
        });
    } catch (error) {
        next(error);
    }
};

// ==================== Delete Admin ====================
const deleteAdmin = async (req, res, next) => {
    try {
        if (req.admin.role !== 'superadmin') {
            return res.status(403).json({
                success: false,
                message: 'Only super admin can delete admins'
            });
        }

        const admin = await Admin.findById(req.params.id);
        
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }

        if (admin.role === 'superadmin') {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete super admin'
            });
        }

        await admin.deleteOne();

        res.json({
            success: true,
            message: 'Admin deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// ==================== Change Password ====================
const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        const admin = await Admin.findById(req.admin._id);
        
        const isMatch = await admin.matchPassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Current password is incorrect'
            });
        }

        admin.password = newPassword;
        await admin.save();

        res.json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createSuperAdmin,
    createAdmin,
    loginAdmin,
    getAdminProfile,
    updateAdminProfile,
    getAllAdmins,
    toggleAdminStatus,
    deleteAdmin,
    changePassword
};