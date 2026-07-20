


//     // routes/uploadRoutes.js
// const express = require('express');
// const router = express.Router();
// const path = require('path');
// const fs = require('fs');
// const { deleteUploadFile } = require('../utils/imageStorage');
// const Course = require('../models/Course');
// const ConsultationService = require('../models/ConsultationService');
// const { HeroSlide, Service, AboutSection } = require('../models/HomePage');
// const AboutPageContent = require('../models/AboutPageContent');

// // Import upload middleware
// const {
//     uploadCourse,
//     uploadInstructor,
//     uploadAbout,
//     uploadHero,
//     uploadService,
//     uploadMisc,
//     uploadConsultation
// } = require('../middleware/uploadMiddleware');

// const imageModels = {
//     course: Course,
//     consultation: ConsultationService,
//     heroSlide: HeroSlide,
//     homeService: Service,
//     aboutSection: AboutSection,
//     aboutPage: AboutPageContent,
// };

// // Import auth middleware with error handling
// let protect, admin;
// try {
//     const authMiddleware = require('../middleware/authMiddleware');
//     protect = authMiddleware.protect;
//     admin = authMiddleware.admin;
    
//     // Validate middleware functions
//     if (typeof protect !== 'function') protect = (req, res, next) => next();
//     if (typeof admin !== 'function') admin = (req, res, next) => next();
// } catch (error) {
//     console.warn('⚠️ Auth middleware not found, running without authentication');
//     protect = (req, res, next) => next();
//     admin = (req, res, next) => next();
// }

// // Helper function for upload responses
// const handleUpload = (req, res, folder) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'No file uploaded'
//             });
//         }

//         const imagePath = `/uploads/${folder}/${req.file.filename}`;

//         res.json({
//             success: true,
//             message: 'Image uploaded successfully',
//             imagePath: imagePath
//         });
//     } catch (error) {
//         console.error('Upload error:', error);
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// // ==================== UPLOAD ROUTES ====================

// // Course images
// router.post('/course-image', protect, admin, (req, res) => {
//     uploadCourse.single('courseImage')(req, res, (err) => {
//         if (err) {
//             return res.status(400).json({ success: false, message: err.message });
//         }
//         handleUpload(req, res, 'courses');
//     });
// });

// // Instructor images
// router.post('/instructor-image', protect, admin, (req, res) => {
//     uploadInstructor.single('instructorImage')(req, res, (err) => {
//         if (err) {
//             return res.status(400).json({ success: false, message: err.message });
//         }
//         handleUpload(req, res, 'instructors');
//     });
// });

// // About page images
// router.post('/about-image', protect, admin, (req, res) => {
//     uploadAbout.single('aboutImage')(req, res, (err) => {
//         if (err) {
//             return res.status(400).json({ success: false, message: err.message });
//         }
//         handleUpload(req, res, 'about');
//     });
// });

// // Hero images
// router.post('/hero-image', protect, admin, (req, res) => {
//     uploadHero.single('image')(req, res, (err) => {
//         if (err) {
//             return res.status(400).json({ success: false, message: err.message });
//         }
//         handleUpload(req, res, 'hero');
//     });
// });

// // Hero mobile images
// router.post('/hero-mobile-image', protect, admin, (req, res) => {
//     uploadHero.single('mobileImage')(req, res, (err) => {
//         if (err) {
//             return res.status(400).json({ success: false, message: err.message });
//         }
//         handleUpload(req, res, 'hero');
//     });
// });

// // Service images
// router.post('/service-image', protect, admin, (req, res) => {
//     uploadService.single('serviceImage')(req, res, (err) => {
//         if (err) {
//             return res.status(400).json({ success: false, message: err.message });
//         }
//         handleUpload(req, res, 'services');
//     });
// });

// // Misc images
// router.post('/misc-image', protect, admin, (req, res) => {
//     uploadMisc.single('image')(req, res, (err) => {
//         if (err) {
//             return res.status(400).json({ success: false, message: err.message });
//         }
//         handleUpload(req, res, 'misc');
//     });
// });

// // Delete image
// router.delete('/image', protect, admin, async (req, res) => {
//     try {
//         const { imagePath, model, id, field = 'image' } = req.body;
        
