const Coupon = require('../models/couponModel');
const mongoose = require('mongoose');
const { validateAndCalculateCoupon } = require('../utils/couponValidator');

/**
 * @desc    Validate a promotional coupon code and calculate discount preview for checkout
 * @route   POST /api/coupons/validate
 * @access  Private (Authenticated User)
 */
const validateCoupon = async (req, res, next) => {
  try {
    const { couponCode, subtotal } = req.body;

    if (!couponCode || typeof couponCode !== 'string' || !couponCode.trim()) {
      res.status(400);
      return next(new Error('Please provide a valid coupon code'));
    }

    const numericSubtotal = parseFloat(subtotal);
    if (isNaN(numericSubtotal) || numericSubtotal < 0) {
      res.status(400);
      return next(new Error('Please provide a valid subtotal amount'));
    }

    const { coupon, discountAmount } = await validateAndCalculateCoupon(
      couponCode,
      numericSubtotal,
      req.user._id
    );

    return res.status(200).json({
      success: true,
      message: `Coupon '${coupon.code}' applied successfully`,
      data: {
        couponCode: coupon.code,
        couponName: coupon.name,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        minOrderAmount: coupon.minOrderAmount,
        maxDiscountAmount: coupon.maxDiscountAmount,
        discountAmount,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new promotional coupon
 * @route   POST /api/coupons/admin
 * @access  Private (Admin Only)
 */
const createCoupon = async (req, res, next) => {
  try {
    const {
      code,
      name,
      description,
      discountType,
      discountValue,
      minOrderAmount,
      maxDiscountAmount,
      startDate,
      expiryDate,
      usageLimit,
      usageLimitPerUser,
      isActive,
    } = req.body;

    if (!code || !name || discountValue === undefined || !expiryDate) {
      res.status(400);
      return next(
        new Error('Please provide all required coupon fields: code, name, discountValue, expiryDate')
      );
    }

    const cleanCode = code.toUpperCase().trim();

    // Enforce unique coupon code
    const existingCoupon = await Coupon.findOne({ code: cleanCode });
    if (existingCoupon) {
      res.status(400);
      return next(new Error(`Coupon with code '${cleanCode}' already exists`));
    }

    const start = startDate ? new Date(startDate) : new Date();
    const expiry = new Date(expiryDate);

    if (isNaN(expiry.getTime())) {
      res.status(400);
      return next(new Error('Please provide a valid expiry date'));
    }

    if (expiry <= start) {
      res.status(400);
      return next(new Error('Expiry date must be after the start date'));
    }

    const coupon = await Coupon.create({
      code: cleanCode,
      name: name.trim(),
      description: description ? description.trim() : '',
      discountType: discountType && ['Percentage', 'Fixed'].includes(discountType) ? discountType : 'Percentage',
      discountValue: Number(discountValue),
      minOrderAmount: minOrderAmount !== undefined ? Number(minOrderAmount) : 0,
      maxDiscountAmount: maxDiscountAmount !== undefined && maxDiscountAmount !== null ? Number(maxDiscountAmount) : null,
      startDate: start,
      expiryDate: expiry,
      usageLimit: usageLimit !== undefined && usageLimit !== null ? Number(usageLimit) : null,
      usageLimitPerUser: usageLimitPerUser !== undefined ? Number(usageLimitPerUser) : 1,
      isActive: isActive !== undefined ? Boolean(isActive) : true,
    });

    return res.status(201).json({
      success: true,
      message: 'Promotional coupon created successfully',
      data: coupon,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch all coupons for Admin (with search, status filter, and pagination)
 * @route   GET /api/coupons/admin/all
 * @access  Private (Admin Only)
 */
const getAllCouponsAdmin = async (req, res, next) => {
  try {
    const { search, isActive, page = 1, limit = 10 } = req.query;

    const queryFilter = {};

    if (isActive !== undefined) {
      queryFilter.isActive = isActive === 'true';
    }

    if (search) {
      const searchRegex = new RegExp(search.trim(), 'i');
      queryFilter.$or = [{ code: searchRegex }, { name: searchRegex }];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (pageNum - 1) * limitNum;

    const totalCoupons = await Coupon.countDocuments(queryFilter);
    const coupons = await Coupon.find(queryFilter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    return res.status(200).json({
      success: true,
      count: coupons.length,
      totalCoupons,
      totalPages: Math.ceil(totalCoupons / limitNum),
      currentPage: pageNum,
      data: coupons,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch a single coupon by ID or Code
 * @route   GET /api/coupons/admin/:id
 * @access  Private (Admin Only)
 */
const getCouponByIdAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;

    const filter = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { code: id.toUpperCase().trim() };

    const coupon = await Coupon.findOne(filter);

    if (!coupon) {
      res.status(404);
      return next(new Error('Coupon not found'));
    }

    return res.status(200).json({
      success: true,
      data: coupon,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an existing promotional coupon
 * @route   PUT /api/coupons/admin/:id
 * @access  Private (Admin Only)
 */
const updateCoupon = async (req, res, next) => {
  try {
    const { id } = req.params;

    const filter = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { code: id.toUpperCase().trim() };

    const coupon = await Coupon.findOne(filter);

    if (!coupon) {
      res.status(404);
      return next(new Error('Coupon not found'));
    }

    const {
      code,
      name,
      description,
      discountType,
      discountValue,
      minOrderAmount,
      maxDiscountAmount,
      startDate,
      expiryDate,
      usageLimit,
      usageLimitPerUser,
      isActive,
    } = req.body;

    if (code) {
      const cleanCode = code.toUpperCase().trim();
      if (cleanCode !== coupon.code) {
        const existing = await Coupon.findOne({ code: cleanCode });
        if (existing) {
          res.status(400);
          return next(new Error(`Coupon code '${cleanCode}' is already in use by another coupon`));
        }
        coupon.code = cleanCode;
      }
    }

    if (name !== undefined) coupon.name = name.trim();
    if (description !== undefined) coupon.description = description.trim();
    if (discountType !== undefined && ['Percentage', 'Fixed'].includes(discountType)) {
      coupon.discountType = discountType;
    }
    if (discountValue !== undefined) coupon.discountValue = Number(discountValue);
    if (minOrderAmount !== undefined) coupon.minOrderAmount = Number(minOrderAmount);
    if (maxDiscountAmount !== undefined) coupon.maxDiscountAmount = maxDiscountAmount ? Number(maxDiscountAmount) : null;
    if (startDate !== undefined) coupon.startDate = new Date(startDate);
    if (expiryDate !== undefined) coupon.expiryDate = new Date(expiryDate);
    if (usageLimit !== undefined) coupon.usageLimit = usageLimit ? Number(usageLimit) : null;
    if (usageLimitPerUser !== undefined) coupon.usageLimitPerUser = Number(usageLimitPerUser);
    if (isActive !== undefined) coupon.isActive = Boolean(isActive);

    const updatedCoupon = await coupon.save();

    return res.status(200).json({
      success: true,
      message: 'Coupon updated successfully',
      data: updatedCoupon,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Toggle active status of a coupon
 * @route   PUT /api/coupons/admin/:id/status
 * @access  Private (Admin Only)
 */
const toggleCouponStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const filter = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { code: id.toUpperCase().trim() };

    const coupon = await Coupon.findOne(filter);

    if (!coupon) {
      res.status(404);
      return next(new Error('Coupon not found'));
    }

    const newStatus = req.body.isActive !== undefined ? Boolean(req.body.isActive) : !coupon.isActive;
    coupon.isActive = newStatus;
    await coupon.save();

    return res.status(200).json({
      success: true,
      message: `Coupon '${coupon.code}' has been ${newStatus ? 'activated' : 'deactivated'} successfully`,
      data: coupon,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a coupon from database
 * @route   DELETE /api/coupons/admin/:id
 * @access  Private (Admin Only)
 */
const deleteCoupon = async (req, res, next) => {
  try {
    const { id } = req.params;

    const filter = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { code: id.toUpperCase().trim() };

    const coupon = await Coupon.findOne(filter);

    if (!coupon) {
      res.status(404);
      return next(new Error('Coupon not found'));
    }

    await coupon.deleteOne();

    return res.status(200).json({
      success: true,
      message: `Coupon '${coupon.code}' deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateCoupon,
  createCoupon,
  getAllCouponsAdmin,
  getCouponByIdAdmin,
  updateCoupon,
  toggleCouponStatus,
  deleteCoupon,
};
