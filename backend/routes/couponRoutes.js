const express = require('express');
const router = express.Router();
const {
  validateCoupon,
  createCoupon,
  getAllCouponsAdmin,
  getCouponByIdAdmin,
  updateCoupon,
  toggleCouponStatus,
  deleteCoupon,
} = require('../controllers/couponController');
const { protect, admin } = require('../middleware/authMiddleware');

// All Coupon Routes require JWT Authentication
router.use(protect);

// Customer Route
router.post('/validate', validateCoupon);

// Admin Coupon Management Routes (protect + admin)
router.post('/admin', admin, createCoupon);
router.get('/admin/all', admin, getAllCouponsAdmin);
router.get('/admin/:id', admin, getCouponByIdAdmin);
router.put('/admin/:id', admin, updateCoupon);
router.put('/admin/:id/status', admin, toggleCouponStatus);
router.delete('/admin/:id', admin, deleteCoupon);

module.exports = router;
