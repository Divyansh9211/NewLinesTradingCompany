# Party Decoration E-Commerce Backend - Wishlist & Core Modules (Phase 1 to 6)

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
│   └── wishlistController.js # Wishlist Management (get, add, remove, check, clear) [NEW]
├── middleware/
│   ├── authMiddleware.js     # JWT protect & admin authorization middlewares
│   ├── errorMiddleware.js    # Global error handler
│   ├── notFoundMiddleware.js # 404 handler
│   └── uploadMiddleware.js   # Multer file validation
├── models/
│   ├── userModel.js          # User schema
│   ├── categoryModel.js      # Category schema with auto slugify hook
│   ├── productModel.js       # Product schema (with Category ObjectId ref & images array)
│   └── wishlistModel.js      # Wishlist schema (User 1-to-1 ref & Product ObjectId array) [NEW]
├── routes/
│   ├── authRoutes.js         # Auth endpoints (/api/auth)
│   ├── categoryRoutes.js     # Category endpoints (/api/categories)
│   ├── productRoutes.js      # Product endpoints (/api/products)
│   └── wishlistRoutes.js     # Wishlist endpoints (/api/wishlist) [NEW]
├── utils/
│   └── generateToken.js      # JWT signing helper
├── public/                   # Static directory
├── uploads/                  # Uploads directory
├── .env                      # Environment variables (ignored in Git)
├── .env.example              # Environment template
├── package.json              # Project dependencies
├── README.md                 # Technical documentation & testing guide
└── server.js                 # Express application entry point (mounted /api/wishlist)
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

## 📡 Wishlist Management API Endpoints (`/api/wishlist`)

All Wishlist API endpoints require JWT Authentication via `Authorization: Bearer <token>` header. Wishlists are isolated and strictly user-bound.

| Method | Endpoint | Access | Required Header | Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/wishlist` | Private | `Authorization: Bearer <token>` | Retrieve logged-in user's wishlist (populated product & category details) |
| `POST` | `/api/wishlist` | Private | `Authorization: Bearer <token>` | Add a product to logged-in user's wishlist |
| `GET` | `/api/wishlist/check/:productId` | Private | `Authorization: Bearer <token>` | Check if a specific product is in logged-in user's wishlist |
| `DELETE` | `/api/wishlist/:productId` | Private | `Authorization: Bearer <token>` | Remove a product from logged-in user's wishlist |
| `DELETE` | `/api/wishlist/clear` | Private | `Authorization: Bearer <token>` | Clear all items from logged-in user's wishlist |

---

## 🧪 Testing Guide (Thunder Client / Postman)

### 1. Add Product to Wishlist (`POST /api/wishlist`)
- **URL**: `http://localhost:5000/api/wishlist`
- **Method**: `POST`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer <user_jwt_token>`
- **Request Body**:
```json
{
  "productId": "66a7c987654321fedcba0987"
}
```
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Product added to wishlist successfully",
  "count": 1,
  "data": [
    {
      "_id": "66a7c987654321fedcba0987",
      "name": "Golden Metallic Balloons (Pack of 50)",
      "slug": "golden-metallic-balloons-pack-of-50",
      "price": 299,
      "stock": 150,
      "category": {
        "_id": "66a7d123456789abcdef0987",
        "name": "Balloons & Foil Combos",
        "slug": "balloons-and-foil-combos"
      },
      "images": [
        {
          "url": "https://res.cloudinary.com/demo/image/upload/v12345/balloon.jpg",
          "public_id": "party_decoration_products/balloon_123"
        }
      ]
    }
  ]
}
```

---

### 2. Retrieve User Wishlist (`GET /api/wishlist`)
- **URL**: `http://localhost:5000/api/wishlist`
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
      "_id": "66a7c987654321fedcba0987",
      "name": "Golden Metallic Balloons (Pack of 50)",
      "price": 299,
      "category": {
        "name": "Balloons & Foil Combos"
      }
    }
  ]
}
```

---

### 3. Check Product Wishlist Status (`GET /api/wishlist/check/:productId`)
- **URL**: `http://localhost:5000/api/wishlist/check/66a7c987654321fedcba0987`
- **Method**: `GET`
- **Headers**:
  - `Authorization`: `Bearer <user_jwt_token>`
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "productId": "66a7c987654321fedcba0987",
  "inWishlist": true
}
```

---

### 4. Remove Product from Wishlist (`DELETE /api/wishlist/:productId`)
- **URL**: `http://localhost:5000/api/wishlist/66a7c987654321fedcba0987`
- **Method**: `DELETE`
- **Headers**:
  - `Authorization`: `Bearer <user_jwt_token>`
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Product removed from wishlist successfully",
  "count": 0,
  "data": []
}
```
