require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/userModel');

(async () => {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected Successfully');

    const testEmail = `test_query_${Date.now()}@example.com`;
    console.log(`Executing User.findOne({ email: '${testEmail}' })...`);
    const found = await User.findOne({ email: testEmail });
    console.log('User.findOne() Result:', found);

    console.log('\nDB Query Executed Successfully without buffering timeout!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('DB Operation Error:', err);
    process.exit(1);
  }
})();
