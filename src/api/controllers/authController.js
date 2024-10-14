import User from '../models/userModel.js';
import asyncWrapper from '../middlewares/asyncWrapper.js';
import appError from '../helpers/appError.js';

export const register = asyncWrapper(async (req, res) => {
  const { name, email, password } = req.body;
  if ( !name || !email || !password ) throw appError('please enter all fields', 422)
  const newUser = await User.create({ name, email, password });
  res.status(201).json({ status: "success", data: newUser });
})

