const Wishlist = require('../models/wishlistModel');
const Product = require('../models/productModel');
const mongoose = require('mongoose');

/**
 * Helper function to populate full product & category details for a wishlist query
 */
const populateWishlistProducts = (query) => {
  return query.populate({
    path: 'products',
    populate: { path: 'category', select: 'name slug image isActive' },
  });
};

/**
 * @desc    Fetch current authenticated user's wishlist
 * @route   GET /api/wishlist
 * @access  Private (Authenticated User)
 */
const getWishlist = async (req, res, next) => {
  try {
    let wishlist = await populateWishlistProducts(Wishlist.findOne({ user: req.user._id }));

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, products: [] });
    }

    return res.status(200).json({
      success: true,
      count: wishlist.products.length,
      data: wishlist.products,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add a product to user's wishlist
 * @route   POST /api/wishlist
 * @access  Private (Authenticated User)
 */
const addToWishlist = async (req, res, next) => {
  try {
    const productId = req.body.productId || req.body.id;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400);
      return next(new Error('Please provide a valid Product ID to add to wishlist'));
    }

    // Verify product exists in MongoDB Atlas
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      return next(new Error('Product not found'));
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user._id, products: [] });
    }

    // Prevent duplicate entries in wishlist
    const alreadyExists = wishlist.products.some(
      (item) => item.toString() === productId.toString()
    );

    if (alreadyExists) {
      res.status(400);
      return next(new Error('Product is already in your wishlist'));
    }

    wishlist.products.push(productId);
    await wishlist.save();

    const updatedWishlist = await populateWishlistProducts(
      Wishlist.findOne({ user: req.user._id })
    );

    return res.status(200).json({
      success: true,
      message: 'Product added to wishlist successfully',
      count: updatedWishlist.products.length,
      data: updatedWishlist.products,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Remove a product from user's wishlist
 * @route   DELETE /api/wishlist/:productId or DELETE /api/wishlist
 * @access  Private (Authenticated User)
 */
const removeFromWishlist = async (req, res, next) => {
  try {
    const productId = req.params.productId || req.body.productId;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400);
      return next(new Error('Please provide a valid Product ID to remove from wishlist'));
    }

    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      res.status(404);
      return next(new Error('Wishlist not found for this user'));
    }

    const initialLength = wishlist.products.length;
    wishlist.products = wishlist.products.filter(
      (item) => item.toString() !== productId.toString()
    );

    if (wishlist.products.length === initialLength) {
      res.status(404);
      return next(new Error('Product was not found in your wishlist'));
    }

    await wishlist.save();

    const updatedWishlist = await populateWishlistProducts(
      Wishlist.findOne({ user: req.user._id })
    );

    return res.status(200).json({
      success: true,
      message: 'Product removed from wishlist successfully',
      count: updatedWishlist.products.length,
      data: updatedWishlist.products,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Check whether a specific product exists in user's wishlist
 * @route   GET /api/wishlist/check/:productId
 * @access  Private (Authenticated User)
 */
const checkWishlistStatus = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400);
      return next(new Error('Please provide a valid Product ID to check status'));
    }

    const wishlist = await Wishlist.findOne({ user: req.user._id });

    const inWishlist = wishlist
      ? wishlist.products.some((item) => item.toString() === productId.toString())
      : false;

    return res.status(200).json({
      success: true,
      productId,
      inWishlist,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Clear all products from user's wishlist
 * @route   DELETE /api/wishlist/clear
 * @access  Private (Authenticated User)
 */
const clearWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (wishlist) {
      wishlist.products = [];
      await wishlist.save();
    }

    return res.status(200).json({
      success: true,
      message: 'Wishlist cleared successfully',
      count: 0,
      data: [],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  checkWishlistStatus,
  clearWishlist,
};
