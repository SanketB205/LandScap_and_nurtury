import express from "express";
import { createContactus, getAllContactus, deleteContactus, demo } from "../controllers/contactusController.js";
const router = express.Router();

// CREATE CONTACTUS
router.post("/", createContactus);

// GET ALL CONTACTS
router.get("/", getAllContactus);

// DELETE A CONTACT
router.delete("/:id", deleteContactus);

// router.get("/hii", demo);

export default router;