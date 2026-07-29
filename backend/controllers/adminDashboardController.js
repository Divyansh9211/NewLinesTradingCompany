const User = require('../models/userModel');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const Order = require('../models/orderModel');
const Wishlist = require('../models/wishlistModel');
const Cart = require('../models/cartModel');
const mongoose = require('mongoose');

/**
 * @desc    Fetch real-time comprehensive KPI metrics for Admin Dashboard
 * @route   GET /api/admin/dashboard/stats
 * @access  Private (Admin Only)
 */
const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalAdmins,
      blockedUsers,
      totalProducts,
      totalCategories,
      totalOrders,
      lowStockProducts,
      outOfStockProducts,
    ] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      User.countDocuments({ role: 'admin' }),
      User.countDocuments({ isBlocked: true }),
      Product.countDocuments(),
      Category.countDocuments(),
      Order.countDocuments(),
      Product.countDocuments({ stock: { $gt: 0, $lte: 10 } }),
      Product.countDocuments({ stock: 0 }),
    ]);

    // Aggregate lifetime total revenue for paid, non-cancelled orders
    const revenueAgg = await Order.aggregate([
      {
        $match: {
          orderStatus: { $nin: ['Cancelled', 'Refunded'] },
          isPaid: true,
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$grandTotal' },
        },
      },
    ]);
    const totalRevenue = revenueAgg.length > 0 ? Number(revenueAgg[0].totalRevenue.toFixed(2)) : 0;

    // Aggregate order counts grouped by status
    const statusAgg = await Order.aggregate([
      {
        $group: {
          _id: '$orderStatus',
          count: { $sum: 1 },
        },
      },
    ]);
    const orderStatusCounts = {};
    statusAgg.forEach((item) => {
      orderStatusCounts[item._id] = item.count;
    });

    // Aggregate total wishlist and cart items count across all users
    const wishlistAgg = await Wishlist.aggregate([
      { $project: { itemCount: { $size: { $ifNull: ['$products', []] } } } },
      { $group: { _id: null, totalWishlistItems: { $sum: '$itemCount' } } },
    ]);
    const totalWishlistItems = wishlistAgg.length > 0 ? wishlistAgg[0].totalWishlistItems : 0;

    const cartAgg = await Cart.aggregate([
      { $group: { _id: null, totalCartItems: { $sum: '$totalItems' } } },
    ]);
    const totalCartItems = cartAgg.length > 0 ? cartAgg[0].totalCartItems : 0;

    return res.status(200).json({
      success: true,
      data: {
        users: {
          totalUsers,
          totalAdmins,
          blockedUsers,
        },
        catalog: {
          totalProducts,
          totalCategories,
          lowStockProducts,
          outOfStockProducts,
        },
        orders: {
          totalOrders,
          orderStatusCounts,
        },
        financials: {
          totalRevenue,
        },
        userActivity: {
          totalWishlistItems,
          totalCartItems,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch revenue & order sales trend analytics across timeframes
 * @route   GET /api/admin/analytics/revenue
 * @access  Private (Admin Only)
 */
const getRevenueAnalytics = async (req, res, next) => {
  try {
    const now = new Date();

    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const calculateRevenueRange = async (startDate) => {
      const matchCriteria = {
        orderStatus: { $nin: ['Cancelled', 'Refunded'] },
        isPaid: true,
      };
      if (startDate) {
        matchCriteria.createdAt = { $gte: startDate };
      }

      const result = await Order.aggregate([
        { $match: matchCriteria },
        {
          $group: {
            _id: null,
            revenue: { $sum: '$grandTotal' },
            orderCount: { $sum: 1 },
          },
        },
      ]);

      return {
        revenue: result.length > 0 ? Number(result[0].revenue.toFixed(2)) : 0,
        orderCount: result.length > 0 ? result[0].orderCount : 0,
      };
    };

    const [today, weekly, monthly, yearly, lifetime] = await Promise.all([
      calculateRevenueRange(startOfToday),
      calculateRevenueRange(sevenDaysAgo),
      calculateRevenueRange(startOfMonth),
      calculateRevenueRange(startOfYear),
      calculateRevenueRange(null),
    ]);

    // Aggregate monthly revenue trends for the last 12 months for chart display
    const monthlyTrendAgg = await Order.aggregate([
      {
        $match: {
          orderStatus: { $nin: ['Cancelled', 'Refunded'] },
          isPaid: true,
          createdAt: { $gte: new Date(now.getFullYear() - 1, now.getMonth(), 1) },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          revenue: { $sum: '$grandTotal' },
          ordersCount: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    const monthlyTrends = monthlyTrendAgg.map((item) => {
      const yearStr = item._id.year;
      const monthStr = String(item._id.month).padStart(2, '0');
      return {
        period: `${yearStr}-${monthStr}`,
        revenue: Number(item.revenue.toFixed(2)),
        ordersCount: item.ordersCount,
      };
    });

    return res.status(200).json({
      success: true,
      data: {
        summary: {
          today,
          weekly,
          monthly,
          yearly,
          lifetime,
        },
        monthlyTrends,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch top 10 best-selling products by quantity sold & total revenue
 * @route   GET /api/admin/analytics/top-products
 * @access  Private (Admin Only)
 */
const getTopSellingProducts = async (req, res, next) => {
  try {
    const topProducts = await Order.aggregate([
      { $match: { orderStatus: { $nin: ['Cancelled', 'Refunded'] } } },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.product',
          name: { $first: '$items.name' },
          unitPrice: { $first: '$items.price' },
          image: { $first: '$items.image' },
          totalQuantitySold: { $sum: '$items.quantity' },
          totalRevenue: { $sum: '$items.itemSubtotal' },
        },
      },
      { $sort: { totalQuantitySold: -1 } },
      { $limit: 10 },
    ]);

    return res.status(200).json({
      success: true,
      count: topProducts.length,
      data: topProducts,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch category sales performance and revenue distribution
 * @route   GET /api/admin/analytics/categories
 * @access  Private (Admin Only)
 */
const getCategoryPerformance = async (req, res, next) => {
  try {
    const categories = await Category.find().select('name slug image');
    const categoryStats = await Promise.all(
      categories.map(async (cat) => {
        const productIds = await Product.find({ category: cat._id }).distinct('_id');

        const catAgg = await Order.aggregate([
          { $match: { orderStatus: { $nin: ['Cancelled', 'Refunded'] } } },
          { $unwind: '$items' },
          { $match: { 'items.product': { $in: productIds } } },
          {
            $group: {
              _id: null,
              totalItemsSold: { $sum: '$items.quantity' },
              totalCategoryRevenue: { $sum: '$items.itemSubtotal' },
            },
          },
        ]);

        return {
          categoryId: cat._id,
          categoryName: cat.name,
          slug: cat.slug,
          image: cat.image,
          linkedProductsCount: productIds.length,
          totalItemsSold: catAgg.length > 0 ? catAgg[0].totalItemsSold : 0,
          totalCategoryRevenue: catAgg.length > 0 ? Number(catAgg[0].totalCategoryRevenue.toFixed(2)) : 0,
        };
      })
    );

    categoryStats.sort((a, b) => b.totalCategoryRevenue - a.totalCategoryRevenue);

    return res.status(200).json({
      success: true,
      count: categoryStats.length,
      data: categoryStats,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch recent activity feeds (5 recent orders & 5 recent user registrations)
 * @route   GET /api/admin/analytics/recent-activity
 * @access  Private (Admin Only)
 */
const getRecentActivity = async (req, res, next) => {
  try {
    const [recentOrders, recentUsers] = await Promise.all([
      Order.find()
        .select('orderNumber grandTotal orderStatus isPaid createdAt shippingAddress.fullName')
        .sort({ createdAt: -1 })
        .limit(5),
      User.find()
        .select('name email role isBlocked createdAt')
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        recentOrders,
        recentUsers,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch all registered users for Admin (with search, role filter, blocked filter, and pagination)
 * @route   GET /api/admin/users
 * @access  Private (Admin Only)
 */
const getUsersAdmin = async (req, res, next) => {
  try {
    const { search, role, isBlocked, page = 1, limit = 10 } = req.query;

    const queryFilter = {};

    if (role && ['user', 'admin'].includes(role)) {
      queryFilter.role = role;
    }

    if (isBlocked !== undefined) {
      queryFilter.isBlocked = isBlocked === 'true';
    }

    if (search) {
      const searchRegex = new RegExp(search.trim(), 'i');
      queryFilter.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (pageNum - 1) * limitNum;

    const totalUsers = await User.countDocuments(queryFilter);
    const users = await User.find(queryFilter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    return res.status(200).json({
      success: true,
      count: users.length,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limitNum),
      currentPage: pageNum,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Toggle block/unblock status of a user account
 * @route   PUT /api/admin/users/:id/block
 * @access  Private (Admin Only)
 */
const toggleBlockUserAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      return next(new Error('Invalid User ID format'));
    }

    // Prevent admin from blocking themselves
    if (id.toString() === req.user._id.toString()) {
      res.status(400);
      return next(new Error('Administrators cannot block their own account'));
    }

    const user = await User.findById(id);
    if (!user) {
      res.status(404);
      return next(new Error('User account not found'));
    }

    const newBlockedState = req.body.isBlocked !== undefined ? Boolean(req.body.isBlocked) : !user.isBlocked;
    user.isBlocked = newBlockedState;
    await user.save();

    return res.status(200).json({
      success: true,
      message: `User account '${user.name}' has been ${newBlockedState ? 'blocked' : 'unblocked'} successfully`,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isBlocked: user.isBlocked,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a user's role (user / admin)
 * @route   PUT /api/admin/users/:id/role
 * @access  Private (Admin Only)
 */
const updateUserRoleAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role || !['user', 'admin'].includes(role)) {
      res.status(400);
      return next(new Error('Please provide a valid role: user or admin'));
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      return next(new Error('Invalid User ID format'));
    }

    const user = await User.findById(id);
    if (!user) {
      res.status(404);
      return next(new Error('User account not found'));
    }

    user.role = role;
    await user.save();

    return res.status(200).json({
      success: true,
      message: `User '${user.name}' role updated to '${role}' successfully`,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
  getRevenueAnalytics,
  getTopSellingProducts,
  getCategoryPerformance,
  getRecentActivity,
  getUsersAdmin,
  toggleBlockUserAdmin,
  updateUserRoleAdmin,
};
