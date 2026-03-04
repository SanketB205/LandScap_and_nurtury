import express from "express";
import {
  getAllUsers,
  getUserById,
  deleteUser,
  makeAdmin,
} from "../controllers/userController.js";

const router = express.Router();

// Get all users
router.get("/", getAllUsers);

// Get user by ID
router.get("/:id", getUserById);

// Delete user
router.delete("/:id", deleteUser);

// Promote user to admin
router.patch("/:id/make-admin", makeAdmin);

export default router;
