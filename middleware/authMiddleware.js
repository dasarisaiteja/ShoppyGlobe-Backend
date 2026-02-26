const jwt = require("jsonwebtoken");

// Middleware function to verify JWT token
const authMiddleware = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.header("Authorization");

    // Check if header exists
    if (!authHeader) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Format expected: "Bearer token"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // Verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to request object
    req.user = decoded;

    next(); // Continue to next middleware or route

  } catch (error) {
    console.log("JWT Error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;