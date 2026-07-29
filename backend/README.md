# Party Decoration E-Commerce Backend - Authentication & Foundation (Phase 1 & Phase 2)

This directory contains the production-ready backend for the **Party Decoration E-commerce Website**, built with Node.js, Express.js, MongoDB Atlas, Mongoose, bcryptjs, and JSON Web Tokens (JWT).

---

## 📁 Directory & File Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB Atlas asynchronous connection logic
├── controllers/
│   └── authController.js     # User authentication handlers (register, login, get profile)
├── middleware/
│   ├── authMiddleware.js     # JWT token protection (protect) & Admin role authorization (admin)
│   ├── errorMiddleware.js    # Global centralized error handler
│   └── notFoundMiddleware.js # 404 Route Not Found handler
├── models/
│   └── userModel.js          # Mongoose User Schema with password hashing & validation
├── routes/
│   └── authRoutes.js         # Authentication API routes (/api/auth)
├── utils/
│   └── generateToken.js      # JWT token signing utility
├── public/                   # Static assets directory
├── uploads/                  # Media upload storage directory
├── .env                      # Environment variables (ignored in Git)
├── .env.example              # Environment variables template
├── .gitignore                # Git exclusion specifications
├── package.json              # Project metadata & dependency manager
├── README.md                 # Technical documentation & testing guide
└── server.js                 # Express application entry point
```

---

## ⚙️ Prerequisites & Environment Variables

Make sure your `.env` file contains the following configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/party_decoration?retryWrites=true&w=majority

# JWT Authentication Secrets
JWT_SECRET=supersecretjwtkey_party_decoration_2026_production_ready
JWT_EXPIRES_IN=30d
```

---

## 🛠️ Installation & Execution

1. **Navigate to Backend Directory**:
   ```bash
   cd Party-Decoration-Website/backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Start Production Server**:
   ```bash
   npm start
   ```

---

## 📡 API Endpoints Documentation

### Base & Health Check Routes

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Public | System Health Check |

### Authentication & Authorization Routes (`/api/auth`)

| Method | Endpoint | Access | Header Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | None | Register a new user |
| `POST` | `/api/auth/login` | Public | None | Log in existing user & obtain JWT token |
| `GET` | `/api/auth/profile` | Protected | `Authorization: Bearer <token>` | Fetch logged-in user's profile details |

---

## 🧪 Testing Guide (Thunder Client / Postman)

### 1. User Registration (`POST /api/auth/register`)
- **URL**: `http://localhost:5000/api/auth/register`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123",
  "phone": "+19876543210"
}
```
- **Success Response (`201 Created`)**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "66a7b123456789abcdef0123",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+19876543210",
    "role": "user",
    "profileImage": "",
    "createdAt": "2026-07-29T12:00:00.000Z",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 2. User Login (`POST /api/auth/login`)
- **URL**: `http://localhost:5000/api/auth/login`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "email": "jane@example.com",
  "password": "password123"
}
```
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "User authenticated successfully",
  "data": {
    "_id": "66a7b123456789abcdef0123",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+19876543210",
    "role": "user",
    "profileImage": "",
    "createdAt": "2026-07-29T12:00:00.000Z",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 3. Fetch User Profile (`GET /api/auth/profile`)
- **URL**: `http://localhost:5000/api/auth/profile`
- **Method**: `GET`
- **Headers**: 
  - `Authorization`: `Bearer <token_received_from_login_or_registration>`
- **Success Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "User profile retrieved successfully",
  "data": {
    "_id": "66a7b123456789abcdef0123",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+19876543210",
    "role": "user",
    "profileImage": "",
    "createdAt": "2026-07-29T12:00:00.000Z",
    "updatedAt": "2026-07-29T12:00:00.000Z"
  }
}
```

---

## 🔒 Security Features Implemented

- **Password Hashing**: Passwords are automatically hashed prior to database persistence using `bcryptjs` with salt factor 10.
- **JWT Protection**: Protected routes require a valid signed token passed via HTTP Bearer scheme.
- **Data Exclusion**: User passwords are explicitly configured with `select: false` to ensure passwords are never returned in queries or API responses.
- **Duplicate Prevention**: Email addresses are sanitized, lowercased, and enforced with MongoDB unique indexing.
- **Validation**: Full validation for required fields, email format, password strength, and token expiration.
