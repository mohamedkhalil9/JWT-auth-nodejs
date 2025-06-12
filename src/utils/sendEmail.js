import nodemailer from "nodemailer";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import { verifyTmp, resetTmp } from "./templates.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

const sendEmail = asyncWrapper(async (email, subject, tmp) => {
  const options = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    html: tmp,
  };
  // await transporter.verify();
  const res = await transporter.sendMail(options);
  return res;
});

export const sendVerifyEmail = (email, token) => {
  const verifyHtml = verifyTmp(token);
  sendEmail(email, "Verify Email", verifyHtml);
};

export const sendResetEmail = (email, otp) => {
  const resetHtml = resetTmp(otp);
  sendEmail(email, "Reset Password", resetHtml);
};
