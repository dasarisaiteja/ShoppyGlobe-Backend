import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import productRoutes from "./routers/productRouter.js";
import cartRoutes from "./routers/cartRoutes.js";
import authRoutes from "./routers/authRoutes.js";

// import mongoose from "mongoose";

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/", authRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});