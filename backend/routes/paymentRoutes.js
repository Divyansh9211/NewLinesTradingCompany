const express = require('express');
const router = express.Router();
const {
  createRazorpayOrder,
  verifyPaymentAndCreateOrder,
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

// All Payment Routes require JWT Authentication
router.use(protect);

router.post('/create-order', createRazorpayOrder);
router.post('/verify', verifyPaymentAndCreateOrder);

module.exports = router;
