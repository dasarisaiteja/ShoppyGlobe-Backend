import jwt from "jsonwebtoken";

// Middleware function to verify JWT token
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Format expected: "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // Verify token - ensure process.env.JWT_SECRET is defined in your .env file
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_temporary_secret_key");

    req.user = decoded;
    next(); 

  } catch (error) {
    console.log("JWT Error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware; 