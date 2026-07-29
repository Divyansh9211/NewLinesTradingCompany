const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  replaceProductImages,
  deleteProductImage,
  deleteAllProductImages,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const { upload, handleUpload } = require('../middleware/uploadMiddleware');

// Public Product Routes
router.get('/', getProducts);
router.get('/search', getProducts);
router.get('/:id', getProductById);

// Admin Product Image Upload & Management Routes
router.post(
  '/:id/images',
  protect,
  admin,
  handleUpload(upload.array('images', 5)),
  uploadProductImages
);
router.put(
  '/:id/images',
  protect,
  admin,
  handleUpload(upload.array('images', 5)),
  replaceProductImages
);
router.delete('/:id/images/all', protect, admin, deleteAllProductImages);
router.delete('/:id/images', protect, admin, deleteProductImage);

// Admin Product CRUD Routes
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
