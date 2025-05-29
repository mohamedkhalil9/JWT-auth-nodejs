import { body, param } from "express-validator";
import { validatorMiddleware } from "../middlewares/validatorMiddleware.js";

export const idValidator = [
  param("id").isMongoId().withMessage("invalid id"),
  validatorMiddleware,
];

export const registerValidator = [
  body("name").notEmpty().withMessage("name required"),
  body("email")
    .notEmpty()
    .withMessage("email required")
    .isEmail()
    .withMessage("enter a valid email address"),
  body("password").notEmpty().withMessage("password required"),
  validatorMiddleware,
];

export const loginValidator = [
  body("email").notEmpty().withMessage("email required"),
  body("password").notEmpty().withMessage("password required"),
  validatorMiddleware,
];
