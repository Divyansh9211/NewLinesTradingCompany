const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

(async () => {
  try {
    console.log('Connecting to URI...');
    await mongoose.connect(process.env.MONGODB_URI);
    const count = await Product.countDocuments();
    const catCount = await Category.countDocuments();
    console.log(`Product count in MongoDB: ${count}`);
    console.log(`Category count in MongoDB: ${catCount}`);
    if (count > 0) {
      const sample = await Product.find().limit(3).lean();
      console.log('Sample products:', JSON.stringify(sample, null, 2));
    }
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error checking DB products:', err);
    process.exit(1);
  }
})();
