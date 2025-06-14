import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import AppError from "../utils/AppError.js";

const getUsers = asyncHandler(async (req, res) => {
  // NOTE: pagination sorting filtering and fields selection --> api features
  const users = await User.find();
  res
    .status(200)
    .json({ status: "success", results: users.length, data: { users } });
});

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) throw new AppError("user not found", 404);
  res.status(200).json({ status: "success", data: user });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new AppError(`there is no user with id ${id}`, 404);
  res.status(200).json({ status: "success", data: null });
});

const updateUser = asyncHandler(async (req, res) => {
  // TODO: joi validation user schema
  const { id } = req.params;
  const { firstName, lastName, email, phone } = req.body;

  const user = await User.findById(id);
  if (!user) throw new AppError(`there is no user with id ${id}`, 404);

  const newUser = { firstName, lastName, phone, email };
  const updatedUser = await User.findByIdAndUpdate(id, newUser, { new: true });

  res.status(200).json({ status: "success", data: { updatedUser, updated } });
});

export { getUsers, getUser, deleteUser, updateUser };
