const express = require("express");
const cartModel = require("../models/cart.model");
const router = express.Router();



// GET /cart with product details
router.get("/", async (req, res) => {
    try {
        const cartItems = await cartModel.find().populate("productId"); // Populate the product details
        res.status(200).json(cartItems);
  } catch (error) {
      res.status(500).json({ error: "Failed to fetch cart items" });
  }
});

// POST /cart/add
router.post("/add/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ error: "productId is required" });
    }

    const cartItem = new cartModel({ productId });
    await cartItem.save();

    res.status(201).json({ message: "Product added to cart", cartItem });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
