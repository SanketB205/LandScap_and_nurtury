import express from "express";
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  archiveTestimonial,
} from "../controllers/testimonial.controller.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getTestimonials);

// Protected Admin Routes
router.post("/", protect, adminOnly, createTestimonial);
router.put("/:id", protect, adminOnly, updateTestimonial);
router.patch("/:id/archive", protect, adminOnly, archiveTestimonial);
router.delete("/:id", protect, adminOnly, deleteTestimonial);

export default router;
