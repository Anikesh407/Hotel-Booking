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




app.post('/api/clerk', bodyParser.raw({ type: 'application/json' }), clerkWebhooks);

// middleware
app.use(express.json());
app.use(clerkMiddleware());

app.get('/', (req, res) => res.send("<h1>Api is working fine</h1>"));

app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/bookings', bookingRouter);

// Global error handler for multer errors
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({
        success: false,
        message: 'File too large. Maximum size is 10MB per file.'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Maximum 4 files allowed.'
      });
    }
  }

  if (error.message === 'Only image files are allowed!') {
    return res.status(400).json({
      success: false,
      message: 'Only image files are allowed!'
    });
  }

  console.error('Global error handler:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server running on port ${PORT}  `));
