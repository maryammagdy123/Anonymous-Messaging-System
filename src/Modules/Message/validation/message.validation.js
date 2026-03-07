import Joi from "joi";
import mongoose from "mongoose";

export const sendMessageSchema = Joi.object({
  content: Joi.string()
    .min(1)
    .max(1000)
    .required()
    .trim()
    .messages({
      "string.empty": "Message content is required",
      "string.min": "Message content cannot be empty",
      "string.max": "Message content cannot exceed 1000 characters",
    }),

  // receiverId: Joi.string()
  //   .required()
  //   .custom((value, helpers) => {
  //     if (!mongoose.Types.ObjectId.isValid(value)) {
  //       return helpers.error("any.invalid");
  //     }
  //     return value;
  //   })
  //   .messages({
  //     "any.required": "ReceiverId is required",
  //     "any.invalid": "ReceiverId must be a valid Mongo ObjectId",
  //   }),
});