import User from "../models/User.js";
import { getAuth } from "@clerk/express";

export const protect = async (req, res, next) => {
  try {
    // Support both Clerk styles: req.auth() (new) and getAuth(req) / req.auth (older)
    let auth;
    if (typeof req.auth === "function") {
      auth = req.auth();
    } else if (req.auth) {
      auth = req.auth;
    } else {
      auth = getAuth?.(req);
    }
    
    if (!auth || !auth.userId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated"
      });
    }

    const userId = auth.userId;
    
    // Find user in database
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found in database"
      });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Authentication error: " + error.message
    });
  }
}