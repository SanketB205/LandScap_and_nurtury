import express from "express";
import { getSettings, updateSettings } from "../controllers/settings.controller.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getSettings);
router.put("/", protect, adminOnly, updateSettings);

export default router;
