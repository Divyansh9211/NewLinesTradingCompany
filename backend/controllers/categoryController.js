const Category = require('../models/categoryModel');
const Product = require('../models/productModel');
const mongoose = require('mongoose');
const { uploadBufferToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');

/**
 * @desc    Fetch all categories with search, filter, sort, and pagination
 * @route   GET /api/categories
 * @access  Public
 */
const getCategories = async (req, res, next) => {
  try {
    const { keyword, isActive, sortBy, page, limit } = req.query;

    const query = {};

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    } else {
      query.isActive = true;
    }

    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ];
    }

    let sortOptions = { displayOrder: 1, name: 1 };

    if (sortBy === 'name-asc') {
      sortOptions = { name: 1 };
    } else if (sortBy === 'name-desc') {
      sortOptions = { name: -1 };
    } else if (sortBy === 'newest') {
      sortOptions = { createdAt: -1 };
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    const total = await Category.countDocuments(query);
    const categories = await Category.find(query).sort(sortOptions).skip(skip).limit(limitNum);

    const pages = Math.ceil(total / limitNum) || 1;

    return res.status(200).json({
      success: true,
      count: categories.length,
      total,
      page: pageNum,
      pages,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch a single category by ID or Slug
 * @route   GET /api/categories/:id
 * @access  Public
 */
const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let category;

    if (mongoose.Types.ObjectId.isValid(id)) {
      category = await Category.findById(id);
    } else {
      category = await Category.findOne({ slug: id.toLowerCase() });
    }

    if (!category) {
      res.status(404);
      return next(new Error(`Category not found with id or slug: ${id}`));
    }

    return res.status(200).json({
      success: true,
      message: 'Category retrieved successfully',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch all products belonging to a specific category
 * @route   GET /api/categories/:id/products
 * @access  Public
 */
const getCategoryProducts = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { page, limit, sortBy } = req.query;
    let category;

    if (mongoose.Types.ObjectId.isValid(id)) {
      category = await Category.findById(id);
    } else {
      category = await Category.findOne({ slug: id.toLowerCase() });
    }

    if (!category) {
      res.status(404);
      return next(new Error(`Category not found with id or slug: ${id}`));
    }

    const query = { category: category._id, isActive: true };

    let sortOptions = { createdAt: -1 };
    if (sortBy === 'price-asc') sortOptions = { price: 1 };
    if (sortBy === 'price-desc') sortOptions = { price: -1 };

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate('category', 'name slug image isActive')
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    const pages = Math.ceil(total / limitNum) || 1;

    return res.status(200).json({
      success: true,
      category: {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        image: category.image,
      },
      count: products.length,
      total,
      page: pageNum,
      pages,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new category
 * @route   POST /api/categories
 * @access  Private/Admin
 */
const createCategory = async (req, res, next) => {
  try {
    const { name, description, displayOrder, isActive } = req.body;

    if (!name) {
      res.status(400);
      return next(new Error('Category name is required'));
    }

    const trimmedName = name.trim();

    // Check if category name already exists
    const categoryExists = await Category.findOne({
      name: { $regex: new RegExp(`^${trimmedName}$`, 'i') },
    });

    if (categoryExists) {
      res.status(400);
      return next(new Error(`Category with name '${trimmedName}' already exists`));
    }

    let imageObj = { url: '', public_id: '' };

    // Upload category image to Cloudinary if file provided
    if (req.file) {
      imageObj = await uploadBufferToCloudinary(req.file.buffer, 'party_decoration_categories');
    }

    const category = await Category.create({
      name: trimmedName,
      description: description || '',
      displayOrder: displayOrder !== undefined ? Number(displayOrder) : 0,
      isActive: isActive !== undefined ? Boolean(isActive) : true,
      image: imageObj,
    });

    return res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an existing category
 * @route   PUT /api/categories/:id
 * @access  Private/Admin
 */
const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      return next(new Error('Invalid Category ID format'));
    }

    const category = await Category.findById(id);

    if (!category) {
      res.status(404);
      return next(new Error('Category not found'));
    }

    const { name, description, displayOrder, isActive } = req.body;

    // Check for duplicate category name if name is updated
    if (name && name.trim().toLowerCase() !== category.name.toLowerCase()) {
      const trimmedName = name.trim();
      const nameConflict = await Category.findOne({
        _id: { $ne: category._id },
        name: { $regex: new RegExp(`^${trimmedName}$`, 'i') },
      });

      if (nameConflict) {
        res.status(400);
        return next(new Error(`Another category with name '${trimmedName}' already exists`));
      }

      category.name = trimmedName;
    }

    if (description !== undefined) category.description = description;
    if (displayOrder !== undefined) category.displayOrder = Number(displayOrder);
    if (isActive !== undefined) category.isActive = Boolean(isActive);

    // Replace category image on Cloudinary if new image file uploaded
    if (req.file) {
      if (category.image && category.image.public_id) {
        await deleteFromCloudinary(category.image.public_id);
      }
      category.image = await uploadBufferToCloudinary(
        req.file.buffer,
        'party_decoration_categories'
      );
    }

    const updatedCategory = await category.save();

    return res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: updatedCategory,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a category safely (prevents deletion if active products are linked)
 * @route   DELETE /api/categories/:id
 * @access  Private/Admin
 */
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      return next(new Error('Invalid Category ID format'));
    }

    const category = await Category.findById(id);

    if (!category) {
      res.status(404);
      return next(new Error('Category not found'));
    }

    // Safety Check: Verify if any products are linked to this category
    const linkedProductCount = await Product.countDocuments({ category: category._id });

    if (linkedProductCount > 0) {
      res.status(400);
      return next(
        new Error(
          `Cannot delete category '${category.name}'. It is currently assigned to ${linkedProductCount} product(s). Please reassign or delete those products first.`
        )
      );
    }

    // Clean up associated Cloudinary image if present
    if (category.image && category.image.public_id) {
      await deleteFromCloudinary(category.image.public_id);
    }

    await category.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  getCategoryProducts,
  createCategory,
  updateCategory,
  deleteCategory,
};
