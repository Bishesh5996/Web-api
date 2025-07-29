const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// In-memory favorites storage (replace with database in production)
let favorites = {};

// Get favorites
router.get('/', auth, (req, res) => {
  const userFavorites = favorites[req.user.id] || [];
  res.json({ favorites: userFavorites });
});

// Add favorite
router.post('/', auth, (req, res) => {
  const { productId } = req.body;
  
  if (!favorites[req.user.id]) favorites[req.user.id] = [];
  
  if (!favorites[req.user.id].find(fav => fav.productId === productId)) {
    favorites[req.user.id].push({ productId });
  }
  
  res.json({ success: true });
});

// Remove favorite
router.delete('/:id', auth, (req, res) => {
  const productId = req.params.id;
  
  if (favorites[req.user.id]) {
    favorites[req.user.id] = favorites[req.user.id].filter(fav => fav.productId !== productId);
  }
  
  res.json({ success: true });
});

module.exports = router;
