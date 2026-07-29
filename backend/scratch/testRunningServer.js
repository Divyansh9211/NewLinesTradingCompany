(async () => {
  try {
    const healthRes = await fetch('http://localhost:5000/health');
    console.log('GET http://localhost:5000/health Status:', healthRes.status);
    console.log('Health Output:', await healthRes.json());

    const swaggerRes = await fetch('http://localhost:5000/api-docs/');
    console.log('GET http://localhost:5000/api-docs Status:', swaggerRes.status);
    console.log('Swagger HTML length:', (await swaggerRes.text()).length);
  } catch (err) {
    console.error('Server connection error:', err.message);
  }
})();
