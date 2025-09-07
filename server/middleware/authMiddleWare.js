import User from "../models/User.js";


export const protect = async (req, res, next) => {
  try {
    // Support both Clerk styles: req.auth() (new) and getAuth(req) / req.auth (older)
    const { userId } = req.auth();

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

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