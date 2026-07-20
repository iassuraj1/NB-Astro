// // const mongoose = require('mongoose');

// // const blogSchema = new mongoose.Schema({
// //     // ==================== BASIC INFO ====================
// //     title: {
// //         type: String,
// //         required: true,
// //         trim: true
// //     },
// //     slug: {
// //         type: String,
// //         required: true,
// //         unique: true,
// //         trim: true,
// //         lowercase: true
// //     },
// //     // ✅ Allow manual slug
// //     useManualSlug: {
// //         type: Boolean,
// //         default: false
// //     },
    
// //     // ==================== CONTENT ====================
// //     excerpt: {
// //         type: String,
// //         required: true,
// //         maxlength: 160
// //     },
// //     content: {
// //         type: String,
// //         required: true
// //     },
// //     // ✅ AI OVERVIEW / QUICK SUMMARY (for Google AI Overview)
// //     aiOverview: {
// //         type: String,
// //         default: '',
// //         maxlength: 200,
// //         description: 'AI Overview summary for Google AI Overviews - concise 40-80 word summary'
// //     },
// //     // ✅ Quick Summary / Key Takeaways
// //     quickSummary: {
// //         type: [String],
// //         default: [],
// //         description: 'Bullet points for quick summary section'
// //     },
    
// //     // ==================== FAQS ====================
// //     faqs: [{
// //         question: {
// //             type: String,
// //             required: true,
// //             trim: true
// //         },
// //         answer: {
// //             type: String,
// //             required: true,
// //             trim: true
// //         }
// //     }],
    
// //     // ==================== IMAGE ====================
// //     image: {
// //         type: String,
// //         default: ''
// //     },
    
// //     // ==================== AUTHOR ====================
// //     author: {
// //         name: {
// //             type: String,
// //             default: 'Naveen Bhagat'
// //         },
// //         url: {
// //             type: String,
// //             default: '/about'
// //         },
// //         avatar: {
// //             type: String,
// //             default: ''
// //         }
// //     },
    
// //     // ==================== CATEGORIES & TAGS ====================
// //     categories: [{
// //         type: String,
// //         trim: true
// //     }],
// //     tags: [{
// //         type: String,
// //         trim: true
// //     }],
    
// //     // ==================== STATUS ====================
// //     isPublished: {
// //         type: Boolean,
// //         default: true
// //     },
// //     publishedAt: {
// //         type: Date,
// //         default: Date.now
// //     },
// //     readTime: {
// //         type: Number,
// //         default: 5
// //     },
// //     views: {
// //         type: Number,
// //         default: 0
// //     },
// //     isFeatured: {
// //         type: Boolean,
// //         default: false
// //     },
    
// //     // ==================== SEO ====================
// //     seoTitle: {
// //         type: String,
// //         default: ''
// //     },
// //     seoDescription: {
// //         type: String,
// //         default: ''
// //     },
// //     seoKeywords: {
// //         type: String,
// //         default: ''
// //     },
    
// //     // ==================== TIMESTAMPS ====================
// //     createdAt: {
// //         type: Date,
// //         default: Date.now
// //     },
// //     updatedAt: {
// //         type: Date,
// //         default: Date.now
// //     }
// // });

// // // ==================== PRE-SAVE HOOKS ====================

// // // ✅ Auto-generate slug from title (if manual slug not used)
// // blogSchema.pre('save', function(next) {
// //     if (this.isModified('title') && !this.useManualSlug) {
// //         // Generate slug from title
// //         this.slug = this.title
// //             .toLowerCase()
// //             .replace(/[^a-z0-9]+/g, '-')
// //             .replace(/-+/g, '-')
// //             .replace(/^-|-$/g, '');
// //     }
// //     this.updatedAt = Date.now();
// //     next();
// // });

// // // ✅ Calculate read time based on content
// // blogSchema.pre('save', function(next) {
// //     if (this.isModified('content')) {
// //         const words = this.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
// //         this.readTime = Math.max(1, Math.ceil(words / 200));
// //     }
// //     next();
// // });

// // // ==================== VIRTUAL FIELDS ====================

