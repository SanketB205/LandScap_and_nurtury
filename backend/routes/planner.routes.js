import express from "express";
import { calculateEstimate } from "../controllers/planner.controller.js";

const router = express.Router();

router.post("/estimate", calculateEstimate);

export default router;
