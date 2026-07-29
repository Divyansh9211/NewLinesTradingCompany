# Party Decoration E-Commerce Backend - Phase 1 (Foundation)

This directory contains the production-ready backend foundation for the **Party Decoration E-commerce Website**, built with Node.js, Express.js, MongoDB Atlas, and Mongoose.

---

## 📁 Directory & File Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB Atlas asynchronous connection logic
├── controllers/              # Business logic controllers (Phase 2+)
├── middleware/
│   ├── errorMiddleware.js    # Global centralized error handler
│   └── notFoundMiddleware.js # 404 Route Not Found handler
├── models/                   # Mongoose data schemas (Phase 2+)
├── routes/                   # Express API endpoints (Phase 2+)
├── utils/                    # Utility functions & helpers (Phase 2+)
├── public/                   # Static assets directory
├── uploads/                  # Media upload storage directory
├── .env                      # Environment variables (ignored in Git)
├── .env.example              # Environment variables template
├── .gitignore                # Git exclusion specifications
├── package.json              # Project metadata & dependency manager
├── README.md                 # Complete technical documentation
└── server.js                 # Express application entry point
```

---

## ⚙️ Prerequisites

- **Node.js** (v16.x or higher)
- **npm** (v8.x or higher)
- **MongoDB Atlas Account** with a valid connection string URI.

---

## 🛠️ Installation & Setup

1. **Navigate to the Backend Directory**:
   ```bash
   cd backend
   ```

2. **Install Required NPM Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to create `.env`:
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your MongoDB Atlas credentials:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/party_decoration?retryWrites=true&w=majority
   ```

---

## 🚀 Running the Server

- **Development Mode (with Nodemon auto-reload)**:
  ```bash
  npm run dev
  ```

- **Production Mode**:
  ```bash
  npm start
  ```

---

## 📡 Base API Endpoints

| Method | Endpoint | Description | Expected Response |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Health Check | `{ "success": true, "message": "Party Decoration Backend API is running successfully", ... }` |
| `GET` | `/*` | Invalid Route | `{ "success": false, "message": "Route Not Found - [GET] /..." }` (Status 404) |

---

## 📦 Installed Packages

- **`express`**: Fast, unopinionated Web Framework for Node.js.
- **`mongoose`**: Elegant MongoDB object modeling for Node.js.
- **`dotenv`**: Zero-dependency module that loads environment variables from `.env`.
- **`cors`**: Express middleware for enabling Cross-Origin Resource Sharing.
- **`morgan`**: HTTP request logger middleware for Node.js.
- **`nodemon`**: Development tool that automatically restarts the server on file changes.

---

## 🎯 Phase 2 Readiness

This foundational architecture provides:
- Modular, decoupled directory layout.
- Centralized error response pipeline.
- Production-hardened MongoDB Atlas database connection logic.
- Standardized CORS & JSON body parsing middleware.
