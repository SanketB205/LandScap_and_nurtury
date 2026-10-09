import express from "express";
import {
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllProjects);
router.get("/:slug", getProjectBySlug);

// Protected Admin Routes
router.post("/", protect, adminOnly, createProject);
router.put("/:id", protect, adminOnly, updateProject);
router.delete("/:id", protect, adminOnly, deleteProject);

export default router;
