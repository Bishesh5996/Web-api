const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// In-memory orders storage (replace with database in production)
let orders = [];

// Get user orders
router.get('/', auth, (req, res) => {
  const userOrders = orders.filter(order => order.userId === req.user.id);
  res.json({ orders: userOrders });
});

// Create order
router.post('/', auth, (req, res) => {
  const order = {
    id: orders.length + 1,
    userId: req.user.id,
    ...req.body,
    status: 'Processing',
    createdAt: new Date()
  };
  
  orders.push(order);
  res.json({ order });
});

module.exports = router;
