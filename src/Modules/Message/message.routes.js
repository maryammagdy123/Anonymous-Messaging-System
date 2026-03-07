import { Router } from "express";
import { verifyTokenMiddleware } from "../../Middleware/auth.middleware.js";
import * as controller from "./message.controller.js";
import { validation } from "../../Middleware/validation.middleware.js";
import { sendMessageSchema } from "./validation/message.validation.js";
const router = Router();
router.get("/all", verifyTokenMiddleware("strict"),controller.allUserMessages);
router.post(
  "/:receiverId",
  verifyTokenMiddleware("strict"),
  validation(sendMessageSchema, "body"),
  controller.message,
);
router.post(
  "/anonymous/:receiverId",
  verifyTokenMiddleware("optional"),
  validation(sendMessageSchema, "body"),
  controller.anonymousMessage,
);

export default router;
