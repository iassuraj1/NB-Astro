// controllers/consultationController.js
const ConsultationService = require('../models/ConsultationService');
const fs = require('fs');
const path = require('path');
const { deleteUploadFile } = require('../utils/imageStorage');

// Helper function to delete old image
const deleteOldImage = (imagePath) => {
    if (!imagePath) return;
    deleteUploadFile(imagePath);
};

// Helper to validate image file (called from route)
const validateImage = (file) => {
    if (!file) return { valid: true };
    
    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        return { valid: false, message: `Image size should be less than 5MB. Current: ${(file.size / 1024 / 1024).toFixed(2)}MB` };
    }
    
    // Check file extension
    const allowedExtensions = ['.jpeg', '.jpg', '.png', '.gif', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
        return { valid: false, message: `Only ${allowedExtensions.join(', ')} formats are allowed. Current: ${ext}` };
    }
    
    // Check MIME type
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedMimes.includes(file.mimetype)) {
        return { valid: false, message: 'Invalid image type. Only JPEG, PNG, GIF, WEBP allowed.' };
    }
    
    return { valid: true };
};

// ==================== GET ALL SERVICES ====================
exports.getAllServices = async (req, res) => {
    try {
        const { category, isActive, isFeatured } = req.query;
        let filter = {};
        
        if (category) filter.category = category;
        if (isActive !== undefined) filter.isActive = isActive === 'true';
        if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';
        
        const services = await ConsultationService.find(filter)
            .sort('order')
            .lean();
        
        res.json({
            success: true,
            count: services.length,
            data: services
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ==================== GET SINGLE SERVICE ====================
exports.getServiceById = async (req, res) => {
    try {
        const service = await ConsultationService.findById(req.params.id).lean();
        
        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }
        
        res.json({
            success: true,
            data: service
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ==================== GET SERVICE BY SLUG ====================
exports.getServiceBySlug = async (req, res) => {
    try {
        const service = await ConsultationService.findOne({ 
            slug: req.params.slug,
            isActive: true 
        }).lean();
        
        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }
        
        res.json({
            success: true,
            data: service
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ==================== CREATE SERVICE ====================
exports.createService = async (req, res) => {
    try {
        // Validate image if uploaded
        if (req.file) {
            const validation = validateImage(req.file);
            if (!validation.valid) {
                return res.status(400).json({
                    success: false,
                    message: validation.message
                });
            }
        }
        
        const serviceData = JSON.parse(JSON.stringify(req.body));
        
        // Parse JSON string fields
        const parseJSONField = (field) => {
            if (serviceData[field] && typeof serviceData[field] === 'string') {
                try {
                    serviceData[field] = JSON.parse(serviceData[field]);
                } catch (e) {
                    serviceData[field] = [];
                }
            }
        };
        
        parseJSONField('features');
        parseJSONField('includes');
        parseJSONField('whatYouGet');
        parseJSONField('benefits');
        parseJSONField('faqs');
        
        // Handle image if uploaded
        if (req.file) {
            serviceData.image = `/uploads/consultations/${req.file.filename}`;
        } else {
            return res.status(400).json({
                success: false,
                message: 'Image is required'
            });
        }
        
        const service = await ConsultationService.create(serviceData);
        
        res.status(201).json({
            success: true,
            message: 'Service created successfully',
            data: service
        });
    } catch (error) {
        console.error('Create error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ==================== UPDATE SERVICE ====================
exports.updateService = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find existing service
        const existingService = await ConsultationService.findById(id);
        if (!existingService) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }
        
        let updateData = JSON.parse(JSON.stringify(req.body));
        
        // Parse JSON string fields
        const parseJSONField = (field) => {
            if (updateData[field] && typeof updateData[field] === 'string') {
                try {
                    updateData[field] = JSON.parse(updateData[field]);
                } catch (e) {
                    updateData[field] = existingService[field] || [];
                }
            }
        };
        
        parseJSONField('features');
        parseJSONField('includes');
        parseJSONField('whatYouGet');
        parseJSONField('benefits');
        parseJSONField('faqs');
        
        // Handle image update - Delete old image if new image uploaded
        if (req.file) {
            // Validate new image
            const validation = validateImage(req.file);
            if (!validation.valid) {
                return res.status(400).json({
                    success: false,
                    message: validation.message
                });
            }
            
            // Set new image path
            updateData.image = `/uploads/consultations/${req.file.filename}`;
        }
        
        const service = await ConsultationService.findByIdAndUpdate(
            id, 
            updateData, 
            { new: true, runValidators: true }
        );

        if (req.file && existingService.image && updateData.image !== existingService.image) {
            try {
                deleteOldImage(existingService.image);
            } catch (deleteError) {
                await ConsultationService.findByIdAndUpdate(id, { image: existingService.image }, { runValidators: true });
                deleteOldImage(updateData.image);
                throw new Error(`Service image replacement failed: ${deleteError.message}`);
            }
        }
        
        res.json({
            success: true,
            message: 'Service updated successfully',
            data: service
        });
    } catch (error) {
        console.error('Update error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ==================== DELETE SERVICE ====================
exports.deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await ConsultationService.findById(id);
        
        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }
        
        // Delete image file
        if (service.image) {
            deleteOldImage(service.image);
        }
        
        await ConsultationService.findByIdAndDelete(id);
        
        res.json({
            success: true,
            message: 'Service deleted successfully'
        });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ==================== TOGGLE STATUS ====================
exports.toggleStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await ConsultationService.findById(id);
        
        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }
        
        service.isActive = !service.isActive;
        await service.save();
        
        res.json({
            success: true,
            message: `Service ${service.isActive ? 'activated' : 'deactivated'} successfully`,
            data: service
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ==================== TOGGLE FEATURED ====================
exports.toggleFeatured = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await ConsultationService.findById(id);
        
        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }
        
        service.isFeatured = !service.isFeatured;
        await service.save();
        
        res.json({
            success: true,
            message: `Service ${service.isFeatured ? 'featured' : 'unfeatured'} successfully`,
            data: service
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ==================== REORDER SERVICES ====================
exports.reorderServices = async (req, res) => {
    try {
        const { services } = req.body; // Array of { id, order }
        
        if (!services || !Array.isArray(services)) {
            return res.status(400).json({
                success: false,
                message: 'Services array is required'
            });
        }
        
        for (const item of services) {
            await ConsultationService.findByIdAndUpdate(item.id, { order: item.order });
        }
        
        res.json({
            success: true,
            message: 'Services reordered successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ==================== GET SERVICE WITH SEO ====================
exports.getServiceWithSEO = async (req, res) => {
    try {
        const service = await ConsultationService.findOne({ 
            slug: req.params.slug,
            isActive: true 
        }).lean();
        
        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }
        
        const baseUrl = process.env.BASE_URL || 'https://nbastro.com';
        
        res.json({
            success: true,
            data: {
                service,
                seo: {
                    title: service.seoTitle || `${service.title} | NB Astro`,
                    description: service.seoDescription || service.quickDescription,
                    keywords: service.seoKeywords || '',
                    canonicalUrl: `${baseUrl}/consultation/${service.category}/${service.slug}`,
                    ogImage: service.image ? `${baseUrl}${service.image}` : null
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
