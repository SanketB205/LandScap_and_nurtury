import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import cookieParser from "cookie-parser";

// Routes
import authRoutes from "./routes/auth.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import plantRoutes from "./routes/plant.routes.js";
import projectRoutes from "./routes/project.routes.js";
import inquiryRoutes from "./routes/inquiry.routes.js";
import plannerRoutes from "./routes/planner.routes.js";
import quotationRoutes from "./routes/quotation.routes.js";
import settingsRoutes from "./routes/settings.routes.js";
import testimonialRoutes from "./routes/testimonial.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";

// Middleware
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// Security Headers
app.use(helmet({ crossOriginResourcePolicy: false }));

// Cookies & Body parsing
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// CORS setup
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, true); // Allow during development
      }
    },
    credentials: true,
  })
);

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "Janai Landscape Services API",
    location: "Pune, Maharashtra",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/plants", plantRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/planner", plannerRoutes);
app.use("/api/quotations", quotationRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/analytics", analyticsRoutes);

// Centralized Error Handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI ||
  process.env.mongourl ||
  "mongodb://localhost:27017/Nursery";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully to:", MONGO_URI);
    app.listen(PORT, () => {
      console.log(`🌿 Janai Landscape Services Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    // Still start server so non-db calls/health check report status
    app.listen(PORT, () => {
      console.log(`⚠️ Server running with DB error on port ${PORT}`);
    });
  });

export default app;
