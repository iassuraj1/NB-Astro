// const mongoose = require('mongoose');

// // Schema for dynamic extra fields (key-value pairs)
// const extraFieldSchema = new mongoose.Schema({
//     key: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     value: {
//         type: mongoose.Schema.Types.Mixed,
//         required: true
//     },
//     type: {
//         type: String,
//         enum: ['text', 'number', 'date', 'boolean', 'array', 'object'],
//         default: 'text'
//     }
// }, { _id: true });

// const courseSchema = new mongoose.Schema({
//     // ==================== Basic Info ====================
//     title: {
//         type: String,
//         required: [true, 'Course title is required'],
//         trim: true
//     },
//     category: {
//         type: String,
//         required: [true, 'Course category is required'],
//         enum: ['ASTROLOGY COURSES', 'VASTU COURSES'],
//         default: 'ASTROLOGY COURSES'
//     },
//     slug: {
//         type: String,
//         unique: true,
//         lowercase: true
//     },
    
//     // ==================== Pricing (Flexible) ====================
//     price: {
//         type: String,
//         default: ''
//     },
//     courseFee: {
//         type: String,
//         default: ''
//     },
//     discountPrice: {
//         type: String,
//         default: ''
//     },
    
//     // ==================== Schedule (Flexible) ====================
//     date: {
//         type: String,
//         default: ''
//     },
//     timing: {
//         type: String,
//         default: ''
//     },
//     courseDuration: {
//         type: String,
//         default: ''
//     },
    
//     // ==================== Class Info ====================
//     type: {
//         type: String,
//         default: 'Online'
//     },
//     location: {
//         type: String,
//         default: 'Zoom'
//     },
    
//     // ==================== Images ====================
//     image: {
//         type: String,
//         default: '/uploads/courses/default-course.jpg'
//     },
    
//     // ==================== Content Sections ====================
//     whatIs: {
//         type: String,
//         default: ''
//     },
//     aboutCourse: {
//         type: String,
//         default: ''
//     },
//     courseContent: [{
//         type: String
//     }],
//     durationDetails: {
//         type: String,
//         default: ''
//     },
//     note: {
//         type: String,
//         default: 'Video Recording of Every Session Will Be Provided To Every Student After Session.'
//     },
//     highlights: [{
//         type: String
//     }],
    
//     // ==================== Instructor ====================
//     instructor: {
//         name: {
//             type: String,
//             default: 'Naveen Bhagat'
//         },
//         title: {
//             type: String,
//             default: 'Senior Astrologer & Vastu Consultant'
//         },
//         experience: {
//             type: String,
//             default: '20+ Years'
//         },
//         image: {
//             type: String,
//             default: '/uploads/instructors/default-instructor.jpg'
//         },
//         bio: {
//             type: String,
//             default: ''
//         }
//     },
    
//     // ==================== FAQs ====================
//     faqs: [{
//         question: String,
//         answer: String
//     }],
    
//     // ==================== Astrology-Specific Fields ====================
//     // These are important for astrology courses
//     level: {
//         type: String,
//         enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels', ''],
//         default: ''
//     },
//     modules: {
//         type: Number,
//         default: 0
//     },
//     includes: [{
//         type: String
//     }],  // e.g., "Birth Chart Analysis", "Kundli Matching", "Remedies"
    
//     // Vastu-specific fields
//     vastuType: {
//         type: String,
//         enum: ['Residential', 'Commercial', 'Land', 'Factory', 'Office', 'Temple', ''],
//         default: ''
//     },
    
//     // Common for both
//     certificateAvailable: {
//         type: Boolean,
//         default: true
//     },
//     language: {
//         type: String,
//         default: 'Hindi & English'
//     },
    
//     // ==================== Status ====================
//     isActive: {
//         type: Boolean,
//         default: true
//     },
//     isFeatured: {
//         type: Boolean,
//         default: false
//     },
    
//     // ==================== Dynamic Extra Fields ====================
//     // For any additional fields client wants to add
//     extraFields: [extraFieldSchema],
//     customData: {
//         type: mongoose.Schema.Types.Mixed,
//         default: {}
//     },
    
//     // ==================== Timestamps ====================
//     createdAt: {
//         type: Date,
//         default: Date.now
//     },
//     updatedAt: {
//         type: Date,
//         default: Date.now
//     }
// }, {
//     strict: false  // Allows adding fields without schema
// });

// // Auto-generate slug from title before saving
// courseSchema.pre('save', function(next) {
//     if (this.isModified('title') && this.title) {
//         this.slug = this.title
//             .toLowerCase()
//             .replace(/\s+/g, '-')
//             .replace(/[^\w-]+/g, '')
//             .replace(/--+/g, '-')
//             .trim();
//     }
//     this.updatedAt = Date.now();
//     next();
// });

// module.exports = mongoose.model('Course', courseSchema);



// const mongoose = require('mongoose');

// // Schema for dynamic extra fields (key-value pairs)
// const extraFieldSchema = new mongoose.Schema({
//     key: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     value: {
//         type: mongoose.Schema.Types.Mixed,
//         required: true
//     },
//     type: {
//         type: String,
//         enum: ['text', 'number', 'date', 'boolean', 'array', 'object'],
//         default: 'text'
//     }
// }, { _id: true });

