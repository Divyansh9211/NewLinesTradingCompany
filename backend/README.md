# Party Decoration E-Commerce Backend - Complete Production Architecture (Phase 1 to 14)

This directory contains the production-ready backend for the **Party Decoration E-commerce Website**, built with Node.js, Express.js, MongoDB Atlas, Mongoose, bcryptjs, JWT authentication, Multer, Cloudinary, Razorpay SDK, and slugify.

---

## 📁 Directory & File Structure

```
backend/
├── config/
│   ├── db.js                 # MongoDB Atlas connection module
│   ├── cloudinary.js         # Cloudinary configuration & helpers
│   └── razorpay.js           # Razorpay SDK initialization & HMAC signature verifier
├── controllers/
│   ├── addressController.js  # Address Management CRUD
│   ├── adminDashboardController.js # Admin Dashboard KPI Stats & Analytics
│   ├── authController.js     # User Authentication (register, login, profile)
│   ├── cartController.js     # Shopping Cart Management
│   ├── categoryController.js # Category Management CRUD
│   ├── checkoutController.js # Checkout summary generation & inventory validation
│   ├── couponController.js   # Customer Coupon Validation & Admin Coupon CRUD
│   ├── orderController.js    # Customer & Admin Order Management
│   ├── paymentController.js  # Razorpay Order creation & payment verification
│   ├── productController.js  # Product Management, Search, Filters & Image Uploads
│   ├── reviewController.js   # Customer & Admin Product Reviews & Ratings [NEW]
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
│   ├── productModel.js       # Product schema (with averageRating & numReviews fields) [UPDATED]
│   ├── reviewModel.js        # Review schema (compound unique index for 1 review per product) [NEW]
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
│   ├── reviewRoutes.js       # Review & Rating endpoints (/api/reviews) [NEW]
│   └── wishlistRoutes.js     # Wishlist endpoints (/api/wishlist)
├── utils/
│   ├── checkoutCalculator.js # Configurable shipping fee & checkout totals helper
│   ├── couponValidator.js    # Validation engine for dates, limits, and subtotals
│   ├── generateToken.js      # JWT signing helper
│   └── ratingCalculator.js   # MongoDB aggregation engine for real-time rating stats [NEW]
├── public/                   # Static directory
├── uploads/                  # Uploads directory
├── .env                      # Environment variables (ignored in Git)
├── .env.example              # Environment template
├── package.json              # Project dependencies
├── README.md                 # Technical documentation & testing guide
└── server.js                 # Express application entry point (mounted /api/reviews)
```

---

## ⭐ Reviews & Ratings API Endpoints (`/api/reviews`)

### 1. Public & Customer Review Endpoints

| Method | Endpoint | Access | Required Header | Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/reviews/product/:productId` | Public | None | Fetch paginated reviews for a product with 1-to-5 star rating breakdown metrics |
| `POST` | `/api/reviews` | Private | `Authorization: Bearer <token>` | Submit product review (requires Verified Purchase from delivered/completed order) |
| `GET` | `/api/reviews/my-reviews` | Private | `Authorization: Bearer <token>` | Fetch reviews submitted by the authenticated customer |
| `PUT` | `/api/reviews/:id` | Private | `Authorization: Bearer <token>` | Update customer's own product review (recalculates product rating stats) |
| `DELETE` | `/api/reviews/:id` | Private | `Authorization: Bearer <token>` | Delete customer's own product review (recalculates product rating stats) |

---

### 2. Administrator Review Moderation Endpoints

| Method | Endpoint | Access | Required Header | Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/reviews/admin/all` | Admin | `Authorization: Bearer <admin_token>` | Fetch all reviews across platform (`search`, `rating`, `productId`, `page`, `limit`) |
| `DELETE` | `/api/reviews/admin/:id` | Admin | `Authorization: Bearer <admin_token>` | Delete any review violating platform guidelines and update product rating stats |

---

## 🔒 Verified Purchase & Rating Calculation Rules

- **Verified Purchase Enforcement**: The backend verifies `Order.findOne({ user: userId, 'items.product': productId, isPaid: true })`. Non-purchasers or unconfirmed orders receive `403 Forbidden` (`Verified Purchase required. You can only review products from your delivered or completed orders.`).
- **One Review Per Product**: Database-level compound unique index `reviewSchema.index({ product: 1, user: 1 }, { unique: true })` prevents duplicate reviews.
- **Real-Time Aggregation Engine**: `updateProductRatingStats(productId)` recalculates `$avg: '$rating'` and `$sum: 1` (`numReviews`) on the Product document whenever a review is created, updated, or deleted.

---

## 🧪 Testing Guide (Thunder Client / Postman)

### 1. Submit Product Review (`POST /api/reviews`)
- **URL**: `http://localhost:5000/api/reviews`
- **Method**: `POST`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer <customer_jwt_token>`
- **Request Body**:
```json
{
  "productId": "66a7c987654321fedcba0987",
  "rating": 5,
  "title": "Stunning Balloons & High Quality!",
  "comment": "The golden metallic balloons were fantastic for my daughter's birthday party. Highly recommended!"
}
```
- **Success Response (`201 Created`)**:
```json
{
  "success": true,
  "message": "Product review submitted successfully",
  "data": {
    "_id": "66a7d1112223334445556667",
    "rating": 5,
    "title": "Stunning Balloons & High Quality!",
    "comment": "The golden metallic balloons were fantastic for my daughter's birthday party. Highly recommended!",
    "isVerifiedPurchase": true
  }
}
```

---

### 2. Fetch Product Reviews & Rating Breakdown (`GET /api/reviews/product/:productId`)
- **URL**: `http://localhost:5000/api/reviews/product/66a7c987654321fedcba0987`
- **Method**: `GET`
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "count": 5,
  "totalReviews": 5,
  "totalPages": 1,
  "currentPage": 1,
  "averageRating": 4.8,
  "numReviews": 5,
  "ratingBreakdown": {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 1,
    "5": 4
  },
  "data": [...]
}
```
