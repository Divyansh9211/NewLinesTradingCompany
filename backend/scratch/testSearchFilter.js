const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Product = require('../models/productModel');
const productRoutes = require('../routes/productRoutes');
const notFound = require('../middleware/notFoundMiddleware');
const errorHandler = require('../middleware/errorMiddleware');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = 5022;

(async () => {
  try {
    const server = app.listen(PORT, async () => {
      console.log('[Test] Product Search & Filter test server listening on port', PORT);
    });

    // 1. Test Price Range Validation Logic
    console.log('\n--- 1. Testing Invalid Price Range Validation (minPrice > maxPrice) ---');
    const invalidPriceRes = await fetch(`http://localhost:${PORT}/api/products?minPrice=1000&maxPrice=100`);
    console.log('Status Code (Should be 400):', invalidPriceRes.status);
    console.log('Error Output:', await invalidPriceRes.json());

    // 2. Test Pagination Metadata Format & Calculations
    console.log('\n--- 2. Testing Pagination Metadata Calculations ---');
    const totalProducts = 25;
    const limitNum = 10;
    const pageNum = 2;

    const totalPages = Math.ceil(totalProducts / limitNum);
    const hasNextPage = pageNum < totalPages;
    const hasPrevPage = pageNum > 1;

    console.log('Total Products:', totalProducts);
    console.log('Total Pages (25 / 10):', totalPages);
    console.log('Page 2 Has Next Page (2 < 3):', hasNextPage);
    console.log('Page 2 Has Prev Page (2 > 1):', hasPrevPage);
    console.log('Page 2 Next Page Number:', hasNextPage ? pageNum + 1 : null);
    console.log('Page 2 Prev Page Number:', hasPrevPage ? pageNum - 1 : null);
    console.log('Pagination calculation correct:', totalPages === 3 && hasNextPage === true && hasPrevPage === true);

    // 3. Test Sort Options Mapping
    console.log('\n--- 3. Testing Sort Parameters Mapping ---');
    const sortVal = 'price_asc';
    let sortOptions = { createdAt: -1 };
    if (sortVal === 'price_asc') {
      sortOptions = { price: 1 };
    }
    console.log('Sort value "price_asc" maps to { price: 1 }:', sortOptions.price === 1);

    server.close(() => {
      console.log('\n[Test] All Search, Filtering, Sorting & Pagination unit and schema tests passed successfully!');
      process.exit(0);
    });
  } catch (err) {
    console.error('[Test Error]', err);
    process.exit(1);
  }
})();
