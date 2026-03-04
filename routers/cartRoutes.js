import express from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ADD TO CART
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    if (quantity > product.stockQuantity)
      return res.status(400).json({ message: "Stock not available" });

    const cartItem = await Cart.create({
      userId: req.user.id,
      productId,
      quantity
    });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE CART ITEM
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { quantity } = req.body;

    const cartItem = await Cart.findById(req.params.id);
    if (!cartItem)
      return res.status(404).json({ message: "Cart item not found" });

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE CART ITEM
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const cartItem = await Cart.findById(req.params.id);
    if (!cartItem)
      return res.status(404).json({ message: "Cart item not found" });

    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Cart item removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;