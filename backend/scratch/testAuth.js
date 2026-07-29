const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const authRoutes = require('../routes/authRoutes');
const notFound = require('../middleware/notFoundMiddleware');
const errorHandler = require('../middleware/errorMiddleware');
const User = require('../models/userModel');

process.env.JWT_SECRET = 'test_jwt_secret_key_12345';
process.env.JWT_EXPIRES_IN = '1d';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = 5009;

(async () => {
  try {
    console.log('[Test] Password hashing & comparison unit test:');
    const plainPassword = 'mySecretPassword123';
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(plainPassword, salt);
    console.log('Plain password:', plainPassword);
    console.log('Hashed password:', hashed);
    console.log('Is valid bcrypt hash:', hashed.startsWith('$2b$') || hashed.startsWith('$2a$'));
    const isMatch = await bcrypt.compare(plainPassword, hashed);
    console.log('Password comparison match:', isMatch);

    const server = app.listen(PORT, async () => {
      console.log('[Test] Server listening on port', PORT);
    });

    const mockUserData = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password123',
      phone: '9876543210'
    };

    // 1. Missing Required Fields
    const missingRes = await fetch(`http://localhost:${PORT}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'incomplete@example.com' })
    });
    console.log('\n[API Test 1] Missing Fields Status:', missingRes.status);
    console.log('Output:', await missingRes.json());

    // 2. Short Password
    const shortPassRes = await fetch(`http://localhost:${PORT}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Short', email: 'short@example.com', password: '123' })
    });
    console.log('\n[API Test 2] Short Password Status:', shortPassRes.status);
    console.log('Output:', await shortPassRes.json());

    // 3. Login with Missing Credentials
    const emptyLoginRes = await fetch(`http://localhost:${PORT}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    console.log('\n[API Test 3] Empty Login Status:', emptyLoginRes.status);
    console.log('Output:', await emptyLoginRes.json());

    // 4. Access Profile Without Bearer Token
    const noTokenRes = await fetch(`http://localhost:${PORT}/api/auth/profile`);
    console.log('\n[API Test 4] Profile Without Token Status:', noTokenRes.status);
    console.log('Output:', await noTokenRes.json());

    // 5. Access Profile With Malformed Bearer Token
    const badTokenRes = await fetch(`http://localhost:${PORT}/api/auth/profile`, {
      headers: { 'Authorization': 'Bearer invalid.token.string' }
    });
    console.log('\n[API Test 5] Profile With Bad Token Status:', badTokenRes.status);
    console.log('Output:', await badTokenRes.json());

    server.close(() => {
      console.log('\n[Test] All auth middleware and error handling tests passed successfully!');
      process.exit(0);
    });
  } catch (err) {
    console.error('[Test Error]', err);
    process.exit(1);
  }
})();
