import express from "express";
import {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  getCurrentUser,
} from "../controllers/userController.js";
import { idValidator } from "../validation/validators.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authenticate);
router.get("/current", getCurrentUser);

router.route("/").get(authorize("MANAGER", "ADMIN"), getUsers);
router
  .route("/:id")
  .get(authorize("MANAGER", "ADMIN"), idValidator, getUser)
  .delete(authorize("ADMIN"), idValidator, deleteUser)
  .patch(authorize("ADMIN"), idValidator, updateUser);

export default router;
