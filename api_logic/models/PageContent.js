// // models/PageContent.js
// const mongoose = require('mongoose');

// const pageContentSchema = new mongoose.Schema({
//     pageType: {
//         type: String,
//         enum: ['ASTROLOGY', 'VASTU'],
//         required: true,
//         unique: true
//     },
    
//     // Hero Section
//     heroTitle: {
//         type: String,
//         default: ''
//     },
//     heroSubtitle: {
//         type: String,
//         default: ''
//     },
//     heroDescription: {
//         type: String,
//         default: ''
//     },
//     heroImage: {
//         type: String,
//         default: ''
//     },
//     heroBadgeText: {
//         type: String,
//         default: ''
//     },
    
//     // Intro Section
//     introTitle: {
//         type: String,
//         default: ''
//     },
//     introContent: {
//         type: String,  // Rich text from Quill
//         default: ''
//     },
    
//     // Why Choose Us Section
//     whyChooseUsTitle: {
//         type: String,
//         default: ''
//     },
//     whyChooseUsFeatures: [{
//         icon: String,
//         title: String,
//         description: String
//     }],
    
//     // CTA Section
//     ctaTitle: {
//         type: String,
//         default: ''
//     },
//     ctaDescription: {
//         type: String,
//         default: ''
//     },
//     ctaButtonText: {
//         type: String,
//         default: ''
//     },
//     ctaButtonLink: {
//         type: String,
//         default: '/contact'
//     },
    
//     // SEO (optional)
//     metaTitle: {
//         type: String,
//         default: ''
//     },
//     metaDescription: {
//         type: String,
//         default: ''
//     },
    
//     updatedAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// module.exports = mongoose.model('PageContent', pageContentSchema);



// // models/PageContent.js
// const mongoose = require('mongoose');

// const pageContentSchema = new mongoose.Schema({
//     pageType: {
//         type: String,
//         enum: ['ASTROLOGY', 'VASTU'],
//         required: true,
//         unique: true
//     },
    
//     // Hero Section
//     heroTitle: { type: String, default: '' },
//     heroSubtitle: { type: String, default: '' },
//     heroDescription: { type: String, default: '' },
//     heroImage: { type: String, default: '' },
//     heroBadgeText: { type: String, default: '' },
    
//     // Intro Section
//     introTitle: { type: String, default: '' },
//     introContent: { type: String, default: '' },
    
//     // Why Choose Us Section
//     whyChooseUsTitle: { type: String, default: '' },
//     whyChooseUsFeatures: [{
//         icon: { type: String, default: '' },
//         title: { type: String, default: '' },
//         description: { type: String, default: '' }
//     }],
    
//     // CTA Section
//     ctaTitle: { type: String, default: '' },
//     ctaDescription: { type: String, default: '' },
//     ctaButtonText: { type: String, default: '' },
//     ctaButtonLink: { type: String, default: '/contact' },
    
//     updatedAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('PageContent', pageContentSchema);



// models/PageContent.js
const mongoose = require('mongoose');

const pageContentSchema = new mongoose.Schema({
    pageType: {
        type: String,
        enum: ['ASTROLOGY', 'VASTU'],
        required: true,
        unique: true
    },
    
    // Hero Section
    heroTitle: { type: String, default: '' },
    heroSubtitle: { type: String, default: '' },
    heroDescription: { type: String, default: '' },
    heroImage: { type: String, default: '' },
    heroBadgeText: { type: String, default: '' },
    
    // Intro Section
    introTitle: { type: String, default: '' },
    introContent: { type: String, default: '' },
    
    // Why Choose Us Section
    whyChooseUsTitle: { type: String, default: '' },
    whyChooseUsFeatures: [{
        icon: { type: String, default: '' },
        title: { type: String, default: '' },
        description: { type: String, default: '' }
    }],
    
    // CTA Section
    ctaTitle: { type: String, default: '' },
    ctaDescription: { type: String, default: '' },
    ctaButtonText: { type: String, default: '' },
    ctaButtonLink: { type: String, default: '/contact' },
    
    // ✅ SEO Fields (New)
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
    seoKeywords: { type: String, default: '' },
    
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.PageContent || mongoose.model('PageContent', pageContentSchema);