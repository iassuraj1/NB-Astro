// const {
//     HeroSlide,
//     Feature,
//     Service,
//     FAQ,
//     AboutSection,
//     ContactInfo,
//     CTASection,
//     SeoConfig
// } = require('../models/HomePage');
// const fs = require('fs');
// const path = require('path');

// // ==================== HERO SLIDES ====================
// exports.getHeroSlides = async (req, res) => {
//     try {
//         const slides = await HeroSlide.find({ isActive: true }).sort('order');
//         res.json({ success: true, data: slides });
//     } catch (error) {
//         console.error('Error fetching hero slides:', error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };
// exports.createHeroSlide = async (req, res) => {
//     try {
//         console.log('========== CREATE HERO SLIDE ==========');
//         console.log('req.body:', req.body);
//         console.log('req.files length:', req.files ? req.files.length : 0);
        
//         // Extract files from req.files array
//         let desktopImage = null;
//         let mobileImage = null;
        
//         if (req.files && req.files.length > 0) {
//             req.files.forEach(file => {
//                 console.log(`File received: fieldname=${file.fieldname}, filename=${file.filename}`);
//                 if (file.fieldname === 'image') {
//                     desktopImage = file;
//                 }
//                 if (file.fieldname === 'mobileImage') {
//                     mobileImage = file;
//                 }
//             });
//         }
        
//         console.log('Desktop image:', desktopImage ? desktopImage.filename : 'NOT FOUND');
//         console.log('Mobile image:', mobileImage ? mobileImage.filename : 'NOT FOUND');
//         console.log('Title from body:', req.body.title);
        
//         // Check required fields
//         if (!req.body.title) {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: 'Title is required',
//                 receivedBody: req.body,
//                 receivedFiles: req.files ? req.files.map(f => ({ fieldname: f.fieldname, filename: f.filename })) : []
//             });
//         }
        
//         if (!req.body.description) {
//             return res.status(400).json({ success: false, message: 'Description is required' });
//         }
        
//         if (!req.body.link) {
//             return res.status(400).json({ success: false, message: 'Link is required' });
//         }
        
//         if (!desktopImage || !mobileImage) {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: 'Both desktop and mobile images are required',
//                 desktopImage: desktopImage ? 'Present' : 'Missing',
//                 mobileImage: mobileImage ? 'Present' : 'Missing'
//             });
//         }
        
//         // Prepare slide data
//         const slideData = {
//             title: req.body.title,
//             highlight: req.body.highlight || '',
//             description: req.body.description,
//             link: req.body.link,
//             icon: req.body.icon || 'StarIcon',
//             order: parseInt(req.body.order) || 0,
//             isActive: req.body.isActive === 'true' || req.body.isActive === true,
//             image: `/uploads/hero/${desktopImage.filename}`,
//             mobileImage: `/uploads/hero/${mobileImage.filename}`
//         };
        
//         console.log('Final slideData to save:', slideData);
        
//         const slide = await HeroSlide.create(slideData);
//         console.log('✅ Hero slide created successfully:', slide._id);
        
//         res.status(201).json({ 
//             success: true, 
//             data: slide,
//             message: 'Hero slide created successfully'
//         });
//     } catch (error) {
//         console.error('❌ ERROR in createHeroSlide:', error);
//         res.status(500).json({ 
//             success: false, 
//             message: error.message 
//         });
//     }
// };
// exports.updateHeroSlide = async (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log('Updating hero slide:', id);
//         console.log('Request body:', req.body);
//         console.log('Request files:', req.files);
        
//         // Find existing slide
//         const oldSlide = await HeroSlide.findById(id);
//         if (!oldSlide) {
//             return res.status(404).json({ 
//                 success: false, 
//                 message: 'Slide not found' 
//             });
//         }
        
//         // Prepare update data
//         const updateData = {
//             title: req.body.title,
//             highlight: req.body.highlight || '',
//             description: req.body.description,
//             link: req.body.link,
//             icon: req.body.icon || 'StarIcon',
//             order: parseInt(req.body.order) || 0,
//             isActive: req.body.isActive === 'true' || req.body.isActive === true
//         };
        
//         // Handle image uploads - Keep old images if no new ones are uploaded
//         if (req.files) {
//             if (req.files.image && req.files.image[0]) {
//                 // Delete old image if exists
//                 if (oldSlide.image && fs.existsSync(path.join(__dirname, '..', oldSlide.image))) {
//                     fs.unlinkSync(path.join(__dirname, '..', oldSlide.image));
//                     console.log('Deleted old desktop image:', oldSlide.image);
//                 }
//                 updateData.image = `/uploads/hero/${req.files.image[0].filename}`;
//                 console.log('New desktop image uploaded:', updateData.image);
//             } else {
//                 // Keep old image
//                 updateData.image = oldSlide.image;
//             }
            
