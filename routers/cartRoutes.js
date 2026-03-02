import express from "express";
const router = express.Router();


import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import authMiddleware from "../middleware/authMiddleware.js";

// --------------------------------------------------
// ADD PRODUCT TO CART
// --------------------------------------------------
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Product ID and quantity are required" });
    }

    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newCartItem = new Cart({
      user: req.user.userId,  // Injected by authMiddleware
      product: productId,
      quantity: quantity,
    });

    await newCartItem.save();
    res.status(201).json({ message: "Product added to cart", cartItem: newCartItem });

  } catch (err) {
    console.log("Add to cart error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});


// UPDATE & DELETE ROUTES... (Rest of your logic stays the same)


// ... your PUT and DELETE logic here ...

export default router; 