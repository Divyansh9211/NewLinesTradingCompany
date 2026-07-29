const Product = require('../models/productModel');
const mongoose = require('mongoose');
const { uploadBufferToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');

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

    const query = {};

    if (req.query.isActive !== undefined) {
      query.isActive = req.query.isActive === 'true';
    } else {
      query.isActive = true;
    }

    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: 'i' } },
        { shortDescription: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { category: { $regex: keyword, $options: 'i' } },
      ];
    }

    if (category) {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    if (subcategory) {
      query.subcategory = { $regex: new RegExp(`^${subcategory}$`, 'i') };
    }

    if (brand) {
      query.brand = { $regex: new RegExp(`^${brand}$`, 'i') };
    }

    if (isFeatured !== undefined) {
      query.isFeatured = isFeatured === 'true';
    }
    if (isTrending !== undefined) {
      query.isTrending = isTrending === 'true';
    }
    if (isBestSeller !== undefined) {
      query.isBestSeller = isBestSeller === 'true';
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined && !isNaN(Number(minPrice))) {
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice !== undefined && !isNaN(Number(maxPrice))) {
        query.price.$lte = Number(maxPrice);
      }
    }

    let sortOptions = { createdAt: -1 };

    if (sortBy === 'price-asc') {
      sortOptions = { price: 1 };
    } else if (sortBy === 'price-desc') {
      sortOptions = { price: -1 };
    } else if (sortBy === 'name-asc') {
      sortOptions = { name: 1 };
    } else if (sortBy === 'popular') {
      sortOptions = { isBestSeller: -1, isTrending: -1, createdAt: -1 };
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;

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
 * @desc    Delete a product (also removes associated Cloudinary images)
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

    // Delete all associated Cloudinary images to prevent orphaned files
    if (product.images && product.images.length > 0) {
      for (const img of product.images) {
        if (img.public_id) {
          await deleteFromCloudinary(img.public_id);
        }
      }
    }

    await product.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Product and associated Cloudinary images deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Upload image(s) to a product
 * @route   POST /api/products/:id/images
 * @access  Private/Admin
 */
const uploadProductImages = async (req, res, next) => {
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

    const files = req.files || (req.file ? [req.file] : []);

    if (files.length === 0) {
      res.status(400);
      return next(new Error('Please select at least one image file to upload'));
    }

    // Upload each buffer to Cloudinary concurrently
    const uploadPromises = files.map((file) => uploadBufferToCloudinary(file.buffer));
    const uploadedResults = await Promise.all(uploadPromises);

    // Append new image objects to existing product images array
    product.images.push(...uploadedResults);
    await product.save();

    return res.status(200).json({
      success: true,
      message: `${uploadedResults.length} image(s) uploaded successfully to Cloudinary`,
      uploadedImages: uploadedResults,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Replace all images for a product with new uploads
 * @route   PUT /api/products/:id/images
 * @access  Private/Admin
 */
const replaceProductImages = async (req, res, next) => {
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

    const files = req.files || (req.file ? [req.file] : []);

    if (files.length === 0) {
      res.status(400);
      return next(new Error('Please select replacement image files to upload'));
    }

    // Delete existing Cloudinary images
    if (product.images && product.images.length > 0) {
      for (const img of product.images) {
        if (img.public_id) {
          await deleteFromCloudinary(img.public_id);
        }
      }
    }

    // Upload new files to Cloudinary
    const uploadPromises = files.map((file) => uploadBufferToCloudinary(file.buffer));
    const uploadedResults = await Promise.all(uploadPromises);

    // Replace product images
    product.images = uploadedResults;
    await product.save();

    return res.status(200).json({
      success: true,
      message: 'Product images replaced successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a single image from a product by public_id
 * @route   DELETE /api/products/:id/images
 * @access  Private/Admin
 */
const deleteProductImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const public_id = req.body.public_id || req.query.public_id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      return next(new Error('Invalid Product ID format'));
    }

    if (!public_id) {
      res.status(400);
      return next(new Error('Please provide the public_id of the image to delete'));
    }

    const product = await Product.findById(id);
    if (!product) {
      res.status(404);
      return next(new Error('Product not found'));
    }

    // Find target image in product.images array
    const imageIndex = product.images.findIndex((img) => img.public_id === public_id);

    if (imageIndex === -1) {
      res.status(404);
      return next(new Error('Image with specified public_id not found on this product'));
    }

    // Destroy image on Cloudinary
    await deleteFromCloudinary(public_id);

    // Remove image from Mongoose array
    product.images.splice(imageIndex, 1);
    await product.save();

    return res.status(200).json({
      success: true,
      message: 'Product image deleted from Cloudinary and database successfully',
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete all images from a product
 * @route   DELETE /api/products/:id/images/all
 * @access  Private/Admin
 */
const deleteAllProductImages = async (req, res, next) => {
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

    if (product.images && product.images.length > 0) {
      for (const img of product.images) {
        if (img.public_id) {
          await deleteFromCloudinary(img.public_id);
        }
      }
      product.images = [];
      await product.save();
    }

    return res.status(200).json({
      success: true,
      message: 'All product images deleted successfully',
      data: product,
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
  uploadProductImages,
  replaceProductImages,
  deleteProductImage,
  deleteAllProductImages,
};
