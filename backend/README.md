# Party Decoration E-Commerce Backend - Complete Production Architecture (Phase 1 to 9)

This directory contains the production-ready backend for the **Party Decoration E-commerce Website**, built with Node.js, Express.js, MongoDB Atlas, Mongoose, bcryptjs, JWT authentication, Multer, Cloudinary, Razorpay SDK, and slugify.

---

## 📁 Directory & File Structure

```
backend/
├── config/
│   ├── db.js                 # MongoDB Atlas connection module
│   ├── cloudinary.js         # Cloudinary configuration & helpers
│   └── razorpay.js           # Razorpay SDK initialization & HMAC signature verifier [NEW]
├── controllers/
│   ├── addressController.js  # Address Management CRUD
│   ├── authController.js     # User Authentication (register, login, profile)
│   ├── cartController.js     # Shopping Cart Management
│   ├── categoryController.js # Category Management CRUD
│   ├── checkoutController.js # Checkout summary generation & inventory validation
│   ├── orderController.js    # Order Management & history lookup [NEW]
│   ├── paymentController.js  # Razorpay Order creation & payment verification [NEW]
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
│   ├── orderModel.js         # Order schema with product & address snapshots [NEW]
│   ├── productModel.js       # Product schema (Category ObjectId ref & images array)
│   ├── userModel.js          # User schema
│   └── wishlistModel.js      # Wishlist schema
├── routes/
│   ├── addressRoutes.js      # Address endpoints (/api/addresses)
│   ├── authRoutes.js         # Auth endpoints (/api/auth)
│   ├── cartRoutes.js         # Shopping Cart endpoints (/api/cart)
│   ├── categoryRoutes.js     # Category endpoints (/api/categories)
│   ├── checkoutRoutes.js     # Checkout endpoints (/api/checkout)
│   ├── orderRoutes.js        # Order endpoints (/api/orders) [NEW]
│   ├── paymentRoutes.js      # Payment endpoints (/api/payment) [NEW]
│   ├── productRoutes.js      # Product endpoints (/api/products)
│   └── wishlistRoutes.js     # Wishlist endpoints (/api/wishlist)
├── utils/
│   ├── checkoutCalculator.js # Configurable shipping fee & checkout totals helper
│   └── generateToken.js      # JWT signing helper
├── public/                   # Static directory
├── uploads/                  # Uploads directory
├── .env                      # Environment variables (ignored in Git)
├── .env.example              # Environment template
├── package.json              # Project dependencies (includes razorpay)
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

# Razorpay API Credentials (Obtain from https://dashboard.razorpay.com/app/keys)
RAZORPAY_KEY_ID=rzp_test_yourKeyIdHere
RAZORPAY_KEY_SECRET=yourSecretKeyHere
```

---

## 💳 Payment & Order Processing API Endpoints

All Payment and Order endpoints require JWT Authentication via `Authorization: Bearer <token>` header.

### 1. Payment API Endpoints (`/api/payment`)

| Method | Endpoint | Access | Required Header | Description |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/payment/create-order` | Private | `Authorization: Bearer <token>` | Validates cart/stock & creates a Razorpay Order ID |
| `POST` | `/api/payment/verify` | Private | `Authorization: Bearer <token>` | Verifies HMAC signature, creates Order in DB, decrements stock & clears cart |

### 2. Order Management API Endpoints (`/api/orders`)

| Method | Endpoint | Access | Required Header | Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/orders` | Private | `Authorization: Bearer <token>` | Retrieve logged-in user's order history |
| `GET` | `/api/orders/:id` | Private | `Authorization: Bearer <token>` | Retrieve single order details by Order ID or Order Number |

---

## 🔐 Razorpay Payment Verification Workflow

1. **Step 1: Create Razorpay Order (`POST /api/payment/create-order`)**
   - Backend calculates exact grandTotal in paise (`amount * 100`) from cart and checkout calculator.
   - Calls Razorpay SDK `razorpayInstance.orders.create({ amount, currency: 'INR' })`.
   - Returns `razorpayOrderId`, `amount`, and `keyId` to client.

2. **Step 2: Frontend Checkout Execution**
   - Frontend opens Razorpay modal using returned `keyId`, `razorpayOrderId`, and `amount`.
   - User completes payment via UPI, Credit/Debit Card, or Netbanking.
   - Razorpay returns `razorpay_payment_id`, `razorpay_order_id`, and `razorpay_signature`.

3. **Step 3: Signature Verification & Order Creation (`POST /api/payment/verify`)**
   - Cryptographic verification via HMAC SHA256:
     `crypto.createHmac('sha256', RAZORPAY_KEY_SECRET).update(razorpayOrderId + "|" + razorpayPaymentId).digest('hex')`
   - If signature matches:
     - Creates immutable Order document in MongoDB Atlas with product and address snapshots.
     - Safely decrements product inventory (`stock -= quantity`).
     - Empties user's shopping cart (`cart.items = []`).
     - Returns `201 Created` with full order summary.

---

## 🧪 Testing Guide (Thunder Client / Postman)

### 1. Create Razorpay Payment Order (`POST /api/payment/create-order`)
- **URL**: `http://localhost:5000/api/payment/create-order`
- **Method**: `POST`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer <user_jwt_token>`
- **Request Body**:
```json
{
  "addressId": "66a7e5554444333322221111"
}
```
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Razorpay order created successfully",
  "keyId": "rzp_test_demoKeyId123",
  "razorpayOrderId": "order_mock_1722241234_567",
  "amount": 119600,
  "currency": "INR",
  "checkoutSummary": {
    "grandTotal": 1196,
    "totalItems": 4
  }
}
```

---

### 2. Verify Payment & Create Order (`POST /api/payment/verify`)
- **URL**: `http://localhost:5000/api/payment/verify`
- **Method**: `POST`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer <user_jwt_token>`
- **Request Body**:
```json
{
  "razorpayOrderId": "order_mock_1722241234_567",
  "razorpayPaymentId": "pay_mock_987654321",
  "razorpaySignature": "mock_signature_for_test",
  "addressId": "66a7e5554444333322221111"
}
```
- **Success Response (`201 Created`)**:
```json
{
  "success": true,
  "message": "Payment verified and order placed successfully",
  "data": {
    "_id": "66a7f0001111222233334444",
    "orderNumber": "ORD-20260729-4821",
    "grandTotal": 1196,
    "isPaid": true,
    "paidAt": "2026-07-29T13:58:00.000Z",
    "orderStatus": "Processing",
    "items": [
      {
        "name": "Golden Metallic Balloons (Pack of 50)",
        "price": 299,
        "quantity": 4,
        "itemSubtotal": 1196
      }
    ]
  }
}
```

---

### 3. Retrieve User Order History (`GET /api/orders`)
- **URL**: `http://localhost:5000/api/orders`
- **Method**: `GET`
- **Headers**:
  - `Authorization`: `Bearer <user_jwt_token>`
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "orderNumber": "ORD-20260729-4821",
      "grandTotal": 1196,
      "orderStatus": "Processing",
      "createdAt": "2026-07-29T13:58:00.000Z"
    }
  ]
}
```
