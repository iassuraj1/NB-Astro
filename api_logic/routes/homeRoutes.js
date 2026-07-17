const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { protect } = require('../middleware/authMiddleware');

// Import ALL controllers
const {
    getHeroSlides,
    createHeroSlide,
    updateHeroSlide,
    deleteHeroSlide,
    getFeatures,
    createFeature,
    updateFeature,
    deleteFeature,
    getServices,
    createService,
    updateService,
    deleteService,
    getGuidanceCards,
    getFAQs,
    createFAQ,
    updateFAQ,
    deleteFAQ,
    getAboutSection,
    updateAboutSection,
    getContactInfo,
    updateContactInfo,
    getCTASection,
    updateCTASection,
    getSeoConfig,
    updateSeoConfig,
    getSitemapData
} = require('../controllers/homeController');

// Ensure upload directories exist inside the public directory
const uploadDirs = ['hero', 'services', 'about', 'misc'];
uploadDirs.forEach(dir => {
    const fullPath = path.join(process.cwd(), 'public', 'uploads', dir);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`Created directory: ${fullPath}`);
    }
});

// Configure multer storage to save inside public/uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = '';
        
        if (file.fieldname === 'image' || file.fieldname === 'mobileImage') {
            folder = 'hero';
        } else if (file.fieldname === 'serviceImage') {
            folder = 'services';
        } else if (file.fieldname === 'aboutImage') {
            folder = 'about';
        } else {
            folder = 'misc';
        }
        
        const uploadPath = path.join(process.cwd(), 'public', 'uploads', folder);
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'), false);
    }
};

// Create multer instances
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter
});

// Create separate multer instance for hero slides
const heroUpload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter
}).any(); // Use any() to accept all files

// Error handler for multer
const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ 
                success: false, 
                message: 'File size too large. Maximum size is 5MB' 
            });
        }
        return res.status(400).json({ 
            success: false, 
            message: err.message 
        });
    }
    if (err) {
        return res.status(400).json({ 
            success: false, 
            message: err.message 
        });
    }
    next();
};

// ==================== HERO SLIDES ROUTES ====================
router.get('/hero-slides', getHeroSlides);
router.post('/hero-slides', protect, heroUpload, handleMulterError, createHeroSlide);
router.put('/hero-slides/:id', protect, heroUpload, handleMulterError, updateHeroSlide);
router.delete('/hero-slides/:id', protect, deleteHeroSlide);

// ==================== FEATURES ROUTES ====================
router.get('/features', getFeatures);
router.post('/features', protect, createFeature);
router.put('/features/:id', protect, updateFeature);
router.delete('/features/:id', protect, deleteFeature);

// ==================== SERVICES ROUTES ====================
router.get('/guidance-cards', getGuidanceCards);
router.get('/services', getServices);
router.post('/services', protect, upload.single('serviceImage'), handleMulterError, createService);
router.put('/services/:id', protect, upload.single('serviceImage'), handleMulterError, updateService);
router.delete('/services/:id', protect, deleteService);

// ==================== FAQS ROUTES ====================
router.get('/faqs', getFAQs);
router.post('/faqs', protect, createFAQ);
router.put('/faqs/:id', protect, updateFAQ);
router.delete('/faqs/:id', protect, deleteFAQ);

// ==================== ABOUT SECTION ROUTES ====================
router.get('/about-section', getAboutSection);
router.put('/about-section', protect, upload.single('aboutImage'), handleMulterError, updateAboutSection);

// ==================== CONTACT INFO ROUTES ====================
router.get('/contact-info', getContactInfo);
router.put('/contact-info', protect, updateContactInfo);

// ==================== CTA SECTION ROUTES ====================
router.get('/cta-section', getCTASection);
router.put('/cta-section', protect, updateCTASection);

// ==================== SEO ROUTES ====================
router.route('/seo')
    .get(getSeoConfig)
    .put(protect, updateSeoConfig);

router.get('/sitemap', getSitemapData);

// Test route
router.get('/test', (req, res) => {
    res.json({ success: true, message: 'Home routes are working!' });
});

console.log('✅ Home routes loaded successfully');
module.exports = router;
