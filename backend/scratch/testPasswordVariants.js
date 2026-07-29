const mongoose = require('mongoose');

const user = '24divyanshaggarwal01_db_user';
const host = 'cluster0.i3wdndl.mongodb.net';

const passVariants = [
  'DivAgg%4012345',
  'DivAgg12345',
  'DivAgg%401234',
  'DivAgg1234',
  'Divyansh%4012345',
  'Divyansh12345',
  'Divyansh%401234',
  'Divyansh1234',
  'divyansh%4012345',
  'divyansh12345',
  'DivAgg2026',
  'DivAgg%402026',
  'Divyansh2026',
  'Divyansh%402026',
  '24divyanshaggarwal01',
];

(async () => {
  for (const p of passVariants) {
    const uri = `mongodb+srv://${user}:${p}@${host}/party_decoration?retryWrites=true&w=majority`;
    console.log(`Testing password variant: ${p}...`);
    try {
      const c = await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
      console.log(`\nSUCCESS! Connected with password variant: ${p}`);
      console.log(`Full URI: ${uri}`);
      await mongoose.disconnect();
      process.exit(0);
    } catch (err) {
      console.log(`Failed: ${err.message}`);
    }
  }
  console.log('\nAll variants tested.');
  process.exit(1);
})();