//         if (!imagePath) {
//             return res.status(400).json({ success: false, message: 'Image path is required' });
//         }

//         deleteUploadFile(imagePath);

//         let updatedRecord = null;
//         if (model && id) {
//             const Model = imageModels[model];
//             if (!Model) {
//                 return res.status(400).json({ success: false, message: 'Invalid image model' });
//             }
//             updatedRecord = await Model.findByIdAndUpdate(id, { $unset: { [field]: '' } }, { new: true });
//             if (!updatedRecord) {
//                 return res.status(404).json({ success: false, message: 'Related database record not found' });
//             }
//         }

//         res.json({ success: true, message: 'Image deleted successfully', data: updatedRecord });
//     } catch (error) {
//         console.error('Delete error:', error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// // Bulk delete images
// router.post('/delete-images', protect, admin, (req, res) => {
//     try {
//         const { imagePaths } = req.body;
        
//         if (!imagePaths || !Array.isArray(imagePaths)) {
//             return res.status(400).json({ success: false, message: 'Image paths array is required' });
//         }

//         const results = { deleted: [], failed: [] };

//         imagePaths.forEach(imagePath => {
//             try {
//                 const normalizedPath = path.normalize(imagePath);
//                 if (normalizedPath.includes('..')) {
//                     results.failed.push({ path: imagePath, error: 'Invalid path' });
//                     return;
//                 }

//                 const fullPath = path.join(process.cwd(), 'public', normalizedPath);
//                 if (fs.existsSync(fullPath)) {
//                     fs.unlinkSync(fullPath);
//                     results.deleted.push(imagePath);
//                 } else {
//                     results.failed.push({ path: imagePath, error: 'File not found' });
//                 }
//             } catch (error) {
//                 results.failed.push({ path: imagePath, error: error.message });
//             }
//         });

//         res.json({
//             success: true,
//             message: `${results.deleted.length} images deleted, ${results.failed.length} failed`,
//             data: results
//         });
//     } catch (error) {
//         console.error('Bulk delete error:', error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// // Get image info
// router.get('/image-info', protect, admin, (req, res) => {
//     try {
//         const { path: imagePath } = req.query;
        
//         if (!imagePath) {
//             return res.status(400).json({ success: false, message: 'Image path is required' });
//         }

//         const normalizedPath = path.normalize(imagePath);
//         const fullPath = path.join(process.cwd(), 'public', normalizedPath);
        
//         if (fs.existsSync(fullPath)) {
//             const stats = fs.statSync(fullPath);
//             res.json({
//                 success: true,
//                 exists: true,
//                 size: stats.size,
//                 modified: stats.mtime
//             });
//         } else {
//             res.json({ success: true, exists: false });
//         }
//     } catch (error) {
//         console.error('Image info error:', error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// // Consultation image upload
// router.post('/consultation-image', protect, admin, (req, res) => {
//     uploadConsultation.single('image')(req, res, (err) => {
//         if (err) {
//             return res.status(400).json({ success: false, message: err.message });
//         }
//         handleUpload(req, res, 'consultations');
//     });
// });

// // Test route
// router.get('/test', (req, res) => {
//     res.json({ success: true, message: 'Upload routes are working!' });
// });

// console.log('✅ Upload routes loaded successfully');
// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const path = require('path');
// const fs = require('fs');
// const { deleteUploadFile } = require('../utils/imageStorage');
// const Course = require('../models/Course');
// const ConsultationService = require('../models/ConsultationService');
// const { HeroSlide, Service, AboutSection } = require('../models/HomePage');
// const AboutPageContent = require('../models/AboutPageContent');

// // Import upload middleware
// const {
//     uploadCourse,
//     uploadInstructor,
//     uploadAbout,
//     uploadHero,
//     uploadService,
//     uploadMisc,
//     uploadConsultation
// } = require('../middleware/uploadMiddleware');

// const imageModels = {
//     course: Course,
//     consultation: ConsultationService,
//     heroSlide: HeroSlide,
//     homeService: Service,
//     aboutSection: AboutSection,
//     aboutPage: AboutPageContent,
// };

