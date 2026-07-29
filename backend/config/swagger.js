const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Party Decoration E-Commerce Backend API',
    version: '1.0.0',
    description:
      'Production-ready RESTful API documentation for Party Decoration E-Commerce Website. Comprehensive coverage for Authentication, User Management, Product Management, Categories, Images, Wishlist, Cart, Addresses, Checkout, Payments, Orders, Admin Analytics, Search/Filters, Coupons, and Reviews.',
    contact: {
      name: 'Party Decoration API Support',
      url: 'http://localhost:5000',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development Server',
    },
  ],
  tags: [
    { name: 'System', description: 'Health check and status endpoints' },
    { name: 'Authentication', description: 'User registration, login, profile, and password management' },
    { name: 'Products', description: 'Product catalog, search, filtering, sorting, and image management' },
    { name: 'Categories', description: 'Category management and category listings' },
    { name: 'Wishlist', description: 'User personal wishlist management' },
    { name: 'Shopping Cart', description: 'User shopping cart items and inventory validation' },
    { name: 'Addresses', description: 'User delivery and shipping address management' },
    { name: 'Checkout', description: 'Order financial breakdown and checkout summary calculator' },
    { name: 'Payments', description: 'Razorpay payment order creation and signature verification' },
    { name: 'Orders', description: 'Customer order management and order lifecycle tracking' },
    { name: 'Admin Dashboard', description: 'Real-time KPI metrics, business analytics, and user management' },
    { name: 'Coupons', description: 'Promotional discount coupon validation and administration' },
    { name: 'Reviews & Ratings', description: 'Verified purchaser ratings, reviews, and admin moderation' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token as: Bearer <your_jwt_token>',
      },
    },
    schemas: {
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: 'Error message explanation' },
        },
      },
      User: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '66a7b123456789abcdef0123' },
          name: { type: 'string', example: 'Divyansh Aggarwal' },
          email: { type: 'string', example: 'divyansh@example.com' },
          phone: { type: 'string', example: '9876543210' },
          role: { type: 'string', enum: ['user', 'admin'], example: 'user' },
          isBlocked: { type: 'boolean', example: false },
        },
      },
      Product: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '66a7c987654321fedcba0987' },
          name: { type: 'string', example: 'Golden Metallic Balloons (Pack of 50)' },
          slug: { type: 'string', example: 'golden-metallic-balloons-pack-of-50' },
          shortDescription: { type: 'string', example: 'Shiny golden balloons for birthdays' },
          description: { type: 'string', example: 'Full description of metallic balloon kit...' },
          originalPrice: { type: 'number', example: 499 },
          price: { type: 'number', example: 299 },
          stock: { type: 'number', example: 100 },
          isActive: { type: 'boolean', example: true },
          averageRating: { type: 'number', example: 4.8 },
          numReviews: { type: 'number', example: 12 },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {
    '/health': {
      get: {
        tags: ['System'],
        summary: 'Server Health Check',
        description: 'Returns backend server status, uptime, environment, and documentation links.',
        security: [],
        responses: {
          200: {
            description: 'Server is running healthily',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Party Decoration Backend API is running successfully' },
                    environment: { type: 'string', example: 'development' },
                    uptime: { type: 'number', example: 42.15 },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/auth/register': {
      post: {
        tags: ['Authentication'],
        summary: 'Register a new user account',
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                  name: { type: 'string', example: 'Divyansh Aggarwal' },
                  email: { type: 'string', example: 'divyansh@example.com' },
                  password: { type: 'string', example: 'password123' },
                  phone: { type: 'string', example: '9876543210' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'User registered successfully' },
          400: { description: 'Validation error or User already exists' },
        },
      },
    },
    '/api/auth/login': {
      post: {
        tags: ['Authentication'],
        summary: 'Login user and obtain JWT Bearer Token',
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', example: 'divyansh@example.com' },
                  password: { type: 'string', example: 'password123' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Login successful, returns token and profile data' },
          401: { description: 'Invalid credentials or blocked account' },
        },
      },
    },
    '/api/auth/profile': {
      get: {
        tags: ['Authentication'],
        summary: 'Fetch authenticated user profile details',
        responses: {
          200: { description: 'Profile details retrieved successfully' },
          401: { description: 'Not authorized' },
        },
      },
      put: {
        tags: ['Authentication'],
        summary: 'Update authenticated user profile',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'Divyansh Updated' },
                  phone: { type: 'string', example: '9876543210' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Profile updated successfully' },
          401: { description: 'Not authorized' },
        },
      },
    },
    '/api/products': {
      get: {
        tags: ['Products'],
        summary: 'Fetch all products with multi-attribute search, filter, sort, and pagination',
        security: [],
        parameters: [
          { in: 'query', name: 'search', schema: { type: 'string' }, description: 'Keyword search in name/description' },
          { in: 'query', name: 'category', schema: { type: 'string' }, description: 'Category ID or slug' },
          { in: 'query', name: 'minPrice', schema: { type: 'number' }, description: 'Minimum price filter' },
          { in: 'query', name: 'maxPrice', schema: { type: 'number' }, description: 'Maximum price filter' },
          { in: 'query', name: 'inStock', schema: { type: 'boolean' }, description: 'In-stock filter' },
          { in: 'query', name: 'sort', schema: { type: 'string', enum: ['price_asc', 'price_desc', 'newest', 'oldest', 'name_asc', 'name_desc'] }, description: 'Sort mode' },
          { in: 'query', name: 'page', schema: { type: 'integer', default: 1 }, description: 'Page number' },
          { in: 'query', name: 'limit', schema: { type: 'integer', default: 12 }, description: 'Items per page' },
        ],
        responses: {
          200: { description: 'Products retrieved successfully with pagination metadata' },
        },
      },
      post: {
        tags: ['Products'],
        summary: 'Create a new product (Admin Only)',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'category', 'shortDescription', 'description', 'originalPrice', 'price'],
                properties: {
                  name: { type: 'string', example: 'Theme Birthday Banner' },
                  category: { type: 'string', example: '66a7c0000000000000000001' },
                  shortDescription: { type: 'string', example: 'Happy Birthday Banner' },
                  description: { type: 'string', example: 'High quality glitter party banner' },
                  originalPrice: { type: 'number', example: 399 },
                  price: { type: 'number', example: 249 },
                  stock: { type: 'number', example: 50 },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Product created successfully' },
          403: { description: 'Admin access required' },
        },
      },
    },
    '/api/products/search': {
      get: {
        tags: ['Products'],
        summary: 'Dedicated Product Search Endpoint',
        security: [],
        parameters: [
          { in: 'query', name: 'q', schema: { type: 'string' }, description: 'Search term' },
          { in: 'query', name: 'page', schema: { type: 'integer', default: 1 } },
          { in: 'query', name: 'limit', schema: { type: 'integer', default: 12 } },
        ],
        responses: {
          200: { description: 'Search results returned successfully' },
        },
      },
    },
    '/api/products/{id}': {
      get: {
        tags: ['Products'],
        summary: 'Get single product by ID or Slug',
        security: [],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Product retrieved successfully' },
          404: { description: 'Product not found' },
        },
      },
      put: {
        tags: ['Products'],
        summary: 'Update product (Admin Only)',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  price: { type: 'number', example: 199 },
                  stock: { type: 'number', example: 75 },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Product updated successfully' },
          403: { description: 'Admin access required' },
        },
      },
      delete: {
        tags: ['Products'],
        summary: 'Delete product (Admin Only)',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Product deleted successfully' },
          403: { description: 'Admin access required' },
        },
      },
    },
    '/api/categories': {
      get: {
        tags: ['Categories'],
        summary: 'Get all active product categories',
        security: [],
        responses: {
          200: { description: 'Categories retrieved successfully' },
        },
      },
      post: {
        tags: ['Categories'],
        summary: 'Create category (Admin Only)',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name'],
                properties: {
                  name: { type: 'string', example: 'Balloons & Foil Combos' },
                  description: { type: 'string', example: 'All balloon decorations' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Category created successfully' },
        },
      },
    },
    '/api/wishlist': {
      get: {
        tags: ['Wishlist'],
        summary: 'Get authenticated user wishlist',
        responses: { 200: { description: 'Wishlist retrieved successfully' } },
      },
      post: {
        tags: ['Wishlist'],
        summary: 'Add product to user wishlist',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['productId'],
                properties: { productId: { type: 'string', example: '66a7c987654321fedcba0987' } },
              },
            },
          },
        },
        responses: { 200: { description: 'Product added to wishlist' } },
      },
    },
    '/api/cart': {
      get: {
        tags: ['Shopping Cart'],
        summary: 'Get user shopping cart with populated products and subtotal',
        responses: { 200: { description: 'Shopping cart retrieved' } },
      },
      post: {
        tags: ['Shopping Cart'],
        summary: 'Add product to shopping cart',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['productId', 'quantity'],
                properties: {
                  productId: { type: 'string', example: '66a7c987654321fedcba0987' },
                  quantity: { type: 'integer', example: 2 },
                },
              },
            },
          },
        },
        responses: { 200: { description: 'Item added to cart' } },
      },
    },
    '/api/checkout/summary': {
      post: {
        tags: ['Checkout'],
        summary: 'Calculate order checkout summary and apply optional coupon discount',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  addressId: { type: 'string', example: '66a7d1112223334445556667' },
                  couponCode: { type: 'string', example: 'PARTY2026' },
                },
              },
            },
          },
        },
        responses: { 200: { description: 'Checkout summary generated' } },
      },
    },
    '/api/payment/create-order': {
      post: {
        tags: ['Payments'],
        summary: 'Create Razorpay Payment Order',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: { addressId: { type: 'string' } },
              },
            },
          },
        },
        responses: { 200: { description: 'Razorpay order created successfully' } },
      },
    },
    '/api/payment/verify': {
      post: {
        tags: ['Payments'],
        summary: 'Verify Razorpay payment signature and place completed order',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['razorpayOrderId', 'razorpayPaymentId', 'razorpaySignature'],
                properties: {
                  razorpayOrderId: { type: 'string', example: 'order_9A34zvxA456' },
                  razorpayPaymentId: { type: 'string', example: 'pay_29abvzc887' },
                  razorpaySignature: { type: 'string', example: 'a1b2c3d4e5f6...' },
                  couponCode: { type: 'string', example: 'PARTY2026' },
                },
              },
            },
          },
        },
        responses: { 201: { description: 'Payment verified and order placed successfully' } },
      },
    },
    '/api/orders/my-orders': {
      get: {
        tags: ['Orders'],
        summary: 'Fetch customer placed orders list',
        responses: { 200: { description: 'Customer orders retrieved successfully' } },
      },
    },
    '/api/admin/dashboard/stats': {
      get: {
        tags: ['Admin Dashboard'],
        summary: 'Fetch real-time dashboard KPI metrics (Admin Only)',
        responses: { 200: { description: 'Dashboard metrics retrieved' } },
      },
    },
    '/api/coupons/validate': {
      post: {
        tags: ['Coupons'],
        summary: 'Validate coupon code and compute discount preview',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['couponCode', 'subtotal'],
                properties: {
                  couponCode: { type: 'string', example: 'PARTY2026' },
                  subtotal: { type: 'number', example: 1200 },
                },
              },
            },
          },
        },
        responses: { 200: { description: 'Coupon applied successfully' } },
      },
    },
    '/api/reviews/product/{productId}': {
      get: {
        tags: ['Reviews & Ratings'],
        summary: 'Fetch product reviews and 1 to 5 star rating breakdown distribution',
        security: [],
        parameters: [{ in: 'path', name: 'productId', required: true, schema: { type: 'string' } }],
        responses: { 200: { description: 'Product reviews and rating breakdown returned' } },
      },
    },
    '/api/reviews': {
      post: {
        tags: ['Reviews & Ratings'],
        summary: 'Submit product review (Requires Verified Purchase)',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['productId', 'rating', 'comment'],
                properties: {
                  productId: { type: 'string', example: '66a7c987654321fedcba0987' },
                  rating: { type: 'integer', example: 5 },
                  title: { type: 'string', example: 'Amazing quality!' },
                  comment: { type: 'string', example: 'Loved the metallic balloons for the party.' },
                },
              },
            },
          },
        },
        responses: { 201: { description: 'Review submitted successfully' } },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../routes/*.js'), path.join(__dirname, '../server.js')],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
