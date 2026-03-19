import { successResponse } from "../../Utils/Response/success.response.js";

export const verifyEmail = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    await service.verifyOTP(email, otp);
    return successResponse({
      res,
      status: 200,
      message: "Your Account verified successfully !",
    });
  } catch (error) {
    next(error);
  }
};
