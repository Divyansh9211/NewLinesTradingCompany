const multer = require('multer');

// Memory storage buffer for stream uploading directly to Cloudinary
const storage = multer.memoryStorage();

// File filter restricting uploads to valid image mime-types
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Invalid file format: ${file.originalname}. Only image formats (jpg, jpeg, png, webp) are allowed!`
      ),
      false
    );
  }
};

// Multer upload configuration
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB per file
  },
});

/**
 * Express middleware wrapper to handle Multer validation errors gracefully.
 */
const handleUpload = (multerMiddleware) => {
  return (req, res, next) => {
    multerMiddleware(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        res.status(400);
        if (err.code === 'LIMIT_FILE_SIZE') {
          return next(new Error('File too large! Maximum file size allowed is 5MB per image.'));
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
          return next(new Error('Too many files! Maximum limit is 5 images per request.'));
        }
        return next(new Error(`Upload Error: ${err.message}`));
      } else if (err) {
        res.status(400);
        return next(err);
      }
      next();
    });
  };
};

module.exports = {
  upload,
  handleUpload,
};
