const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add category name'],
      unique: true,
      trim: true
    },
    slug: {
      type: String,
      lowercase: true
    },
    image: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'grid-outline'
    },
    description: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

categorySchema.pre('save', function (next) {
  if (this.name) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-0]/g, '-');
  }
  next();
});

module.exports = mongoose.model('Category', categorySchema);
