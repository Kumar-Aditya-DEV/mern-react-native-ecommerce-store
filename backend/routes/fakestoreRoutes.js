const express = require('express');
const router = express.Router();

const {
  getFakeStoreProducts,
  getFakeStoreProductById,
  getFakeStoreCarts,
  getFakeStoreCartById,
  getFakeStoreUsers,
  getFakeStoreUserById,
  syncFakeStoreData
} = require('../controllers/fakestoreController');

// Product routes
router.get('/products', getFakeStoreProducts);
router.get('/products/:id', getFakeStoreProductById);

// Cart routes
router.get('/carts', getFakeStoreCarts);
router.get('/carts/:id', getFakeStoreCartById);

// User routes
router.get('/users', getFakeStoreUsers);
router.get('/users/:id', getFakeStoreUserById);

// Sync route
router.post('/sync', syncFakeStoreData);

module.exports = router;
