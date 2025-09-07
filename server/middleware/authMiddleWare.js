import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    // Modern Clerk syntax - req.auth() is now a function
    const auth = req.auth();
    
    if (!auth || !auth.userId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated"
      });
    }

    const userId = auth.userId;
    console.log("Clerk userId:", userId);
    
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