const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const mongoose = require('mongoose');

/**
 * Explicit Order Status Lifecycle Transition Rules
 */
const ALLOWED_TRANSITIONS = {
  Pending: ['Confirmed', 'Cancelled'],
  Processing: ['Confirmed', 'Packed', 'Cancelled'],
  Confirmed: ['Packed', 'Cancelled'],
  Packed: ['Shipped', 'Cancelled'],
  Shipped: ['Out for Delivery', 'Delivered'],
  'Out for Delivery': ['Delivered', 'Returned'],
  Delivered: ['Returned'],
  Cancelled: [],
  Returned: ['Refunded'],
  Refunded: [],
};

/**
 * @desc    Fetch order history for currently authenticated customer (with pagination & status filter)
 * @route   GET /api/orders or GET /api/orders/my-orders
 * @access  Private (Authenticated Customer)
 */
const getUserOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const queryFilter = { user: req.user._id };

    if (status) {
      queryFilter.orderStatus = status;
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (pageNum - 1) * limitNum;

    const totalOrders = await Order.countDocuments(queryFilter);
    const orders = await Order.find(queryFilter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    return res.status(200).json({
      success: true,
      count: orders.length,
      totalOrders,
      totalPages: Math.ceil(totalOrders / limitNum),
      currentPage: pageNum,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch single order details by Order ID or Order Number
 * @route   GET /api/orders/:id
 * @access  Private (Authenticated User / Admin)
 */
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const filter = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { orderNumber: id };

    const order = await Order.findOne(filter).populate('user', 'name email role');

    if (!order) {
      res.status(404);
      return next(new Error('Order not found'));
    }

    // Ensure customer can only view their own order unless they are an admin
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

/**
 * @desc    Cancel an order by customer (Allowed for Pending, Processing, or Confirmed states)
 * @route   PUT /api/orders/:id/cancel
 * @access  Private (Authenticated Customer)
 */
const cancelMyOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const filter = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id, user: req.user._id }
      : { orderNumber: id, user: req.user._id };

    const order = await Order.findOne(filter);

    if (!order) {
      res.status(404);
      return next(new Error('Order not found'));
    }

    // Business rule: Customers can only cancel orders in Pending, Processing, or Confirmed state
    const CANCELLABLE_STATUSES = ['Pending', 'Processing', 'Confirmed'];

    if (!CANCELLABLE_STATUSES.includes(order.orderStatus)) {
      res.status(400);
      return next(
        new Error(
          `Order cannot be cancelled in status '${order.orderStatus}'. Cancellation is allowed only for Pending, Processing, or Confirmed orders.`
        )
      );
    }

    order.orderStatus = 'Cancelled';
    order.cancellationReason = reason ? reason.trim() : 'Cancelled by customer';
    order.cancelledAt = new Date();

    // Restore product stock in MongoDB if not already restored
    if (!order.isStockRestored) {
      for (const item of order.items) {
        if (item.product) {
          await Product.findByIdAndUpdate(item.product, {
            $inc: { stock: item.quantity },
          });
        }
      }
      order.isStockRestored = true;
    }

    order.statusHistory.push({
      status: 'Cancelled',
      updatedBy: req.user.name || 'Customer',
      updatedAt: new Date(),
      note: order.cancellationReason,
    });

    await order.save();

    return res.status(200).json({
      success: true,
      message: 'Order cancelled successfully and product stock restored',
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch all orders across the platform for Administrators (search, filter, pagination)
 * @route   GET /api/orders/admin/all
 * @access  Private (Admin Only)
 */
const getAllOrdersAdmin = async (req, res, next) => {
  try {
    const { search, status, page = 1, limit = 10, sort = '-createdAt' } = req.query;

    const queryFilter = {};

    if (status) {
      queryFilter.orderStatus = status;
    }

    if (search) {
      const searchRegex = new RegExp(search.trim(), 'i');
      queryFilter.$or = [
        { orderNumber: searchRegex },
        { 'shippingAddress.fullName': searchRegex },
        { 'shippingAddress.phone': searchRegex },
        { 'paymentDetails.razorpayOrderId': searchRegex },
        { 'paymentDetails.razorpayPaymentId': searchRegex },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (pageNum - 1) * limitNum;

    const totalOrders = await Order.countDocuments(queryFilter);
    const orders = await Order.find(queryFilter)
      .populate('user', 'name email role')
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    return res.status(200).json({
      success: true,
      count: orders.length,
      totalOrders,
      totalPages: Math.ceil(totalOrders / limitNum),
      currentPage: pageNum,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update order status by Administrator with lifecycle transition validation
 * @route   PUT /api/orders/admin/:id/status
 * @access  Private (Admin Only)
 */
const updateOrderStatusAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;

    const VALID_STATUSES = [
      'Pending',
      'Processing',
      'Confirmed',
      'Packed',
      'Shipped',
      'Out for Delivery',
      'Delivered',
      'Cancelled',
      'Returned',
      'Refunded',
    ];

    if (!status || !VALID_STATUSES.includes(status)) {
      res.status(400);
      return next(
        new Error(
          `Please provide a valid order status. Allowed values: ${VALID_STATUSES.join(', ')}`
        )
      );
    }

    const filter = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { orderNumber: id };

    const order = await Order.findOne(filter);

    if (!order) {
      res.status(404);
      return next(new Error('Order not found'));
    }

    if (order.orderStatus === status) {
      return res.status(200).json({
        success: true,
        message: `Order is already in '${status}' status`,
        data: order,
      });
    }

    // Validate Status Transition Logic
    const allowedNextStatuses = ALLOWED_TRANSITIONS[order.orderStatus] || [];
    if (!allowedNextStatuses.includes(status)) {
      res.status(400);
      return next(
        new Error(
          `Invalid status transition from '${order.orderStatus}' to '${status}'. Allowed transitions: [${allowedNextStatuses.join(', ')}]`
        )
      );
    }

    // Restore stock if admin changes status to Cancelled or Returned
    if ((status === 'Cancelled' || status === 'Returned') && !order.isStockRestored) {
      for (const item of order.items) {
        if (item.product) {
          await Product.findByIdAndUpdate(item.product, {
            $inc: { stock: item.quantity },
          });
        }
      }
      order.isStockRestored = true;
      order.cancelledAt = new Date();
    }

    order.orderStatus = status;

    order.statusHistory.push({
      status,
      updatedBy: req.user.name || 'Admin',
      updatedAt: new Date(),
      note: note || `Status updated to ${status} by admin`,
    });

    await order.save();

    return res.status(200).json({
      success: true,
      message: `Order status updated to '${status}' successfully`,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch high-level order analytics statistics for Admin Dashboard
 * @route   GET /api/orders/admin/stats
 * @access  Private (Admin Only)
 */
const getAdminOrderStats = async (req, res, next) => {
  try {
    const totalOrders = await Order.countDocuments();

    const statusCounts = await Order.aggregate([
      {
        $group: {
          _id: '$orderStatus',
          count: { $sum: 1 },
        },
      },
    ]);

    const revenueResult = await Order.aggregate([
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

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    const formattedCounts = {};
    statusCounts.forEach((item) => {
      formattedCounts[item._id] = item.count;
    });

    return res.status(200).json({
      success: true,
      data: {
        totalOrders,
        totalRevenue,
        statusCounts: formattedCounts,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserOrders,
  getOrderById,
  cancelMyOrder,
  getAllOrdersAdmin,
  updateOrderStatusAdmin,
  getAdminOrderStats,
};
