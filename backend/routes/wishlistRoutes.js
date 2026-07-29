const express = require('express');
const router = express.Router();
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  checkWishlistStatus,
  clearWishlist,
} = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');

// All Wishlist Routes require JWT Authentication (protect middleware)
router.use(protect);

router.get('/', getWishlist);
router.post('/', addToWishlist);
router.get('/check/:productId', checkWishlistStatus);
router.delete('/clear', clearWishlist);
router.delete('/:productId', removeFromWishlist);

module.exports = router;
