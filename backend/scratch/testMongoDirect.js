const mongoose = require('mongoose');

const tests = [
  'mongodb+srv://24divyanshaggarwal01_db_user:DivAgg%4012345@cluster0.i3wdndl.mongodb.net/party_decoration?retryWrites=true&w=majority',
  'mongodb+srv://24divyanshaggarwal01_db_user:DivAgg%4012345@cluster0.i3wdndl.mongodb.net/party_decoration?retryWrites=true&w=majority&authSource=admin',
  'mongodb+srv://24divyanshaggarwal01_db_user:DivAgg%4012345@cluster0.i3wdndl.mongodb.net/party_decoration?retryWrites=true&w=majority&authSource=party_decoration',
  'mongodb://127.0.0.1:27017/party_decoration',
];

(async () => {
  for (const uri of tests) {
    console.log(`Trying: ${uri.replace(/:([^@]+)@/, ':****@')}...`);
    try {
      const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
      console.log('SUCCESS! Host:', conn.connection.host);
      await mongoose.disconnect();
      process.exit(0);
    } catch (err) {
      console.log('FAILED:', err.message);
    }
  }
})();
