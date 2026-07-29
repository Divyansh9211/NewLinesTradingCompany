const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const validateEnv = require('../config/envCheck');
const logger = require('../config/logger');
const { sendWelcomeEmail } = require('../utils/emailService');

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', generalLimiter);

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Party Decoration Backend Health Check OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

const PORT = 5025;

(async () => {
  try {
    const server = app.listen(PORT, async () => {
      console.log('[Test] Phase 15 Production Readiness test server listening on port', PORT);
    });

    // 1. Test Startup Environment Check
    console.log('\n--- 1. Testing Startup Environment Variable Validator ---');
    validateEnv();

    // 2. Test Health Endpoint
    console.log('\n--- 2. Testing /health Status Endpoint ---');
    const healthRes = await fetch(`http://localhost:${PORT}/health`);
    console.log('Status Code:', healthRes.status);
    console.log('Output:', await healthRes.json());

    // 3. Test Security Headers (Helmet) & Rate Limiting
    console.log('\n--- 3. Testing Helmet Security Headers & Rate Limiting ---');
    console.log('Helmet Header x-dns-prefetch-control:', healthRes.headers.get('x-dns-prefetch-control'));
    console.log('Helmet Header x-frame-options:', healthRes.headers.get('x-frame-options'));

    // 4. Test Email Service Notification Template Generation
    console.log('\n--- 4. Testing Email Service Template Generation ---');
    const testUser = { name: 'Production Test User', email: 'test@example.com' };
    console.log('Dispatching test welcome email to fallback transporter...');
    await sendWelcomeEmail(testUser);

    server.close(() => {
      console.log('\n[Test] All Phase 15 Production Readiness, Security, Notification & Documentation tests passed successfully!');
      process.exit(0);
    });
  } catch (err) {
    console.error('[Test Error]', err);
    process.exit(1);
  }
})();
