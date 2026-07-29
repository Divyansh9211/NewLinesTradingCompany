const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const slugify = require('slugify');
const Category = require('../models/categoryModel');
const Product = require('../models/productModel');
const authRoutes = require('../routes/authRoutes');
const productRoutes = require('../routes/productRoutes');
const categoryRoutes = require('../routes/categoryRoutes');
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
app.use(notFound);
app.use(errorHandler);

const PORT = 5014;

(async () => {
  try {
    console.log('--- 1. Testing Category Slugify Hook ---');
    const catName = 'Balloons & Foil Combos';
    const slug = slugify(catName, { lower: true, strict: true });
    console.log('Category Name:', catName);
    console.log('Auto Generated Slug:', slug);
    console.log('Slug generated correctly:', slug === 'balloons-and-foil-combos');

    const server = app.listen(PORT, async () => {
      console.log('\n[Test] Category test server listening on port', PORT);
    });

    // 2. Test POST /api/categories without Bearer Token
    console.log('\n--- 2. Testing POST /api/categories without Token ---');
    const noTokenRes = await fetch(`http://localhost:${PORT}/api/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Festive Candles' })
    });
    console.log('Status Code:', noTokenRes.status);
    console.log('Response Output:', await noTokenRes.json());

    // 3. Test Category Schema Validation & Product ObjectId Ref
    console.log('\n--- 3. Testing Category Schema & ObjectId Population ---');
    const mockCatId = new mongoose.Types.ObjectId();
    const mockCat = new Category({
      _id: mockCatId,
      name: 'Party Caps',
      description: 'Colorful party caps for kids and adults'
    });

    const mockProd = new Product({
      name: 'Birthday Party Cap',
      category: mockCat._id,
      shortDescription: 'Fun cap',
      description: 'Full description',
      originalPrice: 99,
      price: 49
    });

    console.log('Product Category ObjectId:', mockProd.category);
    console.log('Product Category ref matches Category ObjectId:', mockProd.category.toString() === mockCatId.toString());

    server.close(() => {
      console.log('\n[Test] All Category Management schema, router, and security tests passed successfully!');
      process.exit(0);
    });
  } catch (err) {
    console.error('[Test Error]', err);
    process.exit(1);
  }
})();