// // // ✅ AI Overview Summary (if not provided, auto-generate from content)
// // blogSchema.virtual('aiOverviewSummary').get(function() {
// //     if (this.aiOverview) return this.aiOverview;
// //     // Auto-generate from content if not provided
// //     const plainText = this.content.replace(/<[^>]*>/g, '');
// //     const words = plainText.split(/\s+/);
// //     return words.slice(0, 60).join(' ') + '...';
// // });

// // // ✅ Quick summary points
// // blogSchema.virtual('quickSummaryPoints').get(function() {
// //     if (this.quickSummary && this.quickSummary.length > 0) {
// //         return this.quickSummary;
// //     }
// //     // Auto-generate from content if not provided
// //     const plainText = this.content.replace(/<[^>]*>/g, '');
// //     const sentences = plainText.match(/[^.!?]+[.!?]+/g) || [];
// //     return sentences.slice(0, 4).map(s => s.trim());
// // });

// // // ==================== STATIC METHODS ====================

// // // ✅ Find related blogs
// // blogSchema.statics.findRelated = async function(blogId, categories, limit = 3) {
// //     return this.find({
// //         _id: { $ne: blogId },
// //         isPublished: true,
// //         categories: { $in: categories }
// //     })
// //     .sort({ isFeatured: -1, views: -1, publishedAt: -1 })
// //     .limit(limit)
// //     .select('title slug image excerpt publishedAt readTime');
// // };

// // // ✅ Get popular blogs
// // blogSchema.statics.getPopular = async function(limit = 5) {
// //     return this.find({ isPublished: true })
// //         .sort({ views: -1, publishedAt: -1 })
// //         .limit(limit)
// //         .select('title slug views excerpt');
// // };

// // // ✅ Get featured blogs
// // blogSchema.statics.getFeatured = async function(limit = 3) {
// //     return this.find({ isPublished: true, isFeatured: true })
// //         .sort({ publishedAt: -1 })
// //         .limit(limit)
// //         .select('title slug image excerpt');
// // };

// // // ==================== INDEXES ====================

// // blogSchema.index({ slug: 1 });
// // blogSchema.index({ isPublished: 1, publishedAt: -1 });
// // blogSchema.index({ categories: 1 });
// // blogSchema.index({ tags: 1 });
// // blogSchema.index({ isFeatured: 1 });

// // // ✅ FIX: Prevent OverwriteModelError
// // const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

// // module.exports = Blog;

// const mongoose = require('mongoose');

// const blogSchema = new mongoose.Schema({
//     // ==================== BASIC INFO ====================
//     title: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     slug: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         lowercase: true
//     },
//     // ✅ Allow manual slug
//     useManualSlug: {
//         type: Boolean,
//         default: false
//     },
    
//     // ==================== CONTENT ====================
//     excerpt: {
//         type: String,
//         required: true,
//         maxlength: 160
//     },
//     content: {
//         type: String,
//         required: true
//     },
//     // ✅ AI OVERVIEW / QUICK SUMMARY (for Google AI Overview)
//     aiOverview: {
//         type: String,
//         default: '',
//         maxlength: 200,
//         description: 'AI Overview summary for Google AI Overviews - concise 40-80 word summary'
//     },
//     // ✅ Quick Summary Description (for readers)
//     quickSummaryDescription: {
//         type: String,
//         default: '',
//         maxlength: 300,
//         description: 'Quick summary for readers - 2-3 sentences'
//     },
//     // ✅ Quick Summary / Key Takeaways (bullet points)
//     quickSummary: {
//         type: [String],
//         default: [],
//         description: 'Bullet points for quick summary section'
//     },
    
//     // ==================== FAQS ====================
//     faqs: [{
//         question: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         answer: {
//             type: String,
//             required: true,
//             trim: true
//         }
//     }],
    
//     // ==================== IMAGE ====================
//     image: {
//         type: String,
//         default: ''
//     },
    
//     // ==================== AUTHOR ====================
//     author: {
//         name: {
//             type: String,
//             default: 'Naveen Bhagat'
//         },
//         url: {
//             type: String,
//             default: '/about'
//         },
//         avatar: {
//             type: String,
//             default: ''
//         }
//     },
    
//     // ==================== CATEGORIES & TAGS ====================
//     categories: [{
//         type: String,
//         trim: true
//     }],
//     tags: [{
//         type: String,
//         trim: true
//     }],
    
