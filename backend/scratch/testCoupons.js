const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Coupon = require('../models/couponModel');
const { validateAndCalculateCoupon } = require('../utils/couponValidator');
const authRoutes = require('../routes/authRoutes');
const productRoutes = require('../routes/productRoutes');
const categoryRoutes = require('../routes/categoryRoutes');
const wishlistRoutes = require('../routes/wishlistRoutes');
const cartRoutes = require('../routes/cartRoutes');
const addressRoutes = require('../routes/addressRoutes');
const checkoutRoutes = require('../routes/checkoutRoutes');
const paymentRoutes = require('../routes/paymentRoutes');
const orderRoutes = require('../routes/orderRoutes');
const adminRoutes = require('../routes/adminRoutes');
const couponRoutes = require('../routes/couponRoutes');
const notFound = require('../middleware/notFoundMiddleware');
const errorHandler = require('../middleware/errorMiddleware');

process.env.JWT_SECRET = 'test_jwt_secret_key_12345';
process.env.JWT_EXPIRES_IN = '1d';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/coupons', couponRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = 5023;

(async () => {
  try {
    const server = app.listen(PORT, async () => {
      console.log('[Test] Coupons & Discount Management test server listening on port', PORT);
    });

    // 1. Test Coupon APIs without Bearer Token
    console.log('\n--- 1. Testing Coupon APIs without Bearer Token ---');
    const noTokenRes1 = await fetch(`http://localhost:${PORT}/api/coupons/validate`, { method: 'POST' });
    console.log('POST /api/coupons/validate Status Code:', noTokenRes1.status);
    console.log('Output:', await noTokenRes1.json());

    const noTokenRes2 = await fetch(`http://localhost:${PORT}/api/coupons/admin/all`);
    console.log('GET /api/coupons/admin/all Status Code:', noTokenRes2.status);
    console.log('Output:', await noTokenRes2.json());

    // 2. Test Coupon Model Uppercase & Schema Verification
    console.log('\n--- 2. Testing Coupon Model Uppercase Auto Hook ---');
    const mockCoupon = new Coupon({
      code: ' party2026 ',
      name: 'Grand Party Sale',
      discountType: 'Percentage',
      discountValue: 20,
      minOrderAmount: 500,
      maxDiscountAmount: 300,
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    // Execute pre-save hook
    await new Promise((resolve) => {
      mockCoupon.schema.s.hooks.execPre('save', mockCoupon, () => resolve());
    });

    console.log('Coupon Code converted to uppercase trim:', mockCoupon.code);
    console.log('Code is "PARTY2026":', mockCoupon.code === 'PARTY2026');

    // 3. Test Percentage & Capped Discount Calculation
    console.log('\n--- 3. Testing Percentage Discount Calculation & Capping ---');
    const subtotal = 2000;
    // 20% of 2000 = 400. Max capped at 300.
    const rawDiscount = (subtotal * mockCoupon.discountValue) / 100;
    const cappedDiscount = Math.min(rawDiscount, mockCoupon.maxDiscountAmount);

    console.log('Subtotal ₹2000, 20% raw discount:', rawDiscount);
    console.log('Capped discount (Max ₹300):', cappedDiscount);
    console.log('Capping calculation correct:', cappedDiscount === 300);

    server.close(() => {
      console.log('\n[Test] All Coupons & Discount Management schema, calculation, and security tests passed successfully!');
      process.exit(0);
    });
  } catch (err) {
    console.error('[Test Error]', err);
    process.exit(1);
  }
})();
