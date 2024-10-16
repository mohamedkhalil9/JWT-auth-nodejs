import express from 'express';
import { register, login } from '../controllers/authController.js';
import { registerValidator, loginValidator } from '../validation/validators.js';

const router = express.Router();

router.route('/register').post(registerValidator, register) 
router.route('/login').post(loginValidator, login) 

export default router;
