import jwt from 'jsonwebtoken';

const genereteJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5m' })
  return token;
}

export default genereteJWT;
