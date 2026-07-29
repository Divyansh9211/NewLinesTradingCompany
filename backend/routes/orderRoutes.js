const express = require('express');
const router = express.Router();
const {
  getUserOrders,
  getOrderById,
  cancelMyOrder,
  getAllOrdersAdmin,
  updateOrderStatusAdmin,
  getAdminOrderStats,
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// All Order Management Routes require JWT Authentication
router.use(protect);

// Customer Order Routes
router.get('/', getUserOrders);
router.get('/my-orders', getUserOrders);
router.put('/:id/cancel', cancelMyOrder);

// Admin Order Management Routes (protect + admin)
router.get('/admin/all', admin, getAllOrdersAdmin);
router.get('/admin/stats', admin, getAdminOrderStats);
router.put('/admin/:id/status', admin, updateOrderStatusAdmin);

// Generic single order route (demarcated after admin specific routes to avoid param collision)
router.get('/:id', getOrderById);

module.exports = router;