//     // ==================== STATUS ====================
//     isPublished: {
//         type: Boolean,
//         default: true
//     },
//     publishedAt: {
//         type: Date,
//         default: Date.now
//     },
//     readTime: {
//         type: Number,
//         default: 5
//     },
//     views: {
//         type: Number,
//         default: 0
//     },
//     isFeatured: {
//         type: Boolean,
//         default: false
//     },
    
//     // ==================== SEO ====================
//     seoTitle: {
//         type: String,
//         default: ''
//     },
//     seoDescription: {
//         type: String,
//         default: ''
//     },
//     seoKeywords: {
//         type: String,
//         default: ''
//     },
    
//     // ==================== TIMESTAMPS ====================
//     createdAt: {
//         type: Date,
//         default: Date.now
//     },
//     updatedAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// // ==================== PRE-SAVE HOOKS ====================

// // ✅ Auto-generate slug from title (if manual slug not used)
// blogSchema.pre('save', function(next) {
//     if (this.isModified('title') && !this.useManualSlug) {
//         // Generate slug from title
//         this.slug = this.title
//             .toLowerCase()
//             .replace(/[^a-z0-9]+/g, '-')
//             .replace(/-+/g, '-')
//             .replace(/^-|-$/g, '');
//     }
//     this.updatedAt = Date.now();
//     next();
// });

// // ✅ Calculate read time based on content
// blogSchema.pre('save', function(next) {
//     if (this.isModified('content')) {
//         const words = this.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
//         this.readTime = Math.max(1, Math.ceil(words / 200));
//     }
//     next();
// });

// // ==================== VIRTUAL FIELDS ====================

// // ✅ AI Overview Summary (if not provided, auto-generate from content)
// blogSchema.virtual('aiOverviewSummary').get(function() {
//     if (this.aiOverview) return this.aiOverview;
//     // Auto-generate from content if not provided
//     const plainText = this.content.replace(/<[^>]*>/g, '');
//     const words = plainText.split(/\s+/);
//     return words.slice(0, 60).join(' ') + '...';
// });

// // ✅ Quick summary points
// blogSchema.virtual('quickSummaryPoints').get(function() {
//     if (this.quickSummary && this.quickSummary.length > 0) {
//         return this.quickSummary;
//     }
//     // Auto-generate from content if not provided
//     const plainText = this.content.replace(/<[^>]*>/g, '');
//     const sentences = plainText.match(/[^.!?]+[.!?]+/g) || [];
//     return sentences.slice(0, 4).map(s => s.trim());
// });

// // ==================== STATIC METHODS ====================

// // ✅ Find related blogs
// blogSchema.statics.findRelated = async function(blogId, categories, limit = 3) {
//     return this.find({
//         _id: { $ne: blogId },
//         isPublished: true,
//         categories: { $in: categories }
//     })
//     .sort({ isFeatured: -1, views: -1, publishedAt: -1 })
//     .limit(limit)
//     .select('title slug image excerpt publishedAt readTime');
// };

// // ✅ Get popular blogs
// blogSchema.statics.getPopular = async function(limit = 5) {
//     return this.find({ isPublished: true })
//         .sort({ views: -1, publishedAt: -1 })
//         .limit(limit)
//         .select('title slug views excerpt');
// };

// // ✅ Get featured blogs
// blogSchema.statics.getFeatured = async function(limit = 3) {
//     return this.find({ isPublished: true, isFeatured: true })
//         .sort({ publishedAt: -1 })
//         .limit(limit)
//         .select('title slug image excerpt');
// };

// // ==================== INDEXES ====================

// blogSchema.index({ slug: 1 });
// blogSchema.index({ isPublished: 1, publishedAt: -1 });
// blogSchema.index({ categories: 1 });
// blogSchema.index({ tags: 1 });
// blogSchema.index({ isFeatured: 1 });

// // ✅ FIX: Prevent OverwriteModelError
// const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

// module.exports = Blog;


// const mongoose = require('mongoose');

