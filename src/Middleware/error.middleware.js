export const globalErrorHandling = (error, req, res, next) => {
  const status = error.cause?.status || 500;

  const response = {
    error_message: error.message || "Something went wrong",
  };

  // لو في environment development خلي الـ stack يظهر
  if (process.env.NODE_ENV === "development") {
    response.stack = error.stack;
    response.error = error; // optional
  }

  return res.status(status).json(response);
};
