const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Please add category name']
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    price: {
      type: Number,
      required: [true, 'Please add price'],
      default: 0.0
    },
    originalPrice: {
      type: Number,
      default: 0.0
    },
    discount: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 4.5
    },
    numReviews: {
      type: Number,
      default: 0
    },
    stock: {
      type: Number,
      required: [true, 'Please add stock count'],
      default: 10
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    isLatest: {
      type: Boolean,
      default: true
    },
    images: [
      {
        type: String
      }
    ],
    description: {
      type: String,
      required: [true, 'Please add description']
    },
    features: [
      {
        type: String
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
