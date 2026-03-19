import nodemailer from "nodemailer";
import {
  SMTP_PASSWORD_KEY,
  SMTP_PORT,
  SMTP_USER,
} from "../../config/config.service.js";

export const sendOTPEmail = async (email, otp, subject) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: SMTP_PORT,
    secure: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD_KEY,
    },
  });

  const mailOptions = {
    from: '"Saraha App" <no-reply@saraha.com>',
    to: email,
    subject: subject,
    text: `Your OTP code is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};
