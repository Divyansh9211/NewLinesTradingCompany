require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const swaggerUi = require('swagger-ui-express');

const validateEnv = require('./config/envCheck');
const logger = require('./config/logger');
const connectDB = require('./config/db');
const swaggerSpec = require('./config/swagger');
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
const adminRoutes = require('./routes/adminRoutes');
const couponRoutes = require('./routes/couponRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Startup Environment Variables Checklist Validation
validateEnv();

// Initialize Express Application
const app = express();

// Set Trust Proxy for Rate Limiting behind proxies (e.g. Render, Railway, Nginx)
app.set('trust proxy', 1);

// Production Security Headers via Helmet
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// Prevent NoSQL Query Injection attacks
app.use(mongoSanitize());

// Core Middleware Configuration
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Rate Limiting Configuration
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again after 15 minutes.',
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again after 15 minutes.',
  },
});

// Apply General Rate Limiter to all /api/ routes
app.use('/api', generalLimiter);

// Request Logging Middleware
if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Serve Static Directories
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve Interactive Swagger / OpenAPI Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health Check & Root Status Endpoints
app.get(['/', '/health'], (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Party Decoration Backend API is running successfully',
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    documentation: `http://localhost:${process.env.PORT || 5000}/api-docs`,
    timestamp: new Date().toISOString(),
  });
});

// Authentication API Routes (with auth rate limiter)
app.use('/api/auth', authLimiter, authRoutes);

// Core E-Commerce API Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/reviews', reviewRoutes);

// 404 Handler for Undefined Routes
app.use(notFound);

// Centralized Global Error Handler
app.use(errorHandler);

// Define Server Port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas first, then start Express HTTP Server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Express server running on port ${PORT}`);
      logger.info(`[Server] Express server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to start server due to database connection error: ${error.message}`);
    process.exit(1);
  }
};

startServer();

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
  logger.error(`[Unhandled Rejection] Error: ${err.message}`, { stack: err.stack });
  process.exit(1);
});

module.exports = app;