//             if (req.files.mobileImage && req.files.mobileImage[0]) {
//                 // Delete old mobile image if exists
//                 if (oldSlide.mobileImage && fs.existsSync(path.join(__dirname, '..', oldSlide.mobileImage))) {
//                     fs.unlinkSync(path.join(__dirname, '..', oldSlide.mobileImage));
//                     console.log('Deleted old mobile image:', oldSlide.mobileImage);
//                 }
//                 updateData.mobileImage = `/uploads/hero/${req.files.mobileImage[0].filename}`;
//                 console.log('New mobile image uploaded:', updateData.mobileImage);
//             } else {
//                 // Keep old mobile image
//                 updateData.mobileImage = oldSlide.mobileImage;
//             }
//         } else {
//             // Keep old images if no files were uploaded
//             updateData.image = oldSlide.image;
//             updateData.mobileImage = oldSlide.mobileImage;
//         }
        
//         const slide = await HeroSlide.findByIdAndUpdate(id, updateData, { 
//             new: true,
//             runValidators: true
//         });
        
//         console.log('Hero slide updated successfully:', slide._id);
        
//         res.json({ 
//             success: true, 
//             data: slide,
//             message: 'Hero slide updated successfully'
//         });
//     } catch (error) {
//         console.error('Error in updateHeroSlide:', error);
//         res.status(500).json({ 
//             success: false, 
//             message: error.message 
//         });
//     }
// };

// exports.deleteHeroSlide = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const slide = await HeroSlide.findById(id);
        
//         if (!slide) {
//             return res.status(404).json({ 
//                 success: false, 
//                 message: 'Slide not found' 
//             });
//         }
        
//         // Delete image files
//         if (slide.image && fs.existsSync(path.join(__dirname, '..', slide.image))) {
//             fs.unlinkSync(path.join(__dirname, '..', slide.image));
//             console.log('Deleted desktop image:', slide.image);
//         }
//         if (slide.mobileImage && fs.existsSync(path.join(__dirname, '..', slide.mobileImage))) {
//             fs.unlinkSync(path.join(__dirname, '..', slide.mobileImage));
//             console.log('Deleted mobile image:', slide.mobileImage);
//         }
        
//         await HeroSlide.findByIdAndDelete(id);
//         res.json({ success: true, message: 'Slide deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting hero slide:', error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // ==================== FEATURES ====================
// exports.getFeatures = async (req, res) => {
//     try {
//         const features = await Feature.find({ isActive: true }).sort('order');
//         res.json({ success: true, data: features });
//     } catch (error) {
//         console.error('Error fetching features:', error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// exports.createFeature = async (req, res) => {
//     try {
//         const feature = await Feature.create(req.body);
//         res.status(201).json({ success: true, data: feature });
//     } catch (error) {
//         console.error('Error creating feature:', error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// exports.updateFeature = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const feature = await Feature.findByIdAndUpdate(id, req.body, { new: true });
//         res.json({ success: true, data: feature });
//     } catch (error) {
//         console.error('Error updating feature:', error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// exports.deleteFeature = async (req, res) => {
//     try {
//         const { id } = req.params;
//         await Feature.findByIdAndDelete(id);
//         res.json({ success: true, message: 'Feature deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting feature:', error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // ==================== SERVICES ====================
// exports.getServices = async (req, res) => {
//     try {
//         const services = await Service.find({ isActive: true }).sort('order');
//         res.json({ success: true, data: services });
//     } catch (error) {
//         console.error('Error fetching services:', error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// exports.createService = async (req, res) => {
//     try {
//         const serviceData = req.body;
        
//         if (req.file) {
//             serviceData.image = `/uploads/services/${req.file.filename}`;
//         } else {
//             return res.status(400).json({ 
//                 success: false, 
//                 message: 'Service image is required' 
//             });
//         }
        
//         const service = await Service.create(serviceData);
//         res.status(201).json({ success: true, data: service });
//     } catch (error) {
//         console.error('Error creating service:', error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// exports.updateService = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updateData = req.body;
        
//         if (req.file) {
//             const oldService = await Service.findById(id);
//             if (oldService.image && fs.existsSync(path.join(__dirname, '..', oldService.image))) {
//                 fs.unlinkSync(path.join(__dirname, '..', oldService.image));
//             }
//             updateData.image = `/uploads/services/${req.file.filename}`;
//         }
        
//         const service = await Service.findByIdAndUpdate(id, updateData, { new: true });
//         res.json({ success: true, data: service });
//     } catch (error) {
//         console.error('Error updating service:', error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// exports.deleteService = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const service = await Service.findById(id);
        
//         if (service.image && fs.existsSync(path.join(__dirname, '..', service.image))) {
//             fs.unlinkSync(path.join(__dirname, '..', service.image));
//         }
        
