# Party Decoration E-Commerce Backend - Category & Product Architecture (Phase 1 to 5)

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
│   ├── categoryController.js # Category Management CRUD, search, products lookup [NEW]
│   └── productController.js  # Product Management CRUD, category populator & image controllers
├── middleware/
│   ├── authMiddleware.js     # JWT protect & admin authorization middlewares
│   ├── errorMiddleware.js    # Global error handler
│   ├── notFoundMiddleware.js # 404 handler
│   └── uploadMiddleware.js   # Multer file format & size validation
├── models/
│   ├── userModel.js          # User schema
│   ├── categoryModel.js      # Category schema with auto slugify hook [NEW]
│   └── productModel.js       # Product schema (with Category ObjectId ref & images array)
├── routes/
│   ├── authRoutes.js         # Auth endpoints (/api/auth)
│   ├── categoryRoutes.js     # Category endpoints (/api/categories) [NEW]
│   └── productRoutes.js      # Product & Image Management endpoints (/api/products)
├── utils/
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

## 📡 Category Management API Endpoints (`/api/categories`)

| Method | Endpoint | Access | Required Header | Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/categories` | Public | None | Retrieve all active categories (supports search, sort, pagination) |
| `GET` | `/api/categories/:id` | Public | None | Retrieve single category by MongoDB ID or URL slug |
| `GET` | `/api/categories/:id/products` | Public | None | Retrieve all products belonging to a specific category |
| `POST` | `/api/categories` | Admin Only | `Authorization: Bearer <admin_token>` | Create a new category (supports optional image upload) |
| `PUT` | `/api/categories/:id` | Admin Only | `Authorization: Bearer <admin_token>` | Update an existing category & image |
| `DELETE` | `/api/categories/:id` | Admin Only | `Authorization: Bearer <admin_token>` | Delete an empty category (safe deletion check) |

---

## 🔒 Safe Deletion Protection

To prevent database inconsistency and orphaned references, attempting to delete a category that currently has active linked products will return a `400 Bad Request` response:

```json
{
  "success": false,
  "message": "Cannot delete category 'Balloons'. It is currently assigned to 5 product(s). Please reassign or delete those products first."
}
```

---

## 🧪 Testing Guide (Thunder Client / Postman)

### 1. Create a Category (`POST /api/categories`) - Admin Only
- **URL**: `http://localhost:5000/api/categories`
- **Method**: `POST`
- **Headers**:
  - `Content-Type`: `application/json` (or `multipart/form-data` if uploading category image)
  - `Authorization`: `Bearer <admin_jwt_token>`
- **Request Body**:
```json
{
  "name": "Balloons & Foil Combos",
  "description": "Metallic, pastel, helium, and foil balloon decorations",
  "displayOrder": 1
}
```
- **Success Response (`201 Created`)**:
```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "_id": "66a7d123456789abcdef0987",
    "name": "Balloons & Foil Combos",
    "slug": "balloons-and-foil-combos",
    "description": "Metallic, pastel, helium, and foil balloon decorations",
    "displayOrder": 1,
    "isActive": true,
    "image": {
      "url": "",
      "public_id": ""
    },
    "createdAt": "2026-07-29T13:45:00.000Z",
    "updatedAt": "2026-07-29T13:45:00.000Z"
  }
}
```

---

### 2. Retrieve All Categories (`GET /api/categories`)
- **URL**: `http://localhost:5000/api/categories?sortBy=displayOrder`
- **Method**: `GET`
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "count": 1,
  "total": 1,
  "page": 1,
  "pages": 1,
  "data": [
    {
      "_id": "66a7d123456789abcdef0987",
      "name": "Balloons & Foil Combos",
      "slug": "balloons-and-foil-combos",
      "displayOrder": 1,
      "isActive": true
    }
  ]
}
```

---

### 3. Retrieve Products by Category (`GET /api/categories/:id/products`)
- **URL**: `http://localhost:5000/api/categories/balloons-and-foil-combos/products`
- **Method**: `GET`
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "category": {
    "_id": "66a7d123456789abcdef0987",
    "name": "Balloons & Foil Combos",
    "slug": "balloons-and-foil-combos"
  },
  "count": 1,
  "total": 1,
  "page": 1,
  "pages": 1,
  "data": [
    {
      "_id": "66a7c987654321fedcba0987",
      "name": "Golden Metallic Balloons (Pack of 50)",
      "price": 299,
      "category": {
        "_id": "66a7d123456789abcdef0987",
        "name": "Balloons & Foil Combos",
        "slug": "balloons-and-foil-combos"
      }
    }
  ]
}
```

---

### 4. Delete a Category (`DELETE /api/categories/:id`) - Admin Only
- **URL**: `http://localhost:5000/api/categories/66a7d123456789abcdef0987`
- **Method**: `DELETE`
- **Headers**:
  - `Authorization`: `Bearer <admin_jwt_token>`
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Category deleted successfully"
}
```
