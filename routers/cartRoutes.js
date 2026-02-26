const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

// --------------------------------------------------
// ADD PRODUCT TO CART
// Route: POST /cart
// Protected Route
// --------------------------------------------------
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Check if productId and quantity are provided
    if (!productId || !quantity) {
      return res.status(400).json({ message: "Product ID and quantity are required" });
    }

    // Check if product exists in database
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Create new cart item
    const newCartItem = new Cart({
      user: req.user.userId,  // coming from JWT middleware
      product: productId,
      quantity: quantity,
    });

    await newCartItem.save();

    res.status(201).json({
      message: "Product added to cart",
      cartItem: newCartItem,
    });

  } catch (err) {
    console.log("Add to cart error:", err.message);
    res.status(500).json({ message: "Server error while adding to cart" });
  }
});


// --------------------------------------------------
// UPDATE CART ITEM QUANTITY
// Route: PUT /cart/:id
// Protected Route
// --------------------------------------------------
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { quantity } = req.body;

    if (!quantity) {
      return res.status(400).json({ message: "Quantity is required" });
    }

    const updatedCartItem = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity: quantity },
      { new: true }
    );

    if (!updatedCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({
      message: "Cart updated successfully",
      cartItem: updatedCartItem,
    });

  } catch (err) {
    console.log("Update cart error:", err.message);
    res.status(500).json({ message: "Server error while updating cart" });
  }
});


// --------------------------------------------------
// DELETE CART ITEM
// Route: DELETE /cart/:id
// Protected Route
// --------------------------------------------------
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedItem = await Cart.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({ message: "Item removed from cart" });

  } catch (err) {
    console.log("Delete cart error:", err.message);
    res.status(500).json({ message: "Server error while deleting item" });
  }
});

module.exports = router;