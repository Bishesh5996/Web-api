// backend/src/utils/helpers.js
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Generate JWT token
exports.generateToken = (userId, expiresIn = '7d') => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'fallback_secret',
    { expiresIn }
  );
};

// Generate random string
exports.generateRandomString = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

// Calculate discount percentage
exports.calculateDiscount = (originalPrice, currentPrice) => {
  if (!originalPrice || !currentPrice || originalPrice <= currentPrice) {
    return 0;
  }
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

// Format price
exports.formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(price);
};

// Validate image URL
exports.isValidImageUrl = (url) => {
  const imageRegex = /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i;
  return imageRegex.test(url);
};

// Sanitize user input
exports.sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
};

// Generate slug from title
exports.generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Paginate results
exports.paginate = (page, limit, total) => {
  const currentPage = Math.max(1, parseInt(page) || 1);
  const perPage = Math.min(100, Math.max(1, parseInt(limit) || 10));
  const totalPages = Math.ceil(total / perPage);
  const offset = (currentPage - 1) * perPage;

  return {
    currentPage,
    perPage,
    totalPages,
    total,
    offset,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1
  };
};

// Generate order number
exports.generateOrderNumber = () => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `TH-${timestamp}-${random}`;
};

// Validate MongoDB ObjectId
exports.isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// Get file extension from URL
exports.getFileExtension = (url) => {
  return url.split('.').pop().toLowerCase();
};

// Check if file is image
exports.isImageFile = (filename) => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
  const extension = exports.getFileExtension(filename);
  return imageExtensions.includes(extension);
};

// Generate API response
exports.apiResponse = (success, message, data = null, links = null, meta = null) => {
  const response = {
    success,
    message
  };

  if (data !== null) response.data = data;
  if (links !== null) response.links = links;
  if (meta !== null) response.meta = meta;

  return response;
};

// Handle async errors
exports.asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Generate cache key
exports.generateCacheKey = (prefix, ...args) => {
  return `${prefix}:${args.join(':')}`;
};

// Convert string to boolean
exports.toBoolean = (value) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || value === '1';
  }
  return Boolean(value);
};
