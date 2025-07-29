const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  try {
    const { product: productId, quantity, shippingAddress, paymentMethod } = req.body;
    const buyerId = req.user.userId;

    // Get product details
    const product = await Product.findById(productId).populate('seller');
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (product.status !== 'available') {
      return res.status(400).json({
        success: false,
        message: 'Product is not available for purchase'
      });
    }

    // Calculate total amount (including tax)
    const subtotal = product.price * quantity;
    const tax = subtotal * 0.08; // 8% tax
    const totalAmount = subtotal + tax;

    // Create order
    const order = new Order({
      buyer: buyerId,
      seller: product.seller._id,
      product: productId,
      quantity,
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      shippingAddress,
      paymentMethod
    });

    await order.save();

    // Update product status to sold
    product.status = 'sold';
    await product.save();

    // Populate the order with product and user details
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

  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
};

exports.getOrders = async (req, res) => {
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
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const order = await Order.findById(id)
      .populate('product', 'title price images brand size')
      .populate('buyer', 'name email')
      .populate('seller', 'name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user is buyer or seller of this order
    if (order.buyer._id.toString() !== userId && order.seller._id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this order'
      });
    }

    res.json({
      success: true,
      data: order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message
    });
  }
};
