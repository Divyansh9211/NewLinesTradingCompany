const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getRevenueAnalytics,
  getTopSellingProducts,
  getCategoryPerformance,
  getRecentActivity,
  getUsersAdmin,
  toggleBlockUserAdmin,
  updateUserRoleAdmin,
} = require('../controllers/adminDashboardController');
const { protect, admin } = require('../middleware/authMiddleware');

// All Admin Dashboard & Analytics routes require JWT Authentication + Admin Role
router.use(protect);
router.use(admin);

// Dashboard KPI Stats & Analytics Routes
router.get('/dashboard/stats', getDashboardStats);
router.get('/analytics/revenue', getRevenueAnalytics);
router.get('/analytics/top-products', getTopSellingProducts);
router.get('/analytics/categories', getCategoryPerformance);
router.get('/analytics/recent-activity', getRecentActivity);

// User Management Routes
router.get('/users', getUsersAdmin);
router.put('/users/:id/block', toggleBlockUserAdmin);
router.put('/users/:id/role', updateUserRoleAdmin);

module.exports = router;
