const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const Address = require('../models/addressModel');
const mongoose = require('mongoose');
const { calculateCheckoutSummary } = require('../utils/checkoutCalculator');

/**
 * @desc    Generate order checkout summary, validate cart items & inventory, and calculate totals
 * @route   POST /api/checkout/summary or GET /api/checkout/summary
 * @access  Private (Authenticated User)
 */
const getCheckoutSummary = async (req, res, next) => {
  try {
    const addressId = req.body.addressId || req.query.addressId;

    // 1. Fetch user's cart and populate product & category details
    const cart = await Cart.findOne({ user: req.user._id }).populate({
      path: 'items.product',
      select: 'name slug price originalPrice stock isActive images category',
      populate: { path: 'category', select: 'name slug image isActive' },
    });

    if (!cart || !cart.items || cart.items.length === 0) {
      res.status(400);
      return next(new Error('Your shopping cart is empty. Please add items before checking out.'));
    }

    // 2. Comprehensive Inventory & Product Availability Validation
    for (const item of cart.items) {
      const product = item.product;

      if (!product) {
        res.status(400);
        return next(
          new Error('One or more products in your cart no longer exist. Please update your cart.')
        );
      }

      if (!product.isActive) {
        res.status(400);
        return next(
          new Error(
            `Product '${product.name}' is currently inactive and unavailable for checkout. Please remove it from your cart.`
          )
        );
      }

      if (product.stock < item.quantity) {
        res.status(400);
        return next(
          new Error(
            `Insufficient stock for '${product.name}'. Requested ${item.quantity}, but only ${product.stock} left in stock. Please update your cart quantity.`
          )
        );
      }
    }

    // 3. Resolve Delivery Address
    let deliveryAddress;

    if (addressId) {
      if (!mongoose.Types.ObjectId.isValid(addressId)) {
        res.status(400);
        return next(new Error('Invalid Address ID format'));
      }
      deliveryAddress = await Address.findOne({ _id: addressId, user: req.user._id });
      if (!deliveryAddress) {
        res.status(404);
        return next(new Error('Selected delivery address was not found'));
      }
    } else {
      // Find default address or most recent address
      deliveryAddress = await Address.findOne({ user: req.user._id, isDefault: true });
      if (!deliveryAddress) {
        deliveryAddress = await Address.findOne({ user: req.user._id }).sort({ createdAt: -1 });
      }
    }

    if (!deliveryAddress) {
      res.status(400);
      return next(
        new Error(
          'No delivery address found. Please add a shipping address before proceeding to checkout.'
        )
      );
    }

    // 4. Validate and Apply Optional Coupon Code
    const couponCode = req.body.couponCode || req.body.coupon || req.query.couponCode || req.query.coupon;
    let appliedCoupon = null;
    let discountAmount = 0;

    // Calculate preliminary subtotal for coupon validation
    let rawSubtotal = 0;
    cart.items.forEach((item) => {
      const price = item.price || (item.product ? item.product.price : 0);
      rawSubtotal += price * item.quantity;
    });

    if (couponCode && String(couponCode).trim()) {
      const { validateAndCalculateCoupon } = require('../utils/couponValidator');
      const couponResult = await validateAndCalculateCoupon(couponCode, rawSubtotal, req.user._id);
      appliedCoupon = couponResult.coupon;
      discountAmount = couponResult.discountAmount;
    }

    // 5. Centralized Financial Calculations
    const checkoutFinancials = calculateCheckoutSummary(cart.items, discountAmount);

    return res.status(200).json({
      success: true,
      message: 'Checkout summary generated successfully',
      data: {
        deliveryAddress,
        items: cart.items,
        totalItems: checkoutFinancials.totalQuantity,
        itemsSubtotal: checkoutFinancials.itemsSubtotal,
        shippingFee: checkoutFinancials.shippingFee,
        freeShippingThreshold: checkoutFinancials.freeShippingThreshold,
        isFreeShippingEligible: checkoutFinancials.isFreeShippingEligible,
        tax: checkoutFinancials.tax,
        discount: checkoutFinancials.discount,
        couponCode: appliedCoupon ? appliedCoupon.code : null,
        couponName: appliedCoupon ? appliedCoupon.name : null,
        grandTotal: checkoutFinancials.grandTotal,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCheckoutSummary,
};
