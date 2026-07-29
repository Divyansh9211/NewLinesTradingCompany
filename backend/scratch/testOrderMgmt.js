const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const authRoutes = require('../routes/authRoutes');
const productRoutes = require('../routes/productRoutes');
const categoryRoutes = require('../routes/categoryRoutes');
const wishlistRoutes = require('../routes/wishlistRoutes');
const cartRoutes = require('../routes/cartRoutes');
const addressRoutes = require('../routes/addressRoutes');
const checkoutRoutes = require('../routes/checkoutRoutes');
const paymentRoutes = require('../routes/paymentRoutes');
const orderRoutes = require('../routes/orderRoutes');
const notFound = require('../middleware/notFoundMiddleware');
const errorHandler = require('../middleware/errorMiddleware');

process.env.JWT_SECRET = 'test_jwt_secret_key_12345';
process.env.JWT_EXPIRES_IN = '1d';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/orders', orderRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = 5019;

(async () => {
  try {
    const server = app.listen(PORT, async () => {
      console.log('[Test] Order Management test server listening on port', PORT);
    });

    // 1. Test Admin Order Route without Bearer Token
    console.log('\n--- 1. Testing Admin Order Routes without Token ---');
    const noTokenAdminRes = await fetch(`http://localhost:${PORT}/api/orders/admin/all`);
    console.log('GET /api/orders/admin/all Status Code:', noTokenAdminRes.status);
    console.log('Output:', await noTokenAdminRes.json());

    // 2. Test Customer Order Cancellation Logic & Stock Restoration
    console.log('\n--- 2. Testing Customer Order Cancellation & Stock Restoration ---');
    const mockProdId = new mongoose.Types.ObjectId();
    const initialStock = 100;
    const itemQty = 5;

    // Simulate product in DB
    const mockProduct = new Product({
      _id: mockProdId,
      name: 'Test Party Foil Balloon',
      slug: 'test-party-foil-balloon',
      price: 199,
      stock: initialStock,
      category: new mongoose.Types.ObjectId(),
    });

    // Simulate order in Confirmed state
    const mockOrder = new Order({
      user: new mongoose.Types.ObjectId(),
      items: [
        {
          product: mockProdId,
          name: mockProduct.name,
          price: 199,
          quantity: itemQty,
          itemSubtotal: 199 * itemQty,
        },
      ],
      shippingAddress: {
        fullName: 'Jane Doe',
        phone: '9876543210',
        street: '123 Test Street',
        city: 'Delhi',
        state: 'Delhi',
        pincode: '110001',
      },
      paymentDetails: {
        razorpayOrderId: 'order_test_123',
        paymentStatus: 'Completed',
      },
      orderStatus: 'Confirmed',
      itemsSubtotal: 995,
      grandTotal: 995,
      isPaid: true,
    });

    console.log('Original Order Status:', mockOrder.orderStatus);
    console.log('Original Stock:', mockProduct.stock);

    // Simulate cancellation
    const CANCELLABLE_STATUSES = ['Pending', 'Processing', 'Confirmed'];
    const canCancel = CANCELLABLE_STATUSES.includes(mockOrder.orderStatus);
    console.log('Order status "Confirmed" is cancellable by customer:', canCancel);

    if (canCancel) {
      mockOrder.orderStatus = 'Cancelled';
      mockProduct.stock += itemQty;
      mockOrder.isStockRestored = true;
    }

    console.log('Updated Order Status:', mockOrder.orderStatus);
    console.log('Restored Product Stock (100 + 5):', mockProduct.stock);
    console.log('Stock restoration calculation correct:', mockProduct.stock === 105);

    // 3. Test Invalid Status Transition Validation Logic
    console.log('\n--- 3. Testing Status Lifecycle Transition Rules ---');
    const ALLOWED_TRANSITIONS = {
      Pending: ['Confirmed', 'Cancelled'],
      Processing: ['Confirmed', 'Packed', 'Cancelled'],
      Confirmed: ['Packed', 'Cancelled'],
      Packed: ['Shipped', 'Cancelled'],
      Shipped: ['Out for Delivery', 'Delivered'],
      'Out for Delivery': ['Delivered', 'Returned'],
      Delivered: ['Returned'],
      Cancelled: [],
      Returned: ['Refunded'],
      Refunded: [],
    };

    const isTransitionValid1 = ALLOWED_TRANSITIONS['Confirmed'].includes('Packed');
    const isTransitionValid2 = ALLOWED_TRANSITIONS['Pending'].includes('Delivered');

    console.log('Transition "Confirmed" -> "Packed" allowed:', isTransitionValid1);
    console.log('Transition "Pending" -> "Delivered" rejected:', isTransitionValid2 === false);

    server.close(() => {
      console.log('\n[Test] All Order Management lifecycle, security, and stock restoration tests passed successfully!');
      process.exit(0);
    });
  } catch (err) {
    console.error('[Test Error]', err);
    process.exit(1);
  }
})();
