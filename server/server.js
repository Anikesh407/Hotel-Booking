import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import multer from "multer";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express';
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRouter.js";
import bookingRouter from "./routes/bookingRoutes.js";
import bodyParser from "body-parser";

dotenv.config();
connectDB();
connectCloudinary();
const app = express();
app.use(cors());



// due to insert the value in Db we use Post
app.post('/api/clerk', bodyParser.raw({ type: 'application/json' }), clerkWebhooks);

// middleware
app.use(express.json());
app.use(clerkMiddleware());

app.get('/', (req, res) => res.send("<h1>Api is working fine go to frontend</h1>"));

app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/bookings', bookingRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server running on port ${PORT}  `));
