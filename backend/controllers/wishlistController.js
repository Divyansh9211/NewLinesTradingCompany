const Wishlist = require('../models/wishlistModel');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const mongoose = require('mongoose');

/**
 * Helper function to resolve or create a product document in MongoDB
 */
const resolveProduct = async (identifier) => {
  if (!identifier) return null;

  if (mongoose.Types.ObjectId.isValid(identifier)) {
    const byId = await Product.findById(identifier);
    if (byId) return byId;
  }

  const byOther = await Product.findOne({
    $or: [
      { sku: identifier },
      { slug: String(identifier).toLowerCase() },
      { name: new RegExp(`^${identifier}$`, 'i') },
    ],
  });
  if (byOther) return byOther;

  let generalCat = await Category.findOne({ slug: 'balloons' });
  if (!generalCat) {
    generalCat = await Category.findOne({});
  }
  if (!generalCat) {
    generalCat = await Category.create({ name: 'Party Supplies', slug: 'party-supplies' });
  }

  return await Product.create({
    name: typeof identifier === 'string' ? identifier.replace(/[-_]/g, ' ') : 'Party Item',
    slug: String(identifier).toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    category: generalCat._id,
    sku: String(identifier),
    shortDescription: 'NLTC Party Item',
    description: 'High quality party decoration item',
    originalPrice: 249,
    price: 199,
    stock: 100,
    isActive: true,
    images: [{ url: 'cardballoons.png', public_id: 'default' }],
  });
};

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
    const rawProductId = req.body.productId || req.body.id;

    if (!rawProductId) {
      res.status(400);
      return next(new Error('Please provide a valid Product ID to add to wishlist'));
    }

    const product = await resolveProduct(rawProductId);
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
      (item) => item && item.toString() === product._id.toString()
    );

    if (alreadyExists) {
      const updatedWishlist = await populateWishlistProducts(
        Wishlist.findOne({ user: req.user._id })
      );
      return res.status(200).json({
        success: true,
        message: 'Product is already in your wishlist',
        count: updatedWishlist.products.length,
        data: updatedWishlist.products,
      });
    }

    wishlist.products.push(product._id);
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
    const rawProductId = req.params.productId || req.body.productId;

    if (!rawProductId) {
      res.status(400);
      return next(new Error('Please provide a valid Product ID to remove from wishlist'));
    }

    const product = await resolveProduct(rawProductId);
    const targetIdStr = product ? product._id.toString() : String(rawProductId);

    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      res.status(404);
      return next(new Error('Wishlist not found for this user'));
    }

    wishlist.products = wishlist.products.filter(
      (item) => item && item.toString() !== targetIdStr && item.toString() !== String(rawProductId)
    );

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

    if (!productId) {
      res.status(400);
      return next(new Error('Please provide a valid Product ID to check status'));
    }

    const product = await resolveProduct(productId);
    const targetIdStr = product ? product._id.toString() : String(productId);

    const wishlist = await Wishlist.findOne({ user: req.user._id });

    const inWishlist = wishlist
      ? wishlist.products.some(
          (item) => item && (item.toString() === targetIdStr || item.toString() === String(productId))
        )
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
