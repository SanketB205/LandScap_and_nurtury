import express from 'express';
import { getAllUsers, getUserById, deleteUser, makeAdmin } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);
router.patch('/:id/make-admin', makeAdmin);

export default router;
