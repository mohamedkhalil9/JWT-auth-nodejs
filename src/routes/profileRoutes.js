import { Router } from "express";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  sendEmailVerification,
  verifyEmail,
  updatePassword,
  uploadProfileImage,
} from "../controllers/profileController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { updatePassSchema, updateUserSchema } from "../validation/schemas.js";
import { validateBody } from "../middlewares/validatorMiddleware.js";

const router = Router();

router.use(authenticate);
router
  .route("/")
  .get(getUserProfile)
  .patch(validateBody(updateUserSchema), updateUserProfile)
  .delete(deleteUserProfile);

router.get("/verify-email", authenticate, sendEmailVerification);
router.get("/verify-email/:token", verifyEmail);

router
  .route("/update-password")
  .patch(validateBody(updatePassSchema), updatePassword);

router.route("/upload").post(uploadProfileImage);

export default router;