// const courseSchema = new mongoose.Schema({
//     // ==================== Basic Info ====================
//     title: {
//         type: String,
//         required: [true, 'Course title is required'],
//         trim: true
//     },
//     category: {
//         type: String,
//         required: [true, 'Course category is required'],
//         enum: ['ASTROLOGY COURSES', 'VASTU COURSES'],
//         default: 'ASTROLOGY COURSES'
//     },
//     slug: {
//         type: String,
//         unique: true,
//         lowercase: true
//     },
    
//     // ==================== Basic SEO Fields ====================
//     seoTitle: {
//         type: String,
//         trim: true,
//         default: function() {
//             return this.title;
//         }
//     },
//     seoDescription: {
//         type: String,
//         trim: true,
//         default: function() {
//             return `Learn ${this.title} with NB Astro. Expert-led course with certification.`;
//         }
//     },
//     seoKeywords: {
//         type: String,
//         trim: true,
//         default: ''
//     },
    
//     // ==================== Pricing (Flexible) ====================
//     price: {
//         type: String,
//         default: ''
//     },
//     courseFee: {
//         type: String,
//         default: ''
//     },
//     discountPrice: {
//         type: String,
//         default: ''
//     },
    
//     // ==================== Schedule (Flexible) ====================
//     date: {
//         type: String,
//         default: ''
//     },
//     timing: {
//         type: String,
//         default: ''
//     },
//     courseDuration: {
//         type: String,
//         default: ''
//     },
    
//     // ==================== Class Info ====================
//     type: {
//         type: String,
//         default: 'Online'
//     },
//     location: {
//         type: String,
//         default: 'Zoom'
//     },
    
//     // ==================== Images ====================
//     image: {
//         type: String,
//         default: '/uploads/courses/default-course.jpg'
//     },
    
//     // ==================== Content Sections ====================
//     whatIs: {
//         type: String,
//         default: ''
//     },
//     aboutCourse: {
//         type: String,
//         default: ''
//     },
//     courseContent: [{
//         type: String
//     }],
//     durationDetails: {
//         type: String,
//         default: ''
//     },
//     note: {
//         type: String,
//         default: 'Video Recording of Every Session Will Be Provided To Every Student After Session.'
//     },
//     highlights: [{
//         type: String
//     }],
    
//     // ==================== Instructor ====================
//     instructor: {
//         name: {
//             type: String,
//             default: 'Naveen Bhagat'
//         },
//         title: {
//             type: String,
//             default: 'Senior Astrologer & Vastu Consultant'
//         },
//         experience: {
//             type: String,
//             default: '20+ Years'
//         },
//         image: {
//             type: String,
//             default: '/uploads/instructors/default-instructor.jpg'
//         },
//         bio: {
//             type: String,
//             default: ''
//         }
//     },
    
//     // ==================== FAQs ====================
//     faqs: [{
//         question: String,
//         answer: String
//     }],
    
//     // ==================== Astrology-Specific Fields ====================
//     level: {
//         type: String,
//         enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels', ''],
//         default: ''
//     },
//     modules: {
//         type: Number,
//         default: 0
//     },
//     includes: [{
//         type: String
//     }],
    
//     // Vastu-specific fields
//     vastuType: {
//         type: String,
//         enum: ['Residential', 'Commercial', 'Land', 'Factory', 'Office', 'Temple', ''],
//         default: ''
//     },
    
//     // Common for both
//     certificateAvailable: {
//         type: Boolean,
//         default: true
//     },
//     language: {
//         type: String,
//         default: 'Hindi & English'
//     },
    
//     // ==================== Status ====================
//     isActive: {
//         type: Boolean,
//         default: true
//     },
//     isFeatured: {
//         type: Boolean,
//         default: false
//     },
    
//     // ==================== Dynamic Extra Fields ====================
//     extraFields: [extraFieldSchema],
//     customData: {
//         type: mongoose.Schema.Types.Mixed,
//         default: {}
//     },
    
//     // ==================== Timestamps ====================
//     createdAt: {
//         type: Date,
//         default: Date.now
//     },
//     updatedAt: {
//         type: Date,
//         default: Date.now
//     }
// }, {
//     strict: false
// });

// // Auto-generate slug from title before saving
// courseSchema.pre('save', function(next) {
//     if (this.isModified('title') && this.title) {
//         this.slug = this.title
//             .toLowerCase()
//             .replace(/\s+/g, '-')
//             .replace(/[^\w-]+/g, '')
//             .replace(/--+/g, '-')
//             .trim();
        
//         // Auto-set seoTitle if not set
//         if (!this.seoTitle || this.seoTitle === this.title) {
//             this.seoTitle = this.title.substring(0, 60);
//         }
        
//         // Auto-set seoKeywords if not set
//         if (!this.seoKeywords) {
//             this.seoKeywords = `${this.title}, ${this.category.toLowerCase()}, nb astro, online course`;
//         }
//     }
    
