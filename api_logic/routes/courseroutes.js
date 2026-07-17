// const express = require('express');
// const router = express.Router();
// const {
//     createCourse,
//     getAllCourses,
//     getCourseById,
//     getCourseBySlug,
//     updateCourse,
//     deleteCourse,
//     toggleCourseStatus,
//     getCourseStats
// } = require('../controllers/coursecontroller');
// const { protect } = require('../middleware/authMiddleware');

// // ==================== Public Routes ====================
// router.get('/', getAllCourses);                    // Get all courses with filters
// router.get('/stats', getCourseStats);              // Get course statistics
// router.get('/slug/:slug', getCourseBySlug);        // Get course by slug
// router.get('/id/:id', getCourseById);              // Get course by ID

// // ==================== Admin Only Routes (Protected) ====================
// router.post('/', protect, createCourse);           // Create new course
// router.put('/:id', protect, updateCourse);         // Update course
// router.delete('/:id', protect, deleteCourse);      // Delete course
// router.patch('/:id/toggle-status', protect, toggleCourseStatus);  // Toggle active status

// module.exports = router;


const express = require('express');
const router = express.Router();
const {
    createCourse,
    getAllCourses,
    getCourseById,
    getCourseBySlug,
    updateCourse,
    deleteCourse,
    toggleCourseStatus,
    getCourseStats,
    getCoursesForSitemap
} = require('../controllers/coursecontroller');
const { protect } = require('../middleware/authMiddleware');

// ==================== Public Routes ====================
router.get('/', getAllCourses);                    // Get all courses with filters
router.get('/stats', getCourseStats);              // Get course statistics
router.get('/sitemap', getCoursesForSitemap);      // Get courses for sitemap (SEO)
router.get('/slug/:slug', getCourseBySlug);        // Get course by slug
router.get('/id/:id', getCourseById);              // Get course by ID

// ==================== Admin Only Routes (Protected) ====================
router.post('/', protect, createCourse);           // Create new course
router.put('/:id', protect, updateCourse);         // Update course
router.delete('/:id', protect, deleteCourse);      // Delete course
router.patch('/:id/toggle-status', protect, toggleCourseStatus);  // Toggle active status

module.exports = router;

