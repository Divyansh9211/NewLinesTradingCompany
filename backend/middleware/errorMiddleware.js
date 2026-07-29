/**
 * Centralized Global Error Handling Middleware.
 * Catches all errors passed down from route handlers or other middlewares.
 * Returns a standardized JSON response format.
 */
const errorHandler = (err, req, res, next) => {
  // If response status code was not previously set to an error status code, default to 500
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;
