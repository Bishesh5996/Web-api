const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Public test route
router.get('/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Order routes working!',
    timestamp: new Date().toISOString()
  });
});

// Create order route
router.post('/', authenticate, async (req, res) => {
  try {
    console.log('📦 Order creation request received');
    console.log('User:', req.user);
    console.log('Body:', req.body);

    const { product: productId, quantity, shippingAddress, paymentMethod } = req.body;
    const buyerId = req.user.userId;

    // Simple validation
    if (!productId || !quantity || !shippingAddress || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        received: { productId, quantity, shippingAddress, paymentMethod }
      });
    }

    // Get product
    const product = await Product.findById(productId).populate('seller');
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    console.log('📦 Product found:', product.title);

    // Calculate total
    const subtotal = product.price * quantity;
    const tax = subtotal * 0.08;
    const totalAmount = subtotal + tax;

    // Generate order number manually
    const orderCount = await Order.countDocuments({});
    const orderNumber = `TH${Date.now()}${String(orderCount + 1).padStart(4, '0')}`;
    console.log('📦 Generated order number:', orderNumber);

    // Create order
    const order = new Order({
      orderNumber: orderNumber,
      buyer: buyerId,
      seller: product.seller._id,
      product: productId,
      quantity,
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      shippingAddress,
      paymentMethod
    });

    await order.save();
    console.log('📦 Order saved successfully:', order.orderNumber);

    // Update product status to sold (optional - you might want to keep products available)
    // product.status = 'sold';
    // await product.save();

    // Populate order
    await order.populate([
      { path: 'product', select: 'title price images brand size' },
      { path: 'buyer', select: 'name email' },
      { path: 'seller', select: 'name email' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });

    console.log('✅ Order creation completed successfully!');

  } catch (error) {
    console.error('❌ Order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
});

// Get orders
router.get('/', authenticate, async (req, res) => {
  try {
    const userId = req.user.userId;
    const orders = await Order.find({
      $or: [{ buyer: userId }, { seller: userId }]
    })
    .populate('product', 'title price images brand size')
    .populate('buyer', 'name email')
    .populate('seller', 'name email')
    .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { orders }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
});

module.exports = router;
