const express = require("express");
const cartModel = require("../models/cart.model");
const productModel = require("../models/product.model");
const router = express.Router();

// GET /cart with product details and total price
router.get("/", async (req, res) => {
    try {
        const cartItems = await cartModel.find().populate("productId");
        
        // Calculate total price
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += item.productId.price * item.quantity;
        });
        
        res.status(200).json({
            cartItems,
            totalPrice: totalPrice.toFixed(2)
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch cart items" });
    }
});

// POST /cart/add
router.post("/add/:productId", async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity = 1 } = req.body;

        if (!productId) {
            return res.status(400).json({ error: "productId is required" });
        }

        // Check if product exists
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Check if item already exists in cart
        const existingItem = await cartModel.findOne({ productId });
        
        if (existingItem) {
            // Update quantity
            existingItem.quantity += parseInt(quantity);
            await existingItem.save();
            res.status(200).json({ 
                message: "Product quantity updated in cart", 
                cartItem: existingItem 
            });
        } else {
            // Add new item
            const cartItem = new cartModel({ productId, quantity: parseInt(quantity) });
            await cartItem.save();
            res.status(201).json({ 
                message: "Product added to cart", 
                cartItem 
            });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// PUT /cart/update/:productId
router.put("/update/:productId", async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;

        if (!productId || quantity === undefined) {
            return res.status(400).json({ error: "productId and quantity are required" });
        }

        if (quantity <= 0) {
            // Remove item if quantity is 0 or negative
            await cartModel.findOneAndDelete({ productId });
            return res.status(200).json({ message: "Product removed from cart" });
        }

        const updatedItem = await cartModel.findOneAndUpdate(
            { productId },
            { quantity },
            { new: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ error: "Cart item not found" });
        }

        res.status(200).json({ 
            message: "Cart item updated", 
            cartItem: updatedItem 
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE /cart/remove/:productId
router.delete("/remove/:productId", async (req, res) => {
    try {
        const { productId } = req.params;

        const deletedItem = await cartModel.findOneAndDelete({ productId });

        if (!deletedItem) {
            return res.status(404).json({ error: "Cart item not found" });
        }

        res.status(200).json({ message: "Product removed from cart" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// DELETE /cart/clear
router.delete("/clear", async (req, res) => {
    try {
        await cartModel.deleteMany({});
        res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
