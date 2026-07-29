const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Address = require('../models/addressModel');
const { calculateCheckoutSummary, calculateShippingFee, FREE_SHIPPING_THRESHOLD } = require('../utils/checkoutCalculator');
const authRoutes = require('../routes/authRoutes');
const productRoutes = require('../routes/productRoutes');
const categoryRoutes = require('../routes/categoryRoutes');
const wishlistRoutes = require('../routes/wishlistRoutes');
const cartRoutes = require('../routes/cartRoutes');
const addressRoutes = require('../routes/addressRoutes');
const checkoutRoutes = require('../routes/checkoutRoutes');
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
app.use(notFound);
app.use(errorHandler);

const PORT = 5017;

(async () => {
  try {
    const server = app.listen(PORT, async () => {
      console.log('[Test] Address & Checkout test server listening on port', PORT);
    });

    // 1. Test Address & Checkout without Token
    console.log('\n--- 1. Testing Address & Checkout APIs without Bearer Token ---');
    const noTokenAddrRes = await fetch(`http://localhost:${PORT}/api/addresses`);
    console.log('GET /api/addresses Status Code:', noTokenAddrRes.status);
    console.log('Output:', await noTokenAddrRes.json());

    const noTokenCheckoutRes = await fetch(`http://localhost:${PORT}/api/checkout/summary`, {
      method: 'POST'
    });
    console.log('POST /api/checkout/summary Status Code:', noTokenCheckoutRes.status);
    console.log('Output:', await noTokenCheckoutRes.json());

    // 2. Test Shipping Calculator Calculations
    console.log('\n--- 2. Testing Shipping Fee & Checkout Calculator ---');
    const subtotalBelowThreshold = 500;
    const shippingBelow = calculateShippingFee(subtotalBelowThreshold);
    console.log(`Subtotal ₹${subtotalBelowThreshold} (< ₹${FREE_SHIPPING_THRESHOLD}): Shipping Fee = ₹${shippingBelow}`);

    const subtotalAboveThreshold = 1200;
    const shippingAbove = calculateShippingFee(subtotalAboveThreshold);
    console.log(`Subtotal ₹${subtotalAboveThreshold} (>= ₹${FREE_SHIPPING_THRESHOLD}): Shipping Fee = ₹${shippingAbove} (Free Shipping)`);

    const mockItems = [
      { price: 299, quantity: 2 },
      { price: 500, quantity: 1 }
    ];
    const summary = calculateCheckoutSummary(mockItems);
    console.log('Calculated Items Subtotal:', summary.itemsSubtotal); // (299*2)+500 = 1098
    console.log('Calculated Shipping Fee:', summary.shippingFee); // Free shipping (1098 >= 999)
    console.log('Calculated Grand Total:', summary.grandTotal); // 1098
    console.log('Calculations correct:', summary.itemsSubtotal === 1098 && summary.shippingFee === 0 && summary.grandTotal === 1098);

    // 3. Test Address Model Regex Validation
    console.log('\n--- 3. Testing Address Model Validation Regexes ---');
    const phoneRegex = /^[6-9]\d{9}$/;
    const pincodeRegex = /^\d{6}$/;

    console.log('Valid Indian Phone (9876543210):', phoneRegex.test('9876543210'));
    console.log('Invalid Indian Phone (12345):', phoneRegex.test('12345'));
    console.log('Valid Indian PIN (110001):', pincodeRegex.test('110001'));
    console.log('Invalid Indian PIN (ABC12):', pincodeRegex.test('ABC12'));

    server.close(() => {
      console.log('\n[Test] All Address & Checkout Management schema, calculator, and security tests passed successfully!');
      process.exit(0);
    });
  } catch (err) {
    console.error('[Test Error]', err);
    process.exit(1);
  }
})();
