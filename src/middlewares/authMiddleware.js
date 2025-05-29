import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.headers.authorization || req.cookies.access;
  if (!token) throw new AppError("token is required", 401);

  try {
    const decodedPayload = jwt.verify(token, process.env.ACCESS_SECRET);
    req.user = decodedPayload;
    next();
  } catch (error) {
    return next(new AppError("invalid token", 401));
  }
};

const authorize = (...roles) => {
  return async (req, res, next) => {
    const { id } = req.user;
    const user = await User.findById(id);
    const role = user.role;

    if (!roles.includes(role)) return next(new AppError("access denied", 403));
    next();
  };
};

export { authenticate, authorize };
