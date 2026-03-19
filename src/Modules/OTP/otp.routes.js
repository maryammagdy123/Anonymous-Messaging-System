import { Router } from "express";
import * as controller from "./otp.controller.js";
const router = Router();
router.patch("/verify-email", controller.verifyEmail);
router.patch("/resend-otp",controller.resendOTP)
export default router;
