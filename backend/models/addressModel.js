const mongoose = require('mongoose');

const phoneRegex = /^[6-9]\d{9}$/; // Valid 10-digit Indian phone number
const pincodeRegex = /^\d{6}$/; // Valid 6-digit Indian PIN code

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required for address'],
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [phoneRegex, 'Please provide a valid 10-digit mobile number'],
    },
    alternatePhone: {
      type: String,
      trim: true,
      default: '',
    },
    street: {
      type: String,
      required: [true, 'House/Flat/Street details are required'],
      trim: true,
    },
    landmark: {
      type: String,
      trim: true,
      default: '',
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
    },
    pincode: {
      type: String,
      required: [true, 'Pincode is required'],
      trim: true,
      match: [pincodeRegex, 'Please provide a valid 6-digit PIN code'],
    },
    country: {
      type: String,
      trim: true,
      default: 'India',
    },
    addressType: {
      type: String,
      enum: {
        values: ['Home', 'Office', 'Other'],
        message: 'Address type must be Home, Office, or Other',
      },
      default: 'Home',
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
