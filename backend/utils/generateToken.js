const jwt = require('jsonwebtoken');

/**
 * Generates a signed JSON Web Token (JWT) for a given user ID.
 * @param {string} id - The MongoDB User ID
 * @returns {string} Signed JWT Token
 */
const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'fallback_secret_key_for_jwt_auth';
  const expiresIn = process.env.JWT_EXPIRES_IN || '30d';

  return jwt.sign({ id }, secret, {
    expiresIn,
  });
};

module.exports = generateToken;
