import AppError from '../helpers/appError.js';

const allowedTo = (...roles) => {
  return (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new AppError("access denied", 403));
  }
  next();
  }
}

export default allowedTo;
