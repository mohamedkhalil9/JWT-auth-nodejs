import User from "../models/userModel.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import appError from "../utils/appError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendVerifyEmail } from "../utils/sendEmail.js";
import { v2 as cloudinary } from "cloudinary";

export const getUserProfile = asyncWrapper(async (req, res) => {
  console.log(req.user);
  const { id } = req.user;
  const user = await User.findById(id).select("-password");
  if (!user) throw new appError("user not found", 404);
  res.status(200).json({ status: "success", data: user });
});

export const updateUserProfile = asyncWrapper(async (req, res) => {
  const { id } = req.user;
  const userData = req.body;
  const user = await User.findByIdAndUpdate(id, userData, { new: true });
  if (!user) throw new appError("user not found", 404);

  res.status(200).json({ status: "success", data: user });
});

export const deleteUserProfile = asyncWrapper(async (req, res) => {
  const { id } = req.user;
  // NOTE: soft delete
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new appError("user not found", 404);

  res.status(200).json({ status: "success", data: null });
});

export const updatePassword = asyncWrapper(async (req, res) => {
  const { id } = req.user;
  const { password, newPassword } = req.body;

  const user = await User.findById(id);
  if (!user) throw new appError(`there is no user with id ${id}`, 404);

  const passwordMatched = await bcrypt.compare(password, user.password);
  if (!passwordMatched) throw new appError("invalid password", 400);

  user.password = newPassword;
  await user.save();

  res.status(200).json({ status: "success", data: user });
});

export const uploadProfileImage = asyncWrapper(async (req, res) => {
  const { id } = req.user;
  const img = req.file;

  // const upload = await cloudinary.uploader.upload(img.path);
  const upload = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "image" }, (error, result) =>
        error ? reject(error) : resolve(result),
      )
      .end(img.buffer);
  });
  const url = upload.secure_url;

  const user = await User.findByIdAndUpdate(
    id,
    { profileImg: url },
    { new: true },
  ).select("-password");

  res.status(200).json({ status: "success", data: user });
  // TODO: get the file --> multer
  // upload it --> cloudinary
  // get the url and save it profileImg
});

export const sendEmailVerification = asyncWrapper(async (req, res) => {
  const { id } = req.user;
  const user = await User.findById(id);
  if (!user) throw new appError("user not found", 404);

  const token = jwt.sign({ id }, process.env.VERIFY_EMAIL_SECRET, {
    expiresIn: "12h",
  });
  sendVerifyEmail(user.email, token);

  res.status(200).json({
    status: "success",
    message: "email sent successfully",
    data: null,
  });
});

export const verifyEmail = asyncWrapper(async (req, res) => {
  const { token } = req.params;

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.VERIFY_EMAIL_SECRET);
  } catch (error) {
    throw new appError("invalid token", 401);
  }

  const user = await User.findByIdAndUpdate(
    decoded.id,
    {
      verifed: true,
    },
    { new: true },
  ).select("-password");
  res
    .status(200)
    .json({ status: "success", message: "email verifed", data: user });
});
