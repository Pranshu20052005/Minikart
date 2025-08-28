const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Product ID is required'],
    ref: 'Product' // Ensure this matches your product model name
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    default: 1,
    min: [1, 'Quantity cannot be less than 1'],
    validate: {
      validator: Number.isInteger,
      message: 'Quantity must be an integer'
    }
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Compound index to ensure a user can't add the same product to cart multiple times
cartSchema.index({ userId: 1, productId: 1 }, { unique: true });

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;
