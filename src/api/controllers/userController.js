import User from '../models/userModel.js';
import asyncWrapper from '../middlewares/asyncWrapper.js';
import appError from '../helpers/appError.js';

const getUsers = asyncWrapper(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ status: "success", data: {users} });
})

const getUser = asyncWrapper(async (req, res) => {
  // validation on id schema and entering id 
  const { id } = req.params;
  if (!id) id = req.user.id;
  const user = await User.findById(id);
  if (!user) throw new appError("user not found", 404);
  res.status(200).json({ status: "success", data: {user} });
})

const deleteUser = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new appError(`there is no user with id ${id}`, 404);
  res.status(200).json({ status: "success", data: null });
})

const getCurrentUser = asyncWrapper(async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id);
  if (!user) throw new appError("user not found", 404);
  res.status(200).json({ status: "success", data: {user} });
})


export { getUsers, getUser, deleteUser, getCurrentUser }