// // Import auth middleware with error handling
// let protect, admin;
// try {
//     const authMiddleware = require('../middleware/authMiddleware');
//     protect = authMiddleware.protect;
//     admin = authMiddleware.admin;
    
//     if (typeof protect !== 'function') protect = (req, res, next) => next();
//     if (typeof admin !== 'function') admin = (req, res, next) => next();
// } catch (error) {
//     console.warn('⚠️ Auth middleware not found, running without authentication');
//     protect = (req, res, next) => next();
//     admin = (req, res, next) => next();
// }

// // ✅ Helper function to delete old image from request body
// const deleteOldImageIfExists = (req) => {
//     try {
//         const oldImagePath = req.body.oldImagePath || req.body.oldImage || '';
        
//         if (oldImagePath) {
//             console.log(`🗑️ Deleting old image: ${oldImagePath}`);
//             deleteUploadFile(oldImagePath);
//             return true;
//         }
//         return false;
//     } catch (error) {
//         console.error('❌ Error deleting old image:', error);
//         return false;
//     }
// };

// // Helper function for upload responses
// const handleUpload = (req, res, folder) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'No file uploaded'
//             });
//         }

//         // ✅ Delete old image if provided
//         deleteOldImageIfExists(req);

//         const imagePath = `/uploads/${folder}/${req.file.filename}`;

//         res.json({
//             success: true,
//             message: 'Image uploaded successfully',
//             imagePath: imagePath,
//             location: imagePath,
//             url: imagePath,
//             filename: req.file.filename,
//             folder: folder
//         });
//     } catch (error) {
//         console.error('Upload error:', error);
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// // ==================== UPLOAD ROUTES ====================

// // Course images
// router.post('/course-image', protect, admin, (req, res) => {
//     uploadCourse.single('courseImage')(req, res, (err) => {
//         if (err) {
//             return res.status(400).json({ success: false, message: err.message });
//         }
//         handleUpload(req, res, 'courses');
//     });
// });

// // Instructor images
// router.post('/instructor-image', protect, admin, (req, res) => {
//     uploadInstructor.single('instructorImage')(req, res, (err) => {
//         if (err) {
//             return res.status(400).json({ success: false, message: err.message });
//         }
//         handleUpload(req, res, 'instructors');
//     });
// });

// // About page images
// router.post('/about-image', protect, admin, (req, res) => {
//     uploadAbout.single('aboutImage')(req, res, (err) => {
//         if (err) {
//             return res.status(400).json({ success: false, message: err.message });
//         }
//         handleUpload(req, res, 'about');
//     });
// });

// // Hero images
// router.post('/hero-image', protect, admin, (req, res) => {
//     uploadHero.single('image')(req, res, (err) => {
//         if (err) {
//             return res.status(400).json({ success: false, message: err.message });
//         }
//         handleUpload(req, res, 'hero');
//     });
// });

// // Hero mobile images
// router.post('/hero-mobile-image', protect, admin, (req, res) => {
//     uploadHero.single('mobileImage')(req, res, (err) => {
//         if (err) {
//             return res.status(400).json({ success: false, message: err.message });
//         }
//         handleUpload(req, res, 'hero');
//     });
// });

// // Service images
// router.post('/service-image', protect, admin, (req, res) => {
//     uploadService.single('serviceImage')(req, res, (err) => {
//         if (err) {
//             return res.status(400).json({ success: false, message: err.message });
//         }
//         handleUpload(req, res, 'services');
//     });
// });

// // Misc images
// router.post('/misc-image', protect, admin, (req, res) => {
//     uploadMisc.single('image')(req, res, (err) => {
//         if (err) {
//             return res.status(400).json({ success: false, message: err.message });
//         }
//         handleUpload(req, res, 'misc');
//     });
// });

// // Delete image
// router.delete('/image', protect, admin, async (req, res) => {
//     try {
//         const { imagePath, model, id, field = 'image' } = req.body;
        
//         if (!imagePath) {
//             return res.status(400).json({ success: false, message: 'Image path is required' });
//         }

//         deleteUploadFile(imagePath);

