const mongoose = require('mongoose');

/**
 * Establishes an asynchronous connection to MongoDB Atlas database.
 * Reads connection string from environment variables.
 * Gracefully terminates the process on failure.
 */
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      console.error('CRITICAL ERROR: MONGODB_URI is not defined in environment variables.');
      process.exit(1);
    }

    const conn = await mongoose.connect(mongoURI);

    console.log(`[Database] MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database Error] Failed to connect to MongoDB Atlas: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
