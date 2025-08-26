const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authUser(req, res, next) {
  const token = req.cookies?.token; // safer way

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

module.exports = authUser;
