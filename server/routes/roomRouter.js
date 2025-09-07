import express from "express";
import upload from '../middleware/uploadMiddleware.js';
import { protect } from "../middleware/authMiddleWare.js"
import { createRoom, getRooms, getOwnerRooms, toggleRoomAvailability } from "../controllers/roomController.js";


const roomRouter = express.Router();

// Add debugging middleware for room creation
roomRouter.post('/', (req, res, next) => {
  console.log('POST /api/rooms - Headers:', req.headers);
  console.log('POST /api/rooms - Content-Type:', req.headers['content-type']);
  console.log('POST /api/rooms - Content-Length:', req.headers['content-length']);
  next();
}, protect, upload.array("images", 4), createRoom);
roomRouter.get('/', getRooms);
roomRouter.get('/owner', protect, getOwnerRooms);
roomRouter.post('/toggle-availability', protect, toggleRoomAvailability);

export default roomRouter;