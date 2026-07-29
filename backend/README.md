# Party Decoration E-Commerce Backend - Complete Production Architecture (Phase 1 to 10)

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
│   ├── authController.js     # User Authentication (register, login, profile)
│   ├── cartController.js     # Shopping Cart Management
│   ├── categoryController.js # Category Management CRUD
│   ├── checkoutController.js # Checkout summary generation & inventory validation
│   ├── orderController.js    # Customer & Admin Order Management [UPDATED]
│   ├── paymentController.js  # Razorpay Order creation & payment verification
│   ├── productController.js  # Product Management CRUD & Image Management
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
│   ├── orderModel.js         # Order schema (cancellation, statusHistory, snapshots) [UPDATED]
│   ├── productModel.js       # Product schema (Category ObjectId ref & images array)
│   ├── userModel.js          # User schema
│   └── wishlistModel.js      # Wishlist schema
├── routes/
│   ├── addressRoutes.js      # Address endpoints (/api/addresses)
│   ├── authRoutes.js         # Auth endpoints (/api/auth)
│   ├── cartRoutes.js         # Shopping Cart endpoints (/api/cart)
│   ├── categoryRoutes.js     # Category endpoints (/api/categories)
│   ├── checkoutRoutes.js     # Checkout endpoints (/api/checkout)
│   ├── orderRoutes.js        # Customer & Admin Order endpoints (/api/orders) [UPDATED]
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
└── server.js                 # Express application entry point
```

---

## ⚙️ Environment Variables Setup

Ensure your `.env` file contains valid credentials:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/party_decoration?retryWrites=true&w=majority
JWT_SECRET=supersecretjwtkey_party_decoration_2026_production_ready
JWT_EXPIRES_IN=30d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=rzp_test_yourKeyIdHere
RAZORPAY_KEY_SECRET=yourSecretKeyHere
```

---

## 📦 Order Management API Endpoints (`/api/orders`)

### 1. Customer Order Endpoints

| Method | Endpoint | Access | Required Header | Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/orders` | Private | `Authorization: Bearer <token>` | Fetch logged-in customer's order history (supports `status`, `page`, `limit`) |
| `GET` | `/api/orders/my-orders` | Private | `Authorization: Bearer <token>` | Alias endpoint for customer order history |
| `GET` | `/api/orders/:id` | Private | `Authorization: Bearer <token>` | Fetch single order details by Order ID or Order Number |
| `PUT` | `/api/orders/:id/cancel` | Private | `Authorization: Bearer <token>` | Cancel an order (allowed for `Pending`, `Processing`, `Confirmed` states; restores stock) |

---

### 2. Administrator Order Endpoints

| Method | Endpoint | Access | Required Header | Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/orders/admin/all` | Admin | `Authorization: Bearer <admin_token>` | Fetch all platform orders (supports `search`, `status`, `page`, `limit`, `sort`) |
| `GET` | `/api/orders/admin/stats` | Admin | `Authorization: Bearer <admin_token>` | Fetch high-level order metrics summary (order counts by status, total revenue) |
| `PUT` | `/api/orders/admin/:id/status` | Admin | `Authorization: Bearer <admin_token>` | Update order status with lifecycle transition validation |

---

## 🔄 Order Lifecycle & Status Transition Rules

Admins can update order statuses following valid transition paths:

```
Pending -------------> Confirmed -------> Packed -------> Shipped -------> Out for Delivery -------> Delivered
   |                     |                   |
   v                     v                   v
Cancelled             Cancelled           Cancelled (Admin)               Delivered -------------> Returned -------------> Refunded
```

- **Allowed Transitions**:
  - `Pending`: `Confirmed`, `Cancelled`
  - `Processing`: `Confirmed`, `Packed`, `Cancelled`
  - `Confirmed`: `Packed`, `Cancelled`
  - `Packed`: `Shipped`, `Cancelled`
  - `Shipped`: `Out for Delivery`, `Delivered`
  - `Out for Delivery`: `Delivered`, `Returned`
  - `Delivered`: `Returned`
  - `Returned`: `Refunded`
- **Invalid Transitions**: Direct skips like `Pending` -> `Delivered` or backwards updates like `Delivered` -> `Packed` return `400 Bad Request`.
- **Stock Restoration**: Cancelling an order (or marking as Returned) automatically restores product inventory (`$inc: { stock: quantity }`) in MongoDB Atlas.

---

## 🧪 Testing Guide (Thunder Client / Postman)

### 1. Customer Cancel Order (`PUT /api/orders/:id/cancel`)
- **URL**: `http://localhost:5000/api/orders/ORD-20260729-4821/cancel`
- **Method**: `PUT`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer <customer_jwt_token>`
- **Request Body**:
```json
{
  "reason": "Change of event date"
}
```
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Order cancelled successfully and product stock restored",
  "data": {
    "orderNumber": "ORD-20260729-4821",
    "orderStatus": "Cancelled",
    "cancellationReason": "Change of event date",
    "isStockRestored": true
  }
}
```

---

### 2. Admin Get All Orders (`GET /api/orders/admin/all`)
- **URL**: `http://localhost:5000/api/orders/admin/all?search=Jane&status=Processing&page=1&limit=10`
- **Method**: `GET`
- **Headers**:
  - `Authorization`: `Bearer <admin_jwt_token>`
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "count": 1,
  "totalOrders": 1,
  "totalPages": 1,
  "currentPage": 1,
  "data": [
    {
      "orderNumber": "ORD-20260729-4821",
      "orderStatus": "Processing",
      "grandTotal": 1196,
      "user": {
        "name": "Jane Doe",
        "email": "jane@example.com"
      }
    }
  ]
}
```

---

### 3. Admin Update Order Status (`PUT /api/orders/admin/:id/status`)
- **URL**: `http://localhost:5000/api/orders/admin/ORD-20260729-4821/status`
- **Method**: `PUT`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer <admin_jwt_token>`
- **Request Body**:
```json
{
  "status": "Packed",
  "note": "Package sealed and labeled for dispatch"
}
```
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Order status updated to 'Packed' successfully",
  "data": {
    "orderNumber": "ORD-20260729-4821",
    "orderStatus": "Packed",
    "statusHistory": [
      {
        "status": "Packed",
        "note": "Package sealed and labeled for dispatch",
        "updatedBy": "Admin User"
      }
    ]
  }
}
```
