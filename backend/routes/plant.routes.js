import express from "express";
import {
  getAllPlants,
  getPlantById,
  getRecommendations,
  createPlant,
  updatePlant,
  deletePlant,
} from "../controllers/plant.controller.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllPlants);
router.get("/recommendations", getRecommendations);
router.get("/:id", getPlantById);

// Protected Admin Routes
router.post("/", protect, adminOnly, createPlant);
router.put("/:id", protect, adminOnly, updatePlant);
router.delete("/:id", protect, adminOnly, deletePlant);

export default router;
