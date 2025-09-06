import express from "express";
import { checkAvailabilityAPI, createBooking, getUserBookings, getHotelBookings } from "../controllers/bookingControllers.js";
import { protect } from "../middleware/authMiddleWare.js";
const bookingRouter = express.Router();


bookingRouter.post("/check-availability", checkAvailabilityAPI);
bookingRouter.post('/book', protect, createBooking);
bookingRouter.get("/user", protect, getUserBookings);
bookingRouter.get("/hotel", protect, getHotelBookings);

export default bookingRouter;