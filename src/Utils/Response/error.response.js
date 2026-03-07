export const ErrorException = ({
  message = "fail",
  cause = { status: 500 },
}) => {
  throw new Error(message, { cause });
};

export const BadRequestException = ({
  message = "Bad Request",
  extra = {},
}) => {
  throw new Error(message, { cause: { status: 400, extra } });
};

export const UnauthorizedException = ({
  message = "Unauthorized",
  extra = {},
}) => {
  throw new Error(message, { cause: { status: 403, extra } });
};

export const NotFoundException = ({ message = "Not Found", extra = {} }) => {
  throw new Error(message, { cause: { status: 404, extra } });
};
export const ConflictException = ({ message = "Not Found", extra = {} }) => {
  throw new Error(message, { cause: { status: 409, extra } });
};
export const InvalidCredentialsException = ({
  message = "Invalid Credentials",
  extra = {},
}) => {
  throw new Error(message, { cause: { status: 401, extra } });
};
export const InvalidOtp = ({ message = "Invalid Otp", extra = {} }) => {
  throw new Error(message, { cause: { status: 401, extra } });
};
export const AlreadyConfirmed = ({
  message = "User already confirmed , login into your account!",
  extra = {},
}) => {
  throw new Error(message, { cause: { status: 400, extra } });
};

//expired 400