// const blogSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     slug: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         lowercase: true
//     },
//     useManualSlug: {
//         type: Boolean,
//         default: false
//     },
//     excerpt: {
//         type: String,
//         required: true,
//         maxlength: 160
//     },
//     content: {
//         type: String,
//         required: true
//     },
//     aiOverview: {
//         type: String,
//         default: ''
//     },
//     quickSummaryDescription: {
//         type: String,
//         default: ''
//     },
//     quickSummary: {
//         type: [String],
//         default: []
//     },
//     faqs: [{
//         question: { type: String, trim: true },
//         answer: { type: String, trim: true }
//     }],
//     image: {
//         type: String,
//         default: ''
//     },
//     author: {
//         name: { type: String, default: 'Naveen Bhagat' },
//         url: { type: String, default: '/about' },
//         avatar: { type: String, default: '' }
//     },
//     categories: [{ type: String, trim: true }],
//     tags: [{ type: String, trim: true }],
//     isPublished: {
//         type: Boolean,
//         default: true
//     },
//     publishedAt: {
//         type: Date,
//         default: Date.now
//     },
//     readTime: {
//         type: Number,
//         default: 5
//     },
//     views: {
//         type: Number,
//         default: 0
//     },
//     isFeatured: {
//         type: Boolean,
//         default: false
//     },
//     seoTitle: { type: String, default: '' },
//     seoDescription: { type: String, default: '' },
//     seoKeywords: { type: String, default: '' },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now }
// });

// blogSchema.pre('save', function(next) {
//     if (this.isModified('title') && !this.useManualSlug) {
//         this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
//     }
//     this.updatedAt = Date.now();
//     next();
// });

// blogSchema.pre('save', function(next) {
//     if (this.isModified('content')) {
//         const words = this.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
//         this.readTime = Math.max(1, Math.ceil(words / 200));
//     }
//     next();
// });

// blogSchema.virtual('aiOverviewSummary').get(function() {
//     if (this.aiOverview) return this.aiOverview;
//     const plainText = this.content.replace(/<[^>]*>/g, '');
//     const words = plainText.split(/\s+/);
//     return words.slice(0, 60).join(' ') + '...';
// });

// blogSchema.virtual('quickSummaryPoints').get(function() {
//     if (this.quickSummary && this.quickSummary.length > 0) {
//         return this.quickSummary;
//     }
//     const plainText = this.content.replace(/<[^>]*>/g, '');
//     const sentences = plainText.match(/[^.!?]+[.!?]+/g) || [];
//     return sentences.slice(0, 4).map(s => s.trim());
// });

// blogSchema.statics.findRelated = async function(blogId, categories, limit = 3) {
//     return this.find({
//         _id: { $ne: blogId },
//         isPublished: true,
//         categories: { $in: categories }
//     })
//     .sort({ isFeatured: -1, views: -1, publishedAt: -1 })
//     .limit(limit)
//     .select('title slug image excerpt publishedAt readTime');
// };

// blogSchema.statics.getPopular = async function(limit = 5) {
//     return this.find({ isPublished: true })
//         .sort({ views: -1, publishedAt: -1 })
//         .limit(limit)
//         .select('title slug views excerpt');
// };

// blogSchema.statics.getFeatured = async function(limit = 3) {
//     return this.find({ isPublished: true, isFeatured: true })
//         .sort({ publishedAt: -1 })
//         .limit(limit)
//         .select('title slug image excerpt');
// };

// blogSchema.index({ slug: 1 });
// blogSchema.index({ isPublished: 1, publishedAt: -1 });
// blogSchema.index({ categories: 1 });
// blogSchema.index({ tags: 1 });
// blogSchema.index({ isFeatured: 1 });

// const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
// module.exports = Blog;



// const mongoose = require('mongoose');

// const blogSchema = new mongoose.Schema({
//     title: { type: String, default: '' },
//     slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
//     useManualSlug: { type: Boolean, default: false },
//     excerpt: { type: String, default: '' },
//     content: { type: String, default: '' },
//     aiOverview: { type: String, default: '' },
//     quickSummaryDescription: { type: String, default: '' },
//     quickSummary: { type: [String], default: [] },
//     faqs: { type: [], default: [] },
//     image: { type: String, default: '' },
//     author: {
//         name: { type: String, default: 'Naveen Bhagat' },
//         url: { type: String, default: '/about' },
//         avatar: { type: String, default: '' }
//     },
//     categories: { type: [String], default: [] },
//     tags: { type: [String], default: [] },
//     isPublished: { type: Boolean, default: true },
//     publishedAt: { type: Date, default: Date.now },
//     readTime: { type: Number, default: 5 },
//     views: { type: Number, default: 0 },
//     isFeatured: { type: Boolean, default: false },
//     seoTitle: { type: String, default: '' },
//     seoDescription: { type: String, default: '' },
//     seoKeywords: { type: String, default: '' },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now }
// });

