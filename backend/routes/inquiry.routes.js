import express from "express";
import {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  updateInquiryStatus,
  addInquiryNote,
  deleteInquiry,
} from "../controllers/inquiry.controller.js";
import { protect, adminOnly } from "../middleware/auth.js";
import { inquiryLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

// Public submission with rate limiting
router.post("/", inquiryLimiter, createInquiry);

// Protected Admin Routes
router.get("/", protect, adminOnly, getAllInquiries);
router.get("/:id", protect, adminOnly, getInquiryById);
router.patch("/:id/status", protect, adminOnly, updateInquiryStatus);
router.patch("/:id/notes", protect, adminOnly, addInquiryNote);
router.delete("/:id", protect, adminOnly, deleteInquiry);

export default router;
