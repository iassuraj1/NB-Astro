



// // middleware/uploadMiddleware.js
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// const createStorage = (folder) => {
//     return multer.diskStorage({
//         destination: function (req, file, cb) {
//             const uploadPath = path.join(__dirname, '../uploads', folder);
//             if (!fs.existsSync(uploadPath)) {
//                 fs.mkdirSync(uploadPath, { recursive: true });
//             }
//             cb(null, uploadPath);
//         },
//         filename: function (req, file, cb) {
//             const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//             const ext = path.extname(file.originalname);
//             cb(null, file.fieldname + '-' + uniqueSuffix + ext);
//         }
//     });
// };

// const fileFilter = (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png|gif|webp/;
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = allowedTypes.test(file.mimetype);
    
//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'), false);
//     }
// };

// // Create different upload instances for different purposes
// const uploadCourse = multer({
//     storage: createStorage('courses'),
//     limits: { fileSize: 5 * 1024 * 1024 },
//     fileFilter: fileFilter
// });

// const uploadInstructor = multer({
//     storage: createStorage('instructors'),
//     limits: { fileSize: 5 * 1024 * 1024 },
//     fileFilter: fileFilter
// });

// const uploadAbout = multer({
//     storage: createStorage('about'),
//     limits: { fileSize: 5 * 1024 * 1024 },
//     fileFilter: fileFilter
// });

// const uploadHero = multer({
//     storage: createStorage('hero'),
//     limits: { fileSize: 5 * 1024 * 1024 },
//     fileFilter: fileFilter
// });

// const uploadService = multer({
//     storage: createStorage('services'),
//     limits: { fileSize: 5 * 1024 * 1024 },
//     fileFilter: fileFilter
// });

// const uploadMisc = multer({
//     storage: createStorage('misc'),
//     limits: { fileSize: 5 * 1024 * 1024 },
//     fileFilter: fileFilter
// });

// module.exports = {
//     uploadCourse,
//     uploadInstructor,
//     uploadAbout,
//     uploadHero,
//     uploadService,
//     uploadMisc
// };


// // middleware/uploadMiddleware.js
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// const createStorage = (folder) => {
//     return multer.diskStorage({
//         destination: function (req, file, cb) {
//             const uploadPath = path.join(process.cwd(), 'public', 'uploads', folder);
//             if (!fs.existsSync(uploadPath)) {
//                 fs.mkdirSync(uploadPath, { recursive: true });
//             }
//             cb(null, uploadPath);
//         },
//         filename: function (req, file, cb) {
//             const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//             const ext = path.extname(file.originalname);
//             cb(null, file.fieldname + '-' + uniqueSuffix + ext);
//         }
//     });
// };

// const fileFilter = (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png|gif|webp/;
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = allowedTypes.test(file.mimetype);
    
//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'), false);
//     }
// };

// // Create different upload instances for different purposes
// const uploadCourse = multer({
//     storage: createStorage('courses'),
//     limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//     fileFilter: fileFilter
// });

// const uploadInstructor = multer({
//     storage: createStorage('instructors'),
//     limits: { fileSize: 5 * 1024 * 1024 },
//     fileFilter: fileFilter
// });

// const uploadAbout = multer({
//     storage: createStorage('about'),
//     limits: { fileSize: 5 * 1024 * 1024 },
//     fileFilter: fileFilter
// });

// const uploadHero = multer({
//     storage: createStorage('hero'),
//     limits: { fileSize: 5 * 1024 * 1024 },
//     fileFilter: fileFilter
// });

// const uploadService = multer({
//     storage: createStorage('services'),
//     limits: { fileSize: 5 * 1024 * 1024 },
//     fileFilter: fileFilter
// });

// const uploadMisc = multer({
//     storage: createStorage('misc'),
//     limits: { fileSize: 5 * 1024 * 1024 },
//     fileFilter: fileFilter
// });

// // 👇 NEW: Consultation upload
// const uploadConsultation = multer({
//     storage: createStorage('consultations'),
//     limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
//     fileFilter: fileFilter
// });

// module.exports = {
//     uploadCourse,
//     uploadInstructor,
//     uploadAbout,
//     uploadHero,
//     uploadService,
//     uploadMisc,
//     uploadConsultation  // 👈 EXPORT THIS
// };


// // middleware/uploadMiddleware.js
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// const createStorage = (folder) => {
//     return multer.diskStorage({
//         destination: function (req, file, cb) {
//             const uploadPath = path.join(process.cwd(), 'public', 'uploads', folder);
//             if (!fs.existsSync(uploadPath)) {
//                 fs.mkdirSync(uploadPath, { recursive: true });
//             }
//             cb(null, uploadPath);
//         },
//         filename: function (req, file, cb) {
//             const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//             const ext = path.extname(file.originalname);
//             cb(null, file.fieldname + '-' + uniqueSuffix + ext);
//         }
//     });
// };

// const fileFilter = (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png|gif|webp/;
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = allowedTypes.test(file.mimetype);
    
//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'), false);
//     }
// };

// // ✅ CRITICAL FIX: any() use karo - text fields bhi aayenge
// const uploadAny = multer({
//     storage: createStorage('temp'),
//     limits: { fileSize: 5 * 1024 * 1024 },
//     fileFilter: fileFilter
// });

// // Specific uploads for different folders
// const createUpload = (folder) => {
//     return multer({
//         storage: createStorage(folder),
//         limits: { fileSize: 5 * 1024 * 1024 },
//         fileFilter: fileFilter
//     });
// };

// const uploadCourse = createUpload('courses');
// const uploadInstructor = createUpload('instructors');
// const uploadAbout = createUpload('about');
// const uploadHero = createUpload('hero');
// const uploadService = createUpload('services');
// const uploadMisc = createUpload('misc');
// const uploadConsultation = createUpload('consultations');

// module.exports = {
//     uploadCourse,
//     uploadInstructor,
//     uploadAbout,
//     uploadHero,
//     uploadService,
//     uploadMisc,
//     uploadConsultation,
//     uploadAny
// };

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const createStorage = (folder) => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            const uploadPath = path.join(process.cwd(), 'public', 'uploads', folder);
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const ext = path.extname(file.originalname);
            cb(null, file.fieldname + '-' + uniqueSuffix + ext);
        }
    });
};

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'), false);
    }
};

// Specific upload instances
const uploadCourse = multer({
    storage: createStorage('courses'),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter
});

const uploadInstructor = multer({
    storage: createStorage('instructors'),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter
});

const uploadAbout = multer({
    storage: createStorage('about'),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter
});

const uploadHero = multer({
    storage: createStorage('hero'),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter
});

const uploadService = multer({
    storage: createStorage('services'),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter
});

const uploadMisc = multer({
    storage: createStorage('misc'),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter
});

const uploadConsultation = multer({
    storage: createStorage('consultations'),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter
});

// ✅ 'any()' upload for dynamic folder detection
const uploadAny = multer({
    storage: createStorage('temp'),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter
});

module.exports = {
    uploadCourse,
    uploadInstructor,
    uploadAbout,
    uploadHero,
    uploadService,
    uploadMisc,
    uploadConsultation,
    uploadAny
};