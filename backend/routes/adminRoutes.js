const express = require('express');
const router = express.Router();
const { getDashboardMetrics, getAllUsers } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');

router.use(protect, adminOnly);

router.get('/dashboard', getDashboardMetrics);
router.get('/users', getAllUsers);

module.exports = router;
