import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    // Get token from headers
    const token = req.headers.token;
    if (!token) {
      return res.json({
        success: false,
        message: "Token not found",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.json({
        success: false,
        message: "User is unauthorized",
      });
    }

    // Find user
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
