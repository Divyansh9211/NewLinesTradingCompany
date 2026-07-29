const mongoose = require('mongoose');

const host = 'cluster0.i3wdndl.mongodb.net';

const combinations = [
  { u: '24divyanshaggarwal01_db_user', p: 'DivAgg%4012345' },
  { u: '24divyanshaggarwal01', p: 'DivAgg%4012345' },
  { u: '24divyanshaggarwal01', p: 'DivAgg12345' },
  { u: 'divyanshaggarwal01', p: 'DivAgg%4012345' },
  { u: 'divyanshaggarwal01_db_user', p: 'DivAgg%4012345' },
  { u: 'divyanshaggarwal', p: 'DivAgg%4012345' },
  { u: 'divyansh', p: 'DivAgg%4012345' },
  { u: '24divyanshaggarwal01_db_user', p: 'DivAgg@12345' },
  { u: '24divyanshaggarwal01_db_user', p: '24divyanshaggarwal01' },
  { u: '24divyanshaggarwal01_db_user', p: 'DivAgg%254012345' },
];

(async () => {
  for (const c of combinations) {
    const uri = `mongodb+srv://${c.u}:${c.p}@${host}/party_decoration?retryWrites=true&w=majority`;
    console.log(`Testing username: ${c.u}, pass: ${c.p}...`);
    try {
      const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
      console.log(`\n========================================`);
      console.log(`SUCCESS! Connected with User: ${c.u}, Pass: ${c.p}`);
      console.log(`WORKING MONGODB_URI: ${uri}`);
      console.log(`========================================\n`);
      await mongoose.disconnect();
      process.exit(0);
    } catch (err) {
      console.log(`Failed: ${err.message}`);
    }
  }
  console.log('\nAll combinations tested.');
  process.exit(1);
})();
