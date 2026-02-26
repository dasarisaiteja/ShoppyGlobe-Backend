const mongoose = require("mongoose");

// Schema for Product collection
const productSchema = new mongoose.Schema(
  {
    // Product name
    name: {
      type: String,
      required: true,
      trim: true, // removes extra spaces
    },

    // Product price
    price: {
      type: Number,
      required: true,
      min: 0, // price cannot be negative
    },

    // Product description
    description: {
      type: String,
      default: "",
    },

    // Available stock quantity
    stock: {
      type: Number,
      required: true,
      min: 0, // stock cannot be negative
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// Export model
module.exports = mongoose.model("Product", productSchema);