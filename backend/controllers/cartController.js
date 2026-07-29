const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const mongoose = require('mongoose');

/**
 * Helper function to populate full product & category details for a cart query
 */
const populateCartProducts = (query) => {
  return query.populate({
    path: 'items.product',
    select: 'name slug price originalPrice stock isActive images category',
    populate: { path: 'category', select: 'name slug image isActive' },
  });
};

/**
 * @desc    Fetch current authenticated user's shopping cart
 * @route   GET /api/cart
 * @access  Private (Authenticated User)
 */
const getCart = async (req, res, next) => {
  try {
    let cart = await populateCartProducts(Cart.findOne({ user: req.user._id }));

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    return res.status(200).json({
      success: true,
      count: cart.items.length,
      totalItems: cart.totalItems,
      cartTotal: cart.cartTotal,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add a product to user's shopping cart (or increment quantity if already exists)
 * @route   POST /api/cart
 * @access  Private (Authenticated User)
 */
const addToCart = async (req, res, next) => {
  try {
    const productId = req.body.productId || req.body.id;
    const requestedQty = Math.max(1, parseInt(req.body.quantity, 10) || 1);

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400);
      return next(new Error('Please provide a valid Product ID to add to cart'));
    }

    // Verify product exists, is active, and check stock availability
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      return next(new Error('Product not found'));
    }

    if (!product.isActive) {
      res.status(400);
      return next(new Error(`Product '${product.name}' is currently unavailable`));
    }

    if (product.stock < requestedQty) {
      res.status(400);
      return next(
        new Error(
          `Insufficient stock available for '${product.name}'. Only ${product.stock} left in stock.`
        )
      );
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId.toString()
    );

    if (existingItemIndex > -1) {
      const existingItem = cart.items[existingItemIndex];
      const newTotalQty = existingItem.quantity + requestedQty;

      if (newTotalQty > product.stock) {
        res.status(400);
        return next(
          new Error(
            `Cannot add ${requestedQty} more. Stock limit is ${product.stock}. You already have ${existingItem.quantity} in your cart.`
          )
        );
      }

      existingItem.quantity = newTotalQty;
      existingItem.price = product.price; // Update price snapshot to current selling price
    } else {
      cart.items.push({
        product: product._id,
        quantity: requestedQty,
        price: product.price,
      });
    }

    await cart.save();

    const updatedCart = await populateCartProducts(Cart.findOne({ user: req.user._id }));

    return res.status(200).json({
      success: true,
      message: 'Product added to cart successfully',
      count: updatedCart.items.length,
      totalItems: updatedCart.totalItems,
      cartTotal: updatedCart.cartTotal,
      data: updatedCart,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update quantity of an existing item in user's cart
 * @route   PUT /api/cart/item or PUT /api/cart/:productId
 * @access  Private (Authenticated User)
 */
const updateCartItemQuantity = async (req, res, next) => {
  try {
    const productId = req.params.productId || req.body.productId;
    const requestedQty = parseInt(req.body.quantity, 10);

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400);
      return next(new Error('Please provide a valid Product ID to update quantity'));
    }

    if (isNaN(requestedQty) || requestedQty < 1) {
      res.status(400);
      return next(new Error('Quantity must be at least 1'));
    }

    // Verify product & stock limits
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      return next(new Error('Product not found'));
    }

    if (requestedQty > product.stock) {
      res.status(400);
      return next(
        new Error(
          `Requested quantity (${requestedQty}) exceeds available stock of ${product.stock} for '${product.name}'.`
        )
      );
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      res.status(404);
      return next(new Error('Cart not found for this user'));
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId.toString()
    );

    if (itemIndex === -1) {
      res.status(404);
      return next(new Error('Product was not found in your cart'));
    }

    cart.items[itemIndex].quantity = requestedQty;
    cart.items[itemIndex].price = product.price;

    await cart.save();

    const updatedCart = await populateCartProducts(Cart.findOne({ user: req.user._id }));

    return res.status(200).json({
      success: true,
      message: 'Cart item quantity updated successfully',
      count: updatedCart.items.length,
      totalItems: updatedCart.totalItems,
      cartTotal: updatedCart.cartTotal,
      data: updatedCart,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Remove an item from user's shopping cart
 * @route   DELETE /api/cart/:productId or DELETE /api/cart/item
 * @access  Private (Authenticated User)
 */
const removeFromCart = async (req, res, next) => {
  try {
    const productId = req.params.productId || req.body.productId;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400);
      return next(new Error('Please provide a valid Product ID to remove from cart'));
    }

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      res.status(404);
      return next(new Error('Cart not found for this user'));
    }

    const initialCount = cart.items.length;
    cart.items = cart.items.filter((item) => item.product.toString() !== productId.toString());

    if (cart.items.length === initialCount) {
      res.status(404);
      return next(new Error('Product was not found in your cart'));
    }

    await cart.save();

    const updatedCart = await populateCartProducts(Cart.findOne({ user: req.user._id }));

    return res.status(200).json({
      success: true,
      message: 'Product removed from cart successfully',
      count: updatedCart.items.length,
      totalItems: updatedCart.totalItems,
      cartTotal: updatedCart.cartTotal,
      data: updatedCart,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Clear all items from user's shopping cart
 * @route   DELETE /api/cart/clear
 * @access  Private (Authenticated User)
 */
const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      cart.items = [];
      cart.totalItems = 0;
      cart.cartTotal = 0;
      await cart.save();
    }

    return res.status(200).json({
      success: true,
      message: 'Shopping cart cleared successfully',
      count: 0,
      totalItems: 0,
      cartTotal: 0,
      data: cart || { user: req.user._id, items: [], totalItems: 0, cartTotal: 0 },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
};
