const express = require('express');
const router = express.Router();
const { getUserOrders, getOrderById } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// All Order Management Routes require JWT Authentication
router.use(protect);

router.get('/', getUserOrders);
router.get('/:id', getOrderById);

module.exports = router;
