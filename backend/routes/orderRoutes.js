const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

router.use(protect);

router.route('/').post(createOrder).get(adminOnly, getAllOrders);
router.route('/myorders').get(getMyOrders);
router.route('/:id').get(getOrderById);
router.route('/:id/status').put(adminOnly, updateOrderStatus);

module.exports = router;
