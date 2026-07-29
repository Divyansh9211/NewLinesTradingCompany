# Party Decoration E-Commerce Backend - Product Management & Foundation (Phase 1, 2, & 3)

This directory contains the production-ready backend for the **Party Decoration E-commerce Website**, built with Node.js, Express.js, MongoDB Atlas, Mongoose, bcryptjs, JWT authentication, and slugify.

---

## 📁 Directory & File Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB Atlas asynchronous connection logic
├── controllers/
│   ├── authController.js     # User Authentication (register, login, profile)
│   └── productController.js  # Product Management CRUD, search, filter, sort, pagination [NEW]
├── middleware/
│   ├── authMiddleware.js     # JWT Protect & Admin Authorization middlewares
│   ├── errorMiddleware.js    # Global centralized error handler
│   └── notFoundMiddleware.js # 404 Route Not Found handler
├── models/
│   ├── userModel.js          # Mongoose User Schema with password hashing
│   └── productModel.js       # Mongoose Product Schema with auto slugify hook [NEW]
├── routes/
│   ├── authRoutes.js         # Authentication API routes (/api/auth)
│   └── productRoutes.js      # Product Management API routes (/api/products) [NEW]
├── utils/
│   └── generateToken.js      # JWT signing helper
├── public/                   # Static assets directory
├── uploads/                  # Media upload storage directory
├── .env                      # Environment variables (ignored in Git)
├── .env.example              # Environment variables template
├── .gitignore                # Git exclusion rules
├── package.json              # Project metadata & dependencies
├── README.md                 # Technical documentation & testing guide
└── server.js                 # Express application entry point
```

---

## ⚙️ Environment Variables

Ensure your `.env` file contains the following variables:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/party_decoration?retryWrites=true&w=majority
JWT_SECRET=supersecretjwtkey_party_decoration_2026_production_ready
JWT_EXPIRES_IN=30d
```

---

## 🛠️ Installation & Execution

```bash
cd Party-Decoration-Website/backend

# Install dependencies
npm install

# Start Development Server (with Nodemon auto-reload)
npm run dev

# Start Production Server
npm start
```

---

## 📡 Product Management API Endpoints (`/api/products`)

| Method | Endpoint | Access | Required Header | Description |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Public | None | Retrieve all products (supports search, filter, sort, pagination) |
| `GET` | `/api/products/:id` | Public | None | Retrieve a single product by MongoDB ID or URL Slug |
| `POST` | `/api/products` | Private (Admin) | `Authorization: Bearer <admin_token>` | Create a new product |
| `PUT` | `/api/products/:id` | Private (Admin) | `Authorization: Bearer <admin_token>` | Update an existing product |
| `DELETE` | `/api/products/:id` | Private (Admin) | `Authorization: Bearer <admin_token>` | Delete a product |

---

## 🔍 Query Parameters for `GET /api/products`

| Parameter | Type | Example | Description |
| :--- | :--- | :--- | :--- |
| `keyword` | String | `?keyword=balloon` | Search term matching product name, category, or description |
| `category` | String | `?category=Balloons` | Filter products by exact category |
| `subcategory`| String | `?subcategory=Foil` | Filter products by subcategory |
| `brand` | String | `?brand=PartyPro` | Filter products by brand |
| `minPrice` | Number | `?minPrice=100` | Minimum price threshold |
| `maxPrice` | Number | `?maxPrice=500` | Maximum price threshold |
| `isFeatured` | Boolean | `?isFeatured=true` | Filter featured products |
| `isTrending` | Boolean | `?isTrending=true` | Filter trending products |
| `isBestSeller`| Boolean | `?isBestSeller=true`| Filter best seller products |
| `sortBy` | String | `?sortBy=price-asc` | Sorting mode (`price-asc`, `price-desc`, `name-asc`, `popular`, `newest`) |
| `page` | Number | `?page=1` | Page number for pagination (default: `1`) |
| `limit` | Number | `?limit=10` | Products per page (default: `10`, max: `100`) |

