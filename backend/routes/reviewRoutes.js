const express = require('express');
const router = express.Router();
const {
  createReview,
  getProductReviews,
  getMyReviews,
  updateReview,
  deleteReview,
  getAllReviewsAdmin,
  deleteReviewAdmin,
} = require('../controllers/reviewController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public Route (Fetch product reviews and rating breakdown)
router.get('/product/:productId', getProductReviews);

// Private Customer Routes (JWT Protected)
router.post('/', protect, createReview);
router.get('/my-reviews', protect, getMyReviews);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

// Private Admin Routes (protect + admin)
router.get('/admin/all', protect, admin, getAllReviewsAdmin);
router.delete('/admin/:id', protect, admin, deleteReviewAdmin);

module.exports = router;
