const express = require('express');
const router = express.Router();
const { getCheckoutSummary } = require('../controllers/checkoutController');
const { protect } = require('../middleware/authMiddleware');

// All Checkout Routes require JWT Authentication
router.use(protect);

router.post('/summary', getCheckoutSummary);
router.get('/summary', getCheckoutSummary);

module.exports = router;
