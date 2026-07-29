const Razorpay = require('razorpay');
const crypto = require('crypto');

const key_id = process.env.RAZORPAY_KEY_ID || 'rzp_test_demoKeyId123';
const key_secret = process.env.RAZORPAY_KEY_SECRET || 'rzp_test_demoSecret123';

/**
 * Initialize Razorpay SDK Instance
 */
const razorpayInstance = new Razorpay({
  key_id,
  key_secret,
});

/**
 * Verifies Razorpay HMAC SHA256 Signature
 * @param {string} razorpayOrderId
 * @param {string} razorpayPaymentId
 * @param {string} razorpaySignature
 * @returns {boolean}
 */
const verifyRazorpaySignature = (razorpayOrderId, razorpayPaymentId, razorpaySignature) => {
  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return false;
  }

  const generatedSignature = crypto
    .createHmac('sha256', key_secret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest('hex');

  return generatedSignature === razorpaySignature;
};

module.exports = {
  razorpayInstance,
  verifyRazorpaySignature,
  RAZORPAY_KEY_ID: key_id,
};
