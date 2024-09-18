import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectToDb from "./db/connectToDb.js";
import { verifyToken } from "./middleware/verifyToken.js";

import authRoutes from "./routes/auth.routes.js";
import healthRecordRoutes from "./routes/healthRecord.routes.js";
import path from "path";

const app = express();
dotenv.config();
const __dirname = path.resolve();

//essentials
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5500;

//routes
app.use("/api/auth", authRoutes);
app.use("/api/health-records", verifyToken, healthRecordRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => {
  connectToDb();
  console.log(`Server running on port ${PORT}`);
});