//         await Service.findByIdAndDelete(id);
//         res.json({ success: true, message: 'Service deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting service:', error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // ==================== FAQS ====================
// exports.getFAQs = async (req, res) => {
//     try {
//         const faqs = await FAQ.find({ isActive: true }).sort('order');
//         res.json({ success: true, data: faqs });
//     } catch (error) {
//         console.error('Error fetching FAQs:', error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// exports.createFAQ = async (req, res) => {
//     try {
//         const faq = await FAQ.create(req.body);
//         res.status(201).json({ success: true, data: faq });
//     } catch (error) {
//         console.error('Error creating FAQ:', error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// exports.updateFAQ = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const faq = await FAQ.findByIdAndUpdate(id, req.body, { new: true });
//         res.json({ success: true, data: faq });
//     } catch (error) {
//         console.error('Error updating FAQ:', error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// exports.deleteFAQ = async (req, res) => {
//     try {
//         const { id } = req.params;
//         await FAQ.findByIdAndDelete(id);
//         res.json({ success: true, message: 'FAQ deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting FAQ:', error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // ==================== ABOUT SECTION ====================
// // controllers/homeController.js - Update getAboutSection
// exports.getAboutSection = async (req, res) => {
//     try {
//         const about = await AboutSection.findOne({ isActive: true });
//         console.log('Fetched about section:', about); // Debug log
        
//         if (!about) {
//             // Return default data if not found
//             return res.json({ 
//                 success: true, 
//                 data: {
//                     name: '',
//                     title: '',
//                     description: '',
//                     image: '',
//                     experience: 0,
//                     clients: 0,
//                     satisfaction: 0,
//                     principles: [],
//                     quote: '',
//                     isActive: true
//                 }
//             });
//         }
        
//         res.json({ success: true, data: about });
//     } catch (error) {
//         console.error('Error fetching about section:', error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // controllers/homeController.js - Update updateAboutSection
// exports.updateAboutSection = async (req, res) => {
//     try {
//         console.log('Updating about section...');
//         console.log('Request body:', req.body);
//         console.log('Request file:', req.file);
        
//         const updateData = { ...req.body };
        
//         // Handle principles if it's a string (from FormData)
//         if (updateData.principles && typeof updateData.principles === 'string') {
//             try {
//                 // Check if it's JSON string
//                 if (updateData.principles.startsWith('[')) {
//                     updateData.principles = JSON.parse(updateData.principles);
//                 } else {
//                     // If it's a single principle
//                     updateData.principles = [updateData.principles];
//                 }
//             } catch (e) {
//                 console.log('Principles parsing error:', e);
//                 updateData.principles = [];
//             }
//         }
        
//         // Handle image upload
//         if (req.file) {
//             // Get old about to delete old image
//             const oldAbout = await AboutSection.findOne({ isActive: true });
//             if (oldAbout && oldAbout.image && fs.existsSync(path.join(__dirname, '..', oldAbout.image))) {
//                 fs.unlinkSync(path.join(__dirname, '..', oldAbout.image));
//                 console.log('Deleted old image:', oldAbout.image);
//             }
//             updateData.image = `/uploads/about/${req.file.filename}`;
//             console.log('New image uploaded:', updateData.image);
//         }
        
//         // Convert numbers
//         if (updateData.experience) updateData.experience = parseInt(updateData.experience);
//         if (updateData.clients) updateData.clients = parseInt(updateData.clients);
//         if (updateData.satisfaction) updateData.satisfaction = parseInt(updateData.satisfaction);
        
//         // Set isActive
//         updateData.isActive = true;
        
//         console.log('Final updateData:', updateData);
        
//         const about = await AboutSection.findOneAndUpdate(
//             { isActive: true },
//             updateData,
//             { new: true, upsert: true }
//         );
        
//         console.log('Saved about section:', about);
        
//         res.json({ 
//             success: true, 
//             data: about,
//             message: 'About section updated successfully'
//         });
//     } catch (error) {
//         console.error('Error updating about section:', error);
//         res.status(500).json({ 
//             success: false, 
//             message: error.message 
//         });
//     }
// };

// // ==================== CONTACT INFO ====================
// exports.getContactInfo = async (req, res) => {
//     try {
//         const contact = await ContactInfo.findOne({ isActive: true });
//         res.json({ success: true, data: contact });
//     } catch (error) {
//         console.error('Error fetching contact info:', error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// exports.updateContactInfo = async (req, res) => {
//     try {
//         const contact = await ContactInfo.findOneAndUpdate(
//             { isActive: true },
//             req.body,
//             { new: true, upsert: true }
//         );
//         res.json({ success: true, data: contact });
//     } catch (error) {
//         console.error('Error updating contact info:', error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // ==================== CTA SECTION ====================
// exports.getCTASection = async (req, res) => {
//     try {
//         const cta = await CTASection.findOne({ isActive: true });
//         res.json({ success: true, data: cta });
//     } catch (error) {
//         console.error('Error fetching CTA section:', error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// exports.updateCTASection = async (req, res) => {
//     try {
//         const cta = await CTASection.findOneAndUpdate(
//             { isActive: true },
//             req.body,
//             { new: true, upsert: true }
//         );
//         res.json({ success: true, data: cta });
//     } catch (error) {
//         console.error('Error updating CTA section:', error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // ==================== SEO CONTROLLERS ====================
// exports.getSeoConfig = async (req, res) => {
//     try {
//         let seo = await SeoConfig.findOne({ isActive: true });
        
