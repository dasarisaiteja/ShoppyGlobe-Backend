import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, default: "" },
    rating: { type: Number, default: 0 },
    stock: { type: Number, default: 0 } // Kept stock just in case
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;