//         let updatedRecord = null;
//         if (model && id) {
//             const Model = imageModels[model];
//             if (!Model) {
//                 return res.status(400).json({ success: false, message: 'Invalid image model' });
//             }
//             updatedRecord = await Model.findByIdAndUpdate(id, { $unset: { [field]: '' } }, { new: true });
//             if (!updatedRecord) {
//                 return res.status(404).json({ success: false, message: 'Related database record not found' });
//             }
//         }

//         res.json({ success: true, message: 'Image deleted successfully', data: updatedRecord });
//     } catch (error) {
//         console.error('Delete error:', error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// // Bulk delete images
// router.post('/delete-images', protect, admin, (req, res) => {
//     try {
//         const { imagePaths } = req.body;
        
//         if (!imagePaths || !Array.isArray(imagePaths)) {
//             return res.status(400).json({ success: false, message: 'Image paths array is required' });
//         }

//         const results = { deleted: [], failed: [] };

//         imagePaths.forEach(imagePath => {
//             try {
//                 const normalizedPath = path.normalize(imagePath);
//                 if (normalizedPath.includes('..')) {
//                     results.failed.push({ path: imagePath, error: 'Invalid path' });
//                     return;
//                 }

//                 const fullPath = path.join(process.cwd(), 'public', normalizedPath);
//                 if (fs.existsSync(fullPath)) {
//                     fs.unlinkSync(fullPath);
//                     results.deleted.push(imagePath);
//                 } else {
//                     results.failed.push({ path: imagePath, error: 'File not found' });
//                 }
//             } catch (error) {
//                 results.failed.push({ path: imagePath, error: error.message });
//             }
//         });

//         res.json({
//             success: true,
//             message: `${results.deleted.length} images deleted, ${results.failed.length} failed`,
//             data: results
//         });
//     } catch (error) {
//         console.error('Bulk delete error:', error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// // Get image info
// router.get('/image-info', protect, admin, (req, res) => {
//     try {
//         const { path: imagePath } = req.query;
        
//         if (!imagePath) {
//             return res.status(400).json({ success: false, message: 'Image path is required' });
//         }

//         const normalizedPath = path.normalize(imagePath);
//         const fullPath = path.join(process.cwd(), 'public', normalizedPath);
        
//         if (fs.existsSync(fullPath)) {
//             const stats = fs.statSync(fullPath);
//             res.json({
//                 success: true,
//                 exists: true,
//                 size: stats.size,
//                 modified: stats.mtime
//             });
//         } else {
//             res.json({ success: true, exists: false });
//         }
//     } catch (error) {
//         console.error('Image info error:', error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// });

// // Consultation image upload
// router.post('/consultation-image', protect, admin, (req, res) => {
//     uploadConsultation.single('image')(req, res, (err) => {
//         if (err) {
//             return res.status(400).json({ success: false, message: err.message });
//         }
//         handleUpload(req, res, 'consultations');
//     });
// });

// // Test route
// router.get('/test', (req, res) => {
//     res.json({ success: true, message: 'Upload routes are working!' });
// });

const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { deleteUploadFile } = require('../utils/imageStorage');

// Import upload middleware
const {
    uploadCourse,
    uploadInstructor,
    uploadAbout,
    uploadHero,
    uploadService,
    uploadMisc,
    uploadConsultation,
    uploadAny
} = require('../middleware/uploadMiddleware');

// Import auth middleware
let protect, admin;
try {
    const authMiddleware = require('../middleware/authMiddleware');
    protect = authMiddleware.protect;
    admin = authMiddleware.admin;
    if (typeof protect !== 'function') protect = (req, res, next) => next();
    if (typeof admin !== 'function') admin = (req, res, next) => next();
} catch (error) {
    console.warn('⚠️ Auth middleware not found, running without authentication');
    protect = (req, res, next) => next();
    admin = (req, res, next) => next();
}

