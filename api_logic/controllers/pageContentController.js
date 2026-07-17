// // controllers/pageContentController.js
// const PageContent = require('../models/PageContent');

// // @desc    Get page content by type
// const getPageContent = async (req, res) => {
//     try {
//         const { pageType } = req.params;
//         const normalizedType = pageType.toUpperCase();
        
//         const pageContent = await PageContent.findOne({ pageType: normalizedType });
        
//         if (!pageContent) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Page content not found'
//             });
//         }
        
//         res.json({
//             success: true,
//             data: pageContent
//         });
//     } catch (error) {
//         console.error('Get Page Content Error:', error);
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// // @desc    Create or Update page content
// const savePageContent = async (req, res) => {
//     try {
//         const { pageType } = req.params;
//         const normalizedType = pageType.toUpperCase();
        
//         const updateData = { ...req.body, updatedAt: Date.now() };
        
//         const pageContent = await PageContent.findOneAndUpdate(
//             { pageType: normalizedType },
//             updateData,
//             { new: true, upsert: true }
//         );
        
//         res.json({
//             success: true,
//             message: 'Page content saved successfully',
//             data: pageContent
//         });
//     } catch (error) {
//         console.error('Save Page Content Error:', error);
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// module.exports = {
//     getPageContent,
//     savePageContent
// };


// // controllers/pageContentController.js
// const PageContent = require('../models/PageContent');

// // @desc    Get page content by type
// const getPageContent = async (req, res) => {
//     try {
//         const { pageType } = req.params;
//         const normalizedType = pageType.toUpperCase();
        
//         const pageContent = await PageContent.findOne({ pageType: normalizedType });
        
//         if (!pageContent) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'Page content not found'
//             });
//         }
        
//         res.json({
//             success: true,
//             data: pageContent
//         });
//     } catch (error) {
//         console.error('Get Page Content Error:', error);
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// // @desc    Create or Update page content
// const savePageContent = async (req, res) => {
//     try {
//         const { pageType } = req.params;
//         const normalizedType = pageType.toUpperCase();
        
//         const updateData = { ...req.body, updatedAt: Date.now() };
        
//         // ✅ FIXED: Use returnDocument: 'after' instead of new: true
//         const pageContent = await PageContent.findOneAndUpdate(
//             { pageType: normalizedType },
//             updateData,
//             { upsert: true, returnDocument: 'after' }  // 👈 Changed here
//         );
        
//         res.json({
//             success: true,
//             message: 'Page content saved successfully',
//             data: pageContent
//         });
//     } catch (error) {
//         console.error('Save Page Content Error:', error);
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };

// module.exports = {
//     getPageContent,
//     savePageContent
// };



// controllers/pageContentController.js
const PageContent = require('../models/PageContent');

// @desc    Get page content by type
const getPageContent = async (req, res) => {
    try {
        const { pageType } = req.params;
        const normalizedType = pageType.toUpperCase();
        
        const pageContent = await PageContent.findOne({ pageType: normalizedType });
        
        if (!pageContent) {
            return res.status(404).json({
                success: false,
                message: 'Page content not found'
            });
        }
        
        res.json({
            success: true,
            data: pageContent
        });
    } catch (error) {
        console.error('Get Page Content Error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Create or Update page content
const savePageContent = async (req, res) => {
    try {
        const { pageType } = req.params;
        const normalizedType = pageType.toUpperCase();
        
        const updateData = { ...req.body, updatedAt: Date.now() };
        
        const pageContent = await PageContent.findOneAndUpdate(
            { pageType: normalizedType },
            updateData,
            { upsert: true, returnDocument: 'after' }
        );
        
        res.json({
            success: true,
            message: 'Page content saved successfully',
            data: pageContent
        });
    } catch (error) {
        console.error('Save Page Content Error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getPageContent,
    savePageContent
};