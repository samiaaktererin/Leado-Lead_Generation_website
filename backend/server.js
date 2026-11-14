
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false
}));

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173"
}));

app.use(express.json({ limit: "10kb" }));

// Serve frontend files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Authentication rate limiter
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
});

// Backend API routes
app.use("/api/auth", authLimiter, authRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "LEADO Backend is running",
    database: mongoose.connection.readyState === 1
      ? "connected"
      : "disconnected"
  });
});

// API fallback
app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found"
  });
});

// Error handler
app.use(errorHandler);

// Start server even if MongoDB is unavailable.
// This allows you to view the frontend while fixing the database.
app.listen(PORT, () => {
  console.log("----------------------------------");
  console.log("LEADO Server is running!");
  console.log(`Frontend: http://localhost:${PORT}`);
  console.log(`API: http://localhost:${PORT}/api`);
  console.log(`Health: http://localhost:${PORT}/api/health`);
  console.log("----------------------------------");
});

// Connect to MongoDB separately
mongoose.set("bufferCommands", false);

connectDB().catch((error) => {
  console.error("MongoDB is not connected:", error.message);
  console.log("Frontend is still available.");
});
