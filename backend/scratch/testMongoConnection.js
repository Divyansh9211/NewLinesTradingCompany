const mongoose = require('mongoose');

const uris = [
  { label: 'Exact Prompt URI', uri: 'mongodb+srv://24divyanshaggarwal01_db_user:DivAgg%4012345@cluster0.i3wdndl.mongodb.net/party_decoration?retryWrites=true&w=majority' },
  { label: 'Without DB name', uri: 'mongodb+srv://24divyanshaggarwal01_db_user:DivAgg%4012345@cluster0.i3wdndl.mongodb.net/?retryWrites=true&w=majority' },
  { label: 'With authSource=admin', uri: 'mongodb+srv://24divyanshaggarwal01_db_user:DivAgg%4012345@cluster0.i3wdndl.mongodb.net/party_decoration?retryWrites=true&w=majority&authSource=admin' },
  { label: 'User without 01', uri: 'mongodb+srv://24divyanshaggarwal_db_user:DivAgg%4012345@cluster0.i3wdndl.mongodb.net/party_decoration?retryWrites=true&w=majority' },
  { label: 'User divyansh9211', uri: 'mongodb+srv://divyansh9211:DivAgg%4012345@cluster0.i3wdndl.mongodb.net/party_decoration?retryWrites=true&w=majority' }
];

(async () => {
  for (const item of uris) {
    console.log(`Testing ${item.label}...`);
    try {
      const c = await mongoose.connect(item.uri, { serverSelectionTimeoutMS: 4000 });
      console.log(`SUCCESS for ${item.label}! Host: ${c.connection.host}`);
      await mongoose.disconnect();
      process.exit(0);
    } catch (err) {
      console.log(`FAILED for ${item.label}: ${err.message}\n`);
    }
  }
})();
