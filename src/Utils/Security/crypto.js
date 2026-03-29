import crypto from "node:crypto";
import { ENCRYPTION_SECRET_KEY } from "../../../config/config.service.js";

//encryption for phone number
const IV_LENGTH = 12;
const ENCRYPT_SEC_KEY = ENCRYPTION_SECRET_KEY;
export const encrypt = async (plaintext) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPT_SEC_KEY, iv);
  let encryptedData = cipher.update(plaintext, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  return `${iv.toString("hex")}:${encryptedData}`;
};

export const decrypt = async (encryptedData) => {
  let [iv, encryptedText] = encryptedData.split(":");
  const binaryLike = Buffer.from(iv, "hex"); //used to decrypt data
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    ENCRYPT_SEC_KEY,
    binaryLike,
  );
  let decryptedData = decipher.update(encryptedText, "hex", "utf-8");
  decryptedData += decipher.final("utf-8");
  return decryptedData;
};

//generating pair key values for reading and sending messages
//Generate public/private key pair
export const generateKeyPair = () => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "pkcs1", format: "pem" },
    privateKeyEncoding: { type: "pkcs1", format: "pem" },
  });
  return { publicKey, privateKey };
};

export const encryptMessage = (content, publicKey) => {
  const encryptedBuffer = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING.PKCS1,
    },
    Buffer.from(content, "utf-8"),
  );
  return encryptedBuffer.toString("base64");
};

export const decryptMessage = (encryptedBuffer, privateKey) => {
  const decryptedBuffer = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING.PKCS1,
    },
    Buffer.from(encryptedBuffer, "base64"),
  );

  return decryptedBuffer.toString("utf-8");
};

export const hashOtp = (otp) => {
  crypto.createHash("sha256").update(otp).digest("hex");
};
export const generateOneTimeToken = () => {
  let token = crypto.randomBytes(32).toString("hex");
  return token;
};
