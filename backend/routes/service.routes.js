import express from "express";
import {
  createService,
  getAllServices,
  getServiceBySlug,
  updateService,
  deleteService,
} from "../controllers/service.controller.js";

const router = express.Router();

// CREATE SERVICE ✅ (THIS WAS MISSING)
router.post("/", createService);

// GET ALL SERVICES
router.get("/", getAllServices);

// GET SINGLE SERVICE BY SLUG
router.get("/:slug", getServiceBySlug);

// UPDATE SERVICE
router.put("/:id", updateService);

// DELETE SERVICE
router.delete("/:id", deleteService);

export default router;
