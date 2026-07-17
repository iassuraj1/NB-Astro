


    // routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { deleteUploadFile } = require('../utils/imageStorage');
const Course = require('../models/Course');
const ConsultationService = require('../models/ConsultationService');
const { HeroSlide, Service, AboutSection } = require('../models/HomePage');
const AboutPageContent = require('../models/AboutPageContent');

// Import upload middleware
const {
    uploadCourse,
    uploadInstructor,
    uploadAbout,
    uploadHero,
    uploadService,
    uploadMisc,
    uploadConsultation
} = require('../middleware/uploadMiddleware');

const imageModels = {
    course: Course,
    consultation: ConsultationService,
    heroSlide: HeroSlide,
    homeService: Service,
    aboutSection: AboutSection,
    aboutPage: AboutPageContent,
};

// Import auth middleware with error handling
let protect, admin;
try {
    const authMiddleware = require('../middleware/authMiddleware');
    protect = authMiddleware.protect;
    admin = authMiddleware.admin;
    
    // Validate middleware functions
    if (typeof protect !== 'function') protect = (req, res, next) => next();
    if (typeof admin !== 'function') admin = (req, res, next) => next();
} catch (error) {
    console.warn('⚠️ Auth middleware not found, running without authentication');
    protect = (req, res, next) => next();
    admin = (req, res, next) => next();
}

// Helper function for upload responses
const handleUpload = (req, res, folder) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        const imagePath = `/uploads/${folder}/${req.file.filename}`;

        res.json({
            success: true,
            message: 'Image uploaded successfully',
            imagePath: imagePath
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ==================== UPLOAD ROUTES ====================

// Course images
router.post('/course-image', protect, admin, (req, res) => {
    uploadCourse.single('courseImage')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
        handleUpload(req, res, 'courses');
    });
});

// Instructor images
router.post('/instructor-image', protect, admin, (req, res) => {
    uploadInstructor.single('instructorImage')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
        handleUpload(req, res, 'instructors');
    });
});

// About page images
router.post('/about-image', protect, admin, (req, res) => {
    uploadAbout.single('aboutImage')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
        handleUpload(req, res, 'about');
    });
});

// Hero images
router.post('/hero-image', protect, admin, (req, res) => {
    uploadHero.single('image')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
        handleUpload(req, res, 'hero');
    });
});

// Hero mobile images
router.post('/hero-mobile-image', protect, admin, (req, res) => {
    uploadHero.single('mobileImage')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
        handleUpload(req, res, 'hero');
    });
});

// Service images
router.post('/service-image', protect, admin, (req, res) => {
    uploadService.single('serviceImage')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
        handleUpload(req, res, 'services');
    });
});

// Misc images
router.post('/misc-image', protect, admin, (req, res) => {
    uploadMisc.single('image')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
        handleUpload(req, res, 'misc');
    });
});

// Delete image
router.delete('/image', protect, admin, async (req, res) => {
    try {
        const { imagePath, model, id, field = 'image' } = req.body;
        
        if (!imagePath) {
            return res.status(400).json({ success: false, message: 'Image path is required' });
        }

        deleteUploadFile(imagePath);

        let updatedRecord = null;
        if (model && id) {
            const Model = imageModels[model];
            if (!Model) {
                return res.status(400).json({ success: false, message: 'Invalid image model' });
            }
            updatedRecord = await Model.findByIdAndUpdate(id, { $unset: { [field]: '' } }, { new: true });
            if (!updatedRecord) {
                return res.status(404).json({ success: false, message: 'Related database record not found' });
            }
        }

        res.json({ success: true, message: 'Image deleted successfully', data: updatedRecord });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Bulk delete images
router.post('/delete-images', protect, admin, (req, res) => {
    try {
        const { imagePaths } = req.body;
        
        if (!imagePaths || !Array.isArray(imagePaths)) {
            return res.status(400).json({ success: false, message: 'Image paths array is required' });
        }

        const results = { deleted: [], failed: [] };

        imagePaths.forEach(imagePath => {
            try {
                const normalizedPath = path.normalize(imagePath);
                if (normalizedPath.includes('..')) {
                    results.failed.push({ path: imagePath, error: 'Invalid path' });
                    return;
                }

                const fullPath = path.join(process.cwd(), 'public', normalizedPath);
                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                    results.deleted.push(imagePath);
                } else {
                    results.failed.push({ path: imagePath, error: 'File not found' });
                }
            } catch (error) {
                results.failed.push({ path: imagePath, error: error.message });
            }
        });

        res.json({
            success: true,
            message: `${results.deleted.length} images deleted, ${results.failed.length} failed`,
            data: results
        });
    } catch (error) {
        console.error('Bulk delete error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get image info
router.get('/image-info', protect, admin, (req, res) => {
    try {
        const { path: imagePath } = req.query;
        
        if (!imagePath) {
            return res.status(400).json({ success: false, message: 'Image path is required' });
        }

        const normalizedPath = path.normalize(imagePath);
        const fullPath = path.join(process.cwd(), 'public', normalizedPath);
        
        if (fs.existsSync(fullPath)) {
            const stats = fs.statSync(fullPath);
            res.json({
                success: true,
                exists: true,
                size: stats.size,
                modified: stats.mtime
            });
        } else {
            res.json({ success: true, exists: false });
        }
    } catch (error) {
        console.error('Image info error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Consultation image upload
router.post('/consultation-image', protect, admin, (req, res) => {
    uploadConsultation.single('image')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message });
        }
        handleUpload(req, res, 'consultations');
    });
});

// Test route
router.get('/test', (req, res) => {
    res.json({ success: true, message: 'Upload routes are working!' });
});

console.log('✅ Upload routes loaded successfully');
module.exports = router;

