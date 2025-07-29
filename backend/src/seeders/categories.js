const mongoose = require('mongoose');
const Category = require('../models/Category');
require('dotenv').config();

const categories = [
  { name: 'Jackets', description: 'All types of jackets and outerwear' },
  { name: 'Shirts', description: 'Shirts, blouses, and tops' },
  { name: 'Pants', description: 'Trousers, jeans, and leggings' },
  { name: 'Dresses', description: 'Dresses and skirts' },
  { name: 'Shoes', description: 'All types of footwear' },
  { name: 'Accessories', description: 'Bags, jewelry, and accessories' }
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/thrifthub');
    console.log('Connected to MongoDB');
    
    await Category.deleteMany({});
    const createdCategories = await Category.insertMany(categories);
    
    console.log('✅ Categories seeded successfully:');
    createdCategories.forEach(cat => console.log(`  - ${cat.name} (${cat._id})`));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding categories:', error);
    process.exit(1);
  }
};

seedCategories();
