import jwt from 'jsonwebtoken';
import AppError from '../helpers/appError.js';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) throw new AppError("token is required", 401);

  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decodedPayload;
    next();
  } catch (error) {
    return next(new AppError("invalid token", 401));
  }
}

export default verifyToken;
