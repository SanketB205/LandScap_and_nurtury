import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import cookieParser from "cookie-parser";

// Database connection
import { connectDB } from "./models/Database.js";

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
import { csrfToken, csrfProtection } from "./middleware/csrf.js";

dotenv.config();

const app = express();

// Security Headers
app.use(helmet({ crossOriginResourcePolicy: false }));

// Cookies & Body parsing
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// CORS setup — restrictive by default, driven by ALLOWED_ORIGINS env var
const defaultOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000",
];

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : defaultOrigins;

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, Postman in dev)
      if (!origin) {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS policy: Origin ${origin} not allowed.`));
      }
    },
    credentials: true,
  })
);

// CSRF token issuance (all responses get a csrf_token cookie)
app.use(csrfToken);

// CSRF protection for state-changing requests
app.use(csrfProtection);


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

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🌿 Janai Landscape Services Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to database:", err.message);
    process.exit(1);
  });

export default app;
