import { successResponse } from "../../Utils/index.js";
import * as service from "./message.services.js";
export const message = async (req, res, next) => {
  try {
    const senderId = req.user.id;
    const { content } = req.body;
    const { receiverId } = req.params;
    const message = await service.sendMessage(senderId, receiverId, content);
    if (message)
      return successResponse({
        res,
        status: 201,
        message: "Your message sent successfully !",
        data: { message },
      });
  } catch (error) {
    next(error);
  }
};

export const allUserMessages = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const messages = await service.getUserMessages(userId);
    return successResponse({
      res,
      status: 200,
      message: "Your messages fetched successfully !",
      data: { messages },
    });
  } catch (error) {
    next(error);
  }
};
export const anonymousMessage = async (req, res, next) => {
  try {
    const { content } = req.body;
    const { receiverId } = req.params;
    const message= await service.sendAnonymousMessage(receiverId, content);
    if (message)
      return successResponse({
        res,
        status: 201,
        message: "Your message sent successfully !",
        data: { message },
      });
  } catch (error) {
      next(error);
  }
};
