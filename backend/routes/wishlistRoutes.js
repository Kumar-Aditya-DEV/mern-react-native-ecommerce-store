const express = require('express');
const router = express.Router();
const {
  getWishlist,
  toggleWishlist,
  removeFromWishlist
} = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/').get(getWishlist);
router.route('/toggle').post(toggleWishlist);
router.route('/:productId').delete(removeFromWishlist);

module.exports = router;
