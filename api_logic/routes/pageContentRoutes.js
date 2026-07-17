// // routes/pageContentRoutes.js
// const express = require('express');
// const router = express.Router();
// const {
//     getPageContent,
//     savePageContent
// } = require('../controllers/pageContentController');
// const { protect } = require('../middleware/authMiddleware');

// router.get('/:pageType', getPageContent);
// router.post('/:pageType', protect, savePageContent);
// router.put('/:pageType', protect, savePageContent);

// module.exports = router;


// routes/pageContentRoutes.js
const express = require('express');
const router = express.Router();
const {
    getPageContent,
    savePageContent
} = require('../controllers/pageContentController');
const { protect } = require('../middleware/authMiddleware');

router.get('/:pageType', getPageContent);
router.post('/:pageType', protect, savePageContent);
router.put('/:pageType', protect, savePageContent);

module.exports = router;