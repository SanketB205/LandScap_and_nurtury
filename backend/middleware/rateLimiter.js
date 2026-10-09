import rateLimit from "express-rate-limit";

// Rate limiter for authentication endpoints (e.g. 15 requests per 15 minutes)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: {
    success: false,
    message: "Too many login attempts from this IP, please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for public inquiries & quote requests (e.g. 20 requests per 15 minutes)
export const inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 40,
  message: {
    success: false,
    message: "Too many inquiries submitted from this IP. Please wait a few minutes before submitting again.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
