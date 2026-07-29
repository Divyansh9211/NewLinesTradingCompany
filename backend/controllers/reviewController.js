const Review = require('../models/reviewModel');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const mongoose = require('mongoose');
const { updateProductRatingStats } = require('../utils/ratingCalculator');

/**
 * @desc    Submit a review for a purchased product (Verified Purchase Only)
 * @route   POST /api/reviews
 * @access  Private (Authenticated User)
 */
const createReview = async (req, res, next) => {
  try {
    const { productId, rating, title, comment } = req.body;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400);
      return next(new Error('Please provide a valid Product ID'));
    }

    const numRating = Number(rating);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      res.status(400);
      return next(new Error('Please provide a valid rating between 1 and 5 stars'));
    }

    if (!comment || !comment.trim()) {
      res.status(400);
      return next(new Error('Review comment is required'));
    }

    // 1. Verify Product exists
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      return next(new Error('Product not found'));
    }

    // 2. Strict Verified Purchase Check: User must have an order containing this product
    const deliveredOrder = await Order.findOne({
      user: req.user._id,
      'items.product': productId,
      $or: [
        { orderStatus: 'Delivered' },
        { isPaid: true }
      ],
    });

    if (!deliveredOrder) {
      res.status(403);
      return next(
        new Error('Verified Purchase required. You can only review products from your delivered or completed orders.')
      );
    }

    // 3. Enforce One Review Per Product Per User
    const existingReview = await Review.findOne({
      product: productId,
      user: req.user._id,
    });

    if (existingReview) {
      res.status(400);
      return next(
        new Error('You have already submitted a review for this product. You can update your existing review.')
      );
    }

    // 4. Create Review
    const review = await Review.create({
      user: req.user._id,
      product: productId,
      order: deliveredOrder._id,
      rating: numRating,
      title: title ? title.trim() : '',
      comment: comment.trim(),
      isVerifiedPurchase: true,
    });

    // 5. Update real-time rating stats on Product model
    await updateProductRatingStats(productId);

    const populatedReview = await Review.findById(review._id)
      .populate('user', 'name email')
      .populate('product', 'name slug price images');

    return res.status(201).json({
      success: true,
      message: 'Product review submitted successfully',
      data: populatedReview,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch paginated reviews for a specific product with rating breakdown metrics
 * @route   GET /api/reviews/product/:productId
 * @access  Public
 */
const getProductReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400);
      return next(new Error('Invalid Product ID format'));
    }

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      return next(new Error('Product not found'));
    }

    const { page = 1, limit = 10, rating } = req.query;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (pageNum - 1) * limitNum;

    const queryFilter = { product: productId };
    if (rating && !isNaN(Number(rating))) {
      queryFilter.rating = Number(rating);
    }

    const totalReviews = await Review.countDocuments(queryFilter);
    const reviews = await Review.find(queryFilter)
      .populate('user', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    // Rating breakdown distribution (1 to 5 stars count)
    const ratingBreakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    const allProductReviews = await Review.find({ product: productId }).select('rating');
    allProductReviews.forEach((r) => {
      if (ratingBreakdown[r.rating] !== undefined) {
        ratingBreakdown[r.rating] += 1;
      }
    });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      totalReviews,
      totalPages: Math.ceil(totalReviews / limitNum),
      currentPage: pageNum,
      averageRating: product.averageRating || 0,
      numReviews: product.numReviews || 0,
      ratingBreakdown,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch reviews submitted by the logged-in user
 * @route   GET /api/reviews/my-reviews
 * @access  Private (Authenticated User)
 */
const getMyReviews = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (pageNum - 1) * limitNum;

    const totalReviews = await Review.countDocuments({ user: req.user._id });
    const reviews = await Review.find({ user: req.user._id })
      .populate('product', 'name slug price images averageRating numReviews')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    return res.status(200).json({
      success: true,
      count: reviews.length,
      totalReviews,
      totalPages: Math.ceil(totalReviews / limitNum),
      currentPage: pageNum,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user's own product review
 * @route   PUT /api/reviews/:id
 * @access  Private (Authenticated User)
 */
const updateReview = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      return next(new Error('Invalid Review ID format'));
    }

    const review = await Review.findById(id);
    if (!review) {
      res.status(404);
      return next(new Error('Review not found'));
    }

    if (review.user.toString() !== req.user._id.toString()) {
      res.status(403);
      return next(new Error('Access denied. You can only edit your own reviews.'));
    }

    const { rating, title, comment } = req.body;

    if (rating !== undefined) {
      const numRating = Number(rating);
      if (isNaN(numRating) || numRating < 1 || numRating > 5) {
        res.status(400);
        return next(new Error('Please provide a valid rating between 1 and 5 stars'));
      }
      review.rating = numRating;
    }

    if (title !== undefined) review.title = title.trim();
    if (comment !== undefined && comment.trim()) review.comment = comment.trim();

    await review.save();

    // Recalculate real-time rating stats
    await updateProductRatingStats(review.product);

    const updatedReview = await Review.findById(review._id)
      .populate('user', 'name email')
      .populate('product', 'name slug price images averageRating numReviews');

    return res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      data: updatedReview,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete user's own review
 * @route   DELETE /api/reviews/:id
 * @access  Private (Authenticated User)
 */
const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      return next(new Error('Invalid Review ID format'));
    }

    const review = await Review.findById(id);
    if (!review) {
      res.status(404);
      return next(new Error('Review not found'));
    }

    if (review.user.toString() !== req.user._id.toString()) {
      res.status(403);
      return next(new Error('Access denied. You can only delete your own reviews.'));
    }

    const productId = review.product;
    await review.deleteOne();

    // Recalculate real-time rating stats
    await updateProductRatingStats(productId);

    return res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch all reviews across platform for Admin
 * @route   GET /api/reviews/admin/all
 * @access  Private (Admin Only)
 */
const getAllReviewsAdmin = async (req, res, next) => {
  try {
    const { search, rating, productId, page = 1, limit = 10 } = req.query;

    const queryFilter = {};

    if (rating && !isNaN(Number(rating))) {
      queryFilter.rating = Number(rating);
    }

    if (productId && mongoose.Types.ObjectId.isValid(productId)) {
      queryFilter.product = productId;
    }

    if (search) {
      const searchRegex = new RegExp(search.trim(), 'i');
      queryFilter.$or = [{ comment: searchRegex }, { title: searchRegex }];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (pageNum - 1) * limitNum;

    const totalReviews = await Review.countDocuments(queryFilter);
    const reviews = await Review.find(queryFilter)
      .populate('user', 'name email role')
      .populate('product', 'name slug price images')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    return res.status(200).json({
      success: true,
      count: reviews.length,
      totalReviews,
      totalPages: Math.ceil(totalReviews / limitNum),
      currentPage: pageNum,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete any review by Admin (moderation)
 * @route   DELETE /api/reviews/admin/:id
 * @access  Private (Admin Only)
 */
const deleteReviewAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      return next(new Error('Invalid Review ID format'));
    }

    const review = await Review.findById(id);
    if (!review) {
      res.status(404);
      return next(new Error('Review not found'));
    }

    const productId = review.product;
    await review.deleteOne();

    // Recalculate real-time rating stats
    await updateProductRatingStats(productId);

    return res.status(200).json({
      success: true,
      message: 'Review deleted by administrator successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReview,
  getProductReviews,
  getMyReviews,
  updateReview,
  deleteReview,
  getAllReviewsAdmin,
  deleteReviewAdmin,
};
