const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

// All Shopping Cart Routes require JWT Authentication (protect middleware)
router.use(protect);

router.get('/', getCart);
router.post('/', addToCart);
router.put('/item', updateCartItemQuantity);
router.put('/:productId', updateCartItemQuantity);
router.delete('/clear', clearCart);
router.delete('/:productId', removeFromCart);

module.exports = router;
