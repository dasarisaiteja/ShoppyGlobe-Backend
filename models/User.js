const mongoose = require("mongoose");

// Schema for User collection
const userSchema = new mongoose.Schema(
  {
    // User name
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // User email (must be unique)
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Hashed password
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("User", userSchema);