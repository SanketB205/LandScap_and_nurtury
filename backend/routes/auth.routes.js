import express from "express";
import {
  register,
  login,
  logout,
  getMe,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.js";
import { authLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.post("/logout", logout);
router.get("/me", protect, getMe);

export default router;
