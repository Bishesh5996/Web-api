const express = require('express');
const multer = require('multer');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ products });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Create product (sellers only)
router.post('/', auth, upload.array('images', 5), async (req, res) => {
  try {
    // Check if user is a seller
    if (req.user.role !== 'seller') {
      return res.status(403).json({ message: 'Only sellers can create products' });
    }

    const { name, description, price, originalPrice, category, condition, size, brand } = req.body;

    const product = new Product({
      name,
      description,
      price,
      originalPrice,
      category,
      condition,
      size,
      brand,
      images: req.files ? req.files.map(file => file.filename) : [],
      seller: req.user.id,
      sellerName: req.user.firstName + ' ' + req.user.lastName
    });

    await product.save();
    res.json({ product });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
