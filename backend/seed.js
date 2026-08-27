const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');
const Order = require('./models/Order');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shopverse');
    console.log('Database connected for seeding...');

    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    // Create Admin and User accounts
    const adminUser = await User.create({
      name: 'ShopVerse Admin',
      email: 'admin@shopverse.com',
      password: 'password123',
      role: 'admin',
      phone: '+1 800-555-0199',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&auto=format&fit=crop'
    });

    const normalUser = await User.create({
      name: 'Aditya Kumar',
      email: 'user@shopverse.com',
      password: 'password123',
      role: 'user',
      phone: '+91 9876543210',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop',
      addresses: [
        {
          fullName: 'Aditya Kumar',
          phone: '+91 9876543210',
          street: '123 Tech Park Avenue',
          city: 'Bangalore',
          state: 'Karnataka',
          postalCode: '560100',
          country: 'India',
          isDefault: true
        }
      ]
    });

    console.log('Users created: Admin (admin@shopverse.com), Demo User (user@shopverse.com)');

    // Seed Categories
    const categoriesData = [
      { name: 'Electronics', icon: 'laptop', image: 'https://images.unsplash.com/photo-1498049860654-af1a5c566876?w=500&auto=format&fit=crop' },
      { name: 'Clothing', icon: 'shirt', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&auto=format&fit=crop' },
      { name: 'Footwear', icon: 'footsteps', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop' },
      { name: 'Accessories', icon: 'watch', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop' },
      { name: 'Home & Kitchen', icon: 'home', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop' },
      { name: 'Beauty', icon: 'sparkles', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop' }
    ];

    const createdCategories = await Category.insertMany(categoriesData);
    console.log(`${createdCategories.length} categories seeded.`);

    // Seed Products
    const productsData = [
      {
        name: 'Wireless Noise Cancelling Headphones',
        category: 'Electronics',
        price: 199.99,
        originalPrice: 249.99,
        discount: 20,
        rating: 4.8,
        numReviews: 128,
        stock: 25,
        isFeatured: true,
        images: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop'
        ],
        description: 'Immerse yourself in pure sound with top-tier active noise cancellation and 30-hour battery life.',
        features: ['Active Noise Cancellation', '30-Hour Battery Life', 'Bluetooth 5.2']
      },
      {
        name: 'Pro Smart Fitness Watch',
        category: 'Accessories',
        price: 149.50,
        originalPrice: 179.99,
        discount: 17,
        rating: 4.6,
        numReviews: 86,
        stock: 18,
        isFeatured: true,
        images: [
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop'
        ],
        description: 'Track your heart rate, SPO2 levels, sleep stages, and workout routes with high precision GPS.',
        features: ['Heart Rate Monitoring', 'Built-in GPS', '7-Day Battery']
      },
      {
        name: 'Classic Urban Leather Running Shoes',
        category: 'Footwear',
        price: 89.99,
        originalPrice: 120.00,
        discount: 25,
        rating: 4.7,
        numReviews: 94,
        stock: 12,
        isFeatured: true,
        images: [
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop'
        ],
        description: 'Engineered with responsive cloud cushioning and high-grip rubber outsole.',
        features: ['Breathable Mesh', 'Cushioned Midsole', 'Anti-slip Outsole']
      },
      {
        name: 'Minimalist Cotton Crewneck Hoodie',
        category: 'Clothing',
        price: 49.99,
        originalPrice: 59.99,
        discount: 16,
        rating: 4.5,
        numReviews: 62,
        stock: 35,
        isFeatured: false,
        images: [
          'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop'
        ],
        description: 'Ultra-soft 100% organic cotton fleece hoodie crafted for maximum warmth.',
        features: ['100% Organic Cotton', 'Kangaroo Pocket']
      }
    ];

    const createdProducts = await Product.insertMany(productsData);
    console.log(`${createdProducts.length} products seeded.`);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error.message);
    process.exit(1);
  }
};

seedData();
