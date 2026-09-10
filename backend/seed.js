const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Cart = require('./models/Cart');

const FAKESTORE_BASE_URL = 'https://fakestoreapi.com';

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shopverse');
    console.log('Database connected for seeding...');

    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Cart.deleteMany();

    // Base Categories
    const baseCategories = [
      { name: 'Electronics', icon: 'laptop', image: 'https://images.unsplash.com/photo-1498049860654-af1a5c566876?w=500&auto=format&fit=crop' },
      { name: 'Clothing', icon: 'shirt', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&auto=format&fit=crop' },
      { name: 'Footwear', icon: 'footsteps', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop' },
      { name: 'Accessories', icon: 'watch', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop' },
      { name: 'Home & Kitchen', icon: 'home', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop' },
      { name: 'Beauty', icon: 'sparkles', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop' }
    ];

    const createdCategories = await Category.insertMany(baseCategories);
    console.log(`${createdCategories.length} main categories created.`);

    const catMap = {};
    createdCategories.forEach(c => { catMap[c.name.toLowerCase()] = c; });

    // Products across ALL categories
    const catalogProducts = [
      // --- ELECTRONICS ---
      {
        name: 'Wireless Noise-Canceling Headphones Pro',
        category: 'Electronics',
        price: 199.99,
        originalPrice: 249.99,
        discount: 20,
        rating: 4.8,
        numReviews: 128,
        stock: 25,
        isFeatured: true,
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop'],
        description: 'Immerse yourself in pure audio with high-grade active noise cancellation and 30-hour playback.',
        features: ['Active Noise Cancellation', 'Bluetooth 5.2', '30h Battery']
      },
      {
        name: 'Ultra Slim 4K Smart Monitor 27"',
        category: 'Electronics',
        price: 349.99,
        originalPrice: 420.00,
        discount: 16,
        rating: 4.7,
        numReviews: 95,
        stock: 15,
        isFeatured: true,
        images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop'],
        description: 'Stunning 4K IPS display with ultra-thin bezel, USB-C connectivity, and HDR10 color vibrancy.',
        features: ['4K UHD Resolution', 'HDR10 Support', 'USB-C Hub']
      },

      // --- CLOTHING ---
      {
        name: 'Classic Organic Cotton Crewneck Hoodie',
        category: 'Clothing',
        price: 54.99,
        originalPrice: 69.99,
        discount: 21,
        rating: 4.6,
        numReviews: 84,
        stock: 40,
        isFeatured: true,
        images: ['https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop'],
        description: 'Crafted from 100% premium organic heavyweight cotton fleece for ultimate softness and warmth.',
        features: ['100% Organic Cotton', 'Kangaroo Pocket', 'Double-stitched Hem']
      },
      {
        name: 'Tailored Vintage Denim Jacket',
        category: 'Clothing',
        price: 79.99,
        originalPrice: 99.99,
        discount: 20,
        rating: 4.7,
        numReviews: 62,
        stock: 22,
        isFeatured: true,
        images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop'],
        description: 'Timeless denim trucker jacket featuring vintage wash, brass button hardware, and relaxed fit.',
        features: ['Premium Cotton Denim', 'Reinforced Pockets', 'Classic Vintage Wash']
      },
      {
        name: 'Breathable Casual Cotton T-Shirt Pack',
        category: 'Clothing',
        price: 34.50,
        originalPrice: 45.00,
        discount: 23,
        rating: 4.5,
        numReviews: 110,
        stock: 60,
        isFeatured: false,
        images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop'],
        description: 'Pack of 3 everyday essential crewneck tees made from breathable combed cotton.',
        features: ['Combed Cotton', 'Pre-shrunk Fabric', 'Tagless Comfort']
      },

      // --- FOOTWEAR ---
      {
        name: 'Urban Cloud Cushion Running Shoes',
        category: 'Footwear',
        price: 119.99,
        originalPrice: 149.99,
        discount: 20,
        rating: 4.9,
        numReviews: 210,
        stock: 35,
        isFeatured: true,
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop'],
        description: 'Ultra-lightweight mesh running shoes engineered with responsive foam cushioning and high-grip sole.',
        features: ['Breathable Mesh Upper', 'Responsive Foam Midsole', 'Anti-Slip Outsole']
      },
      {
        name: 'Handcrafted Heritage Leather Boots',
        category: 'Footwear',
        price: 169.00,
        originalPrice: 210.00,
        discount: 19,
        rating: 4.8,
        numReviews: 76,
        stock: 18,
        isFeatured: true,
        images: ['https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&auto=format&fit=crop'],
        description: 'Genuine full-grain leather ankle boots with Goodyear welt construction and cushioned leather insoles.',
        features: ['Full-Grain Leather', 'Goodyear Welted', 'Durable Rubber Heel']
      },
      {
        name: 'Minimalist Canvas Low-Top Sneakers',
        category: 'Footwear',
        price: 49.99,
        originalPrice: 65.00,
        discount: 23,
        rating: 4.5,
        numReviews: 54,
        stock: 30,
        isFeatured: false,
        images: ['https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&auto=format&fit=crop'],
        description: 'Versatile low-top sneakers featuring sturdy canvas upper, rubber toe cap, and comfortable vulcanized sole.',
        features: ['Durable Canvas Upper', 'Vulcanized Rubber Sole', 'Removable Insole']
      },

      // --- ACCESSORIES ---
      {
        name: 'Pro Smart Fitness & Health Tracker Watch',
        category: 'Accessories',
        price: 149.50,
        originalPrice: 179.99,
        discount: 17,
        rating: 4.6,
        numReviews: 86,
        stock: 18,
        isFeatured: true,
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop'],
        description: 'Monitor heart rate, SPO2, sleep stages, and GPS activities with 7-day battery life.',
        features: ['Heart Rate Sensor', 'GPS Tracking', '7-Day Battery Life']
      },
      {
        name: 'Handcrafted Italian Leather Wallet',
        category: 'Accessories',
        price: 45.00,
        originalPrice: 60.00,
        discount: 25,
        rating: 4.7,
        numReviews: 98,
        stock: 50,
        isFeatured: false,
        images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop'],
        description: 'Slim bifold wallet made from top-grain Italian leather with RFID blocking protection.',
        features: ['Top-Grain Leather', 'RFID Protection', '8 Card Slots']
      },

      // --- HOME & KITCHEN ---
      {
        name: 'Nordic Wooden Dimmable Desk Lamp',
        category: 'Home & Kitchen',
        price: 59.99,
        originalPrice: 75.00,
        discount: 20,
        rating: 4.7,
        numReviews: 45,
        stock: 25,
        isFeatured: true,
        images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop'],
        description: 'Modern Scandinavian table lamp with touch-sensitive dimmable LED warm light and solid oak base.',
        features: ['Dimmable LED', 'Solid Oak Wood Arm', 'Touch Control']
      },
      {
        name: 'Automatic Barista Espresso Machine',
        category: 'Home & Kitchen',
        price: 249.99,
        originalPrice: 299.99,
        discount: 16,
        rating: 4.8,
        numReviews: 112,
        stock: 12,
        isFeatured: true,
        images: ['https://images.unsplash.com/photo-1517668808822-9e428824603b?w=800&auto=format&fit=crop'],
        description: 'Compact 15-bar Italian pressure pump espresso machine with integrated milk frothing steam wand.',
        features: ['15-Bar Pressure Pump', 'Steam Wand Milk Frother', 'Removable Water Reservoir']
      },
      {
        name: 'Non-Stick Ceramic Cookware Set 10-Piece',
        category: 'Home & Kitchen',
        price: 129.99,
        originalPrice: 159.99,
        discount: 18,
        rating: 4.6,
        numReviews: 88,
        stock: 20,
        isFeatured: false,
        images: ['https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop'],
        description: 'Eco-friendly non-toxic ceramic non-stick pots and pans set for healthy everyday cooking.',
        features: ['Non-Toxic Ceramic Coating', 'Induction Compatible', 'Dishwasher Safe']
      },

      // --- BEAUTY ---
      {
        name: 'Radiance Hydrating Facial Serum 50ml',
        category: 'Beauty',
        price: 38.00,
        originalPrice: 48.00,
        discount: 20,
        rating: 4.8,
        numReviews: 134,
        stock: 45,
        isFeatured: true,
        images: ['https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop'],
        description: 'Infused with Hyaluronic Acid and Vitamin C to restore glow, elasticity, and deep hydration.',
        features: ['Hyaluronic Acid & Vit C', 'Cruelty-Free', 'For All Skin Types']
      },
      {
        name: 'Organic Botanical Body Wash & Oil Set',
        category: 'Beauty',
        price: 29.99,
        originalPrice: 38.00,
        discount: 21,
        rating: 4.7,
        numReviews: 67,
        stock: 35,
        isFeatured: true,
        images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop'],
        description: 'Nourishing shower gel and body oil set formulated with natural essential oils and lavender extract.',
        features: ['100% Natural Oils', 'Paraben-Free', 'Calming Fragrance']
      },
      {
        name: 'Luxury Velvet Matte Lipstick Trio',
        category: 'Beauty',
        price: 24.50,
        originalPrice: 32.00,
        discount: 23,
        rating: 4.5,
        numReviews: 89,
        stock: 50,
        isFeatured: false,
        images: ['https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop'],
        description: 'Long-lasting velvety matte lipstick pack featuring 3 flattering nude and rose shades.',
        features: ['Hydrating Matte Formula', 'Long-Wearing 12h', 'Vibrant Pigments']
      }
    ];

    // Fetch FakeStore API products and map them to our categories
    console.log('Fetching products from FakeStore API...');
    try {
      const prodRes = await fetch(`${FAKESTORE_BASE_URL}/products`);
      const fakeProducts = await prodRes.json();
      fakeProducts.forEach(p => {
        let catName = 'Electronics';
        const rawCat = p.category ? p.category.toLowerCase() : '';
        if (rawCat.includes('clothing')) catName = 'Clothing';
        else if (rawCat.includes('jewelery')) catName = 'Accessories';
        else if (rawCat.includes('electronics')) catName = 'Electronics';

        catalogProducts.push({
          name: p.title,
          category: catName,
          price: p.price,
          originalPrice: Math.round((p.price * 1.25) * 100) / 100,
          discount: 20,
          rating: p.rating ? p.rating.rate : 4.5,
          numReviews: p.rating ? p.rating.count : 40,
          stock: 30,
          isFeatured: p.rating && p.rating.rate >= 4.0,
          isLatest: true,
          images: [p.image],
          description: p.description,
          features: ['Authentic Item', 'FakeStore API Source']
        });
      });
    } catch (e) {
      console.warn('FakeStore fetch error during seed:', e.message);
    }

    // Attach categoryId
    const finalProducts = catalogProducts.map(p => {
      const matchedCat = catMap[p.category.toLowerCase()] || createdCategories[0];
      return {
        ...p,
        categoryId: matchedCat._id
      };
    });

    const createdProducts = await Product.insertMany(finalProducts);
    console.log(`Successfully seeded ${createdProducts.length} products across ALL categories into MongoDB.`);

    // Admin & User setup
    const normalUser = await User.create({
      name: 'Aditya Kumar',
      email: 'user@shopverse.com',
      password: 'password123',
      role: 'user',
      phone: '+91 9876543210',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop'
    });

    await User.create({
      name: 'ShopVerse Admin',
      email: 'admin@shopverse.com',
      password: 'password123',
      role: 'admin',
      phone: '+1 800-555-0199'
    });

    // Create cart
    await Cart.create({
      user: normalUser._id,
      items: [
        { product: createdProducts[0]._id, quantity: 1, variant: 'Standard' },
        { product: createdProducts[2]._id, quantity: 2, variant: 'Standard' }
      ]
    });

    console.log('Seeding finished cleanly!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error.message);
    process.exit(1);
  }
};

seedData();
