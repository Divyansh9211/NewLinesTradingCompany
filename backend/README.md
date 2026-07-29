# Party Decoration E-Commerce Backend - Complete Production Architecture (Phase 1 to 15)

This directory contains the production-ready, enterprise-grade backend for the **Party Decoration E-commerce Website**, built with Node.js, Express.js, MongoDB Atlas, Mongoose, bcryptjs, JWT authentication, Multer, Cloudinary, Razorpay SDK, Nodemailer, Winston, Helmet, Rate Limiter, Mongo Sanitize, and Swagger/OpenAPI.

---

## 📁 Complete Production Directory & File Structure

```
backend/
├── config/
│   ├── db.js                 # MongoDB Atlas connection module
│   ├── cloudinary.js         # Cloudinary configuration & helpers
│   ├── envCheck.js           # Startup environment variables validation module [NEW]
│   ├── logger.js             # Winston logger with error/combined log streams [NEW]
│   ├── mailer.js             # Nodemailer transporter configuration [NEW]
│   ├── razorpay.js           # Razorpay SDK initialization & HMAC signature verifier
│   └── swagger.js            # OpenAPI / Swagger specification configuration [NEW]
├── controllers/
│   ├── addressController.js  # Address Management CRUD
│   ├── adminDashboardController.js # Admin Dashboard KPI Stats & Analytics
│   ├── authController.js     # User Authentication & Welcome Email trigger [UPDATED]
│   ├── cartController.js     # Shopping Cart Management
│   ├── categoryController.js # Category Management CRUD
│   ├── checkoutController.js # Checkout summary generation & inventory validation
│   ├── couponController.js   # Customer Coupon Validation & Admin Coupon CRUD
│   ├── orderController.js    # Customer & Admin Order Management
│   ├── paymentController.js  # Razorpay Order creation, payment verification & Order Confirmation Email [UPDATED]
│   ├── productController.js  # Product Management, Search, Filters & Image Uploads
│   ├── reviewController.js   # Customer & Admin Product Reviews & Ratings
│   └── wishlistController.js # Wishlist Management
├── middleware/
│   ├── authMiddleware.js     # JWT protect (with isBlocked check) & admin authorization
│   ├── errorMiddleware.js    # Global error handler
│   ├── notFoundMiddleware.js # 404 handler
│   └── uploadMiddleware.js   # Multer file validation
├── models/
│   ├── addressModel.js       # Address schema
│   ├── cartModel.js          # Shopping Cart schema
│   ├── categoryModel.js      # Category schema with auto slugify hook
│   ├── couponModel.js        # Coupon schema with usage limits & discount rules
│   ├── orderModel.js         # Order schema with snapshots & statusHistory
│   ├── productModel.js       # Product schema (text index, compound index, rating fields)
│   ├── reviewModel.js        # Review schema (compound unique index for 1 review per product)
│   ├── userModel.js          # User schema
│   └── wishlistModel.js      # Wishlist schema
├── routes/
│   ├── addressRoutes.js      # Address endpoints (/api/addresses)
│   ├── adminRoutes.js        # Admin Dashboard & Business Analytics (/api/admin)
│   ├── authRoutes.js         # Auth endpoints (/api/auth)
│   ├── cartRoutes.js         # Shopping Cart endpoints (/api/cart)
│   ├── categoryRoutes.js     # Category endpoints (/api/categories)
│   ├── checkoutRoutes.js     # Checkout endpoints (/api/checkout)
│   ├── couponRoutes.js       # Coupon endpoints (/api/coupons)
│   ├── orderRoutes.js        # Customer & Admin Order endpoints (/api/orders)
│   ├── paymentRoutes.js      # Payment endpoints (/api/payment)
│   ├── productRoutes.js      # Product endpoints (/api/products & /api/products/search)
│   ├── reviewRoutes.js       # Review & Rating endpoints (/api/reviews)
│   └── wishlistRoutes.js     # Wishlist endpoints (/api/wishlist)
├── utils/
│   ├── checkoutCalculator.js # Configurable shipping fee & checkout totals helper
│   ├── couponValidator.js    # Validation engine for dates, limits, and subtotals
│   ├── emailService.js       # HTML email notification templates & dispatchers [NEW]
│   ├── generateToken.js      # JWT signing helper
│   └── ratingCalculator.js   # MongoDB aggregation engine for real-time rating stats
├── logs/                     # Winston structured application log files [NEW]
│   ├── error.log
│   └── combined.log
├── public/                   # Static directory
├── uploads/                  # Uploads storage directory
├── .env                      # Environment variables (ignored in Git)
├── .env.example              # Environment template
├── package.json              # Production project dependencies
├── README.md                 # Technical documentation & testing guide
└── server.js                 # Production Express application entry point [UPDATED]
```

---

## 🔒 Security & Production Hardening Features

1. **Helmet HTTP Security Headers**: Sets secure HTTP response headers (`X-Frame-Options`, `X-Content-Type-Options`, `X-DNS-Prefetch-Control`, `Strict-Transport-Security`).
2. **API Rate Limiting**:
   - `generalLimiter`: 200 requests per 15 minutes across all `/api/` endpoints.
   - `authLimiter`: 30 requests per 15 minutes on `/api/auth` login/register routes to prevent brute-force attacks.
3. **NoSQL Query Injection Protection**: `express-mongo-sanitize` strips `$` and `.` operators from incoming request payloads.
4. **Environment Variable Checklist**: Startup validator `validateEnv()` checks required keys (`PORT`, `MONGO_URI`, `JWT_SECRET`) and logs status.
5. **Centralized Logging**: `winston` outputs JSON logs to `logs/error.log` and `logs/combined.log`.

---

## 📧 Email Notification System

Configured using Nodemailer with automatic SMTP integration or fallback test transporter:

- `sendWelcomeEmail(user)`: Dispatched asynchronously upon new customer registration.
- `sendPasswordResetEmail(user, resetToken)`: Dispatched for password recovery requests.
- `sendOrderConfirmationEmail(user, order)`: Dispatched with itemized receipt table upon successful order payment.
- `sendOrderStatusUpdateEmail(user, order, newStatus)`: Dispatched when admin updates order status.

---

## 📖 Interactive Swagger / OpenAPI API Documentation

Interactive API documentation is generated dynamically via `swagger-jsdoc` and served using `swagger-ui-express`.

- **Access URL**: `http://localhost:5000/api-docs`

---

## 🌐 Health & Monitoring Endpoint

- **URL**: `http://localhost:5000/health` or `http://localhost:5000/`
- **Method**: `GET`
- **Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Party Decoration Backend API is running successfully",
  "environment": "development",
  "uptime": 12.45,
  "documentation": "http://localhost:5000/api-docs",
  "timestamp": "2026-07-29T14:25:00.000Z"
}
```

---

## ⚙️ Environment Variables Setup (`.env`)

Create a `.env` file in the `backend/` directory:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/party_decoration?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_12345
JWT_EXPIRES_IN=30d

# Cloudinary Storage
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

# Razorpay Payments
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

# SMTP Email Notifications (Optional for Production)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM="Party Decoration Store" <noreply@partydecorations.com>
```

---

## 🚀 Starting the Server

### Development Mode:
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```