//         if (!seo) {
//             seo = await SeoConfig.create({
//                 metaTitle: 'NB Astro - Best Astrologer in India | Vedic Astrology & Vastu Consultation',
//                 metaDescription: 'Get accurate Vedic astrology and Vastu consultation from Naveen Bhagat, India\'s leading astrologer.',
//                 metaKeywords: 'astrologer in India, Vedic astrology, Vastu consultant, Naveen Bhagat',
//                 robots: 'index, follow'
//             });
//         }
        
//         res.json({
//             success: true,
//             data: seo
//         });
//     } catch (error) {
//         console.error('Error fetching SEO config:', error);
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// exports.updateSeoConfig = async (req, res) => {
//     try {
//         let seo = await SeoConfig.findOne({ isActive: true });
        
//         if (!seo) {
//             seo = new SeoConfig(req.body);
//         } else {
//             Object.assign(seo, req.body);
//         }
        
//         seo.seoLastUpdated = Date.now();
//         await seo.save();
        
//         res.json({
//             success: true,
//             data: seo
//         });
//     } catch (error) {
//         console.error('Error updating SEO config:', error);
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// exports.getSitemapData = async (req, res) => {
//     try {
//         const sitemapData = {
//             pages: [
//                 { url: '/', priority: 1.0, changefreq: 'daily' },
//                 { url: '/about', priority: 0.9, changefreq: 'weekly' },
//                 { url: '/astrology-consultation', priority: 0.9, changefreq: 'weekly' },
//                 { url: '/vastu-consultation', priority: 0.9, changefreq: 'weekly' },
//                 { url: '/astrology-courses', priority: 0.8, changefreq: 'weekly' },
//                 { url: '/vastu-courses', priority: 0.8, changefreq: 'weekly' },
//                 { url: '/contact', priority: 0.7, changefreq: 'monthly' }
//             ]
//         };
        
//         res.json({
//             success: true,
//             data: sitemapData
//         });
//     } catch (error) {
//         console.error('Error generating sitemap:', error);
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };




const {
    HeroSlide,
    Feature,
    Service,
    FAQ,
    AboutSection,
    ContactInfo,
    CTASection,
    SeoConfig
} = require('../models/HomePage');
const ConsultationService = require('../models/ConsultationService');
const Course = require('../models/Course');
const PageContent = require('../models/PageContent');
const fs = require('fs');
const path = require('path');
const { deleteUploadFile, deleteUploadFiles } = require('../utils/imageStorage');

const defaultHeroSlides = [
    {
        _id: 'default-hero-1',
        title: 'Your Guide to',
        highlight: 'Cosmic Wisdom',
        description: 'Expert Astrology and Vastu consultations by Naveen Bhagat ji with 10+ years of experience',
        image: 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        mobileImage: 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        icon: 'StarIcon',
        link: '/astrology-consultation',
        order: 0,
        isActive: true,
        isDefault: true
    },
    {
        _id: 'default-hero-2',
        title: 'Discover Your',
        highlight: "Life's Purpose",
        description: 'Personalized birth chart analysis to understand your true calling and life path',
        image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        mobileImage: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        icon: 'CrystalBallIcon',
        link: '/astrology-consultation',
        order: 1,
        isActive: true,
        isDefault: true
    },
    {
        _id: 'default-hero-3',
        title: 'Harmonize Your',
        highlight: 'Living Spaces',
        description: 'Expert Vastu guidance for home and office to attract positive energy and prosperity',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        mobileImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        icon: 'HomeIcon',
        link: '/vastu-consultation',
        order: 2,
        isActive: true,
        isDefault: true
    },
    {
        _id: 'default-hero-4',
        title: 'Find Your Perfect',
        highlight: 'Life Partner',
        description: 'Accurate Kundli matching and marriage astrology to ensure a harmonious relationship',
        image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        mobileImage: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        icon: 'HeartIcon',
        link: '/astrology-consultation',
        order: 3,
        isActive: true,
        isDefault: true
    }
];

const guidanceCardImages = {
    astrologyConsultation: 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    vastuConsultation: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    astrologyCourses: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2022&q=80',
    vastuCourses: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
};

