# Party Decoration E-Commerce Backend - Complete Production Architecture (Phase 1 to 13)

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
│   ├── couponController.js   # Customer Coupon Validation & Admin Coupon CRUD [NEW]
│   ├── orderController.js    # Customer & Admin Order Management
│   ├── paymentController.js  # Razorpay Order creation & payment verification
│   ├── productController.js  # Product Management, Search, Filters & Image Uploads
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
│   ├── couponModel.js        # Coupon schema with usage limits & discount rules [NEW]
│   ├── orderModel.js         # Order schema with snapshots & statusHistory
│   ├── productModel.js       # Product schema (text index & compound index for search/filters)
│   ├── userModel.js          # User schema
│   └── wishlistModel.js      # Wishlist schema
├── routes/
│   ├── addressRoutes.js      # Address endpoints (/api/addresses)
│   ├── adminRoutes.js        # Admin Dashboard & Business Analytics (/api/admin)
│   ├── authRoutes.js         # Auth endpoints (/api/auth)
│   ├── cartRoutes.js         # Shopping Cart endpoints (/api/cart)
│   ├── categoryRoutes.js     # Category endpoints (/api/categories)
│   ├── checkoutRoutes.js     # Checkout endpoints (/api/checkout)
│   ├── couponRoutes.js       # Coupon endpoints (/api/coupons) [NEW]
│   ├── orderRoutes.js        # Customer & Admin Order endpoints (/api/orders)
│   ├── paymentRoutes.js      # Payment endpoints (/api/payment)
│   ├── productRoutes.js      # Product endpoints (/api/products & /api/products/search)
│   └── wishlistRoutes.js     # Wishlist endpoints (/api/wishlist)
├── utils/
│   ├── checkoutCalculator.js # Configurable shipping fee & checkout totals helper (with coupon support) [UPDATED]
│   ├── couponValidator.js    # Validation engine for dates, limits, and subtotals [NEW]
│   └── generateToken.js      # JWT signing helper
├── public/                   # Static directory
├── uploads/                  # Uploads directory
├── .env                      # Environment variables (ignored in Git)
├── .env.example              # Environment template
├── package.json              # Project dependencies
├── README.md                 # Technical documentation & testing guide
└── server.js                 # Express application entry point (mounted /api/coupons)
```

---

## 🎟️ Coupons & Discount Management API Endpoints (`/api/coupons`)

### 1. Customer Coupon Endpoint

| Method | Endpoint | Access | Required Header | Description |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/coupons/validate` | Private | `Authorization: Bearer <token>` | Validates coupon code against order subtotal and user limits, returning calculated discount preview |

---

### 2. Administrator Coupon Endpoints

| Method | Endpoint | Access | Required Header | Description |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/coupons/admin` | Admin | `Authorization: Bearer <admin_token>` | Create a new promotional coupon (code uppercase, unique) |
| `GET` | `/api/coupons/admin/all` | Admin | `Authorization: Bearer <admin_token>` | Fetch all coupons (`search`, `isActive`, `page`, `limit`) |
| `GET` | `/api/coupons/admin/:id` | Admin | `Authorization: Bearer <admin_token>` | Fetch single coupon by ID or Coupon Code |
| `PUT` | `/api/coupons/admin/:id` | Admin | `Authorization: Bearer <admin_token>` | Update an existing coupon |
| `PUT` | `/api/coupons/admin/:id/status` | Admin | `Authorization: Bearer <admin_token>` | Toggle active/inactive status of a coupon |
| `DELETE` | `/api/coupons/admin/:id` | Admin | `Authorization: Bearer <admin_token>` | Delete a coupon from database |

---

## ⚡ Coupon Validation & Checkout Rules

- **Discount Types**:
  - `Percentage`: Applies percentage discount (e.g. 20%). Optional `maxDiscountAmount` caps maximum discount value.
  - `Fixed`: Applies fixed rupee discount (e.g. ₹200).
- **Validation Checks**:
  1. Active status check (`isActive === true`).
  2. Date validity (`startDate <= now <= expiryDate`).
  3. Minimum order subtotal check (`itemsSubtotal >= minOrderAmount`).
  4. Global usage limit check (`usedCount < usageLimit`).
  5. Per-user redemption limit check (`userCount < usageLimitPerUser`).
- **Post-Payment Increment**: Coupon `usedCount` and `userUsage` arrays are incremented only upon confirmed order creation.

---

## 🧪 Testing Guide (Thunder Client / Postman)

### 1. Admin Create Coupon (`POST /api/coupons/admin`)
- **URL**: `http://localhost:5000/api/coupons/admin`
- **Method**: `POST`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer <admin_jwt_token>`
- **Request Body**:
```json
{
  "code": "PARTY2026",
  "name": "Grand Party 20% Discount",
  "description": "Get 20% off on orders above ₹500 (Max discount ₹300)",
  "discountType": "Percentage",
  "discountValue": 20,
  "minOrderAmount": 500,
  "maxDiscountAmount": 300,
  "expiryDate": "2026-12-31T23:59:59.000Z",
  "usageLimitPerUser": 1
}
```
- **Success Response (`201 Created`)**:
```json
{
  "success": true,
  "message": "Promotional coupon created successfully",
  "data": {
    "code": "PARTY2026",
    "discountType": "Percentage",
    "discountValue": 20,
    "minOrderAmount": 500,
    "maxDiscountAmount": 300,
    "isActive": true
  }
}
```

---

### 2. Customer Validate Coupon (`POST /api/coupons/validate`)
- **URL**: `http://localhost:5000/api/coupons/validate`
- **Method**: `POST`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer <customer_jwt_token>`
- **Request Body**:
```json
{
  "couponCode": "PARTY2026",
  "subtotal": 1200
}
```
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Coupon 'PARTY2026' applied successfully",
  "data": {
    "couponCode": "PARTY2026",
    "couponName": "Grand Party 20% Discount",
    "discountType": "Percentage",
    "discountValue": 20,
    "discountAmount": 240
  }
}
```

---

### 3. Apply Coupon in Checkout (`POST /api/checkout/summary`)
- **URL**: `http://localhost:5000/api/checkout/summary`
- **Method**: `POST`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer <customer_jwt_token>`
- **Request Body**:
```json
{
  "couponCode": "PARTY2026"
}
```
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Checkout summary generated successfully",
  "data": {
    "itemsSubtotal": 1200,
    "shippingFee": 0,
    "discount": 240,
    "couponCode": "PARTY2026",
    "grandTotal": 960
  }
}
```
