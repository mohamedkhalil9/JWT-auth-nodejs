import jwt from 'jsonwebtoken';
import appError from '../helpers/appError.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access || req.headers.authorization;
  if (!token) throw new appError("token is required", 401);

  try {
    const decodedPayload = jwt.verify(token, process.env.ACCESS_SECRET); 
    req.user = decodedPayload;
    next();
  } catch (error) {
    return next(new appError("invalid token", 401));
  }
}

export default verifyToken;
