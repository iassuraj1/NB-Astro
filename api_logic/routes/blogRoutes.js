// const express = require('express');
// const router = express.Router();

// // ✅ IMPORT FROM AUTH MIDDLEWARE
// const authMiddleware = require('../middleware/authMiddleware');
// const protect = authMiddleware.protect;
// const admin = authMiddleware.admin;

// const {
//     getBlogs,
//     getBlogBySlug,
//     getFeaturedBlogs,
//     getPopularBlogs,
//     getBlogCategories,
//     getBlogTags,
//     createBlog,
//     getAllBlogsAdmin,
//     getBlogById,
//     updateBlog,
//     deleteBlog,
//     togglePublish,
//     toggleFeatured
// } = require('../controllers/blogController');

// // ✅ PUBLIC ROUTES
// router.get('/', getBlogs);
// router.get('/featured', getFeaturedBlogs);
// router.get('/popular', getPopularBlogs);
// router.get('/categories', getBlogCategories);
// router.get('/tags', getBlogTags);
// router.get('/:slug', getBlogBySlug);

// // ✅ ADMIN ROUTES - Ab kaam karega
// router.post('/', protect, admin, createBlog);
// router.get('/admin/all', protect, admin, getAllBlogsAdmin);
// router.get('/admin/:id', protect, admin, getBlogById);
// router.put('/:id', protect, admin, updateBlog);
// router.delete('/:id', protect, admin, deleteBlog);
// router.patch('/:id/toggle-publish', protect, admin, togglePublish);
// router.patch('/:id/toggle-featured', protect, admin, toggleFeatured);

// module.exports = router;



const express = require('express');
const router = express.Router();

const {
    getBlogs,
    getBlogBySlug,
    getFeaturedBlogs,
    getPopularBlogs,
    getBlogCategories,
    getBlogTags,
    createBlog,
    getAllBlogsAdmin,
    getBlogById,
    updateBlog,
    deleteBlog,
    togglePublish,
    toggleFeatured
} = require('../controllers/blogController');

// ✅ PUBLIC ROUTES
router.get('/', getBlogs);
router.get('/featured', getFeaturedBlogs);
router.get('/popular', getPopularBlogs);
router.get('/categories', getBlogCategories);
router.get('/tags', getBlogTags);
router.get('/:slug', getBlogBySlug);

// ✅ ADMIN ROUTES - WITH DEBUG
router.post('/', (req, res, next) => {
    console.log('🔥 [ROUTE] POST /api/blog hit!');
    console.log('🔥 [ROUTE] Body:', req.body);
    console.log('🔥 [ROUTE] createBlog type:', typeof createBlog);
    next();
}, createBlog);

router.get('/admin/all', getAllBlogsAdmin);
router.get('/admin/:id', getBlogById);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);
router.patch('/:id/toggle-publish', togglePublish);
router.patch('/:id/toggle-featured', toggleFeatured);

module.exports = router;