import express  from "express"
import {signupValidation,loginValidation} from "../middleware/AuthValidation.js"
import { login,signup } from "../controllers/authController.js"; 

const router = express.Router();

router.post('/login',loginValidation,login);
router.post('/signup',signupValidation,signup);

export default router;