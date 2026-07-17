// models/ConsultationService.js
const mongoose = require('mongoose');

const consultationServiceSchema = new mongoose.Schema({
    // Basic Info
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['astrology', 'vastu'],
        default: 'astrology'
    },
    
    // Pricing
    price: {
        type: String,
        required: true
    },
    priceNumeric: {
        type: Number,
        required: true
    },
    
    // Content
    quickDescription: {  // 👈 NEW: For SEO meta description (150-160 chars)
        type: String,
        required: true,
        maxlength: 160,
        trim: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    longDescription: {
        type: String,
        required: true
    },
    fullDescription: {
        type: String,  // Rich text editor content
        required: true
    },
    
    // Metadata
    icon: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    expert: {
        type: String,
        default: 'Naveen Bhagat Ji'
    },
    duration: {
        type: String,
        required: false,
        default: ''
    },
    
    // Lists
    features: [{
        type: String
    }],
    includes: [{
        type: String
    }],
    whatYouGet: [{
        type: String
    }],
    benefits: [{
        type: String
    }],
    
    // FAQ
    faqs: [{
        question: String,
        answer: String
    }],
    
    // SEO
    seoTitle: {
        type: String,
        default: ''
    },
    seoDescription: {
        type: String,
        default: ''
    },
    seoKeywords: {
        type: String,
        default: ''
    },
    
    // Status
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Create slug from title before saving
consultationServiceSchema.pre('save', async function() {
    if (this.isModified('title')) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }
});

module.exports = mongoose.models.ConsultationService || mongoose.model('ConsultationService', consultationServiceSchema);