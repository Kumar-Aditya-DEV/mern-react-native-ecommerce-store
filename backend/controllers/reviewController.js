const Review = require('../models/Review');
const Product = require('../models/Product');

// @desc    Create product review
// @route   POST /api/reviews
// @access  Private
const createReview = async (req, res, next) => {
  try {
    const { productId, rating, comment } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const alreadyReviewed = await Review.findOne({
      product: productId,
      user: req.user._id
    });

    if (alreadyReviewed) {
      return res.status(400).json({ success: false, message: 'Product already reviewed' });
    }

    const review = await Review.create({
      product: productId,
      user: req.user._id,
      userName: req.user.name,
      rating: Number(rating),
      comment
    });

    // Recalculate average product rating
    const reviews = await Review.find({ product: productId });
    product.numReviews = reviews.length;
    product.rating =
      reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    await product.save();

    res.status(201).json({ success: true, message: 'Review added', data: review });
  } catch (error) {
    next(error);
  }
};

// @desc    Get reviews for a product
// @route   GET /api/reviews/:productId
// @access  Public
const getProductReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).sort({
      createdAt: -1
    });
    res.json({ success: true, data: reviews });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReview,
  getProductReviews
};
