// models/AboutPageContent.js
const mongoose = require('mongoose');

const aboutPageContentSchema = new mongoose.Schema({
    // Hero Section
    hero: {
        title: { type: String, default: '' },
        subtitle: { type: String, default: '' },
        description: { type: String, default: '' },
        image: { type: String, default: '' },
        breadcrumbText: { type: String, default: 'Home / About Guru Ji' }
    },
    
    // Introduction Section (with image)
    introduction: {
        title: { type: String, default: '' },
        subtitle: { type: String, default: '' },
        description: { type: String, default: '' },
        image: { type: String, default: '' },
        imageAlt: { type: String, default: '' },
        badgeText: { type: String, default: '' },
        content: { type: String, default: '' } // Rich text
    },
    
    // Teaching Philosophy Section
    teaching: {
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        image: { type: String, default: '' },
        imageAlt: { type: String, default: '' },
        badgeText: { type: String, default: '' },
        content: { type: String, default: '' } // Rich text
    },
    
    // Consultation Section
    consultation: {
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        image: { type: String, default: '' },
        imageAlt: { type: String, default: '' },
        badgeText: { type: String, default: '' },
        quote: { type: String, default: '' },
        content: { type: String, default: '' } // Rich text
    },
    
    // Expertise Section
    expertise: {
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        items: [{
            text: { type: String, default: '' }
        }],
        footerText: { type: String, default: '' }
    },
    
    // Beyond Astrology Section
    beyond: {
        title: { type: String, default: '' },
        content: { type: String, default: '' },
        image: { type: String, default: '' },
        imageAlt: { type: String, default: '' }
    },
    
    // Location Section
    location: {
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        placeName: { type: String, default: '' },
        image: { type: String, default: '' },
        imageAlt: { type: String, default: '' }
    },
    
    // CTA Section
    cta: {
        title: { type: String, default: '' },
        buttonOneText: { type: String, default: '' },
        buttonOneLink: { type: String, default: '/astrology-consultation' },
        buttonTwoText: { type: String, default: '' },
        buttonTwoLink: { type: String, default: '/astrology-courses' }
    },
    
    // SEO Fields
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
    seoKeywords: { type: String, default: '' },
    
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.AboutPageContent || mongoose.model('AboutPageContent', aboutPageContentSchema);