const Product = require('../models/productModel');
const mongoose = require('mongoose');

/**
 * @desc    Fetch all products with search, filter, sort, and pagination
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = async (req, res, next) => {
  try {
    const {
      keyword,
      category,
      subcategory,
      brand,
      isFeatured,
      isTrending,
      isBestSeller,
      minPrice,
      maxPrice,
      sortBy,
      page,
      limit,
    } = req.query;

    // Build Mongoose query filter object
    const query = {};

    // By default, fetch active products unless explicitly filtered
    if (req.query.isActive !== undefined) {
      query.isActive = req.query.isActive === 'true';
    } else {
      query.isActive = true;
    }

    // Keyword Search across Name, Short Description, and Category
    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: 'i' } },
        { shortDescription: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { category: { $regex: keyword, $options: 'i' } },
      ];
    }

    // Category Filter
    if (category) {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    // Subcategory Filter
    if (subcategory) {
      query.subcategory = { $regex: new RegExp(`^${subcategory}$`, 'i') };
    }

    // Brand Filter
    if (brand) {
      query.brand = { $regex: new RegExp(`^${brand}$`, 'i') };
    }

    // Feature Flags Filter
    if (isFeatured !== undefined) {
      query.isFeatured = isFeatured === 'true';
    }
    if (isTrending !== undefined) {
      query.isTrending = isTrending === 'true';
    }
    if (isBestSeller !== undefined) {
      query.isBestSeller = isBestSeller === 'true';
    }

    // Price Range Filter
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined && !isNaN(Number(minPrice))) {
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice !== undefined && !isNaN(Number(maxPrice))) {
        query.price.$lte = Number(maxPrice);
      }
    }

    // Sorting Configuration
    let sortOptions = { createdAt: -1 }; // default: newest first

    if (sortBy === 'price-asc') {
      sortOptions = { price: 1 };
    } else if (sortBy === 'price-desc') {
      sortOptions = { price: -1 };
    } else if (sortBy === 'name-asc') {
      sortOptions = { name: 1 };
    } else if (sortBy === 'popular') {
      sortOptions = { isBestSeller: -1, isTrending: -1, createdAt: -1 };
    }

    // Pagination Configuration
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

    // Execute Database Queries
    const total = await Product.countDocuments(query);
    const products = await Product.find(query).sort(sortOptions).skip(skip).limit(limitNum);

    const pages = Math.ceil(total / limitNum) || 1;

    return res.status(200).json({
      success: true,
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
 * @desc    Fetch a single product by ID or Slug
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let product;

    // Check if parameter is a valid Mongoose ObjectId, otherwise search by Slug
    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findById(id);
    } else {
      product = await Product.findOne({ slug: id.toLowerCase() });
    }

    if (!product) {
      res.status(404);
      return next(new Error(`Product not found with id or slug: ${id}`));
    }

    return res.status(200).json({
      success: true,
      message: 'Product retrieved successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private/Admin
 */
const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      category,
      subcategory,
      brand,
      shortDescription,
      description,
      originalPrice,
      price,
      stock,
      sku,
      isActive,
      isFeatured,
      isTrending,
      isBestSeller,
      images,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !category ||
      !shortDescription ||
      !description ||
      originalPrice === undefined ||
      price === undefined
    ) {
      res.status(400);
      return next(
        new Error(
          'Please provide all required fields: name, category, shortDescription, description, originalPrice, price'
        )
      );
    }

    // Create product
    const product = await Product.create({
      name,
      category,
      subcategory: subcategory || '',
      brand: brand || '',
      shortDescription,
      description,
      originalPrice: Number(originalPrice),
      price: Number(price),
      stock: stock !== undefined ? Number(stock) : 0,
      sku: sku || '',
      isActive: isActive !== undefined ? Boolean(isActive) : true,
      isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : false,
      isTrending: isTrending !== undefined ? Boolean(isTrending) : false,
      isBestSeller: isBestSeller !== undefined ? Boolean(isBestSeller) : false,
      images: Array.isArray(images) ? images : [],
    });

    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an existing product
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      return next(new Error('Invalid Product ID format'));
    }

    const product = await Product.findById(id);

    if (!product) {
      res.status(404);
      return next(new Error('Product not found'));
    }

    // Update fields if provided
    const fieldsToUpdate = [
      'name',
      'category',
      'subcategory',
      'brand',
      'shortDescription',
      'description',
      'originalPrice',
      'price',
      'stock',
      'sku',
      'isActive',
      'isFeatured',
      'isTrending',
      'isBestSeller',
      'images',
    ];

    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        if (field === 'originalPrice' || field === 'price' || field === 'stock') {
          product[field] = Number(req.body[field]);
        } else if (
          field === 'isActive' ||
          field === 'isFeatured' ||
          field === 'isTrending' ||
          field === 'isBestSeller'
        ) {
          product[field] = Boolean(req.body[field]);
        } else {
          product[field] = req.body[field];
        }
      }
    });

    const updatedProduct = await product.save();

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      return next(new Error('Invalid Product ID format'));
    }

    const product = await Product.findById(id);

    if (!product) {
      res.status(404);
      return next(new Error('Product not found'));
    }

    await product.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
