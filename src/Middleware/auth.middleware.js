import { verifyToken } from "../Utils/index.js";

export const verifyTokenMiddleware  = (mode = "strict") => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        if (mode === "strict") {
          return res.status(401).json({
            message: "Authorization token is required",
          });
        }
        return next(); // optional auth if user is anonymous
      }
      //.split(" ")[1]
      const token = authHeader;

      const decoded = verifyToken(token);

      req.user = decoded;
      //req.user.id

      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};
