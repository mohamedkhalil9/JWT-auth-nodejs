import User from "../models/userModel.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import appError from "../utils/appError.js";

const getUsers = asyncWrapper(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ status: "success", data: { users } });
});

const getUser = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) throw new appError("user not found", 404);
  res.status(200).json({ status: "success", data: { user } });
});

const deleteUser = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new appError(`there is no user with id ${id}`, 404);
  res.status(200).json({ status: "success", data: null });
});

const updateUser = asyncWrapper(async (req, res) => {
  // TODO: joi validation user schema
  const { id } = req.params;
  const { name, email } = req.body;

  const user = await User.findById(id);
  if (!user) throw new appError(`there is no user with id ${id}`, 404);

  const newUser = { name, email };
  const updatedUser = await User.findByIdAndUpdate(id, newUser, { new: true });

  res.status(200).json({ status: "success", data: { updatedUser, updated } });
});

export { getUsers, getUser, deleteUser, updateUser };
