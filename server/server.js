import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express';
import { clerkWebhooks } from "./controllers/clerkWebhooks.js"

connectDB();
const app = express();
dotenv.config();

//for accept the request from frontend cross orgin resource sharing
app.use(cors());

// Middleware
app.use(express.json());
app.use(clerkMiddleware());


app.use("/api/clerk", clerkWebhooks);

app.get('/', (req, res) => res.send("<h1>Api is working fine</h1>"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server running on port ${PORT}  `));
