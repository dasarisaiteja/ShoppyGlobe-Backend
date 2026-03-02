import express from "express"; 
const router = express.Router();
import Product from "/Users/dasarisaiteja/Desktop/intenshala/shoppyglobe-backend/models/Product.js"; 


// GET all products

router.get("/", async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json(allProducts);
  } catch (err) {
    console.log("Error while fetching products:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});


// GET single product by ID
router.get("/:id", async (req, res) => {
  try {
    const singleProduct = await Product.findById(req.params.id);
    if (!singleProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(singleProduct);
  } catch (err) {
    res.status(500).json({ message: "Invalid product ID or server error" });
  }
});

export default router; 