const Order = require('../models/orderModel');
const mongoose = require('mongoose');

/**
 * @desc    Fetch all orders for currently authenticated user
 * @route   GET /api/orders
 * @access  Private (Authenticated User)
 */
const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch a single order by ID or Order Number
 * @route   GET /api/orders/:id
 * @access  Private (Authenticated User)
 */
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const filter = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { orderNumber: id };

    const order = await Order.findOne(filter).populate('user', 'name email mobileRole');

    if (!order) {
      res.status(404);
      return next(new Error('Order not found'));
    }

    // Ensure user can only view their own order unless they are an admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(403);
      return next(new Error('Not authorized to access this order'));
    }

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserOrders,
  getOrderById,
};
