const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, phone, role, profileImage } = req.body;

    // Validate required input fields
    if (!name || !email || !password) {
      res.status(400);
      return next(new Error('Please provide all required fields: name, email, and password'));
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      res.status(400);
      return next(new Error('Please provide a valid email address'));
    }

    // Validate password length
    if (password.length < 6) {
      res.status(400);
      return next(new Error('Password must be at least 6 characters long'));
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      res.status(400);
      return next(new Error('User with this email already exists'));
    }

    // Create user in MongoDB
    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
      phone: phone || '',
      role: role && ['user', 'admin'].includes(role) ? role : 'user',
      profileImage: profileImage || '',
    });

    if (user) {
      const token = generateToken(user._id);

      // Trigger Welcome Email asynchronously in background (non-blocking)
      const { sendWelcomeEmail } = require('../utils/emailService');
      sendWelcomeEmail(user).catch((e) => console.error('[Background Email Error]', e.message));

      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          profileImage: user.profileImage,
          createdAt: user.createdAt,
          token,
        },
      });
    } else {
      res.status(400);
      return next(new Error('Invalid user data received'));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Authenticate user & get JWT token (Login)
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate required input fields
    if (!email || !password) {
      res.status(400);
      return next(new Error('Please provide both email and password'));
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Find user by email and explicitly include password field for verification
    const user = await User.findOne({ email: normalizedEmail }).select('+password');

    // Verify user presence and password match
    if (user && (await user.matchPassword(password))) {
      if (user.isBlocked) {
        res.status(403);
        return next(
          new Error('Your account has been blocked by an administrator. Please contact support.')
        );
      }

      const token = generateToken(user._id);

      return res.status(200).json({
        success: true,
        message: 'User authenticated successfully',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          profileImage: user.profileImage,
          createdAt: user.createdAt,
          token,
        },
      });
    } else {
      res.status(401);
      return next(new Error('Invalid email or password'));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get logged in user profile
 * @route   GET /api/auth/profile
 * @access  Private
 */
const getUserProfile = async (req, res, next) => {
  try {
    // req.user is populated by protect middleware
    const user = req.user;

    if (user) {
      return res.status(200).json({
        success: true,
        message: 'User profile retrieved successfully',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          profileImage: user.profileImage,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } else {
      res.status(404);
      return next(new Error('User profile not found'));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
