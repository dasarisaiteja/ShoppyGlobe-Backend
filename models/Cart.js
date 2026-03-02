import mongoose from "mongoose"; 

// Schema for Cart collection
const cartSchema = new mongoose.Schema(
  {
    // Reference to logged-in user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Reference to Product
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    // Quantity of product in cart
    quantity: {
      type: Number,
      default: 1,
      min: 1, 
    },
  },
  {
    timestamps: true, 
  }
);


const Cart = mongoose.model("Cart", cartSchema);
export default Cart;