import express from "express";
import {
  register,
  login,
  newToken,
  logout,
} from "../controllers/authController.js";
import { registerValidator, loginValidator } from "../validation/validators.js";

const router = express.Router();

router.route("/register").post(registerValidator, register);
router.route("/login").post(loginValidator, login);

router.route("/refresh-token").post(newToken);
router.route("/logout").post(logout);

// NOTE: reset password and forget
// update password
// user management?

export default router;
