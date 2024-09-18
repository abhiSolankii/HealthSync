import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectToDb from "./db/connectToDb.js";
import { verifyToken } from "./middleware/verifyToken.js";

import authRoutes from "./routes/auth.routes.js";
import healthRecordRoutes from "./routes/healthRecord.routes.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5500;

//essentials
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://healthsync-mern.vercel.app",
      "https://healthsync-mern-abhishek-solankis-projects-5d3b88eb.vercel.app",
      "https://healthsync-mern-git-main-abhishek-solankis-projects-5d3b88eb.vercel.app",
      "https://healthsync-mern.netlify.app",
    ],
    credentials: true,
  })
);

//connect to database
connectToDb();

//routes
app.use("/api/auth", authRoutes);
app.use("/api/health-records", verifyToken, healthRecordRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
