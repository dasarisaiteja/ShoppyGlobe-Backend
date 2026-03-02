import express from "express";
import mongoose from "mongoose";

// Import routes
import productRoutes from "/Users/dasarisaiteja/Desktop/intenshala/shoppyglobe-backend/routers/productRouter.js";
import cartRoutes from "/Users/dasarisaiteja/Desktop/intenshala/shoppyglobe-backend/routers/cartRoutes.js";
import authRoutes from "/Users/dasarisaiteja/Desktop/intenshala/shoppyglobe-backend/routers/authRoutes.js";

// Create express app
const app = new express();

// -------------------- MIDDLEWARE --------------------

// To accept JSON data from frontend
app.use(express.json());

// // To allow frontend to connect with backend
// app.use(cors());

// -------------------- ROUTES --------------------

// Product routes
app.use("/products", productRoutes);

// Cart routes
app.use("/cart", cartRoutes);

// Authentication routes
app.use("/", authRoutes);

// -------------------- DATABASE CONNECTION --------------------

mongoose.connect("mongodb://localhost:27017/Shoppyglobe");

const db = mongoose.connection;

db.on("open", () => {
  console.log("Database connected successfully");
});

db.on("error", (err) => {
  console.log("Database connection error:", err);
});

// -------------------- SERVER --------------------

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});