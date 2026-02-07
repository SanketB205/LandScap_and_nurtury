import express from "express";
import { createContactus,demo } from "../controllers/contactusController.js";
const router = express.Router();
// CREATE CONTACTUS
router.post("/", createContactus);

// router.get("/hii", demo);
export default router;