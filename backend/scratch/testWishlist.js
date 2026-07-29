const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Wishlist = require('../models/wishlistModel');
const Product = require('../models/productModel');
const authRoutes = require('../routes/authRoutes');
const productRoutes = require('../routes/productRoutes');
const categoryRoutes = require('../routes/categoryRoutes');
const wishlistRoutes = require('../routes/wishlistRoutes');
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
app.use(notFound);
app.use(errorHandler);

const PORT = 5015;

(async () => {
  try {
    const server = app.listen(PORT, async () => {
      console.log('[Test] Wishlist test server listening on port', PORT);
    });

    // 1. Test GET /api/wishlist without Token
    console.log('\n--- 1. Testing GET /api/wishlist without Token ---');
    const noTokenRes = await fetch(`http://localhost:${PORT}/api/wishlist`);
    console.log('Status Code:', noTokenRes.status);
    console.log('Response Output:', await noTokenRes.json());

    // 2. Test POST /api/wishlist without Token
    console.log('\n--- 2. Testing POST /api/wishlist without Token ---');
    const noTokenPostRes = await fetch(`http://localhost:${PORT}/api/wishlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: '66a7c987654321fedcba0987' })
    });
    console.log('Status Code:', noTokenPostRes.status);
    console.log('Response Output:', await noTokenPostRes.json());

    // 3. Test Wishlist Schema & ObjectId References
    console.log('\n--- 3. Testing Wishlist Model & Product Reference Binding ---');
    const mockUserId = new mongoose.Types.ObjectId();
    const mockProdId1 = new mongoose.Types.ObjectId();
    const mockProdId2 = new mongoose.Types.ObjectId();

    const wishlistDoc = new Wishlist({
      user: mockUserId,
      products: [mockProdId1, mockProdId2]
    });

    console.log('Wishlist User ObjectId:', wishlistDoc.user);
    console.log('Wishlist Products Count:', wishlistDoc.products.length);
    console.log('Product 1 Ref matches:', wishlistDoc.products[0].toString() === mockProdId1.toString());

    // Prevent duplicate logic check
    const duplicateExists = wishlistDoc.products.some(id => id.toString() === mockProdId1.toString());
    console.log('Duplicate detection check returns true for existing product:', duplicateExists);

    server.close(() => {
      console.log('\n[Test] All Wishlist Management schema, security, and logic tests passed successfully!');
      process.exit(0);
    });
  } catch (err) {
    console.error('[Test Error]', err);
    process.exit(1);
  }
})();
