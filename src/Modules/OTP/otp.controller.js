import { successResponse } from "../../Utils/Response/success.response.js";
import * as service from "./otp.services.js";
export const verifyEmail = async (req, res, next) => {
  try {
    const verified=await service.verifyOTP(req.body, "verify");
    return successResponse({
      res,
      status: 200,
      message: "Your Account verified successfully !",
      data:{verified:verified.acknowledged}
    });
  } catch (error) {
    next(error);
  }
};
