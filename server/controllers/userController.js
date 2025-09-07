// get /api/user
import User from "../models/User.js";
export const getUserData = async (req, res) => {
  try {
    console.log("getUserData called, req.user:", req.user);
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found in request"
      });
    }

    const role = req.user.role;
    const recentSearchedCities = req.user.recentSearchedCities || [];
    
    console.log("Returning user data:", { role, recentSearchedCities });
    
    res.json({
      success: true,
      role,
      recentSearchedCities
    });

  } catch (error) {
    console.error("getUserData error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// store User Recent Cities

export const storerecentSearchedCities = async (req, res) => {
  try {
    console.log("yha tak sab ");
    const { recentSearchCity } = req.body;
    const user = await User.findById(req.user._id);
    console.log(recentSearchCity);
    if (user.recentSearchedCities.length < 3) {
      user.recentSearchedCities.push(recentSearchCity);

    }
    else {
      user.recentSearchedCities.shift();
      user.recentSearchedCities.push(recentSearchCity);
    }
    console.log("yha tak bhi sab thik hai");
    console.log(user);
    await user.save();
    res.json({
      success: true,
      message: "city added",
    })
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    })
  }
}