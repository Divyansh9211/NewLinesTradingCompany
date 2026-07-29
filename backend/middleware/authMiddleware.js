const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

/**
 * Authentication Middleware to protect private routes.
 * Verifies JWT token passed in Authorization header (Bearer <token>).
 * Attaches authenticated user object (excluding password) to req.user.
 */
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from header: "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];

      const secret = process.env.JWT_SECRET || 'fallback_secret_key_for_jwt_auth';

      // Verify token
      const decoded = jwt.verify(token, secret);

      // Fetch user details from database using ID in payload (exclude password)
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        res.status(401);
        return next(new Error('Not authorized. User no longer exists.'));
      }

      req.user = user;
      return next();
    } catch (error) {
      console.error(`[Auth Middleware Error] ${error.message}`);
      res.status(401);
      if (error.name === 'TokenExpiredError') {
        return next(new Error('Not authorized. Token has expired. Please log in again.'));
      }
      return next(new Error('Not authorized. Invalid or corrupted token.'));
    }
  }

  if (!token) {
    res.status(401);
    return next(new Error('Not authorized. No Bearer token provided in request header.'));
  }
};

/**
 * Authorization Middleware to restrict route access to Admin users only.
 * Must be placed after the `protect` middleware.
 */
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  res.status(403);
  return next(new Error('Access denied. Admin privileges required.'));
};

module.exports = { protect, admin };
