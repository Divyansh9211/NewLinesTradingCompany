/**
 * Startup Environment Variables Validation Module
 */
const validateEnv = () => {
  const requiredVars = ['PORT', 'MONGODB_URI', 'JWT_SECRET'];
  const missingVars = [];

  requiredVars.forEach((key) => {
    if (!process.env[key] || String(process.env[key]).trim() === '') {
      missingVars.push(key);
    }
  });

  if (missingVars.length > 0) {
    console.warn(`[Env Check Warning] Missing required environment variables: ${missingVars.join(', ')}`);
  } else {
    console.log('[Env Check Success] All core environment variables validated successfully.');
  }

  // Recommended Production Variables Checklist
  const recommendedVars = [
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
    'RAZORPAY_KEY_ID',
    'RAZORPAY_KEY_SECRET',
    'SMTP_HOST',
    'SMTP_USER',
  ];

  const missingRecommended = recommendedVars.filter((key) => !process.env[key]);
  if (missingRecommended.length > 0) {
    console.log(`[Env Check Info] Optional / Third-party service variables not set: ${missingRecommended.join(', ')} (fallback modes active)`);
  }
};

module.exports = validateEnv;
