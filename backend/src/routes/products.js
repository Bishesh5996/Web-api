const express = require('express');
const productController = require('../controllers/productController');
const { authenticate } = require('../middleware/auth');
const { body } = require('express-validator');

const router = express.Router();

// Validation rules for products
const productValidation = [
  body('title').notEmpty().trim().withMessage('Title is required'),
  body('description').notEmpty().trim().withMessage('Description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('originalPrice').isNumeric().withMessage('Original price must be a number'),
  body('size').notEmpty().withMessage('Size is required'),
  body('condition').isIn(['excellent', 'good', 'fair']).withMessage('Invalid condition'),
  body('brand').notEmpty().trim().withMessage('Brand is required'),
  body('color').notEmpty().trim().withMessage('Color is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('images').isArray({ min: 1 }).withMessage('At least one image is required')
];

// Routes
router.get('/', productController.getAllProducts);
router.get('/categories', productController.getCategories);
router.get('/:id', productController.getProductById);
router.post('/', authenticate, productValidation, productController.createProduct);
router.put('/:id', authenticate, productValidation, productController.updateProduct);
router.delete('/:id', authenticate, productController.deleteProduct);

module.exports = router;
