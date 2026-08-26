const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    orderNumber: {
      type: String,
      required: true,
      unique: true
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        name: String,
        image: String,
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
      }
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true }
    },
    paymentMethod: {
      type: String,
      required: true,
      default: 'Online Payment'
    },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String
    },
    subtotal: { type: Number, required: true, default: 0.0 },
    shippingFee: { type: Number, required: true, default: 0.0 },
    discount: { type: Number, required: true, default: 0.0 },
    totalAmount: { type: Number, required: true, default: 0.0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered'],
      default: 'Pending'
    },
    deliveredAt: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
