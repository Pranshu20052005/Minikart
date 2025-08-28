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
        const itemsWithDetails = cartItems.map(item => {
            const itemTotal = item.productId.price * item.quantity;
            totalPrice += itemTotal;
            return {
                ...item.toObject(),
                itemTotal: itemTotal.toFixed(2)
            };
        });
        
        res.status(200).json({
            success: true,
            cartItems: itemsWithDetails,
            totalPrice: totalPrice.toFixed(2)
        });
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({ 
            success: false,
            error: "Failed to fetch cart items" 
        });
    }
});

// POST /cart/add
router.post("/add/:productId", async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity = 1 } = req.body;

        if (!productId) {
            return res.status(400).json({ 
                success: false,
                error: "Product ID is required" 
            });
        }

        // Check if product exists
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ 
                success: false,
                error: "Product not found" 
            });
        }

        // Check if item already exists in cart
        let existingItem = await cartModel.findOne({ productId });
        
        if (existingItem) {
            // Update quantity
            existingItem.quantity += parseInt(quantity);
            await existingItem.save();
            return res.status(200).json({ 
                success: true,
                message: "Product quantity updated in cart", 
                cartItem: existingItem 
            });
        } else {
            // Add new item
            const cartItem = new cartModel({ productId, quantity: parseInt(quantity) });
            await cartItem.save();
            res.status(201).json({ 
                success: true,
                message: "Product added to cart", 
                cartItem: await cartItem.populate('productId')
            });
        }
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ 
            success: false,
            error: "Failed to add item to cart" 
        });
    }
});

// PUT /cart/update/:productId
router.put("/update/:productId", async (req, res) => {
    try {
        const { productId } = req.params;
        const { quantity } = req.body;

        if (!productId || quantity === undefined) {
            return res.status(400).json({ 
                success: false,
                error: "Product ID and quantity are required" 
            });
        }

        if (quantity <= 0) {
            // Remove item if quantity is 0 or negative
            await cartModel.findOneAndDelete({ productId });
            return res.status(200).json({ 
                success: true,
                message: "Item removed from cart" 
            });
        }

        const updatedItem = await cartModel.findOneAndUpdate(
            { productId },
            { quantity: parseInt(quantity) },
            { new: true }
        ).populate("productId");

        if (!updatedItem) {
            return res.status(404).json({ 
                success: false,
                error: "Item not found in cart" 
            });
        }

        // Calculate item total
        const itemTotal = (updatedItem.productId.price * updatedItem.quantity).toFixed(2);
        const responseItem = {
            ...updatedItem.toObject(),
            itemTotal
        };

        res.status(200).json({ 
            success: true,
            message: "Cart updated", 
            cartItem: responseItem 
        });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ 
            success: false,
            error: "Failed to update cart" 
        });
    }
});

// DELETE /cart/remove/:productId
router.delete("/remove/:productId", async (req, res) => {
    try {
        const { productId } = req.params;
        const deletedItem = await cartModel.findOneAndDelete({ productId });

        if (!deletedItem) {
            return res.status(404).json({ 
                success: false,
                error: "Item not found in cart" 
            });
        }

        res.status(200).json({ 
            success: true,
            message: "Item removed from cart" 
        });
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({ 
            success: false,
            error: "Failed to remove item from cart" 
        });
    }
});

// DELETE /cart/clear
router.delete("/clear", async (req, res) => {
    try {
        await cartModel.deleteMany({});
        res.status(200).json({ 
            success: true,
            message: "Cart cleared successfully" 
        });
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({ 
            success: false,
            error: "Failed to clear cart" 
        });
    }
});

module.exports = router;
