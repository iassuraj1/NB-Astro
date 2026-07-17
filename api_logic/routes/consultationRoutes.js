// routes/consultationRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { uploadConsultation } = require('../middleware/uploadMiddleware');
const {
    getAllServices,
    getServiceById,
    getServiceBySlug,
    getServiceWithSEO,
    createService,
    updateService,
    deleteService,
    toggleStatus,
    toggleFeatured,
    reorderServices
} = require('../controllers/consultationController');

// ==================== PUBLIC ROUTES ====================
router.get('/', getAllServices);
router.get('/slug/:slug', getServiceBySlug);
router.get('/seo/slug/:slug', getServiceWithSEO);  // For frontend with SEO data
router.get('/:id', getServiceById);

// ==================== PROTECTED ROUTES (ADMIN ONLY) ====================
router.post('/', protect, uploadConsultation.single('image'), createService);
router.put('/:id', protect, uploadConsultation.single('image'), updateService);
router.delete('/:id', protect, deleteService);
router.patch('/:id/toggle-status', protect, toggleStatus);
router.patch('/:id/toggle-featured', protect, toggleFeatured);
router.post('/reorder', protect, reorderServices);

module.exports = router;