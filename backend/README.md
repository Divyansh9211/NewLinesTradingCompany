# Party Decoration E-Commerce Backend - Shopping Cart & Core Architecture (Phase 1 to 7)

This directory contains the production-ready backend for the **Party Decoration E-commerce Website**, built with Node.js, Express.js, MongoDB Atlas, Mongoose, bcryptjs, JWT authentication, Multer, Cloudinary, and slugify.

---

## 📁 Directory & File Structure

```
backend/
├── config/
│   ├── db.js                 # MongoDB Atlas connection module
│   └── cloudinary.js         # Cloudinary configuration & helpers
├── controllers/
│   ├── authController.js     # User Authentication (register, login, profile)
│   ├── categoryController.js # Category Management CRUD
│   ├── productController.js  # Product Management CRUD & Image Management
│   ├── wishlistController.js # Wishlist Management
│   └── cartController.js     # Shopping Cart Management (get, add, update, remove, clear) [NEW]
├── middleware/
│   ├── authMiddleware.js     # JWT protect & admin authorization middlewares
│   ├── errorMiddleware.js    # Global error handler
│   ├── notFoundMiddleware.js # 404 handler
│   └── uploadMiddleware.js   # Multer file validation
├── models/
│   ├── userModel.js          # User schema
│   ├── categoryModel.js      # Category schema with auto slugify hook
│   ├── productModel.js       # Product schema (with Category ObjectId ref & images array)
│   ├── wishlistModel.js      # Wishlist schema
│   └── cartModel.js          # Shopping Cart schema (with item subtotals & cart total calculation) [NEW]
├── routes/
│   ├── authRoutes.js         # Auth endpoints (/api/auth)
│   ├── categoryRoutes.js     # Category endpoints (/api/categories)
│   ├── productRoutes.js      # Product endpoints (/api/products)
│   ├── wishlistRoutes.js     # Wishlist endpoints (/api/wishlist)
│   └── cartRoutes.js         # Shopping Cart endpoints (/api/cart) [NEW]
├── utils/
│   └── generateToken.js      # JWT signing helper
├── public/                   # Static directory
├── uploads/                  # Uploads directory
├── .env                      # Environment variables (ignored in Git)
├── .env.example              # Environment template
├── package.json              # Project dependencies
├── README.md                 # Technical documentation & testing guide
└── server.js                 # Express application entry point (mounted /api/cart)
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

## 🛒 Shopping Cart Management API Endpoints (`/api/cart`)

All Shopping Cart endpoints require JWT Authentication via `Authorization: Bearer <token>` header. Carts are isolated and strictly user-bound.

| Method | Endpoint | Access | Required Header | Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/cart` | Private | `Authorization: Bearer <token>` | Retrieve logged-in user's cart (populated products, subtotals, cartTotal) |
| `POST` | `/api/cart` | Private | `Authorization: Bearer <token>` | Add product to cart (or increment quantity if already present) |
| `PUT` | `/api/cart/item` | Private | `Authorization: Bearer <token>` | Update quantity of a product in user's cart |
| `DELETE` | `/api/cart/:productId` | Private | `Authorization: Bearer <token>` | Remove a product from user's cart |
| `DELETE` | `/api/cart/clear` | Private | `Authorization: Bearer <token>` | Clear all items from logged-in user's cart |

---

## ⚡ Inventory & Stock Validation Rules

- **Stock Checking**: When adding a product or updating quantity, the system checks `product.stock`. If `quantity > product.stock`, a `400 Bad Request` validation error is returned.
- **Auto Increment**: If the same product is added multiple times, the cart automatically increments the quantity instead of creating duplicate items.
- **Price Snapshots**: Each cart item stores the unit price snapshot and auto-calculates `itemSubtotal = quantity * price`. The cart document automatically calculates `totalItems` and `cartTotal`.

---

## 🧪 Testing Guide (Thunder Client / Postman)

### 1. Add Product to Shopping Cart (`POST /api/cart`)
- **URL**: `http://localhost:5000/api/cart`
- **Method**: `POST`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer <user_jwt_token>`
- **Request Body**:
```json
{
  "productId": "66a7c987654321fedcba0987",
  "quantity": 2
}
```
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Product added to cart successfully",
  "count": 1,
  "totalItems": 2,
  "cartTotal": 598,
  "data": {
    "_id": "66a7e0001111222233334444",
    "user": "66a7b123456789abcdef0123",
    "totalItems": 2,
    "cartTotal": 598,
    "items": [
      {
        "product": {
          "_id": "66a7c987654321fedcba0987",
          "name": "Golden Metallic Balloons (Pack of 50)",
          "slug": "golden-metallic-balloons-pack-of-50",
          "price": 299,
          "stock": 150,
          "category": {
            "name": "Balloons & Foil Combos"
          }
        },
        "quantity": 2,
        "price": 299,
        "itemSubtotal": 598
      }
    ]
  }
}
```

---

### 2. Retrieve User Shopping Cart (`GET /api/cart`)
- **URL**: `http://localhost:5000/api/cart`
- **Method**: `GET`
- **Headers**:
  - `Authorization`: `Bearer <user_jwt_token>`
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "count": 1,
  "totalItems": 2,
  "cartTotal": 598,
  "data": {
    "items": [
      {
        "product": {
          "name": "Golden Metallic Balloons (Pack of 50)",
          "price": 299
        },
        "quantity": 2,
        "price": 299,
        "itemSubtotal": 598
      }
    ]
  }
}
```

---

### 3. Update Cart Item Quantity (`PUT /api/cart/item`)
- **URL**: `http://localhost:5000/api/cart/item`
- **Method**: `PUT`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer <user_jwt_token>`
- **Request Body**:
```json
{
  "productId": "66a7c987654321fedcba0987",
  "quantity": 5
}
```
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Cart item quantity updated successfully",
  "totalItems": 5,
  "cartTotal": 1495
}
```

---

### 4. Remove Product from Cart (`DELETE /api/cart/:productId`)
- **URL**: `http://localhost:5000/api/cart/66a7c987654321fedcba0987`
- **Method**: `DELETE`
- **Headers**:
  - `Authorization`: `Bearer <user_jwt_token>`
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Product removed from cart successfully",
  "totalItems": 0,
  "cartTotal": 0
}
```
