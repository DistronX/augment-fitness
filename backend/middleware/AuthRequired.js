const jwt = require("jsonwebtoken");
const jwtSecret = "your-secret-key";

// Middleware for verifying JWT tokens
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = { userId: decoded.userId };
    next();
  });
};
