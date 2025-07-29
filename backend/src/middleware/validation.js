// backend/src/middleware/validation.js
const { body, query, param } = require('express-validator');

// Auth validation
exports.validateRegister = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  
  body('phone')
    .matches(/^\d{10,15}$/)
    .withMessage('Phone number must be 10-15 digits'),
  
  body('role')
    .optional()
    .isIn(['buyer', 'seller'])
    .withMessage('Role must be either buyer or seller')
];

exports.validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Product validation
exports.validateProduct = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  
  body('price')
    .isFloat({ min: 0, max: 10000 })
    .withMessage('Price must be between 0 and 10000'),
  
  body('originalPrice')
    .isFloat({ min: 0, max: 10000 })
    .withMessage('Original price must be between 0 and 10000')
    .custom((value, { req }) => {
      if (parseFloat(value) < parseFloat(req.body.price)) {
        throw new Error('Original price must be greater than or equal to selling price');
      }
      return true;
    }),
  
  body('size')
    .isIn(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'])
    .withMessage('Size must be one of: XS, S, M, L, XL, XXL, One Size'),
  
  body('condition')
    .isIn(['excellent', 'good', 'fair'])
    .withMessage('Condition must be one of: excellent, good, fair'),
  
  body('brand')
    .trim()
    .notEmpty()
    .withMessage('Brand is required')
    .isLength({ max: 50 })
    .withMessage('Brand cannot exceed 50 characters'),
  
  body('color')
    .trim()
    .notEmpty()
    .withMessage('Color is required')
    .isLength({ max: 30 })
    .withMessage('Color cannot exceed 30 characters'),
  
  body('category')
    .isMongoId()
    .withMessage('Valid category ID is required'),
  
  body('images')
    .isArray({ min: 1 })
    .withMessage('At least one image is required')
    .custom((images) => {
      for (const image of images) {
        if (!image.match(/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i)) {
          throw new Error('Each image must be a valid URL ending in jpg, jpeg, png, webp, or gif');
        }
      }
      return true;
    })
];

// Order validation
exports.validateOrder = [
  body('product')
    .isMongoId()
    .withMessage('Valid product ID is required'),
  
  body('quantity')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('Quantity must be between 1 and 10'),
  
  body('paymentMethod')
    .isIn(['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'cash_on_delivery'])
    .withMessage('Invalid payment method'),
  
  body('shippingAddress.fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required for shipping'),
  
  body('shippingAddress.street')
    .trim()
    .notEmpty()
    .withMessage('Street address is required'),
  
  body('shippingAddress.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  
  body('shippingAddress.state')
    .trim()
    .notEmpty()
    .withMessage('State is required'),
  
  body('shippingAddress.zipCode')
    .trim()
    .notEmpty()
    .withMessage('ZIP code is required'),
  
  body('shippingAddress.phone')
    .matches(/^\d{10,15}$/)
    .withMessage('Valid phone number is required for shipping')
];

// Query validation
exports.validateQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be non-negative'),
  
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be non-negative'),
  
  query('size')
    .optional()
    .isIn(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'])
    .withMessage('Invalid size'),
  
  query('condition')
    .optional()
    .isIn(['excellent', 'good', 'fair'])
    .withMessage('Invalid condition'),
  
  query('sortBy')
    .optional()
    .isIn(['createdAt', 'price', 'views', 'title'])
    .withMessage('Invalid sort field'),
  
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc')
];

// Parameter validation
exports.validateObjectId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid ID format')
];