// ✅ DELETE FUNCTION - With extra logging
const deleteOldImage = (imagePath) => {
    try {
        if (!imagePath) {
            console.log('ℹ️ No old image path');
            return false;
        }
        console.log(`🗑️ [DELETE] Attempting: "${imagePath}"`);
        
        const result = deleteUploadFile(imagePath);
        console.log(`📊 [DELETE] Result:`, JSON.stringify(result, null, 2));
        
        if (result && result.deleted) {
            console.log(`✅ [DELETE] Success: ${imagePath}`);
            return true;
        } else {
            console.log(`⚠️ [DELETE] Failed: ${imagePath} - ${result?.reason || 'Unknown'}`);
            return false;
        }
    } catch (error) {
        console.error(`❌ [DELETE] Error:`, error);
        return false;
    }
};

// ✅ DETECT FOLDER FROM FIELD NAME OR OLD IMAGE PATH
const detectFolder = (fieldName, oldImagePath) => {
    // Priority 1: Check field name
    if (fieldName) {
        if (fieldName.includes('about') || fieldName.includes('introduction') || 
            fieldName.includes('teaching') || fieldName.includes('consultation') || 
            fieldName.includes('beyond') || fieldName.includes('location')) {
            return 'about';
        }
        if (fieldName.includes('course')) return 'courses';
        if (fieldName.includes('hero')) return 'hero';
        if (fieldName.includes('service')) return 'services';
        if (fieldName.includes('consultation')) return 'consultations';
        if (fieldName.includes('instructor')) return 'instructors';
    }
    
    // Priority 2: Check old image path
    if (oldImagePath) {
        if (oldImagePath.includes('/about/')) return 'about';
        if (oldImagePath.includes('/courses/')) return 'courses';
        if (oldImagePath.includes('/hero/')) return 'hero';
        if (oldImagePath.includes('/services/')) return 'services';
        if (oldImagePath.includes('/consultations/')) return 'consultations';
        if (oldImagePath.includes('/instructors/')) return 'instructors';
        if (oldImagePath.includes('/misc/')) return 'misc';
    }
    
    return 'misc';
};

