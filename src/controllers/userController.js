import User from "../models/userModel.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import appError from "../utils/appError.js";
import bcrypt from "bcryptjs";

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
  const { id } = req.params;
  const { name, email, oldPassword, newPassword } = req.body;

  const user = await User.findById(id);
  if (!user) throw new appError(`there is no user with id ${id}`, 404);

  let updated = req.body;
  let hashedPassword;
  if (oldPassword && newPassword) {
    const passwordMatched = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatched) throw new appError("invalid email password", 400);

    hashedPassword = await bcrypt.hash(newPassword, 10);
    delete updated.oldPassword;
    delete updated.newPassword;
    updated = { ...updated, password: "" };
  }
  const newUser = { ...user._doc, name, email, password: hashedPassword };
  const updatedUser = await User.findByIdAndUpdate(id, newUser, { new: true });

  res.status(200).json({ status: "success", data: { updatedUser, updated } });
});

export const updatePassword = asyncWrapper(async (req, res) => {});

const getCurrentUser = asyncWrapper(async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id);
  if (!user) throw new appError("user not found", 404);
  res.status(200).json({ status: "success", data: { user } });
});

export { getUsers, getUser, deleteUser, updateUser, getCurrentUser };
