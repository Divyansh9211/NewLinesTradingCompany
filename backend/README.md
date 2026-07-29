# Party Decoration E-Commerce Backend - Checkout, Address & Core Architecture (Phase 1 to 8)

This directory contains the production-ready backend for the **Party Decoration E-commerce Website**, built with Node.js, Express.js, MongoDB Atlas, Mongoose, bcryptjs, JWT authentication, Multer, Cloudinary, and slugify.

---

## 📁 Directory & File Structure

```
backend/
├── config/
│   ├── db.js                 # MongoDB Atlas connection module
│   └── cloudinary.js         # Cloudinary configuration & helpers
├── controllers/
│   ├── addressController.js  # Address Management CRUD & default address handling [NEW]
│   ├── authController.js     # User Authentication (register, login, profile)
│   ├── cartController.js     # Shopping Cart Management
│   ├── categoryController.js # Category Management CRUD
│   ├── checkoutController.js # Checkout summary generation & inventory validation [NEW]
│   ├── productController.js  # Product Management CRUD & Image Management
│   └── wishlistController.js # Wishlist Management
├── middleware/
│   ├── authMiddleware.js     # JWT protect & admin authorization middlewares
│   ├── errorMiddleware.js    # Global error handler
│   ├── notFoundMiddleware.js # 404 handler
│   └── uploadMiddleware.js   # Multer file validation
├── models/
│   ├── addressModel.js       # Address schema with phone & pincode validation [NEW]
│   ├── cartModel.js          # Shopping Cart schema
│   ├── categoryModel.js      # Category schema with auto slugify hook
│   ├── productModel.js       # Product schema (Category ObjectId ref & images array)
│   ├── userModel.js          # User schema
│   └── wishlistModel.js      # Wishlist schema
├── routes/
│   ├── addressRoutes.js      # Address endpoints (/api/addresses) [NEW]
│   ├── authRoutes.js         # Auth endpoints (/api/auth)
│   ├── cartRoutes.js         # Shopping Cart endpoints (/api/cart)
│   ├── categoryRoutes.js     # Category endpoints (/api/categories)
│   ├── checkoutRoutes.js     # Checkout endpoints (/api/checkout) [NEW]
│   ├── productRoutes.js      # Product endpoints (/api/products)
│   └── wishlistRoutes.js     # Wishlist endpoints (/api/wishlist)
├── utils/
│   ├── checkoutCalculator.js # Shipping fee & checkout financial calculation helper [NEW]
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

## ⚙️ Environment Variables

Ensure your `.env` file contains the following configuration:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/party_decoration?retryWrites=true&w=majority
JWT_SECRET=supersecretjwtkey_party_decoration_2026_production_ready
JWT_EXPIRES_IN=30d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🏠 Address Management API Endpoints (`/api/addresses`)

All Address endpoints require JWT Authentication via `Authorization: Bearer <token>` header. Addresses are isolated and strictly user-bound.

| Method | Endpoint | Access | Required Header | Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/addresses` | Private | `Authorization: Bearer <token>` | Retrieve all delivery addresses for logged-in user |
| `GET` | `/api/addresses/:id` | Private | `Authorization: Bearer <token>` | Retrieve single delivery address by ID |
| `POST` | `/api/addresses` | Private | `Authorization: Bearer <token>` | Create a new delivery address |
| `PUT` | `/api/addresses/:id` | Private | `Authorization: Bearer <token>` | Update an existing delivery address |
| `PUT` | `/api/addresses/:id/default` | Private | `Authorization: Bearer <token>` | Set target address as default delivery address |
| `DELETE` | `/api/addresses/:id` | Private | `Authorization: Bearer <token>` | Delete a delivery address |

---

## 💳 Checkout API Endpoints (`/api/checkout`)

| Method | Endpoint | Access | Required Header | Description |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/checkout/summary` | Private | `Authorization: Bearer <token>` | Validate inventory, verify address & generate order financial summary |
| `GET` | `/api/checkout/summary` | Private | `Authorization: Bearer <token>` | Retrieve current order checkout summary |

---

## ⚡ Configurable Shipping & Checkout Rules

- **Free Shipping Threshold**: Free shipping is automatically applied when `itemsSubtotal >= ₹999`.
- **Standard Shipping Fee**: Fixed ₹50 shipping fee is applied when `itemsSubtotal < ₹999`.
- **Inventory Validation**: Checkout verifies every product in the user's cart:
  - Product must exist and be active (`product.isActive === true`).
  - Product stock must be sufficient (`product.stock >= cartItem.quantity`).
  - Rejects checkout with a `400 Bad Request` if any item is out of stock or unavailable.
- **Address Resolution**: Checkout automatically uses the user's specified `addressId`, default address, or most recent address. Rejects checkout if no address is found (`400 Bad Request`).

---

## 🧪 Testing Guide (Thunder Client / Postman)

### 1. Create Delivery Address (`POST /api/addresses`)
- **URL**: `http://localhost:5000/api/addresses`
- **Method**: `POST`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer <user_jwt_token>`
- **Request Body**:
```json
{
  "fullName": "Jane Doe",
  "phone": "9876543210",
  "street": "Flat 402, Sunshine Apartments, Green Park",
  "landmark": "Near Metro Station",
  "city": "New Delhi",
  "state": "Delhi",
  "pincode": "110016",
  "addressType": "Home",
  "isDefault": true
}
```
- **Success Response (`201 Created`)**:
```json
{
  "success": true,
  "message": "Delivery address created successfully",
  "data": {
    "_id": "66a7e5554444333322221111",
    "fullName": "Jane Doe",
    "phone": "9876543210",
    "street": "Flat 402, Sunshine Apartments, Green Park",
    "city": "New Delhi",
    "state": "Delhi",
    "pincode": "110016",
    "addressType": "Home",
    "isDefault": true
  }
}
```

---

### 2. Generate Checkout Summary (`POST /api/checkout/summary`)
- **URL**: `http://localhost:5000/api/checkout/summary`
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
  "message": "Checkout summary generated successfully",
  "data": {
    "deliveryAddress": {
      "_id": "66a7e5554444333322221111",
      "fullName": "Jane Doe",
      "phone": "9876543210",
      "city": "New Delhi"
    },
    "items": [
      {
        "product": {
          "_id": "66a7c987654321fedcba0987",
          "name": "Golden Metallic Balloons (Pack of 50)",
          "price": 299,
          "stock": 150
        },
        "quantity": 4,
        "itemSubtotal": 1196
      }
    ],
    "totalItems": 4,
    "itemsSubtotal": 1196,
    "shippingFee": 0,
    "isFreeShippingEligible": true,
    "tax": 0,
    "discount": 0,
    "grandTotal": 1196
  }
}
```
