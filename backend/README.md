# Party Decoration E-Commerce Backend - Complete Production Architecture (Phase 1 to 12)

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
│   ├── orderController.js    # Customer & Admin Order Management
│   ├── paymentController.js  # Razorpay Order creation & payment verification
│   ├── productController.js  # Product Management, Search, Filters & Image Uploads [UPDATED]
│   └── wishlistController.js # Wishlist Management
├── middleware/
│   ├── authMiddleware.js     # JWT protect & admin authorization middlewares
│   ├── errorMiddleware.js    # Global error handler
│   ├── notFoundMiddleware.js # 404 handler
│   └── uploadMiddleware.js   # Multer file validation
├── models/
│   ├── addressModel.js       # Address schema
│   ├── cartModel.js          # Shopping Cart schema
│   ├── categoryModel.js      # Category schema with auto slugify hook
│   ├── orderModel.js         # Order schema
│   ├── productModel.js       # Product schema (text index & compound index for search/filters) [UPDATED]
│   ├── userModel.js          # User schema
│   └── wishlistModel.js      # Wishlist schema
├── routes/
│   ├── addressRoutes.js      # Address endpoints (/api/addresses)
│   ├── adminRoutes.js        # Admin Dashboard & Business Analytics (/api/admin)
│   ├── authRoutes.js         # Auth endpoints (/api/auth)
│   ├── cartRoutes.js         # Shopping Cart endpoints (/api/cart)
│   ├── categoryRoutes.js     # Category endpoints (/api/categories)
│   ├── checkoutRoutes.js     # Checkout endpoints (/api/checkout)
│   ├── orderRoutes.js        # Customer & Admin Order endpoints (/api/orders)
│   ├── paymentRoutes.js      # Payment endpoints (/api/payment)
│   ├── productRoutes.js      # Product endpoints (/api/products & /api/products/search) [UPDATED]
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
└── server.js                 # Express application entry point
```

---

## 🔍 Product Search, Multi-Filter, Sorting & Pagination APIs (`/api/products`)

### Endpoints
- `GET /api/products` — Main product discovery endpoint with full search, filter, sort, and pagination query params.
- `GET /api/products/search` — Dedicated search endpoint.

---

### 📋 Supported Query Parameters

| Parameter | Type | Example | Description |
| :--- | :--- | :--- | :--- |
| `search` / `q` / `keyword` | String | `?search=balloon` | Case-insensitive partial matching search on `name`, `description`, `slug`, `brand`, and `subcategory` |
| `category` | String | `?category=balloons-and-foil-combos` | Filter products by Category ObjectId or category slug/name |
| `minPrice` | Number | `?minPrice=100` | Minimum selling price filter |
| `maxPrice` | Number | `?maxPrice=1000` | Maximum selling price filter (validates `minPrice <= maxPrice`) |
| `inStock` | Boolean | `?inStock=true` | Filter by stock availability (`true` for in-stock `stock > 0`, `false` for out-of-stock `stock === 0`) |
| `isFeatured` | Boolean | `?isFeatured=true` | Filter featured products |
| `isTrending` | Boolean | `?isTrending=true` | Filter trending products |
| `isBestSeller` | Boolean | `?isBestSeller=true` | Filter best-seller products |
| `sort` / `sortBy` | String | `?sort=price_asc` | Sorting mode (see supported sorting modes below) |
| `page` | Integer | `?page=1` | Target page number (default `1`) |
| `limit` | Integer | `?limit=12` | Items per page (default `12`, max `100`) |

---

### 🔃 Supported Sorting Modes (`sort` parameter)

- `price_asc` / `price-low-high` — Price (Low to High)
- `price_desc` / `price-high-low` — Price (High to Low)
- `newest` — Newest First (Default)
- `oldest` — Oldest First
- `name_asc` / `a-z` — Alphabetical (A-Z)
- `name_desc` / `z-a` — Alphabetical (Z-A)
- `popular` / `bestselling` — Popular & Best Sellers First

---

## 🧪 Testing Guide (Thunder Client / Postman)

### 1. Multi-Attribute Search & Filter (`GET /api/products/search`)
- **URL**: `http://localhost:5000/api/products/search?q=balloon&minPrice=100&maxPrice=1000&inStock=true&sort=price_asc&page=1&limit=12`
- **Method**: `GET`
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "count": 2,
  "totalProducts": 2,
  "totalPages": 1,
  "currentPage": 1,
  "pageSize": 12,
  "hasNextPage": false,
  "hasPrevPage": false,
  "nextPage": null,
  "prevPage": null,
  "data": [
    {
      "_id": "66a7c987654321fedcba0987",
      "name": "Golden Metallic Balloons (Pack of 50)",
      "slug": "golden-metallic-balloons-pack-of-50",
      "price": 299,
      "stock": 150,
      "category": {
        "name": "Balloons & Foil Combos",
        "slug": "balloons-and-foil-combos"
      }
    }
  ]
}
```

---

### 2. Invalid Price Range Validation Error (`GET /api/products`)
- **URL**: `http://localhost:5000/api/products?minPrice=1000&maxPrice=100`
- **Method**: `GET`
- **Error Response (`400 Bad Request`)**:
```json
{
  "success": false,
  "message": "Invalid price range: minPrice (1000) cannot be greater than maxPrice (100)."
}
```
