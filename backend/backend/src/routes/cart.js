const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// In-memory cart storage (replace with database in production)
let carts = {};

// Get cart
router.get('/', auth, (req, res) => {
  const userCart = carts[req.user.id] || [];
  res.json({ items: userCart });
});

// Add to cart
router.post('/add', auth, (req, res) => {
  const { productId, quantity } = req.body;
  
  if (!carts[req.user.id]) carts[req.user.id] = [];
  
  const existingItem = carts[req.user.id].find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    carts[req.user.id].push({
      id: Date.now(),
      productId,
      quantity,
      name: req.body.name || 'Product',
      price: req.body.price || 0
    });
  }
  
  res.json({ success: true });
});

// Clear cart
router.delete('/clear', auth, (req, res) => {
  carts[req.user.id] = [];
  res.json({ success: true });
});

module.exports = router;
