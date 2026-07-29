const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product reference is required for cart item'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity cannot be less than 1'],
    default: 1,
  },
  price: {
    type: Number,
    required: [true, 'Price snapshot is required'],
    min: [0, 'Price cannot be negative'],
  },
  itemSubtotal: {
    type: Number,
    required: true,
    min: [0, 'Item subtotal cannot be negative'],
    default: 0,
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required for cart'],
      unique: true,
    },
    items: [cartItemSchema],
    totalItems: {
      type: Number,
      default: 0,
      min: 0,
    },
    cartTotal: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save middleware to automatically calculate itemSubtotal for each cart item,
 * totalItems count, and overall cartTotal.
 */
cartSchema.pre('save', function (next) {
  let totalCount = 0;
  let runningTotal = 0;

  if (this.items && this.items.length > 0) {
    this.items.forEach((item) => {
      item.itemSubtotal = Number((item.quantity * item.price).toFixed(2));
      totalCount += item.quantity;
      runningTotal += item.itemSubtotal;
    });
  }

  this.totalItems = totalCount;
  this.cartTotal = Number(runningTotal.toFixed(2));

  next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
