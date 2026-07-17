// routes/aboutPageRoutes.js
const express = require('express');
const router = express.Router();
const {
    getAboutPageContent,
    saveAboutPageContent
} = require('../controllers/aboutPageController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getAboutPageContent);
router.post('/', protect, saveAboutPageContent);
router.put('/', protect, saveAboutPageContent);

module.exports = router;