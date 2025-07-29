const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// In-memory storage with working demo accounts
let users = [];

// Initialize demo users with proper password hashing
const initDemoUsers = async () => {
  const hashedPassword = await bcrypt.hash('demo123', 10);
  
  users = [
    {
      id: 1,
      firstName: 'Demo',
      lastName: 'Seller',
      email: 'seller@demo.com',
      password: hashedPassword,
      role: 'seller'
    },
    {
      id: 2,
      firstName: 'Demo',
      lastName: 'Buyer',
      email: 'buyer@demo.com',
      password: hashedPassword,
      role: 'buyer'
    }
  ];
  
  console.log('Demo users initialized with password: demo123');
};

let products = [];
let orders = [];
let carts = {};
let favorites = {};

// Auth middleware
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Routes
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = {
      id: users.length + 1,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || 'buyer'
    };

    users.push(newUser);

    // Create token
    const payload = {
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        firstName: newUser.firstName,
        lastName: newUser.lastName
      }
    };

    const token = jwt.sign(payload, 'your-secret-key', { expiresIn: '24h' });

    res.json({
      token,
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).send('Server error');
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login attempt for:', email); // Debug log

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('User found:', user.email, 'Role:', user.role); // Debug log

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch for:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('Password matches for:', email); // Debug log

    // Create token
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName
      }
    };

    const token = jwt.sign(payload, 'your-secret-key', { expiresIn: '24h' });

    console.log('Login successful for:', email); // Debug log

    res.json({
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Server error');
  }
});

// Products routes
app.get('/api/products', (req, res) => {
  res.json({ products });
});

app.post('/api/products', auth, (req, res) => {
  if (req.user.role !== 'seller') {
    return res.status(403).json({ message: 'Only sellers can create products' });
  }

  const product = {
    id: products.length + 1,
    ...req.body,
    seller: req.user.id,
    sellerName: req.user.firstName + ' ' + req.user.lastName,
    createdAt: new Date()
  };

  products.push(product);
  res.json({ product });
});

// Cart routes
app.get('/api/cart', auth, (req, res) => {
  const userCart = carts[req.user.id] || [];
  res.json({ items: userCart });
});

app.post('/api/cart/add', auth, (req, res) => {
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

app.delete('/api/cart/clear', auth, (req, res) => {
  carts[req.user.id] = [];
  res.json({ success: true });
});

// Orders routes
app.get('/api/orders', auth, (req, res) => {
  const userOrders = orders.filter(order => order.userId === req.user.id);
  res.json({ orders: userOrders });
});

app.post('/api/orders', auth, (req, res) => {
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

// Favorites routes
app.get('/api/favorites', auth, (req, res) => {
  const userFavorites = favorites[req.user.id] || [];
  res.json({ favorites: userFavorites });
});

app.post('/api/favorites', auth, (req, res) => {
  const { productId } = req.body;
  
  if (!favorites[req.user.id]) favorites[req.user.id] = [];
  
  if (!favorites[req.user.id].find(fav => fav.productId === productId)) {
    favorites[req.user.id].push({ productId });
  }
  
  res.json({ success: true });
});

app.delete('/api/favorites/:id', auth, (req, res) => {
  const productId = req.params.id;
  
  if (favorites[req.user.id]) {
    favorites[req.user.id] = favorites[req.user.id].filter(fav => fav.productId !== productId);
  }
  
  res.json({ success: true });
});

const PORT = 5001;

// Initialize demo users and start server
initDemoUsers().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Demo accounts available:');
    console.log('Seller: seller@demo.com / demo123');
    console.log('Buyer: buyer@demo.com / demo123');
  });
});
