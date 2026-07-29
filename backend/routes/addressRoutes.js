const express = require('express');
const router = express.Router();
const {
  getAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  setDefaultAddress,
  deleteAddress,
} = require('../controllers/addressController');
const { protect } = require('../middleware/authMiddleware');

// All Address Management Routes require JWT Authentication
router.use(protect);

router.get('/', getAddresses);
router.get('/:id', getAddressById);
router.post('/', createAddress);
router.put('/:id', updateAddress);
router.put('/:id/default', setDefaultAddress);
router.delete('/:id', deleteAddress);

module.exports = router;
