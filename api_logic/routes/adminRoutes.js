const express = require('express');
const router = express.Router();
const {
    createSuperAdmin,
    createAdmin,
    loginAdmin,
    getAdminProfile,
    updateAdminProfile,
    getAllAdmins,
    toggleAdminStatus,
    deleteAdmin,
    changePassword,
    updateAdminBySuperAdmin
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

// ==================== Public Routes ====================
router.post('/create-super', createSuperAdmin);   // First time setup (Run once via Postman)
router.post('/login', loginAdmin);               // Login

// ==================== Protected Routes ====================
router.get('/profile', protect, getAdminProfile);              // Get own profile
router.put('/profile', protect, updateAdminProfile);           // Update own profile
router.put('/change-password', protect, changePassword);       // Change password

// ==================== Super Admin Only Routes ====================
router.post('/create', protect, createAdmin);                  // Create admin/editor
router.get('/all', protect, getAllAdmins);                     // Get all admins
router.put('/:id', protect, updateAdminBySuperAdmin);          // Update admin/editor details
router.patch('/:id/toggle-status', protect, toggleAdminStatus); // Activate/Deactivate
router.delete('/:id', protect, deleteAdmin);                   // Delete admin

module.exports = router;

