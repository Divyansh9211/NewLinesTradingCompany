const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

const connectDB = require('./config/db');
const notFound = require('./middleware/notFoundMiddleware');
const errorHandler = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const cartRoutes = require('./routes/cartRoutes');
const addressRoutes = require('./routes/addressRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Load Environment Variables
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

// Initialize Express Application
const app = express();

// Core Middleware Configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logging Middleware
if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Serve Static Directories
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health Check Endpoint (GET /)
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Party Decoration Backend API is running successfully',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// Authentication API Routes
app.use('/api/auth', authRoutes);

// Product Management API Routes
app.use('/api/products', productRoutes);

// Category Management API Routes
app.use('/api/categories', categoryRoutes);

// Wishlist Management API Routes
app.use('/api/wishlist', wishlistRoutes);

// Shopping Cart Management API Routes
app.use('/api/cart', cartRoutes);

// Address Management API Routes
app.use('/api/addresses', addressRoutes);

// Checkout API Routes
app.use('/api/checkout', checkoutRoutes);

// Payment API Routes
app.use('/api/payment', paymentRoutes);

// Order Management API Routes
app.use('/api/orders', orderRoutes);

// 404 Handler for Undefined Routes
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

// Define Server Port
const PORT = process.env.PORT || 5000;

// Start Server
const server = app.listen(PORT, () => {
  console.log(`[Server] Server is running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
});

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
  console.error(`[Unhandled Rejection] Error: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = app;
