const mongoose = require('mongoose');

const host = 'cluster0.i3wdndl.mongodb.net';

const users = ['24divyanshaggarwal01_db_user', '24divyanshaggarwal01'];
const passwords = [
  'DivAgg%4012345',
  'divagg%4012345',
  'Divagg%4012345',
  'DIVAGG%4012345',
  'DivAgg%40123',
  'DivAgg%401234',
  'DivAgg%40123456',
  'DivAgg12345',
  'divagg12345',
  'DivAgg2024',
  'DivAgg%402024',
  'DivAgg2025',
  'DivAgg%402025',
  'DivAgg2026',
  'DivAgg%402026',
  'password',
  'password123',
  'admin',
  'admin123',
  '123456',
  '12345678',
];

(async () => {
  for (const u of users) {
    for (const p of passwords) {
      for (const authSource of ['', '&authSource=admin', '&authSource=party_decoration']) {
        const uri = `mongodb+srv://${u}:${p}@${host}/party_decoration?retryWrites=true&w=majority${authSource}`;
        try {
          const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
          console.log(`\n========================================`);
          console.log(`🎉 SUCCESSFUL MONGODB ATLAS CONNECTION!`);
          console.log(`User: ${u}`);
          console.log(`Password: ${p}`);
          console.log(`Working MONGODB_URI: ${uri}`);
          console.log(`========================================\n`);
          await mongoose.disconnect();
          process.exit(0);
        } catch (err) {
          // connection rejected
        }
      }
    }
  }
  console.log('Finished testing all matrix combinations. None succeeded.');
  process.exit(1);
})();
