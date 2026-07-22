const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: ''
    },
    rating: {
        type: Number,
        default: 5
    },
    text: {
        type: String,
        required: true
    },
    service: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);
