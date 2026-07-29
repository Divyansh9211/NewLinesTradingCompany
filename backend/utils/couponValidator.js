const Coupon = require('../models/couponModel');

/**
 * Validates a coupon code against business rules, dates, subtotals, and user limits,
 * and calculates the applicable discount amount.
 *
 * @param {string} couponCode
 * @param {number} itemsSubtotal
 * @param {string|ObjectId} userId
 * @returns {Promise<{coupon: object, discountAmount: number}>}
 */
const validateAndCalculateCoupon = async (couponCode, itemsSubtotal, userId) => {
  if (!couponCode || typeof couponCode !== 'string' || !couponCode.trim()) {
    return { coupon: null, discountAmount: 0 };
  }

  const cleanCode = couponCode.toUpperCase().trim();
  const coupon = await Coupon.findOne({ code: cleanCode });

  if (!coupon) {
    throw new Error(`Invalid coupon code '${cleanCode}'`);
  }

  if (!coupon.isActive) {
    throw new Error(`Coupon '${coupon.code}' is currently inactive`);
  }

  const now = new Date();

  if (coupon.startDate && now < new Date(coupon.startDate)) {
    throw new Error(`Coupon '${coupon.code}' is not active yet`);
  }

  if (coupon.expiryDate && now > new Date(coupon.expiryDate)) {
    throw new Error(`Coupon '${coupon.code}' has expired`);
  }

  if (itemsSubtotal < coupon.minOrderAmount) {
    throw new Error(
      `Minimum order subtotal of ₹${coupon.minOrderAmount} is required to apply coupon '${coupon.code}'`
    );
  }

  if (coupon.usageLimit !== null && coupon.usedCount >= coupon.usageLimit) {
    throw new Error(`Coupon '${coupon.code}' has reached its global usage limit`);
  }

  if (userId && coupon.usageLimitPerUser !== null) {
    const userRecord = coupon.userUsage.find(
      (item) => item.user.toString() === userId.toString()
    );
    const userCount = userRecord ? userRecord.count : 0;

    if (userCount >= coupon.usageLimitPerUser) {
      throw new Error(
        `You have already used coupon '${coupon.code}' the maximum allowed times (${coupon.usageLimitPerUser})`
      );
    }
  }

  // Calculate discount amount
  let discountAmount = 0;

  if (coupon.discountType === 'Percentage') {
    discountAmount = Number(((itemsSubtotal * coupon.discountValue) / 100).toFixed(2));
    if (coupon.maxDiscountAmount !== null && coupon.maxDiscountAmount > 0) {
      discountAmount = Math.min(discountAmount, coupon.maxDiscountAmount);
    }
  } else if (coupon.discountType === 'Fixed') {
    discountAmount = Math.min(coupon.discountValue, itemsSubtotal);
  }

  discountAmount = Number(discountAmount.toFixed(2));

  return {
    coupon,
    discountAmount,
  };
};

module.exports = {
  validateAndCalculateCoupon,
};
