const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const mongoose = require('mongoose');
const { uploadBufferToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');

/**
 * Helper function to resolve category ID from ObjectId, slug, or name
 */
const resolveCategoryId = async (categoryInput) => {
  if (!categoryInput) return null;

  if (mongoose.Types.ObjectId.isValid(categoryInput)) {
    const cat = await Category.findById(categoryInput);
    if (cat) return cat._id;
  }

  const catObj = await Category.findOne({
    $or: [
      { slug: String(categoryInput).toLowerCase() },
      { name: { $regex: new RegExp(`^${categoryInput}$`, 'i') } },
    ],
  });

  return catObj ? catObj._id : null;
};

/**
 * @desc    Fetch all products with multi-attribute search, filtering, sorting, and pagination
 * @route   GET /api/products or GET /api/products/search
 * @access  Public
 */
const getProducts = async (req, res, next) => {
  try {
    const {
      keyword,
      search,
      q,
      category,
      subcategory,
      brand,
      isFeatured,
      isTrending,
      isBestSeller,
      inStock,
      minPrice,
      maxPrice,
      sortBy,
      sort,
      page,
      limit,
    } = req.query;

    const query = {};

    // Active status filter (defaults to true for public endpoint)
    if (req.query.isActive !== undefined) {
      query.isActive = req.query.isActive === 'true';
    } else {
      query.isActive = true;
    }

    // Search query resolution (search, q, keyword)
    const searchTerm = (search || q || keyword || '').trim();
    if (searchTerm) {
      const searchRegex = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      query.$or = [
        { name: searchRegex },
        { shortDescription: searchRegex },
        { description: searchRegex },
        { slug: searchRegex },
        { brand: searchRegex },
        { subcategory: searchRegex },
      ];
    }

    // Category filter (supports ObjectId or slug/name)
    if (category) {
      const catId = await resolveCategoryId(category);
      if (catId) {
        query.category = catId;
      } else {
        // If an invalid category slug is provided, return empty paginated result
        return res.status(200).json({
          success: true,
          count: 0,
          totalProducts: 0,
          totalPages: 0,
          currentPage: 1,
          pageSize: parseInt(limit, 10) || 12,
          hasNextPage: false,
          hasPrevPage: false,
          nextPage: null,
          prevPage: null,
          data: [],
        });
      }
    }

    if (subcategory) {
      query.subcategory = { $regex: new RegExp(`^${subcategory.trim()}$`, 'i') };
    }

    if (brand) {
      query.brand = { $regex: new RegExp(`^${brand.trim()}$`, 'i') };
    }

    // Stock availability filter
    if (inStock !== undefined) {
      const stockBool = String(inStock).toLowerCase() === 'true';
      if (stockBool) {
        query.stock = { $gt: 0 };
      } else {
        query.stock = 0;
      }
    }

    // Attribute flags
    if (isFeatured !== undefined) {
      query.isFeatured = isFeatured === 'true';
    }
    if (isTrending !== undefined) {
      query.isTrending = isTrending === 'true';
    }
    if (isBestSeller !== undefined) {
      query.isBestSeller = isBestSeller === 'true';
    }

    // Price range filter with validation
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      const minVal = minPrice !== undefined && !isNaN(Number(minPrice)) ? Number(minPrice) : null;
      const maxVal = maxPrice !== undefined && !isNaN(Number(maxPrice)) ? Number(maxPrice) : null;

      if (minVal !== null && maxVal !== null && minVal > maxVal) {
        res.status(400);
        return next(
          new Error(
            `Invalid price range: minPrice (${minVal}) cannot be greater than maxPrice (${maxVal}).`
          )
        );
      }

      if (minVal !== null && minVal >= 0) {
        query.price.$gte = minVal;
      }
      if (maxVal !== null && maxVal >= 0) {
        query.price.$lte = maxVal;
      }
    }

    // Sorting Modes
    let sortOptions = { createdAt: -1 }; // Default: Newest first
    const sortVal = (sort || sortBy || '').toLowerCase();

    if (sortVal === 'price_asc' || sortVal === 'price-asc' || sortVal === 'price-low-high') {
      sortOptions = { price: 1 };
    } else if (sortVal === 'price_desc' || sortVal === 'price-desc' || sortVal === 'price-high-low') {
      sortOptions = { price: -1 };
    } else if (sortVal === 'name_asc' || sortVal === 'name-asc' || sortVal === 'a-z') {
      sortOptions = { name: 1 };
    } else if (sortVal === 'name_desc' || sortVal === 'name-desc' || sortVal === 'z-a') {
      sortOptions = { name: -1 };
    } else if (sortVal === 'oldest') {
      sortOptions = { createdAt: 1 };
    } else if (sortVal === 'newest') {
      sortOptions = { createdAt: -1 };
    } else if (sortVal === 'popular' || sortVal === 'bestselling') {
      sortOptions = { isBestSeller: -1, isTrending: -1, createdAt: -1 };
    }

    // Pagination calculations
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10) || 12));
    const skip = (pageNum - 1) * limitNum;

    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate('category', 'name slug image isActive')
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    const totalPages = Math.ceil(totalProducts / limitNum) || 0;
    const hasNextPage = pageNum < totalPages;
    const hasPrevPage = pageNum > 1;

    return res.status(200).json({
      success: true,
      count: products.length,
      totalProducts,
      totalPages,
      currentPage: pageNum,
      pageSize: limitNum,
      hasNextPage,
      hasPrevPage,
      nextPage: hasNextPage ? pageNum + 1 : null,
      prevPage: hasPrevPage ? pageNum - 1 : null,
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
      product = await Product.findById(id).populate('category', 'name slug image isActive');
    } else {
      product = await Product.findOne({ slug: id.toLowerCase() }).populate(
        'category',
        'name slug image isActive'
      );
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

    const categoryId = await resolveCategoryId(category);
    if (!categoryId) {
      res.status(400);
      return next(new Error(`Invalid category provided: '${category}'. Category does not exist.`));
    }

    const product = await Product.create({
      name,
      category: categoryId,
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

    const populatedProduct = await Product.findById(product._id).populate(
      'category',
      'name slug image isActive'
    );

    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: populatedProduct,
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

    if (req.body.category !== undefined) {
      const categoryId = await resolveCategoryId(req.body.category);
      if (!categoryId) {
        res.status(400);
        return next(
          new Error(`Invalid category provided: '${req.body.category}'. Category does not exist.`)
        );
      }
      product.category = categoryId;
    }

    const fieldsToUpdate = [
      'name',
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

    await product.save();
    const updatedProduct = await Product.findById(product._id).populate(
      'category',
      'name slug image isActive'
    );

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

    const uploadPromises = files.map((file) => uploadBufferToCloudinary(file.buffer));
    const uploadedResults = await Promise.all(uploadPromises);

    product.images.push(...uploadedResults);
    await product.save();

    const populatedProduct = await Product.findById(product._id).populate(
      'category',
      'name slug image isActive'
    );

    return res.status(200).json({
      success: true,
      message: `${uploadedResults.length} image(s) uploaded successfully to Cloudinary`,
      uploadedImages: uploadedResults,
      data: populatedProduct,
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

    if (product.images && product.images.length > 0) {
      for (const img of product.images) {
        if (img.public_id) {
          await deleteFromCloudinary(img.public_id);
        }
      }
    }

    const uploadPromises = files.map((file) => uploadBufferToCloudinary(file.buffer));
    const uploadedResults = await Promise.all(uploadPromises);

    product.images = uploadedResults;
    await product.save();

    const populatedProduct = await Product.findById(product._id).populate(
      'category',
      'name slug image isActive'
    );

    return res.status(200).json({
      success: true,
      message: 'Product images replaced successfully',
      data: populatedProduct,
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

    const imageIndex = product.images.findIndex((img) => img.public_id === public_id);

    if (imageIndex === -1) {
      res.status(404);
      return next(new Error('Image with specified public_id not found on this product'));
    }

    await deleteFromCloudinary(public_id);
    product.images.splice(imageIndex, 1);
    await product.save();

    const populatedProduct = await Product.findById(product._id).populate(
      'category',
      'name slug image isActive'
    );

    return res.status(200).json({
      success: true,
      message: 'Product image deleted from Cloudinary and database successfully',
      data: populatedProduct,
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

    const populatedProduct = await Product.findById(product._id).populate(
      'category',
      'name slug image isActive'
    );

    return res.status(200).json({
      success: true,
      message: 'All product images deleted successfully',
      data: populatedProduct,
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
