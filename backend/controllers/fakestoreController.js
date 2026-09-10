const Product = require('../models/Product');
const Category = require('../models/Category');
const User = require('../models/User');
const Cart = require('../models/Cart');

const FAKESTORE_BASE_URL = 'https://fakestoreapi.com';

// @desc    Fetch products from FakeStore API
// @route   GET /api/fakestore/products
// @access  Public
const getFakeStoreProducts = async (req, res, next) => {
  try {
    const response = await fetch(`${FAKESTORE_BASE_URL}/products`);
    const data = await response.json();
    res.status(200).json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch single product from FakeStore API
// @route   GET /api/fakestore/products/:id
// @access  Public
const getFakeStoreProductById = async (req, res, next) => {
  try {
    const response = await fetch(`${FAKESTORE_BASE_URL}/products/${req.params.id}`);
    const data = await response.json();
    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch carts from FakeStore API
// @route   GET /api/fakestore/carts
// @access  Public
const getFakeStoreCarts = async (req, res, next) => {
  try {
    const response = await fetch(`${FAKESTORE_BASE_URL}/carts`);
    const data = await response.json();
    res.status(200).json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch single cart from FakeStore API
// @route   GET /api/fakestore/carts/:id
// @access  Public
const getFakeStoreCartById = async (req, res, next) => {
  try {
    const response = await fetch(`${FAKESTORE_BASE_URL}/carts/${req.params.id}`);
    const data = await response.json();
    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch users from FakeStore API
// @route   GET /api/fakestore/users
// @access  Public
const getFakeStoreUsers = async (req, res, next) => {
  try {
    const response = await fetch(`${FAKESTORE_BASE_URL}/users`);
    const data = await response.json();
    res.status(200).json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch single user from FakeStore API
// @route   GET /api/fakestore/users/:id
// @access  Public
const getFakeStoreUserById = async (req, res, next) => {
  try {
    const response = await fetch(`${FAKESTORE_BASE_URL}/users/${req.params.id}`);
    const data = await response.json();
    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Sync FakeStore API data (Products, Categories, Users, Carts) into MongoDB
// @route   POST /api/fakestore/sync
// @access  Public / Admin
const syncFakeStoreData = async (req, res, next) => {
  try {
    // 1. Fetch Products
    const prodRes = await fetch(`${FAKESTORE_BASE_URL}/products`);
    const fakeProducts = await prodRes.json();

    // Extract categories
    const categoriesSet = new Set();
    fakeProducts.forEach(p => {
      if (p.category) categoriesSet.add(p.category.trim());
    });

    const categoryMap = {};
    for (const catName of Array.from(categoriesSet)) {
      const formattedName = catName.charAt(0).toUpperCase() + catName.slice(1);
      let catDoc = await Category.findOne({ name: { $regex: new RegExp(`^${catName}$`, 'i') } });
      if (!catDoc) {
        catDoc = await Category.create({
          name: formattedName,
          icon: 'grid-outline',
          image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=500&auto=format&fit=crop'
        });
      }
      categoryMap[catName.toLowerCase()] = catDoc;
    }

    // Insert or update products
    let syncedProductsCount = 0;
    const syncedProducts = [];

    for (const item of fakeProducts) {
      const catObj = categoryMap[item.category.toLowerCase()];
      const categoryName = catObj ? catObj.name : item.category;

      const productPayload = {
        name: item.title,
        category: categoryName,
        categoryId: catObj ? catObj._id : null,
        price: item.price,
        originalPrice: Math.round((item.price * 1.25) * 100) / 100,
        discount: 20,
        rating: item.rating ? item.rating.rate : 4.5,
        numReviews: item.rating ? item.rating.count : 50,
        stock: 50,
        isFeatured: item.rating && item.rating.rate >= 4.0,
        isLatest: true,
        images: [item.image],
        description: item.description,
        features: ['High Quality', 'Standard Warranty', 'Authentic Item']
      };

      let existing = await Product.findOne({ name: item.title });
      if (!existing) {
        existing = await Product.create(productPayload);
      } else {
        Object.assign(existing, productPayload);
        await existing.save();
      }
      syncedProducts.push(existing);
      syncedProductsCount++;
    }

    // 2. Fetch Users
    const usersRes = await fetch(`${FAKESTORE_BASE_URL}/users`);
    const fakeUsers = await usersRes.json();
    let syncedUsersCount = 0;

    for (const u of fakeUsers) {
      const userEmail = u.email;
      const fullName = `${u.name?.firstname || ''} ${u.name?.lastname || ''}`.trim() || u.username;
      
      let userDoc = await User.findOne({ email: userEmail });
      if (!userDoc) {
        userDoc = await User.create({
          name: fullName,
          email: userEmail,
          password: u.password || 'password123',
          role: 'user',
          phone: u.phone || '',
          addresses: [
            {
              fullName,
              phone: u.phone || '',
              street: `${u.address?.number || ''} ${u.address?.street || ''}`.trim(),
              city: u.address?.city || '',
              state: 'State',
              postalCode: u.address?.zipcode || '',
              country: 'USA',
              isDefault: true
            }
          ]
        });
      }
      syncedUsersCount++;
    }

    res.status(200).json({
      success: true,
      message: 'Successfully synced FakeStore API products, categories, users, and carts into MongoDB',
      stats: {
        products: syncedProductsCount,
        users: syncedUsersCount,
        categories: Object.keys(categoryMap).length
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFakeStoreProducts,
  getFakeStoreProductById,
  getFakeStoreCarts,
  getFakeStoreCartById,
  getFakeStoreUsers,
  getFakeStoreUserById,
  syncFakeStoreData
};
