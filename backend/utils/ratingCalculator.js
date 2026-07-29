const Review = require('../models/reviewModel');
const Product = require('../models/productModel');
const mongoose = require('mongoose');

/**
 * Recalculates average rating and total review count for a product
 * and updates the Product model in real-time.
 *
 * @param {string|ObjectId} productId
 * @returns {Promise<void>}
 */
const updateProductRatingStats = async (productId) => {
  if (!productId || !mongoose.Types.ObjectId.isValid(productId)) return;

  const prodId = new mongoose.Types.ObjectId(productId);

  const stats = await Review.aggregate([
    { $match: { product: prodId } },
    {
      $group: {
        _id: '$product',
        numReviews: { $sum: 1 },
        averageRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats && stats.length > 0) {
    const avg = Number(stats[0].averageRating.toFixed(1));
    const count = stats[0].numReviews;

    await Product.findByIdAndUpdate(productId, {
      averageRating: avg,
      numReviews: count,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      averageRating: 0,
      numReviews: 0,
    });
  }
};

module.exports = {
  updateProductRatingStats,
};
