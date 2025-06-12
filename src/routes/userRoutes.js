import express from "express";
import {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";
import { authenticate, authorize } from "../middlewares/authMiddleware.js";
import { mongoId } from "../validation/schemas.js";
import { validateParams } from "../middlewares/validatorMiddleware.js";

const router = express.Router();

router.use(authenticate);

router.route("/").get(authorize("MANAGER", "ADMIN"), getUsers);

router
  .route("/:id")
  .get(authorize("MANAGER", "ADMIN"), validateParams(mongoId), getUser)
  .delete(authorize("ADMIN"), validateParams(mongoId), deleteUser)
  .patch(authorize("ADMIN"), validateParams(mongoId), updateUser);

export default router;
