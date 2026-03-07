// checking fields against validation schemas

export const validation = (schema, property = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });

    if (error) {
      // Format error messages nicely
      const messages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        status: "error",
        message: messages.join(", "),
      });
    }

    next();
  };
};
