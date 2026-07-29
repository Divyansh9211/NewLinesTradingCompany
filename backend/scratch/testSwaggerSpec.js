const swaggerSpec = require('../config/swagger');

console.log('[Swagger Test] Spec Title:', swaggerSpec.info.title);
console.log('[Swagger Test] Total Tags:', swaggerSpec.tags ? swaggerSpec.tags.length : 0);
console.log('[Swagger Test] Total Documented Paths:', Object.keys(swaggerSpec.paths).length);

let totalOperations = 0;
Object.keys(swaggerSpec.paths).forEach((p) => {
  const methods = Object.keys(swaggerSpec.paths[p]);
  totalOperations += methods.length;
  console.log(`- Path: ${p} [${methods.join(', ').toUpperCase()}]`);
});

console.log(`\n[Swagger Test Success] Total ${totalOperations} operations loaded into OpenAPI Spec successfully!`);
