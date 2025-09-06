import express from "express";
import { protect } from "../middleware/authMiddleWare.js";
import { getUserData } from "../controllers/userController.js";

import { storerecentSearchedCities } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get('/', protect, getUserData);
userRouter.post('/store-recent-search', protect, storerecentSearchedCities);

export default userRouter;