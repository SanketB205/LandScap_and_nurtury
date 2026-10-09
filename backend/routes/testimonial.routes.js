import express from "express";
import { getTestimonials, createTestimonial } from "../controllers/testimonial.controller.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getTestimonials);
router.post("/", protect, adminOnly, createTestimonial);

export default router;
