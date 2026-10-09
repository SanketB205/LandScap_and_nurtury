import express from "express";
import { getAdminStats } from "../controllers/analytics.controller.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/stats", protect, adminOnly, getAdminStats);

export default router;
