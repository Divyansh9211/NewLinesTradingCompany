# Party Decoration E-Commerce Backend - Complete Production Architecture (Phase 1 to 11)

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
│   ├── adminDashboardController.js # Admin Dashboard KPI Stats, Analytics & User Block/Role [NEW]
│   ├── authController.js     # User Authentication (register, login, profile)
│   ├── cartController.js     # Shopping Cart Management
│   ├── categoryController.js # Category Management CRUD
│   ├── checkoutController.js # Checkout summary generation & inventory validation
│   ├── orderController.js    # Customer & Admin Order Management
│   ├── paymentController.js  # Razorpay Order creation & payment verification
│   ├── productController.js  # Product Management CRUD & Image Management
│   └── wishlistController.js # Wishlist Management
├── middleware/
│   ├── authMiddleware.js     # JWT protect (with isBlocked check) & admin authorization [UPDATED]
│   ├── errorMiddleware.js    # Global error handler
│   ├── notFoundMiddleware.js # 404 handler
│   └── uploadMiddleware.js   # Multer file validation
├── models/
│   ├── addressModel.js       # Address schema
│   ├── cartModel.js          # Shopping Cart schema
│   ├── categoryModel.js      # Category schema with auto slugify hook
│   ├── orderModel.js         # Order schema with snapshots & statusHistory
│   ├── productModel.js       # Product schema
│   ├── userModel.js          # User schema (includes isBlocked field) [UPDATED]
│   └── wishlistModel.js      # Wishlist schema
├── routes/
│   ├── addressRoutes.js      # Address endpoints (/api/addresses)
│   ├── adminRoutes.js        # Admin Dashboard & Business Analytics (/api/admin) [NEW]
│   ├── authRoutes.js         # Auth endpoints (/api/auth)
│   ├── cartRoutes.js         # Shopping Cart endpoints (/api/cart)
│   ├── categoryRoutes.js     # Category endpoints (/api/categories)
│   ├── checkoutRoutes.js     # Checkout endpoints (/api/checkout)
│   ├── orderRoutes.js        # Customer & Admin Order endpoints (/api/orders)
│   ├── paymentRoutes.js      # Payment endpoints (/api/payment)
│   ├── productRoutes.js      # Product endpoints (/api/products)
│   └── wishlistRoutes.js     # Wishlist endpoints (/api/wishlist)
├── utils/
│   ├── checkoutCalculator.js # Configurable shipping fee & checkout totals helper
│   └── generateToken.js      # JWT signing helper
├── public/                   # Static directory
├── uploads/                  # Uploads directory
├── .env                      # Environment variables (ignored in Git)
├── .env.example              # Environment template
├── package.json              # Project dependencies
├── README.md                 # Technical documentation & testing guide
└── server.js                 # Express application entry point (mounted /api/admin)
```

---

## 📊 Admin Dashboard & Analytics API Endpoints (`/api/admin`)

All Admin Dashboard and Business Analytics endpoints require JWT Authentication and Admin Role (`Authorization: Bearer <admin_token>`).

### 1. Dashboard KPI Metrics & Analytics Endpoints

| Method | Endpoint | Access | Required Header | Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/dashboard/stats` | Admin | `Authorization: Bearer <admin_token>` | Fetch real-time dashboard KPI metrics (Users, Products, Orders, Revenue, Inventory, Carts/Wishlists) |
| `GET` | `/api/admin/analytics/revenue` | Admin | `Authorization: Bearer <admin_token>` | Fetch revenue analytics (Today, Weekly, Monthly, Yearly, Lifetime & 12-month trend) |
| `GET` | `/api/admin/analytics/top-products` | Admin | `Authorization: Bearer <admin_token>` | Fetch top 10 best-selling products by quantity sold & total revenue |
| `GET` | `/api/admin/analytics/categories` | Admin | `Authorization: Bearer <admin_token>` | Fetch category sales performance and revenue distribution |
| `GET` | `/api/admin/analytics/recent-activity` | Admin | `Authorization: Bearer <admin_token>` | Fetch recent activity feed (5 recent orders & 5 recent user registrations) |

---

### 2. User Management Endpoints

| Method | Endpoint | Access | Required Header | Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/users` | Admin | `Authorization: Bearer <admin_token>` | Fetch registered users (supports `search`, `role`, `isBlocked`, `page`, `limit`) |
| `PUT` | `/api/admin/users/:id/block` | Admin | `Authorization: Bearer <admin_token>` | Block or unblock a user account |
| `PUT` | `/api/admin/users/:id/role` | Admin | `Authorization: Bearer <admin_token>` | Update a user's role (`user` / `admin`) |

---

## 🧪 Testing Guide (Thunder Client / Postman)

### 1. Fetch Real-time Dashboard KPI Stats (`GET /api/admin/dashboard/stats`)
- **URL**: `http://localhost:5000/api/admin/dashboard/stats`
- **Method**: `GET`
- **Headers**:
  - `Authorization`: `Bearer <admin_jwt_token>`
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "data": {
    "users": {
      "totalUsers": 25,
      "totalAdmins": 2,
      "blockedUsers": 1
    },
    "catalog": {
      "totalProducts": 50,
      "totalCategories": 8,
      "lowStockProducts": 3,
      "outOfStockProducts": 1
    },
    "orders": {
      "totalOrders": 12,
      "orderStatusCounts": {
        "Processing": 2,
        "Confirmed": 3,
        "Delivered": 6,
        "Cancelled": 1
      }
    },
    "financials": {
      "totalRevenue": 14350.5
    }
  }
}
```

---

### 2. Fetch Revenue & Sales Trend Analytics (`GET /api/admin/analytics/revenue`)
- **URL**: `http://localhost:5000/api/admin/analytics/revenue`
- **Method**: `GET`
- **Headers**:
  - `Authorization`: `Bearer <admin_jwt_token>`
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "data": {
    "summary": {
      "today": { "revenue": 1196, "orderCount": 1 },
      "weekly": { "revenue": 4500, "orderCount": 4 },
      "monthly": { "revenue": 14350.5, "orderCount": 12 },
      "lifetime": { "revenue": 14350.5, "orderCount": 12 }
    },
    "monthlyTrends": [
      { "period": "2026-07", "revenue": 14350.5, "ordersCount": 12 }
    ]
  }
}
```

---

### 3. Block / Unblock User Account (`PUT /api/admin/users/:id/block`)
- **URL**: `http://localhost:5000/api/admin/users/66a7b123456789abcdef0123/block`
- **Method**: `PUT`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer <admin_jwt_token>`
- **Request Body**:
```json
{
  "isBlocked": true
}
```
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "User account 'John Doe' has been blocked successfully",
  "data": {
    "_id": "66a7b123456789abcdef0123",
    "name": "John Doe",
    "email": "john@example.com",
    "isBlocked": true
  }
}
```
