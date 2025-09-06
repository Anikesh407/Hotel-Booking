//function to check Availability of Room
import Booking from "../models/Booking.js"
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import transporter from "../configs/nodemailer.js";

const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  try {
    const bookings = await Booking.find({ room, checkInDate: { $lte: checkOutDate }, checkOutDate: { $gte: checkInDate } });
    const isAvailable = (bookings.length === 0);
    return isAvailable;

  } catch (error) {

    console.error(error.message);

  }
}

// Api to check availability of room
//post /api/bookings/check-availability

export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate } = req.body;
    const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });

    res.json({
      success: true,
      isAvailable
    })
  } catch (error) {
    console.error("checkAvailability error:", error);
  }
}

// Api to create new Booking
// Post?api/bookings/book

export const createBooking = async (req, res) => {
  try {

    const { room, checkInDate, checkOutDate, guests } = req.body;
    const user = req.user._id;
    const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
    if (!isAvailable) {
      return res.json({
        success: false,
        message: "Room is not available"
      })
    }
    // get totalprice for room
    const roomData = await Room.findById(room).populate("hotel");
    let totalPrice = roomData.pricePerNight;
    //  calculate total price based on night
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    totalPrice *= nights;

    const booking = await Booking.create({
      user,
      room,
      hotel: roomData.hotel._id,
      guests: +guests,
      checkInDate,
      checkOutDate,
      totalPrice
    })

    // send gmail to conform the booking
    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: req.user.email,
      subject: 'Hotel Booking Details',
      html: `
    <h2>Your Booking Details<h2/>
    <P>Dear ${req.user.
          username}</P>
    <p>Thank you so much for your booking! We’re delighted to have the opportunity to host you and ensure your experience is a memorable one. Please find your booking details below:</p>

    <ul>
    <li><strong>Booking ID:</strong>${booking._id}</li>
    <li><strong>Hotel Name:</strong>${roomData.hotel.name}</li>
    <li><strong>Location:</strong>${roomData.hotel.address}</li>
    <li><strong>Date:</strong>${booking.checkInDate.toDateString()}</li>
    <li><strong>Booking Amount:</strong>${process.env.CURRENCY || '₹'} ${booking.totalPrice}</li>
   

    </ul>
    ${booking.ispaid ? '<p>We’re happy to confirm that your payment has been successfully received. Your booking is now fully secured</p>' : '<p><strong>Note:</strong> Your booking is confirmed, but payment is still pending. Please complete the payment at your earliest convenience to secure your reservation.</p>'
        }
   <p>We can’t wait to welcome you!</p>
   <p>If you’d like to make any changes, just let us know.</p>
    `}
    await transporter.sendMail(mailOption);
    res.json({
      success: true,
      message: "Booking Created Successfully"
    })

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    })
  }
}

// Api to get All booking for a user

// Get /api/bookings/user

export const getUserBookings = async (req, res) => {
  try {
    const user = req.user._id;
    const bookings = await Booking.find({ user }).populate("room hotel").sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings
    })
  } catch (error) {
    res.json({
      success: false,
      message: "failed to fetch bookings"
    })
  }
}


// get HotelBooking data

export const getHotelBookings = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.user._id });
    if (!hotel) {
      return res.json({
        success: false,
        message: "No Hotel Found"
      });
    }
    const bookings = await Booking.find({ hotel: hotel._id }).populate("room hotel user").sort({ createdAt: -1 });
    // total bookings
    const totalBookings = bookings.length;
    // total revenew
    const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
    res.json({
      success: true,
      dashboardData: {
        totalBookings,
        totalRevenue,
        bookings
      }
    })

  } catch (error) {
    res.json({
      success: false,
      message: "Failed to fetch bookings"
    })
  }
}