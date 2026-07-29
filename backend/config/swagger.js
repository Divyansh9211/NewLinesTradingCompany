const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Party Decoration E-Commerce Backend API',
    version: '1.0.0',
    description:
      'Enterprise-grade RESTful API documentation for Party Decoration E-Commerce Website. Includes Authentication, Products, Categories, Wishlist, Cart, Checkout, Payments, Orders, Admin Analytics, Search/Filters, Coupons, and Reviews.',
    contact: {
      name: 'Party Decoration API Team',
      url: 'http://localhost:5000',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development Server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT Token in format: Bearer <your_jwt_token>',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js', './server.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