//     // Auto-set seoDescription from aboutCourse if available
//     if (this.aboutCourse && (!this.seoDescription || this.seoDescription === `Learn ${this.title} with NB Astro. Expert-led course with certification.`)) {
//         this.seoDescription = this.aboutCourse.substring(0, 157) + (this.aboutCourse.length > 157 ? '...' : '');
//     }
    
//     this.updatedAt = Date.now();
//     next();
// });

// module.exports = mongoose.model('Course', courseSchema);





const mongoose = require('mongoose');

// Schema for dynamic extra fields (key-value pairs)
const extraFieldSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        trim: true
    },
    value: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    type: {
        type: String,
        enum: ['text', 'number', 'date', 'boolean', 'array', 'object'],
        default: 'text'
    }
}, { _id: true });

const courseSchema = new mongoose.Schema({
    // ==================== Basic Info ====================
    title: {
        type: String,
        required: [true, 'Course title is required'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Course category is required'],
        enum: ['ASTROLOGY COURSES', 'VASTU COURSES'],
        default: 'ASTROLOGY COURSES'
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    
    // ==================== Basic SEO Fields ====================
    seoTitle: {
        type: String,
        trim: true,
        default: function() {
            return this.title;
        }
    },
    seoDescription: {
        type: String,
        trim: true,
        default: function() {
            return `Learn ${this.title} with NB Astro. Expert-led course with certification.`;
        }
    },
    seoKeywords: {
        type: String,
        trim: true,
        default: ''
    },
    
    // ==================== Pricing (Flexible) ====================
    price: {
        type: String,
        default: ''
    },
    courseFee: {
        type: String,
        default: ''
    },
    discountPrice: {
        type: String,
        default: ''
    },
    
    // ==================== Schedule (Flexible) ====================
    date: {
        type: String,
        default: ''
    },
    timing: {
        type: String,
        default: ''
    },
    courseDuration: {
        type: String,
        default: ''
    },
    
    // ==================== Class Info ====================
    type: {
        type: String,
        default: 'Online'
    },
    location: {
        type: String,
        default: 'Zoom'
    },
    
    // ==================== Images ====================
    image: {
        type: String,
        default: '/uploads/courses/default-course.jpg'
    },
    
    // ==================== Content Sections ====================
    whatIs: {
        type: String,
        default: ''
    },
    aboutCourse: {
        type: String,
        default: ''
    },
    courseContent: [{
        type: String
    }],
    durationDetails: {
        type: String,
        default: ''
    },
    note: {
        type: String,
        default: 'Video Recording of Every Session Will Be Provided To Every Student After Session.'
    },
    highlights: [{
        type: String
    }],
    
    // ==================== Instructor ====================
    instructor: {
        name: {
            type: String,
            default: 'Naveen Bhagat'
        },
        title: {
            type: String,
            default: 'Senior Astrologer & Vastu Consultant'
        },
        experience: {
            type: String,
            default: '20+ Years'
        },
        image: {
            type: String,
            default: '/uploads/instructors/default-instructor.jpg'
        },
        bio: {
            type: String,
            default: ''
        }
    },
    
    // ==================== FAQs ====================
    faqs: [{
        question: String,
        answer: String
    }],
    
    // ==================== Astrology-Specific Fields ====================
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels', ''],
        default: ''
    },
    modules: {
        type: Number,
        default: 0
    },
    includes: [{
        type: String
    }],
    
    // Vastu-specific fields
    vastuType: {
        type: String,
        enum: ['Residential', 'Commercial', 'Land', 'Factory', 'Office', 'Temple', ''],
        default: ''
    },
    
    // Common for both
    certificateAvailable: {
        type: Boolean,
        default: true
    },
    language: {
        type: String,
        default: 'Hindi & English'
    },
    
    // ==================== Status ====================
    isActive: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    
    // ==================== Dynamic Extra Fields ====================
    extraFields: [extraFieldSchema],
    customData: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    
    // ==================== Timestamps ====================
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    strict: false
});

// ==================== PRE-SAVE HOOK ====================
courseSchema.pre('save', async function () {
    try {
        // Generate slug from title
        if (this.isModified('title') && this.title) {
            this.slug = this.title
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]+/g, '')
                .replace(/--+/g, '-')
                .trim();

            // SEO title
            if (!this.seoTitle || this.seoTitle === this.title) {
                this.seoTitle = this.title.substring(0, 60);
            }

            // SEO keywords
            if (!this.seoKeywords) {
                this.seoKeywords = `${this.title}, ${this.category.toLowerCase()}, nb astro, online course`;
            }
        }

        // SEO description
        if (this.aboutCourse && (!this.seoDescription || this.seoDescription.includes('Learn'))) {
            this.seoDescription =
                this.aboutCourse.substring(0, 157) +
                (this.aboutCourse.length > 157 ? '...' : '');
        }

        // Update timestamp
        this.updatedAt = Date.now();

    } catch (error) {
        console.error('Error in pre-save hook:', error);
        throw error; // ✅ IMPORTANT
    }
});
module.exports = mongoose.models.Course || mongoose.model('Course', courseSchema);