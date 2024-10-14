import express from 'express';
import { User } from '../models/userModel.js';
import asyncWrapper from '../utils/asyncWrapper.js';
import appError from '../utils/appError.js';

const router = express.Router();

router.route('/')
  .get(asyncWrapper(async (req, res) => {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  }))

router.route('/:id')
  .get(asyncWrapper(async (req, res) => {
    // validation on id schema and entering id 
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) throw new appError('user not found', 404);
    res.status(200).json({ success: true, data: user});
  }))
  .delete(asyncWrapper(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, msg: 'user deleted successfully'});
  }))


export default router;
