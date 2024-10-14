import express from 'express';
import { User } from '../models/userModel.js';
import asyncWrapper from '../utils/asyncWrapper.js';

const router = express.Router();

router.post('/register', asyncWrapper(async (req, res) => {
  const { name, email, password } = req.body;
  if ( !name || !email || !password ) {
    return res.json({ msg: "enter all fields"});
  }
  await User.create({ name, email, password });
  res.status(201).json({ success: true, msg: "new user created" });
}))


export default router;
