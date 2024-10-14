import User from '../models/userModel.js';
import asyncWrapper from '../middlewares/asyncWrapper.js';
import appError from '../helpers/appError.js';

const getAllUsers = asyncWrapper(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ status: "success", data: {users} });
})

const getUser = asyncWrapper(async (req, res) => {
  // validation on id schema and entering id 
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) throw new appError("user not found", 404);
  res.status(200).json({ status: "success", data: {user} });
})
const deleteUser = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  await User.findByIdAndDelete(id);
  res.status(204).json({ status: "success", data: null });
})


export { getAllUsers, getUser, deleteUser }
