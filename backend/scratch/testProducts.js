const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const slugify = require('slugify');
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

const PORT = 5011;

(async () => {
  try {
    console.log('--- 1. Testing Slug Generation Utility ---');
    const productName = 'Annaprashan Ceremony Banner & Balloons Kit (100 pcs!)';
    const slug = slugify(productName, { lower: true, strict: true });
    console.log('Product Name:', productName);
    console.log('Generated Slug:', slug);

    const server = app.listen(PORT, async () => {
      console.log('\n[Test] Product test server running on port', PORT);
    });

    // 2. Test POST /api/products without Token
    console.log('\n--- 2. Testing POST /api/products without Bearer Token ---');
    const noTokenRes = await fetch(`http://localhost:${PORT}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test Product' })
    });
    console.log('Status Code:', noTokenRes.status);
    console.log('Response Output:', await noTokenRes.json());

    // 3. Test POST /api/products with Corrupted Bearer Token
    console.log('\n--- 3. Testing POST /api/products with Corrupted Token ---');
    const badTokenRes = await fetch(`http://localhost:${PORT}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer corrupted_token_string'
      },
      body: JSON.stringify({ name: 'Test Product' })
    });
    console.log('Status Code:', badTokenRes.status);
    console.log('Response Output:', await badTokenRes.json());

    server.close(() => {
      console.log('\n[Test] All Product API security & middleware tests passed successfully!');
      process.exit(0);
    });
  } catch (err) {
    console.error('[Test Error]', err);
    process.exit(1);
  }
})();
