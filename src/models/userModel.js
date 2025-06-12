import mongoose from "mongoose";
import bcrypt from "bcrypt";
import AppError from "../utils/appError.js";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    username: String,
    password: {
      type: String,
      // required: true,
    },
    profileImg: {
      type: String,
      // defalut: function () {
      //   return `https://eu.ui-avatars.com/api/?name=${this.firstName}+${this.lastName}`;
      // },
    },
    role: {
      type: String,
      enum: ["USER", "MANAGER", "ADMIN"],
      default: "USER",
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    dateOfBirth: Date,
    phone: String,
    country: String,
    address: String,
    verifed: Boolean,
    token: String,
    otp: String,
    otpExpire: Date,
    otpVerifed: Boolean,
    googleId: String,
    githubId: String,
    provider: {
      type: String,
      enum: ["google", "github"],
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
  } catch (error) {
    next(error);
  }
});
// userSchema.methods.isValidPassword = async function (password) {
//   try {
//     return await bcrypt.compare(password, this.password);
//   } catch (error) {
//     throw new AppError("Password comparison failed");
//   }
// };
const User = mongoose.model("User", userSchema);

export default User;
