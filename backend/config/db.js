const mongoose = require('mongoose');

/**
 * Establishes connection to MongoDB database.
 * Reads connection string from MONGODB_URI environment variable,
 * or automatically falls back to in-memory MongoMemoryServer for development.
 */
const connectDB = async () => {
  try {
    let mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      console.log('[Database] MONGODB_URI not found. Starting in-memory MongoMemoryServer...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      mongoURI = mongoServer.getUri();
      console.log(`[Database] In-memory MongoDB running at ${mongoURI}`);
    }

    const conn = await mongoose.connect(mongoURI);

    console.log(`[Database] MongoDB Connected Successfully: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[Database Error] Failed to connect to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
