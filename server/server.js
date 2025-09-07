import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRouter.js";
import bookingRouter from "./routes/bookingRoutes.js";

dotenv.config();
connectDB();
connectCloudinary();
const app = express();

//for accept the request from frontend cross orgin resource sharing
app.use(cors({
  origin: [
    "https://hotel-booking-frontend-lake.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));
// Middleware
app.use(express.json());
app.use(clerkMiddleware());


app.use("/api/clerk", clerkWebhooks);

app.get('/', (req, res) => res.send("<h1>Api is working fine</h1>"));

app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/bookings', bookingRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server running on port ${PORT}  `));
