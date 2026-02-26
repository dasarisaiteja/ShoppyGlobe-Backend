const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// --------------------------------------------------
// GET all products
// Route: GET /products
// --------------------------------------------------
router.get("/", async (req, res) => {
  try {
    // Fetch all products from database
    const allProducts = await Product.find();

    res.status(200).json(allProducts);
  } catch (err) {
    console.log("Error while fetching products:", err.message);
    res.status(500).json({ message: "Server error while fetching products" });
  }
});

// --------------------------------------------------
// GET single product by ID
// Route: GET /products/:id
// --------------------------------------------------
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    // Find product using ID
    const singleProduct = await Product.findById(productId);

    // If product not found
    if (!singleProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(singleProduct);
  } catch (err) {
    console.log("Error while fetching single product:", err.message);
    res.status(500).json({ message: "Invalid product ID or server error" });
  }
});

module.exports = router;