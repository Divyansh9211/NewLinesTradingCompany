const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategoryById,
  getCategoryProducts,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { protect, admin } = require('../middleware/authMiddleware');
const { upload, handleUpload } = require('../middleware/uploadMiddleware');

// Public Category Routes
router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.get('/:id/products', getCategoryProducts);

// Admin Protected Category CRUD & Image Upload Routes
router.post('/', protect, admin, handleUpload(upload.single('image')), createCategory);
router.put('/:id', protect, admin, handleUpload(upload.single('image')), updateCategory);
router.delete('/:id', protect, admin, deleteCategory);

module.exports = router;
