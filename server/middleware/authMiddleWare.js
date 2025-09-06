import User from "../models/User.js";
export const protect = async (req, res, next) => {
  const { userId } = req.auth();
  if (!userId) {

    return res.status(401).json({
      success: false,
      message: "not authenticated"
    })
  }
  else {

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }
    req.user = user;
    next();
  }
}