---

## 🧪 Testing Guide (Thunder Client / Postman)

### 1. Create a Product (`POST /api/products`) - Admin Only
- **URL**: `http://localhost:5000/api/products`
- **Method**: `POST`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer <admin_jwt_token>`
- **Request Body**:
```json
{
  "name": "Golden Metallic Balloons (Pack of 50)",
  "category": "Balloons",
  "subcategory": "Metallic",
  "brand": "PartyMagic",
  "shortDescription": "Premium shiny golden balloons for birthday and anniversary decor",
  "description": "High quality 12-inch metallic latex balloons. Durable, helium-compatible, and perfect for creating festive balloon arches.",
  "originalPrice": 499,
  "price": 299,
  "stock": 150,
  "sku": "BAL-GLD-50",
  "isFeatured": true,
  "isBestSeller": true,
  "images": [
    "https://example.com/images/golden-balloon-1.png",
    "https://example.com/images/golden-balloon-2.png"
  ]
}
```
- **Success Response (`201 Created`)**:
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "66a7c987654321fedcba0987",
    "name": "Golden Metallic Balloons (Pack of 50)",
    "slug": "golden-metallic-balloons-pack-of-50",
    "category": "Balloons",
    "subcategory": "Metallic",
    "brand": "PartyMagic",
    "shortDescription": "Premium shiny golden balloons for birthday and anniversary decor",
    "description": "High quality 12-inch metallic latex balloons. Durable, helium-compatible, and perfect for creating festive balloon arches.",
    "originalPrice": 499,
    "price": 299,
    "stock": 150,
    "sku": "BAL-GLD-50",
    "isActive": true,
    "isFeatured": true,
    "isTrending": false,
    "isBestSeller": true,
    "images": [
      "https://example.com/images/golden-balloon-1.png",
      "https://example.com/images/golden-balloon-2.png"
    ],
    "createdAt": "2026-07-29T13:00:00.000Z",
    "updatedAt": "2026-07-29T13:00:00.000Z"
  }
}
```

---

### 2. Retrieve All Products with Search & Filters (`GET /api/products`)
- **URL**: `http://localhost:5000/api/products?category=Balloons&minPrice=100&sortBy=price-asc&page=1&limit=10`
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
      "_id": "66a7c987654321fedcba0987",
      "name": "Golden Metallic Balloons (Pack of 50)",
      "slug": "golden-metallic-balloons-pack-of-50",
      "category": "Balloons",
      "price": 299,
      "stock": 150,
      "images": ["https://example.com/images/golden-balloon-1.png"]
    }
  ]
}
```

---

### 3. Retrieve Product by ID or Slug (`GET /api/products/:id`)
- **URL**: `http://localhost:5000/api/products/golden-metallic-balloons-pack-of-50`
- **Method**: `GET`
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {
    "_id": "66a7c987654321fedcba0987",
    "name": "Golden Metallic Balloons (Pack of 50)",
    "slug": "golden-metallic-balloons-pack-of-50",
    "category": "Balloons",
    "price": 299,
    "stock": 150
  }
}
```

---

### 4. Update Product (`PUT /api/products/:id`) - Admin Only
- **URL**: `http://localhost:5000/api/products/66a7c987654321fedcba0987`
- **Method**: `PUT`
- **Headers**:
  - `Content-Type`: `application/json`
  - `Authorization`: `Bearer <admin_jwt_token>`
- **Request Body**:
```json
{
  "price": 249,
  "stock": 200,
  "isTrending": true
}
```
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "_id": "66a7c987654321fedcba0987",
    "price": 249,
    "stock": 200,
    "isTrending": true
  }
}
```

---

### 5. Delete Product (`DELETE /api/products/:id`) - Admin Only
- **URL**: `http://localhost:5000/api/products/66a7c987654321fedcba0987`
- **Method**: `DELETE`
- **Headers**:
  - `Authorization`: `Bearer <admin_jwt_token>`
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```