// ============================================================
// ✅ NEW: DYNAMIC UPLOAD WITH DELETE - Auto folder detection
// ============================================================
router.post('/with-delete', protect, admin, (req, res) => {
    uploadAny.any()(req, res, (err) => {
        if (err) {
            console.error('❌ Upload error:', err);
            return res.status(400).json({ success: false, message: err.message });
        }

        try {
            console.log('📋 Body:', req.body);
            console.log('📋 Files:', req.files);

            const file = req.files && req.files.length > 0 ? req.files[0] : null;
            if (!file) {
                return res.status(400).json({ success: false, message: 'No file uploaded' });
            }

            // Get old image path
            const oldImagePath = req.body.oldImagePath || req.body.oldImage || '';
            
            // Detect folder
            let folder = req.body.folder || 'misc';
            if (folder === 'temp' || folder === 'misc') {
                const detected = detectFolder(req.body.field, oldImagePath);
                if (detected !== 'misc') {
                    folder = detected;
                }
            }
            
            console.log(`📁 Detected folder: ${folder}`);
            console.log(`🗑️ Old image: ${oldImagePath || 'None'}`);

            // DELETE OLD IMAGE FIRST
            let oldDeleted = false;
            if (oldImagePath) {
                oldDeleted = deleteOldImage(oldImagePath);
            }

            // SAVE NEW IMAGE to correct folder
            const timestamp = Date.now();
            const random = Math.floor(Math.random() * 1000000000);
            const ext = path.extname(file.originalname);
            const filename = `${folder}Image-${timestamp}-${random}${ext}`;
            
            const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            
            const newPath = path.join(uploadDir, filename);
            fs.renameSync(file.path, newPath);
            
            const imagePath = `/uploads/${folder}/${filename}`;
            console.log(`✅ New image saved: ${imagePath}`);

            res.json({
                success: true,
                message: oldDeleted ? 'Uploaded (old deleted)' : 'Uploaded',
                imagePath: imagePath,
                location: imagePath,
                url: imagePath,
                filename: filename,
                folder: folder,
                oldImageDeleted: oldDeleted
            });

        } catch (error) {
            console.error('❌ Upload error:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    });
});

// ============================================================
// ✅ SPECIFIC ROUTES - Each with DELETE support
// ============================================================

// ABOUT PAGE IMAGES
router.post('/about-image', protect, admin, (req, res) => {
    uploadAbout.single('aboutImage')(req, res, (err) => {
        if (err) {
            console.error('❌ Multer error:', err);
            return res.status(400).json({ success: false, message: err.message });
        }
        
        try {
            if (!req.file) {
                return res.status(400).json({ success: false, message: 'No file uploaded' });
            }

            const oldImagePath = req.body.oldImagePath || req.body.oldImage || '';
            console.log(`📁 Folder: about`);
            console.log(`📄 File: ${req.file.filename}`);
            console.log(`🗑️ Old image: ${oldImagePath || 'None'}`);

            let oldDeleted = false;
            if (oldImagePath) {
                oldDeleted = deleteOldImage(oldImagePath);
            }

            const imagePath = `/uploads/about/${req.file.filename}`;
            console.log(`✅ New image: ${imagePath}`);

            res.json({
                success: true,
                message: oldDeleted ? 'Uploaded (old deleted)' : 'Uploaded',
                imagePath: imagePath,
                location: imagePath,
                url: imagePath,
                filename: req.file.filename,
                folder: 'about',
                oldImageDeleted: oldDeleted
            });
        } catch (error) {
            console.error('❌ Upload error:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    });
});

// COURSE IMAGES
router.post('/course-image', protect, admin, (req, res) => {
    uploadCourse.single('courseImage')(req, res, (err) => {
        if (err) return res.status(400).json({ success: false, message: err.message });
        
        try {
            if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

            const oldImagePath = req.body.oldImagePath || req.body.oldImage || '';
            let oldDeleted = false;
            if (oldImagePath) {
                oldDeleted = deleteOldImage(oldImagePath);
            }

            const imagePath = `/uploads/courses/${req.file.filename}`;
            res.json({
                success: true,
                message: oldDeleted ? 'Uploaded (old deleted)' : 'Uploaded',
                imagePath: imagePath,
                location: imagePath,
                url: imagePath,
                filename: req.file.filename,
                folder: 'courses',
                oldImageDeleted: oldDeleted
            });
        } catch (error) {
            console.error('❌ Upload error:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    });
});

// HERO IMAGES
router.post('/hero-image', protect, admin, (req, res) => {
    uploadHero.single('image')(req, res, (err) => {
        if (err) return res.status(400).json({ success: false, message: err.message });
        
        try {
            if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

            const oldImagePath = req.body.oldImagePath || req.body.oldImage || '';
            let oldDeleted = false;
            if (oldImagePath) {
                oldDeleted = deleteOldImage(oldImagePath);
            }

            const imagePath = `/uploads/hero/${req.file.filename}`;
            res.json({
                success: true,
                message: oldDeleted ? 'Uploaded (old deleted)' : 'Uploaded',
                imagePath: imagePath,
                location: imagePath,
                url: imagePath,
                filename: req.file.filename,
                folder: 'hero',
                oldImageDeleted: oldDeleted
            });
        } catch (error) {
            console.error('❌ Upload error:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    });
});

// HERO MOBILE IMAGES
router.post('/hero-mobile-image', protect, admin, (req, res) => {
    uploadHero.single('mobileImage')(req, res, (err) => {
        if (err) return res.status(400).json({ success: false, message: err.message });
        
        try {
            if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

            const oldImagePath = req.body.oldImagePath || req.body.oldImage || '';
            let oldDeleted = false;
            if (oldImagePath) {
                oldDeleted = deleteOldImage(oldImagePath);
            }

            const imagePath = `/uploads/hero/${req.file.filename}`;
            res.json({
                success: true,
                message: oldDeleted ? 'Uploaded (old deleted)' : 'Uploaded',
                imagePath: imagePath,
                location: imagePath,
                url: imagePath,
                filename: req.file.filename,
                folder: 'hero',
                oldImageDeleted: oldDeleted
            });
        } catch (error) {
            console.error('❌ Upload error:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    });
});

// SERVICE IMAGES
router.post('/service-image', protect, admin, (req, res) => {
    uploadService.single('serviceImage')(req, res, (err) => {
        if (err) return res.status(400).json({ success: false, message: err.message });
        
        try {
            if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

            const oldImagePath = req.body.oldImagePath || req.body.oldImage || '';
            let oldDeleted = false;
            if (oldImagePath) {
                oldDeleted = deleteOldImage(oldImagePath);
            }

            const imagePath = `/uploads/services/${req.file.filename}`;
            res.json({
                success: true,
                message: oldDeleted ? 'Uploaded (old deleted)' : 'Uploaded',
                imagePath: imagePath,
                location: imagePath,
                url: imagePath,
                filename: req.file.filename,
                folder: 'services',
                oldImageDeleted: oldDeleted
            });
        } catch (error) {
            console.error('❌ Upload error:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    });
});

// CONSULTATION IMAGES
router.post('/consultation-image', protect, admin, (req, res) => {
    uploadConsultation.single('image')(req, res, (err) => {
        if (err) return res.status(400).json({ success: false, message: err.message });
        
        try {
            if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

            const oldImagePath = req.body.oldImagePath || req.body.oldImage || '';
            let oldDeleted = false;
            if (oldImagePath) {
                oldDeleted = deleteOldImage(oldImagePath);
            }

            const imagePath = `/uploads/consultations/${req.file.filename}`;
            res.json({
                success: true,
                message: oldDeleted ? 'Uploaded (old deleted)' : 'Uploaded',
                imagePath: imagePath,
                location: imagePath,
                url: imagePath,
                filename: req.file.filename,
                folder: 'consultations',
                oldImageDeleted: oldDeleted
            });
        } catch (error) {
            console.error('❌ Upload error:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    });
});

// INSTRUCTOR IMAGES
router.post('/instructor-image', protect, admin, (req, res) => {
    uploadInstructor.single('instructorImage')(req, res, (err) => {
        if (err) return res.status(400).json({ success: false, message: err.message });
        
        try {
            if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

            const oldImagePath = req.body.oldImagePath || req.body.oldImage || '';
            let oldDeleted = false;
            if (oldImagePath) {
                oldDeleted = deleteOldImage(oldImagePath);
            }

            const imagePath = `/uploads/instructors/${req.file.filename}`;
            res.json({
                success: true,
                message: oldDeleted ? 'Uploaded (old deleted)' : 'Uploaded',
                imagePath: imagePath,
                location: imagePath,
                url: imagePath,
                filename: req.file.filename,
                folder: 'instructors',
                oldImageDeleted: oldDeleted
            });
        } catch (error) {
            console.error('❌ Upload error:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    });
});

// MISC IMAGES
router.post('/misc-image', protect, admin, (req, res) => {
    uploadMisc.single('image')(req, res, (err) => {
        if (err) return res.status(400).json({ success: false, message: err.message });
        
        try {
            if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

            const oldImagePath = req.body.oldImagePath || req.body.oldImage || '';
            let oldDeleted = false;
            if (oldImagePath) {
                oldDeleted = deleteOldImage(oldImagePath);
            }

            const imagePath = `/uploads/misc/${req.file.filename}`;
            res.json({
                success: true,
                message: oldDeleted ? 'Uploaded (old deleted)' : 'Uploaded',
                imagePath: imagePath,
                location: imagePath,
                url: imagePath,
                filename: req.file.filename,
                folder: 'misc',
                oldImageDeleted: oldDeleted
            });
        } catch (error) {
            console.error('❌ Upload error:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    });
});

// ============================================================
// ✅ DELETE IMAGE
// ============================================================
router.delete('/image', protect, admin, async (req, res) => {
    try {
        const { imagePath } = req.body;
        if (!imagePath) {
            return res.status(400).json({ success: false, message: 'Image path required' });
        }
        const result = deleteUploadFile(imagePath);
        if (!result.deleted) {
            return res.status(404).json({ success: false, message: result.reason || 'Image not found' });
        }
        res.json({ success: true, message: 'Image deleted successfully' });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// ============================================================
// ✅ TEST ROUTE
// ============================================================
router.get('/test', (req, res) => {
    res.json({ success: true, message: 'Upload routes are working!' });
});

console.log('✅ Upload routes loaded successfully');
module.exports = router;