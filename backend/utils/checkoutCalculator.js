/**
 * Configurable Checkout Calculation Utility
 */
const FREE_SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING_FEE = 50;
const TAX_RATE = 0; // 0% tax default (can be updated to 0.18 for 18% GST if needed)

/**
 * Calculates shipping fee based on configurable order threshold
 * @param {number} itemsSubtotal
 * @returns {number}
 */
const calculateShippingFee = (itemsSubtotal) => {
  if (itemsSubtotal >= FREE_SHIPPING_THRESHOLD) {
    return 0;
  }
  return STANDARD_SHIPPING_FEE;
};

/**
 * Calculates complete order summary financials
 * @param {Array} items - List of validated order items containing price and quantity
 * @returns {object} Summary object with itemized calculations
 */
const calculateCheckoutSummary = (items) => {
  let itemsSubtotal = 0;
  let totalQuantity = 0;

  const itemizedList = items.map((item) => {
    const unitPrice = item.price || (item.product ? item.product.price : 0);
    const qty = item.quantity || 1;
    const itemSubtotal = Number((unitPrice * qty).toFixed(2));

    itemsSubtotal += itemSubtotal;
    totalQuantity += qty;

    return {
      product: item.product,
      quantity: qty,
      unitPrice,
      itemSubtotal,
    };
  });

  itemsSubtotal = Number(itemsSubtotal.toFixed(2));
  const shippingFee = calculateShippingFee(itemsSubtotal);
  const tax = Number((itemsSubtotal * TAX_RATE).toFixed(2));
  const discount = 0; // Placeholder for future promo coupon system
  const grandTotal = Number((itemsSubtotal + shippingFee + tax - discount).toFixed(2));

  return {
    itemizedList,
    totalQuantity,
    itemsSubtotal,
    shippingFee,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    isFreeShippingEligible: itemsSubtotal >= FREE_SHIPPING_THRESHOLD,
    tax,
    discount,
    grandTotal,
  };
};

module.exports = {
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_FEE,
  TAX_RATE,
  calculateShippingFee,
  calculateCheckoutSummary,
};
