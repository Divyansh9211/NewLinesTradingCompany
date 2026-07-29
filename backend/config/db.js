const mongoose = require('mongoose');

/**
 * Establishes connection to MongoDB Atlas database.
 * Reads connection string from MONGODB_URI environment variable.
 */
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      console.error('[Database Error] MONGODB_URI is not defined in environment variables.');
      process.exit(1);
    }

    const conn = await mongoose.connect(mongoURI);

    console.log('MongoDB Connected Successfully');
    return conn;
  } catch (error) {
    console.error(`[Database Error] Failed to connect to MongoDB Atlas: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
