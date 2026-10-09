import express from "express";
import {
  createService,
  getAllServices,
  getServiceBySlug,
  updateService,
  deleteService,
} from "../controllers/service.controller.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllServices);
router.get("/:slug", getServiceBySlug);

// Protected Admin Routes
router.post("/", protect, adminOnly, createService);
router.put("/:id", protect, adminOnly, updateService);
router.delete("/:id", protect, adminOnly, deleteService);

export default router;
