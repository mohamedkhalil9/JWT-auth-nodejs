import jwt from 'jsonwebtoken';

export const generateAccessToken = (payload) => {
  const token = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '10m' })
  return token;
}

export const generateRefreshToken = (payload) => {
  const token = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '1w' })
  return token;
}
