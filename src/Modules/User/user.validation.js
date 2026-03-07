import Joi from "joi";

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string()
    .min(6)
    .max(30)
    .pattern(/^[a-zA-Z0-9@#$%^&+=]*$/)
    .required()
    .messages({
      "string.empty": "Current password is required",
      "string.min": "Password must be at least 6 characters",
      "string.pattern.base": "Password contains invalid characters",
    }),

  newPassword: Joi.string()
    .min(6)
    .max(30)
    .pattern(/^[a-zA-Z0-9@#$%^&+=]*$/)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "string.pattern.base": "Password contains invalid characters",
    }),
});

export const updateProfileSchema = Joi.object({
  username: Joi.string().min(3).max(30).trim(),
  email: Joi.string().email().lowercase(),
})
.unknown(false);