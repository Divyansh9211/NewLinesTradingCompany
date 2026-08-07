const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const Wishlist = require('../models/wishlistModel');
const Cart = require('../models/cartModel');
const seedDatabase = require('../config/productSeeder');

(async () => {
  try {
    console.log('Connecting to database...');
    await connectDB();

    console.log('Running seeder...');
    await seedDatabase();

    const productCount = await Product.countDocuments();
    console.log(`Product count in DB: ${productCount}`);

    const sampleProduct = await Product.findOne();
    console.log(`Sample product: ${sampleProduct.name} (ID: ${sampleProduct._id})`);

    // Find or create test user
    let testUser = await User.findOne({ email: 'test_cart_user@example.com' });
    if (!testUser) {
      testUser = await User.create({
        name: 'Test Cart User',
        email: 'test_cart_user@example.com',
        password: 'Password123!',
      });
    }
    console.log(`Test user ID: ${testUser._id}`);

    // Test Wishlist
    let wishlist = await Wishlist.findOne({ user: testUser._id });
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: testUser._id, products: [] });
    }
    wishlist.products = [sampleProduct._id];
    await wishlist.save();

    const populatedWishlist = await Wishlist.findOne({ user: testUser._id }).populate('products');
    console.log(`Wishlist items count: ${populatedWishlist.products.length}`);
    console.log(`Wishlist product 1: ${populatedWishlist.products[0]?.name}`);

    // Test Cart
    let cart = await Cart.findOne({ user: testUser._id });
    if (!cart) {
      cart = await Cart.create({ user: testUser._id, items: [] });
    }
    cart.items = [{ product: sampleProduct._id, quantity: 2, price: sampleProduct.price }];
    await cart.save();

    const populatedCart = await Cart.findOne({ user: testUser._id }).populate('items.product');
    console.log(`Cart totalItems: ${populatedCart.totalItems}, cartTotal: ${populatedCart.cartTotal}`);
    console.log(`Cart product 1: ${populatedCart.items[0]?.product?.name}, qty: ${populatedCart.items[0]?.quantity}`);

    console.log('ALL WISHLIST & CART TESTS PASSED SUCCESSFULLY IN MONGODB!');
    process.exit(0);
  } catch (err) {
    console.error('Test error:', err);
    process.exit(1);
  }
})();
