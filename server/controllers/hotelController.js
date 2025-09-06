import User from "../models/User.js";
import Hotel from "../models/hotel.js";

export const registerHotel = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }
    const { name, address, contact, city } = req.body;
    const owner = req.user._id;
    // check if User already Register
    const hotel = await Hotel.findOne({ owner });
    if (hotel) {
      return res.status(409).json({
        success: false,
        message: "Hotel Already Registered"
      });
    }
    await Hotel.create({ name, address, contact, city, owner });
    await User.findByIdAndUpdate(owner, { role: "hotelOwner" });
    res.status(200).json({
      success: true,
      message: "Hotel registered successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}