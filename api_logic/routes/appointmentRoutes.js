// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    createAppointment,
    verifyPayment,
    getAppointment,
    getAllAppointments,
    updateAppointmentStatus,
    cancelAppointment,
    getAppointmentStats
} = require('../controllers/appointmentController');

// Public Routes
router.post('/', createAppointment);
router.post('/verify-payment', verifyPayment);
router.get('/:id', getAppointment);

// Protected Admin Routes
router.get('/admin/all', protect, getAllAppointments);
router.get('/admin/stats', protect, getAppointmentStats);
router.put('/admin/:id', protect, updateAppointmentStatus);
router.delete('/admin/:id', protect, cancelAppointment);

module.exports = router;