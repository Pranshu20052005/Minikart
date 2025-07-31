const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "product", 
  }
});

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;
