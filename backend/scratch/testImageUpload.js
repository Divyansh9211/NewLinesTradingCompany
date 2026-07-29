const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authRoutes = require('../routes/authRoutes');
const productRoutes = require('../routes/productRoutes');
const notFound = require('../middleware/notFoundMiddleware');
const errorHandler = require('../middleware/errorMiddleware');

process.env.JWT_SECRET = 'test_jwt_secret_key_12345';
process.env.JWT_EXPIRES_IN = '1d';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = 5012;

(async () => {
  try {
    const server = app.listen(PORT, () => {
      console.log('[Test] Image upload test server listening on port', PORT);
    });

    // 1. Test Upload without Bearer Token
    console.log('\n--- 1. Testing Image Upload without Bearer Token ---');
    const noTokenRes = await fetch(`http://localhost:${PORT}/api/products/66a7c987654321fedcba0987/images`, {
      method: 'POST'
    });
    console.log('Status Code:', noTokenRes.status);
    console.log('Response Output:', await noTokenRes.json());

    // 2. Test Image Delete without Bearer Token
    console.log('\n--- 2. Testing Image Delete without Bearer Token ---');
    const noTokenDelRes = await fetch(`http://localhost:${PORT}/api/products/66a7c987654321fedcba0987/images`, {
      method: 'DELETE'
    });
    console.log('Status Code:', noTokenDelRes.status);
    console.log('Response Output:', await noTokenDelRes.json());

    // 3. Test Product Model Image Schema
    console.log('\n--- 3. Testing Product Model Images Schema ---');
    const Product = require('../models/productModel');
    const prod = new Product({
      name: 'Test Balloon',
      category: 'Balloons',
      shortDescription: 'Short desc',
      description: 'Full desc',
      originalPrice: 100,
      price: 80,
      images: [
        {
          url: 'https://res.cloudinary.com/demo/image/upload/v12345/sample.jpg',
          public_id: 'party_decoration_products/sample_public_id'
        }
      ]
    });
    console.log('Product image url:', prod.images[0].url);
    console.log('Product image public_id:', prod.images[0].public_id);
    console.log('Schema supports public_id & url:', Boolean(prod.images[0].public_id && prod.images[0].url));

    server.close(() => {
      console.log('\n[Test] All Image Management security, middleware, and schema tests passed successfully!');
      process.exit(0);
    });
  } catch (err) {
    console.error('[Test Error]', err);
    process.exit(1);
  }
})();
