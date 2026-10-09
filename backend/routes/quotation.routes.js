import express from "express";
import {
  createQuotation,
  getAllQuotations,
  getQuotationById,
  updateQuotationStatus,
} from "../controllers/quotation.controller.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, adminOnly, createQuotation);
router.get("/", protect, adminOnly, getAllQuotations);
router.get("/:id", getQuotationById);
router.patch("/:id/status", protect, updateQuotationStatus);

export default router;
