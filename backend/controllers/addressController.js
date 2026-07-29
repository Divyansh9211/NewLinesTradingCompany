const Address = require('../models/addressModel');
const mongoose = require('mongoose');

const phoneRegex = /^[6-9]\d{9}$/;
const pincodeRegex = /^\d{6}$/;

/**
 * Helper to unset default status on all other user addresses
 */
const unsetOtherDefaults = async (userId, excludeAddressId = null) => {
  const filter = { user: userId };
  if (excludeAddressId) {
    filter._id = { $ne: excludeAddressId };
  }
  await Address.updateMany(filter, { isDefault: false });
};

/**
 * @desc    Fetch all addresses for current authenticated user
 * @route   GET /api/addresses
 * @access  Private (Authenticated User)
 */
const getAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.find({ user: req.user._id }).sort({
      isDefault: -1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: addresses.length,
      data: addresses,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Fetch a single address by ID
 * @route   GET /api/addresses/:id
 * @access  Private (Authenticated User)
 */
const getAddressById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      return next(new Error('Invalid Address ID format'));
    }

    const address = await Address.findOne({ _id: id, user: req.user._id });

    if (!address) {
      res.status(404);
      return next(new Error('Address not found'));
    }

    return res.status(200).json({
      success: true,
      data: address,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create a new delivery address
 * @route   POST /api/addresses
 * @access  Private (Authenticated User)
 */
const createAddress = async (req, res, next) => {
  try {
    const {
      fullName,
      phone,
      alternatePhone,
      street,
      landmark,
      city,
      state,
      pincode,
      country,
      addressType,
      isDefault,
    } = req.body;

    if (!fullName || !phone || !street || !city || !state || !pincode) {
      res.status(400);
      return next(
        new Error(
          'Please provide all required address fields: fullName, phone, street, city, state, pincode'
        )
      );
    }

    if (!phoneRegex.test(phone.trim())) {
      res.status(400);
      return next(new Error('Please provide a valid 10-digit mobile number'));
    }

    if (!pincodeRegex.test(pincode.trim())) {
      res.status(400);
      return next(new Error('Please provide a valid 6-digit postal PIN code'));
    }

    const existingCount = await Address.countDocuments({ user: req.user._id });
    const shouldBeDefault = existingCount === 0 || Boolean(isDefault);

    if (shouldBeDefault) {
      await unsetOtherDefaults(req.user._id);
    }

    const address = await Address.create({
      user: req.user._id,
      fullName: fullName.trim(),
      phone: phone.trim(),
      alternatePhone: alternatePhone ? alternatePhone.trim() : '',
      street: street.trim(),
      landmark: landmark ? landmark.trim() : '',
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
      country: country ? country.trim() : 'India',
      addressType: addressType && ['Home', 'Office', 'Other'].includes(addressType) ? addressType : 'Home',
      isDefault: shouldBeDefault,
    });

    return res.status(201).json({
      success: true,
      message: 'Delivery address created successfully',
      data: address,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an existing delivery address
 * @route   PUT /api/addresses/:id
 * @access  Private (Authenticated User)
 */
const updateAddress = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      return next(new Error('Invalid Address ID format'));
    }

    const address = await Address.findOne({ _id: id, user: req.user._id });

    if (!address) {
      res.status(404);
      return next(new Error('Address not found'));
    }

    const {
      fullName,
      phone,
      alternatePhone,
      street,
      landmark,
      city,
      state,
      pincode,
      country,
      addressType,
      isDefault,
    } = req.body;

    if (phone && !phoneRegex.test(phone.trim())) {
      res.status(400);
      return next(new Error('Please provide a valid 10-digit mobile number'));
    }

    if (pincode && !pincodeRegex.test(pincode.trim())) {
      res.status(400);
      return next(new Error('Please provide a valid 6-digit postal PIN code'));
    }

    if (isDefault === true) {
      await unsetOtherDefaults(req.user._id, address._id);
      address.isDefault = true;
    } else if (isDefault === false && address.isDefault) {
      address.isDefault = false;
    }

    if (fullName !== undefined) address.fullName = fullName.trim();
    if (phone !== undefined) address.phone = phone.trim();
    if (alternatePhone !== undefined) address.alternatePhone = alternatePhone.trim();
    if (street !== undefined) address.street = street.trim();
    if (landmark !== undefined) address.landmark = landmark.trim();
    if (city !== undefined) address.city = city.trim();
    if (state !== undefined) address.state = state.trim();
    if (pincode !== undefined) address.pincode = pincode.trim();
    if (country !== undefined) address.country = country.trim();
    if (addressType !== undefined && ['Home', 'Office', 'Other'].includes(addressType)) {
      address.addressType = addressType;
    }

    const updatedAddress = await address.save();

    return res.status(200).json({
      success: true,
      message: 'Address updated successfully',
      data: updatedAddress,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Set target address as the default address for user
 * @route   PUT /api/addresses/:id/default
 * @access  Private (Authenticated User)
 */
const setDefaultAddress = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      return next(new Error('Invalid Address ID format'));
    }

    const address = await Address.findOne({ _id: id, user: req.user._id });

    if (!address) {
      res.status(404);
      return next(new Error('Address not found'));
    }

    await unsetOtherDefaults(req.user._id, address._id);
    address.isDefault = true;
    await address.save();

    return res.status(200).json({
      success: true,
      message: 'Default delivery address updated successfully',
      data: address,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a delivery address
 * @route   DELETE /api/addresses/:id
 * @access  Private (Authenticated User)
 */
const deleteAddress = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      return next(new Error('Invalid Address ID format'));
    }

    const address = await Address.findOne({ _id: id, user: req.user._id });

    if (!address) {
      res.status(404);
      return next(new Error('Address not found'));
    }

    const wasDefault = address.isDefault;
    await address.deleteOne();

    // If deleted address was default, set newest remaining address as default
    if (wasDefault) {
      const nextDefault = await Address.findOne({ user: req.user._id }).sort({ createdAt: -1 });
      if (nextDefault) {
        nextDefault.isDefault = true;
        await nextDefault.save();
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Address deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  setDefaultAddress,
  deleteAddress,
};