// ==================== HERO SLIDES ====================
exports.getHeroSlides = async (req, res) => {
    try {
        const slides = await HeroSlide.find({ isActive: true }).sort('order');
        if (slides.length === 0 && req.query.withDefaults === 'true') {
            return res.json({ success: true, data: defaultHeroSlides });
        }
        res.json({ success: true, data: slides });
    } catch (error) {
        console.error('Error fetching hero slides:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createHeroSlide = async (req, res) => {
    try {
        console.log('========== CREATE HERO SLIDE ==========');
        console.log('req.body:', req.body);
        console.log('req.files:', req.files);
        
        let desktopImage = null;
        let mobileImage = null;
        
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                console.log('File received:', file.fieldname, file.filename);
                if (file.fieldname === 'image') {
                    desktopImage = file;
                }
                if (file.fieldname === 'mobileImage') {
                    mobileImage = file;
                }
            }
        }
        
        // Check required fields
        if (!req.body.title) {
            return res.status(400).json({ success: false, message: 'Title is required' });
        }
        if (!req.body.description) {
            return res.status(400).json({ success: false, message: 'Description is required' });
        }
        if (!req.body.link) {
            return res.status(400).json({ success: false, message: 'Link is required' });
        }
        if (!desktopImage || !mobileImage) {
            return res.status(400).json({ 
                success: false, 
                message: 'Both desktop and mobile images are required',
                desktopImage: desktopImage ? 'Present' : 'Missing',
                mobileImage: mobileImage ? 'Present' : 'Missing'
            });
        }
        
        const slideData = {
            title: req.body.title,
            highlight: req.body.highlight || '',
            description: req.body.description,
            link: req.body.link,
            icon: req.body.icon || 'StarIcon',
            order: parseInt(req.body.order) || 0,
            isActive: req.body.isActive === 'true' || req.body.isActive === true,
            image: `/uploads/hero/${desktopImage.filename}`,
            mobileImage: `/uploads/hero/${mobileImage.filename}`
        };
        
        console.log('Final slideData:', slideData);
        
        const slide = await HeroSlide.create(slideData);
        console.log('✅ Hero slide created:', slide._id);
        
        res.status(201).json({ 
            success: true, 
            data: slide,
            message: 'Hero slide created successfully'
        });
    } catch (error) {
        console.error('❌ Error in createHeroSlide:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateHeroSlide = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('========== UPDATE HERO SLIDE ==========');
        console.log('Slide ID:', id);
        
        const oldSlide = await HeroSlide.findById(id);
        if (!oldSlide) {
            return res.status(404).json({ success: false, message: 'Slide not found' });
        }
        
        console.log('Old slide:', {
            title: oldSlide.title,
            image: oldSlide.image,
            mobileImage: oldSlide.mobileImage
        });
        
        // ✅ DEBUG: Check req.body
        console.log('📋 req.body:', req.body);
        console.log('📋 req.body.image:', req.body.image);
        console.log('📋 req.body.mobileImage:', req.body.mobileImage);
        
        // Prepare update data from req.body
        const updateData = {
            title: req.body.title,
            highlight: req.body.highlight || '',
            description: req.body.description,
            link: req.body.link,
            icon: req.body.icon || 'StarIcon',
            order: parseInt(req.body.order) || 0,
            isActive: req.body.isActive === 'true' || req.body.isActive === true
        };
        
        // ✅ Get image paths from req.body (NOT req.files)
        const newImage = req.body.image || '';
        const newMobileImage = req.body.mobileImage || '';
        
        console.log('📸 New image from body:', newImage);
        console.log('📸 New mobileImage from body:', newMobileImage);
        
        // ✅ Update images
        if (newImage) {
            updateData.image = newImage;
            console.log('✅ New desktop image:', updateData.image);
        } else {
            updateData.image = oldSlide.image;
        }
        
        if (newMobileImage) {
            updateData.mobileImage = newMobileImage;
            console.log('✅ New mobile image:', updateData.mobileImage);
        } else {
            updateData.mobileImage = oldSlide.mobileImage;
        }
        
        console.log('Saving updateData:', JSON.stringify(updateData, null, 2));
        
        // Update database
        const slide = await HeroSlide.findByIdAndUpdate(id, updateData, { 
            new: true,
            runValidators: true
        });
        
        console.log('✅ Database updated:', {
            id: slide._id,
            image: slide.image,
            mobileImage: slide.mobileImage
        });
        
        // ✅ Delete old images if they were replaced
        const oldImagesToDelete = [];
        if (newImage && oldSlide.image && oldSlide.image !== newImage) {
            oldImagesToDelete.push(oldSlide.image);
        }
        if (newMobileImage && oldSlide.mobileImage && oldSlide.mobileImage !== newMobileImage) {
            oldImagesToDelete.push(oldSlide.mobileImage);
        }
        
        console.log('🗑️ Old images to delete:', oldImagesToDelete);
        
        if (oldImagesToDelete.length > 0) {
            try {
                deleteUploadFiles(oldImagesToDelete);
                console.log('✅ Old images deleted successfully');
            } catch (deleteError) {
                console.error('❌ Delete error:', deleteError);
            }
        } else {
            console.log('ℹ️ No old images to delete');
        }

        res.json({ 
            success: true, 
            data: slide,
            message: 'Hero slide updated successfully'
        });
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteHeroSlide = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('========== DELETE HERO SLIDE ==========');
        console.log('Slide ID:', id);
        
        const slide = await HeroSlide.findById(id);
        if (!slide) {
            console.log('❌ Slide not found');
            return res.status(404).json({ success: false, message: 'Slide not found' });
        }
        
        console.log('Deleting slide:', slide.title);
        console.log('Images to delete:', {
            image: slide.image,
            mobileImage: slide.mobileImage
        });
        
        // Helper function to delete image file
        const deleteImageFile = (imagePath, type) => {
            if (imagePath) {
                const fullPath = path.join(process.cwd(), 'public', imagePath);
                console.log(`Checking ${type} image at:`, fullPath);
                
                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                    console.log(`✅ Deleted ${type} image:`, imagePath);
                    return true;
                } else {
                    console.log(`⚠️ ${type} image not found on disk:`, imagePath);
                    return false;
                }
            } else {
                console.log(`ℹ️ No ${type} image to delete`);
                return false;
            }
        };
        
        deleteUploadFiles([slide.image, slide.mobileImage]);
        
        // Delete the slide from database
        await HeroSlide.findByIdAndDelete(id);
        console.log('✅ Slide deleted from database successfully');
        
        res.json({ 
            success: true, 
            message: 'Slide deleted successfully' 
        });
    } catch (error) {
        console.error('❌ Error deleting hero slide:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// ==================== FEATURES ====================
exports.getFeatures = async (req, res) => {
    try {
        const features = await Feature.find({ isActive: true }).sort('order');
        res.json({ success: true, data: features });
    } catch (error) {
        console.error('Error fetching features:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createFeature = async (req, res) => {
    try {
        const feature = await Feature.create(req.body);
        res.status(201).json({ success: true, data: feature });
    } catch (error) {
        console.error('Error creating feature:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateFeature = async (req, res) => {
    try {
        const { id } = req.params;
        const feature = await Feature.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ success: true, data: feature });
    } catch (error) {
        console.error('Error updating feature:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteFeature = async (req, res) => {
    try {
        const { id } = req.params;
        await Feature.findByIdAndDelete(id);
        res.json({ success: true, message: 'Feature deleted successfully' });
    } catch (error) {
        console.error('Error deleting feature:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ==================== SERVICES ====================
exports.getServices = async (req, res) => {
    try {
        const services = await Service.find({ isActive: true }).sort('order');
        res.json({ success: true, data: services });
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createService = async (req, res) => {
    try {
        const serviceData = req.body;
        if (req.file) {
            serviceData.image = `/uploads/services/${req.file.filename}`;
        } else {
            return res.status(400).json({ success: false, message: 'Service image is required' });
        }
        const service = await Service.create(serviceData);
        res.status(201).json({ success: true, data: service });
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const oldService = req.file ? await Service.findById(id) : null;
        if (req.file) {
            updateData.image = `/uploads/services/${req.file.filename}`;
        }
        const service = await Service.findByIdAndUpdate(id, updateData, { new: true });
        if (req.file && oldService?.image && oldService.image !== updateData.image) {
            try {
                deleteUploadFile(oldService.image);
            } catch (deleteError) {
                await Service.findByIdAndUpdate(id, { image: oldService.image });
                deleteUploadFile(updateData.image);
                throw new Error(`Service image replacement failed: ${deleteError.message}`);
            }
        }
        res.json({ success: true, data: service });
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findById(id);
        if (service?.image) deleteUploadFile(service.image);
        await Service.findByIdAndDelete(id);
        res.json({ success: true, message: 'Service deleted successfully' });
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getGuidanceCards = async (req, res) => {
    try {
        const [
            astrologyConsultation,
            vastuConsultation,
            astrologyPage,
            vastuPage,
            astrologyCourse,
            vastuCourse,
            homeServices
        ] = await Promise.all([
            ConsultationService.findOne({ category: 'astrology', isActive: true }).sort({ isFeatured: -1, order: 1 }),
            ConsultationService.findOne({ category: 'vastu', isActive: true }).sort({ isFeatured: -1, order: 1 }),
            PageContent.findOne({ pageType: 'ASTROLOGY' }),
            PageContent.findOne({ pageType: 'VASTU' }),
            Course.findOne({ category: 'ASTROLOGY COURSES', isActive: true }).sort({ isFeatured: -1, createdAt: -1 }),
            Course.findOne({ category: 'VASTU COURSES', isActive: true }).sort({ isFeatured: -1, createdAt: -1 }),
            Service.find({ isActive: true, type: 'main' }).sort('order')
        ]);

        const findHomeService = (label) => homeServices.find(
            (service) => service.label?.toLowerCase() === label.toLowerCase()
        );

        const astrologyHomeService = findHomeService('ASTROLOGY CONSULTATION');
        const vastuHomeService = findHomeService('VASTU CONSULTATION');
        const astrologyCoursesHomeService = findHomeService('ASTROLOGY COURSES') || findHomeService('ASTROLOGY & VASTU COURSES');
        const vastuCoursesHomeService = findHomeService('VASTU COURSES');

        const cards = [
            {
                id: 'astrology-consultation',
                label: 'ASTROLOGY CONSULTATION',
                path: '/astrology-consultation',
                icon: 'astrology',
                description: astrologyHomeService?.description || astrologyConsultation?.quickDescription || astrologyConsultation?.shortDescription || astrologyConsultation?.longDescription || '',
                image: astrologyHomeService?.image || astrologyPage?.heroImage || guidanceCardImages.astrologyConsultation
            },
            {
                id: 'vastu-consultation',
                label: 'VASTU CONSULTATION',
                path: '/vastu-consultation',
                icon: 'vastu',
                description: vastuHomeService?.description || vastuConsultation?.quickDescription || vastuConsultation?.shortDescription || vastuConsultation?.longDescription || '',
                image: vastuHomeService?.image || guidanceCardImages.vastuConsultation
            },
            {
                id: 'astrology-courses',
                label: 'ASTROLOGY COURSES',
                path: '/astrology-courses',
                icon: 'astrologyCourses',
                description: astrologyCoursesHomeService?.description || astrologyPage?.heroDescription || astrologyCourse?.aboutCourse || astrologyCourse?.whatIs || '',
                image: astrologyCoursesHomeService?.image || guidanceCardImages.astrologyCourses
            },
            {
                id: 'vastu-courses',
                label: 'VASTU COURSES',
                path: '/vastu-courses',
                icon: 'vastuCourses',
                description: vastuCoursesHomeService?.description || vastuPage?.heroDescription || vastuCourse?.aboutCourse || vastuCourse?.whatIs || '',
                image: vastuCoursesHomeService?.image || vastuCourse?.image || guidanceCardImages.vastuCourses
            }
        ];

        res.json({ success: true, data: cards });
    } catch (error) {
        console.error('Error fetching guidance cards:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ==================== FAQS ====================
exports.getFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find({ isActive: true }).sort('order');
        res.json({ success: true, data: faqs });
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createFAQ = async (req, res) => {
    try {
        const faq = await FAQ.create(req.body);
        res.status(201).json({ success: true, data: faq });
    } catch (error) {
        console.error('Error creating FAQ:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateFAQ = async (req, res) => {
    try {
        const { id } = req.params;
        const faq = await FAQ.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ success: true, data: faq });
    } catch (error) {
        console.error('Error updating FAQ:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteFAQ = async (req, res) => {
    try {
        const { id } = req.params;
        await FAQ.findByIdAndDelete(id);
        res.json({ success: true, message: 'FAQ deleted successfully' });
    } catch (error) {
        console.error('Error deleting FAQ:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ==================== ABOUT SECTION - FIXED ====================
exports.getAboutSection = async (req, res) => {
    try {
        // Find without isActive filter to get any document
        let about = await AboutSection.findOne({});
        
        console.log('Fetched about section:', about);
        
        if (!about) {
            // Create default document if none exists
            about = await AboutSection.create({
                name: '',
                title: '',
                description: '',
                image: '',
                experience: 0,
                clients: 0,
                satisfaction: 0,
                principles: [],
                quote: '',
                isActive: true
            });
            console.log('Created default about section');
        }
        
        res.json({ success: true, data: about });
    } catch (error) {
        console.error('Error fetching about section:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateAboutSection = async (req, res) => {
    try {
        console.log('========== UPDATE ABOUT SECTION ==========');
        console.log('Request body:', req.body);
        console.log('Request file:', req.file);
        
        // Prepare update data - MAP ALL FIELDS EXPLICITLY
        const updateData = {
            name: req.body.name || '',
            title: req.body.title || '',
            description: req.body.description || '',
            experience: parseInt(req.body.experience) || 0,
            clients: parseInt(req.body.clients) || 0,
            satisfaction: parseInt(req.body.satisfaction) || 0,
            quote: req.body.quote || '',
            isActive: true
        };
        
        // Handle principles (coming as JSON string from FormData)
        if (req.body.principles) {
            try {
                if (typeof req.body.principles === 'string') {
                    updateData.principles = JSON.parse(req.body.principles);
                } else if (Array.isArray(req.body.principles)) {
                    updateData.principles = req.body.principles;
                } else {
                    updateData.principles = [];
                }
            } catch (e) {
                console.log('Principles parse error:', e);
                updateData.principles = [];
            }
        } else {
            updateData.principles = [];
        }
        
        // Handle image upload
        if (req.file) {
            // Get old about to delete old image
            const oldAbout = await AboutSection.findOne({});
            req.oldAboutImage = oldAbout?.image;
            updateData.image = `/uploads/about/${req.file.filename}`;
            console.log('New image path:', updateData.image);
        }
        
        console.log('Final updateData:', JSON.stringify(updateData, null, 2));
        
        // Update or create - use empty filter to find any document
        const about = await AboutSection.findOneAndUpdate(
            {}, // Empty filter to find first document
            updateData,
            { 
                new: true, 
                upsert: true,
                setDefaultsOnInsert: true
            }
        );

        if (req.file && req.oldAboutImage && req.oldAboutImage !== updateData.image) {
            try {
                deleteUploadFile(req.oldAboutImage);
            } catch (deleteError) {
                await AboutSection.findOneAndUpdate({}, { image: req.oldAboutImage });
                deleteUploadFile(updateData.image);
                throw new Error(`About image replacement failed: ${deleteError.message}`);
            }
        }
        
        console.log('Saved about section:', JSON.stringify(about, null, 2));
        
        res.json({ 
            success: true, 
            data: about,
            message: 'About section updated successfully'
        });
    } catch (error) {
        console.error('Error updating about section:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// ==================== CONTACT INFO ====================
exports.getContactInfo = async (req, res) => {
    try {
        const contact = await ContactInfo.findOne({ isActive: true });
        res.json({ success: true, data: contact });
    } catch (error) {
        console.error('Error fetching contact info:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateContactInfo = async (req, res) => {
    try {
        const contact = await ContactInfo.findOneAndUpdate(
            { isActive: true },
            req.body,
            { new: true, upsert: true }
        );
        res.json({ success: true, data: contact });
    } catch (error) {
        console.error('Error updating contact info:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ==================== CTA SECTION ====================
exports.getCTASection = async (req, res) => {
    try {
        const cta = await CTASection.findOne({ isActive: true });
        res.json({ success: true, data: cta });
    } catch (error) {
        console.error('Error fetching CTA section:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateCTASection = async (req, res) => {
    try {
        const cta = await CTASection.findOneAndUpdate(
            { isActive: true },
            req.body,
            { new: true, upsert: true }
        );
        res.json({ success: true, data: cta });
    } catch (error) {
        console.error('Error updating CTA section:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ==================== SEO CONTROLLERS ====================
exports.getSeoConfig = async (req, res) => {
    try {
        let seo = await SeoConfig.findOne({ isActive: true }).lean();
        
        if (!seo) {
            seo = await SeoConfig.create({
                metaTitle: 'NB Astro - Best Astrologer in India | Vedic Astrology & Vastu Consultation',
                metaDescription: 'Get accurate Vedic astrology and Vastu consultation from Naveen Bhagat, India\'s leading astrologer.',
                metaKeywords: 'astrologer in India, Vedic astrology, Vastu consultant, Naveen Bhagat',
                robots: 'index, follow'
            });
        }
        
        res.json({ success: true, data: seo });
    } catch (error) {
        console.error('Error fetching SEO config:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateSeoConfig = async (req, res) => {
    try {
        let seo = await SeoConfig.findOne({ isActive: true });
        
        if (!seo) {
            seo = new SeoConfig(req.body);
        } else {
            Object.assign(seo, req.body);
        }
        
        seo.seoLastUpdated = Date.now();
        await seo.save();
        
        res.json({ success: true, data: seo });
    } catch (error) {
        console.error('Error updating SEO config:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getSitemapData = async (req, res) => {
    try {
        const sitemapData = {
            pages: [
                { url: '/', priority: 1.0, changefreq: 'daily' },
                { url: '/about', priority: 0.9, changefreq: 'weekly' },
                { url: '/astrology-consultation', priority: 0.9, changefreq: 'weekly' },
                { url: '/vastu-consultation', priority: 0.9, changefreq: 'weekly' },
                { url: '/astrology-courses', priority: 0.8, changefreq: 'weekly' },
                { url: '/vastu-courses', priority: 0.8, changefreq: 'weekly' },
                { url: '/contact', priority: 0.7, changefreq: 'monthly' }
            ]
        };
        
        res.json({ success: true, data: sitemapData });
    } catch (error) {
        console.error('Error generating sitemap:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ==================== TESTIMONIALS CONTROLLERS ====================
const Testimonial = require('../models/Testimonial');

const defaultTestimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'Naveen Bhagat ji predicted my marriage timeline accurately. Got married within 6 months of consultation!',
    service: 'Marriage Astrology',
    image: 'https://images.unsplash.com/photo-1494790108777-466d829a6c3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Rahul Mehta',
    location: 'Delhi',
    rating: 5,
    text: 'The vastu remedies suggested by him brought positive energy to our office. Business improved significantly.',
    service: 'Vastu Consultation',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Anita Desai',
    location: 'Pune',
    rating: 5,
    text: 'His career guidance was spot on. Got promotion within 3 months as he predicted.',
    service: 'Career Horoscope',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Vikram Singh',
    location: 'Jaipur',
    rating: 5,
    text: 'Very accurate kundli matching for my daughter. The couple is living happily.',
    service: 'Kundli Milan',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Neha Gupta',
    location: 'Bangalore',
    rating: 5,
    text: 'The remedies for health issues worked wonders. Feeling much better now. Highly recommended!',
    service: 'Medical Astrology',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Amit Kumar',
    location: 'Chennai',
    rating: 5,
    text: 'Accurate predictions about my business expansion. Followed his advice and got excellent results.',
    service: 'Business Astrology',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
  }
];

exports.getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort('order');
        if (testimonials.length === 0) {
            return res.json({ success: true, data: defaultTestimonials });
        }
        res.json({ success: true, data: testimonials });
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.create(req.body);
        res.status(201).json({ success: true, data: testimonial, message: 'Testimonial created successfully' });
    } catch (error) {
        console.error('Error creating testimonial:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const testimonial = await Testimonial.findByIdAndUpdate(id, req.body, { new: true });
        if (!testimonial) {
            return res.status(404).json({ success: false, message: 'Testimonial not found' });
        }
        res.json({ success: true, data: testimonial, message: 'Testimonial updated successfully' });
    } catch (error) {
        console.error('Error updating testimonial:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const testimonial = await Testimonial.findByIdAndDelete(id);
        if (!testimonial) {
            return res.status(404).json({ success: false, message: 'Testimonial not found' });
        }
        res.json({ success: true, message: 'Testimonial deleted successfully' });
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

