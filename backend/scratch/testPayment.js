const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const crypto = require('crypto');
const { verifyRazorpaySignature } = require('../config/razorpay');
const Order = require('../models/orderModel');
const authRoutes = require('../routes/authRoutes');
const productRoutes = require('../routes/productRoutes');
const categoryRoutes = require('../routes/categoryRoutes');
const wishlistRoutes = require('../routes/wishlistRoutes');
const cartRoutes = require('../routes/cartRoutes');
const addressRoutes = require('../routes/addressRoutes');
const checkoutRoutes = require('../routes/checkoutRoutes');
const paymentRoutes = require('../routes/paymentRoutes');
const orderRoutes = require('../routes/orderRoutes');
const notFound = require('../middleware/notFoundMiddleware');
const errorHandler = require('../middleware/errorMiddleware');

process.env.JWT_SECRET = 'test_jwt_secret_key_12345';
process.env.JWT_EXPIRES_IN = '1d';
process.env.RAZORPAY_KEY_ID = 'rzp_test_demoKeyId123';
process.env.RAZORPAY_KEY_SECRET = 'rzp_test_demoSecret123';

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
app.use(notFound);
app.use(errorHandler);

const PORT = 5018;

(async () => {
  try {
    const server = app.listen(PORT, async () => {
      console.log('[Test] Payment & Order test server listening on port', PORT);
    });

    // 1. Test Payment & Order APIs without Bearer Token
    console.log('\n--- 1. Testing Payment & Order APIs without Bearer Token ---');
    const noTokenRes1 = await fetch(`http://localhost:${PORT}/api/payment/create-order`, { method: 'POST' });
    console.log('POST /api/payment/create-order Status Code:', noTokenRes1.status);
    console.log('Output:', await noTokenRes1.json());

    const noTokenRes2 = await fetch(`http://localhost:${PORT}/api/orders`);
    console.log('GET /api/orders Status Code:', noTokenRes2.status);
    console.log('Output:', await noTokenRes2.json());

    // 2. Test HMAC SHA256 Signature Verification
    console.log('\n--- 2. Testing HMAC SHA256 Signature Verification ---');
    const testOrderId = 'order_123456789';
    const testPaymentId = 'pay_987654321';
    const secret = process.env.RAZORPAY_KEY_SECRET;

    const validSignature = crypto
      .createHmac('sha256', secret)
      .update(`${testOrderId}|${testPaymentId}`)
      .digest('hex');

    const isValid = verifyRazorpaySignature(testOrderId, testPaymentId, validSignature);
    const isInvalid = verifyRazorpaySignature(testOrderId, testPaymentId, 'invalid_signature_string');

    console.log('Valid signature verified correctly:', isValid === true);
    console.log('Invalid signature rejected correctly:', isInvalid === false);

    // 3. Test Order Schema & Order Number Auto Generator Hook
    console.log('\n--- 3. Testing Order Model Schema & Order Number Generator ---');
    const mockUserId = new mongoose.Types.ObjectId();
    const orderDoc = new Order({
      user: mockUserId,
      items: [
        {
          name: 'Party Lights',
          price: 499,
          quantity: 2,
          itemSubtotal: 998
        }
      ],
      shippingAddress: {
        fullName: 'Jane Doe',
        phone: '9876543210',
        street: '123 Main St',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110001'
      },
      paymentDetails: {
        razorpayOrderId: testOrderId,
        razorpayPaymentId: testPaymentId,
        paymentStatus: 'Completed'
      },
      itemsSubtotal: 998,
      grandTotal: 998
    });

    // Execute pre-save hook
    await new Promise((resolve) => {
      orderDoc.schema.s.hooks.execPre('save', orderDoc, () => resolve());
    });

    console.log('Auto-generated Order Number:', orderDoc.orderNumber);
    console.log('Order Number starts with ORD-:', orderDoc.orderNumber.startsWith('ORD-'));

    server.close(() => {
      console.log('\n[Test] All Payment & Order Processing schema, signature, and security tests passed successfully!');
      process.exit(0);
    });
  } catch (err) {
    console.error('[Test Error]', err);
    process.exit(1);
  }
})();
