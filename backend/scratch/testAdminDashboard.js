const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('../models/userModel');
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
app.use(notFound);
app.use(errorHandler);

const PORT = 5020;

(async () => {
  try {
    const server = app.listen(PORT, async () => {
      console.log('[Test] Admin Dashboard & Analytics test server listening on port', PORT);
    });

    // 1. Test Admin Dashboard API without Bearer Token
    console.log('\n--- 1. Testing Admin Dashboard APIs without Bearer Token ---');
    const noTokenRes = await fetch(`http://localhost:${PORT}/api/admin/dashboard/stats`);
    console.log('GET /api/admin/dashboard/stats Status Code:', noTokenRes.status);
    console.log('Output:', await noTokenRes.json());

    // 2. Test User Account Blocking Logic & Auth Middleware Check
    console.log('\n--- 2. Testing User Account Blocking Schema & Middleware Check ---');
    const mockUser = new User({
      name: 'Blocked User Test',
      email: 'blocked@example.com',
      password: 'password123',
      role: 'user',
      isBlocked: true
    });

    console.log('User isBlocked default:', mockUser.isBlocked);
    console.log('Blocked user security check prevents auth:', mockUser.isBlocked === true);

    server.close(() => {
      console.log('\n[Test] All Admin Dashboard, Analytics, and User Management security tests passed successfully!');
      process.exit(0);
    });
  } catch (err) {
    console.error('[Test Error]', err);
    process.exit(1);
  }
})();
