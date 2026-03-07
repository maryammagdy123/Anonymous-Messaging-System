import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET_KEY, TOKEN_EXPIRES_IN } from "../../../config/config.service.js";


export const generateToken = (
  payload,
  secretKey = ACCESS_TOKEN_SECRET_KEY,
  expiresIn = TOKEN_EXPIRES_IN,
) => {
  return jwt.sign(payload, secretKey, { expiresIn: String(expiresIn) });
};
//this function generates token and return it

export const verifyToken = (token, secretKey = ACCESS_TOKEN_SECRET_KEY) => {
  return jwt.verify(token, secretKey);
};
