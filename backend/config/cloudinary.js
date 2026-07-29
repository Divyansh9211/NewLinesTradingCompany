const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a buffer to Cloudinary using upload_stream.
 * @param {Buffer} buffer - File buffer from Multer memory storage
 * @param {string} folder - Target folder in Cloudinary (default: 'party_decoration_products')
 * @returns {Promise<{ url: string, public_id: string }>}
 */
const uploadBufferToCloudinary = (buffer, folder = 'party_decoration_products') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );
    uploadStream.end(buffer);
  });
};

/**
 * Permanently deletes an image from Cloudinary by its public_id.
 * @param {string} public_id - Cloudinary image public_id
 * @returns {Promise<object>}
 */
const deleteFromCloudinary = async (public_id) => {
  try {
    if (!public_id) return null;
    const result = await cloudinary.uploader.destroy(public_id);
    return result;
  } catch (error) {
    console.error(`[Cloudinary Delete Error] ${error.message}`);
    throw error;
  }
};

module.exports = {
  cloudinary,
  uploadBufferToCloudinary,
  deleteFromCloudinary,
};
