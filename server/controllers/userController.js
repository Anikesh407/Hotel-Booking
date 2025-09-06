// get /api/user
import User from "../models/User.js";
export const getUserData = async (req, res) => {
  try {
    const role = req.user.role;
    const recentSearchedCities = req.user.recentSearchedCities;
    res.json({
      success: true,
      role,
      recentSearchedCities
    })


  } catch (error) {
    res.json({
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