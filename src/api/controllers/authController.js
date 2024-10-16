import User from '../models/userModel.js';
import asyncWrapper from '../middlewares/asyncWrapper.js';
import appError from '../helpers/appError.js';
import bcrypt from 'bcryptjs';
import genereteJWT from '../helpers/generateJWT.js';

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

  const token = await genereteJWT({ id: user._id, email: user.email, role:user.role }) 

  res.status(200).json({ status: "success", data: {
    id: user._id,
    name: user.name,
    email: user.email,
    accessToken: token
  } });
})
