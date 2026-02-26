// Load environment variables from .env file
require("dotenv").config();

// Import required packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Create express app
const app = new express();

// -------------------- MIDDLEWARE --------------------

// To accept JSON data from frontend
app.use(express.json());

// To allow frontend to connect with backend
app.use(cors());

// -------------------- ROUTES --------------------

// Product related routes
const productRoutes = require("./routes/productRoutes");
app.use("/products", productRoutes);

// Cart related routes
const cartRoutes = require("./routes/cartRoutes");
app.use("/cart", cartRoutes);

// Authentication routes (register & login)
const authRoutes = require("./routes/authRoutes");
app.use("/", authRoutes);

//  DATABASE CONNECTION

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("Database connection error:", error);
  });

// SERVER 

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});