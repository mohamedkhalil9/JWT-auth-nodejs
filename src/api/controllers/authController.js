import User from '../models/userModel.js';
import asyncWrapper from '../middlewares/asyncWrapper.js';
import appError from '../helpers/appError.js';
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from '../helpers/generateTokens.js';
import jwt from 'jsonwebtoken';

export const register = asyncWrapper(async (req, res) => {
  const { name, email, password, role } = req.body;
  // if ( !name || !email || !password ) throw new appError('please enter all fields', 422)

  const user = await User.findOne({ email: email });
  if (user) throw new appError("user aleardy existed", 409);

  const hashedPassword = await bcrypt.hash(password, 10);
  // const newUser = new User({name, email, password});
  // await newUser.save();
  const newUser = await User.create({ name, email, password: hashedPassword, role });

  res.status(201).json({ status: "success", data: newUser });
})

export const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  // if ( !email || !password ) throw new appError('please enter all fields', 422)

  const user = await User.findOne({ email: email });
  if (!user) throw new appError("invalid email or password", 401);

  const passwordMatched = await bcrypt.compare(password, user.password);
  if (!passwordMatched) throw new appError("invalid email or password", 401);

  const payload = { id: user._id };
  const accessToken = await generateAccessToken(payload);
  const refreshToken = await generateRefreshToken(payload);
  user.token = refreshToken;
  const newUser = await user.save();

  res
    .status(200)
    .cookie('access', accessToken, { httpOnly: true, maxAge: 1000 * 60 * 10 })
    .cookie('refresh', refreshToken, { httpOnly: true, path: '/api/v1/auth/refresh-token', maxAge: 1000 * 60 * 60 * 24 * 7 })
    .json({ status: "success", data: {
    id: user._id,
    name: user.name,
    email: user.email,
    }
  });
})

export const newToken = asyncWrapper(async (req, res) => {
  const token = req.cookies.refresh || req.headers.authorization;
  if (!token) throw new appError("token is required", 401);

  const decodedPayload = jwt.verify(token, process.env.REFRESH_SECRET, 
    (err, decoded) => {
      if (err) throw new appError("invalid token", 401);
      return decoded;
    }
  ) 
  const { id } = decodedPayload;
  const user = await User.findById(id);

  if (!token === user.token) throw appError("invalid token", 401);
  const payload = { id: user.id };
  const accessToken = await generateAccessToken(payload); 
  res
    .status(200)
    .cookie('access', accessToken, { httpOnly: true, path: '/api/v1/auth/refresh-token', maxAge: 1000 * 60 * 10 })
    .json({ status: "success" });
})

export const logout = async (req, res) => {
  const token = req.cookies.refresh || req.headers.authorization;
  if (!token) res.sendStatus(204);

  const decodedPayload = jwt.verify(token, process.env.REFRESH_SECRET, 
    (err, decoded) => {
      if (err) res.sendStatus(204);
      return decoded;
    }
  ) 
  const { id } = decodedPayload;
  const user = await User.findById(id);

  user.token = "";
  await user.save();
  res
    .status(200)
    .clearCookie('access', { httpOnly: true })
    .clearCookie('refresh', { httpOnly: true })
    .json({ status: "success" });
}
