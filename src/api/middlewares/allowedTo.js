import AppError from '../helpers/appError.js';
import User from '../models/userModel.js';

const allowedTo = (...roles) => {
  return async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id);
  const role = user.role;
  if (!roles.includes(role)) {
    return next(new AppError("access denied", 403));
  }
  next();
  }
}

export default allowedTo;
