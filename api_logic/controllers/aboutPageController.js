// controllers/aboutPageController.js
const AboutPageContent = require('../models/AboutPageContent');

// Get about page content
const getAboutPageContent = async (req, res) => {
    try {
        let content = await AboutPageContent.findOne();
        
        if (!content) {
            return res.status(404).json({
                success: false,
                message: 'About page content not found'
            });
        }
        
        res.json({
            success: true,
            data: content
        });
    } catch (error) {
        console.error('Get About Page Error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Create or Update about page content
const saveAboutPageContent = async (req, res) => {
    try {
        const updateData = { ...req.body, updatedAt: Date.now() };
        
        const content = await AboutPageContent.findOneAndUpdate(
            {},
            updateData,
            { new: true, upsert: true }
        );
        
        res.json({
            success: true,
            message: 'About page content saved successfully',
            data: content
        });
    } catch (error) {
        console.error('Save About Page Error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAboutPageContent,
    saveAboutPageContent
};