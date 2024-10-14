import User from '../models/userModel.js';
import asyncWrapper from '../middlewares/asyncWrapper.js';
import appError from '../helpers/appError.js';
import bcrypt from 'bcryptjs/dist/bcrypt.js';

export const register = asyncWrapper(async (req, res) => {
  const { name, email, password } = req.body;
  if ( !name || !email || !password ) throw new appError('please enter all fields', 422)
  const user = await User.findOne({ email: email });
  if (user) throw new appError("user aleardy existed", 422);
  const hashedPassword = await bcrypt.hash(password, 10);
  // const newUser = new User({name, email, password});
  // await newUser.save();
  const newUser = await User.create({ name, email, password: hashedPassword });
  res.status(201).json({ status: "success", data: newUser });
})