// // ✅ ConsultationService wala pattern - async function without next()
// blogSchema.pre('save', async function() {
//     // Generate slug from title if not manual
//     if (this.isModified('title') && !this.useManualSlug && this.title) {
//         this.slug = this.title
//             .toLowerCase()
//             .replace(/[^a-zA-Z0-9]/g, '-')
//             .replace(/-+/g, '-')
//             .replace(/^-|-$/g, '');
//     }
    
//     // Calculate read time
//     if (this.isModified('content') && this.content) {
//         const words = this.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
//         this.readTime = Math.max(1, Math.ceil(words / 200));
//     }
    
//     // Update timestamp
//     this.updatedAt = Date.now();
// });

// // ✅ Virtual fields
// blogSchema.virtual('aiOverviewSummary').get(function() {
//     if (this.aiOverview) return this.aiOverview;
//     const plainText = this.content ? this.content.replace(/<[^>]*>/g, '') : '';
//     const words = plainText.split(/\s+/);
//     return words.slice(0, 60).join(' ') + '...';
// });

// blogSchema.virtual('quickSummaryPoints').get(function() {
//     if (this.quickSummary && this.quickSummary.length > 0) {
//         return this.quickSummary;
//     }
//     const plainText = this.content ? this.content.replace(/<[^>]*>/g, '') : '';
//     const sentences = plainText.match(/[^.!?]+[.!?]+/g) || [];
//     return sentences.slice(0, 4).map(s => s.trim());
// });

// // ✅ Static methods
// blogSchema.statics.findRelated = async function(blogId, categories, limit = 3) {
//     return this.find({
//         _id: { $ne: blogId },
//         isPublished: true,
//         categories: { $in: categories }
//     })
//     .sort({ isFeatured: -1, views: -1, publishedAt: -1 })
//     .limit(limit)
//     .select('title slug image excerpt publishedAt readTime');
// };

// blogSchema.statics.getPopular = async function(limit = 5) {
//     return this.find({ isPublished: true })
//         .sort({ views: -1, publishedAt: -1 })
//         .limit(limit)
//         .select('title slug views excerpt');
// };

// blogSchema.statics.getFeatured = async function(limit = 3) {
//     return this.find({ isPublished: true, isFeatured: true })
//         .sort({ publishedAt: -1 })
//         .limit(limit)
//         .select('title slug image excerpt');
// };

// // ✅ Indexes
// blogSchema.index({ slug: 1 });
// blogSchema.index({ isPublished: 1, publishedAt: -1 });
// blogSchema.index({ categories: 1 });
// blogSchema.index({ tags: 1 });
// blogSchema.index({ isFeatured: 1 });

// // ✅ Prevent overwrite
// const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
// module.exports = Blog;


const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, default: '' },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    useManualSlug: { type: Boolean, default: false },
    excerpt: { type: String, default: '' },
    content: { type: String, default: '' },
    aiOverview: { type: String, default: '' },
    quickSummaryDescription: { type: String, default: '' },
    quickSummary: { type: [String], default: [] },
    faqs: { type: [], default: [] },
    image: { type: String, default: '' },
    
    // ✅ Category Field
    category: {
        type: String,
        default: 'General',
        enum: [
            'Astrology Consultation',
            'Vastu Consultation',
            'Astrology Course',
            'Vastu Course',
            
        ]
    },
    categories: { type: [String], default: [] }, // Backward compatibility
    
    author: {
        name: { type: String, default: 'Naveen Bhagat' },
        url: { type: String, default: '/about' },
        avatar: { type: String, default: '' }
    },
    tags: { type: [String], default: [] },
    isPublished: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
    readTime: { type: Number, default: 5 },
    views: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
    seoKeywords: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// ✅ Pre-save hook
blogSchema.pre('save', async function() {
    if (this.isModified('title') && !this.useManualSlug && this.title) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }
    
    if (this.isModified('content') && this.content) {
        const words = this.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
        this.readTime = Math.max(1, Math.ceil(words / 200));
    }
    
    this.updatedAt = Date.now();
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
module.exports = Blog;