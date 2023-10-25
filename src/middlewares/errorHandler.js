const Logging = require("../lib/logging");

const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Internal server error";

  switch (err.name) {
    case "MongoServerError":
      if (err.code === 11000) {
        const duplicatedField = Object.keys(err.keyValue)[0];
        const errorMessage = `${duplicatedField} already exists`;

        statusCode = 400;
        message = errorMessage;
      }
      break;
    case "empty_username":
      statusCode = 400;
      message = "username is required";
      break;
    case "empty_email":
      statusCode = 400;
      message = "email is required";
      break;
    case "empty_password":
      statusCode = 400;
      message = "password is required";
      break;
    case "empty_account_number":
      statusCode = 400;
      message = "accountNumber is required";
      break;
    case "duplicate_username":
      statusCode = 400;
      message = "username already exists";
      break;
    case "empty_request_body":
      statusCode = 400;
      message = "invalid input";
      break;
    case "CastError":
      statusCode = 400;
      message = "invalid id, please check your input";
      break;
    case "invalid_credential":
      statusCode = 401;
      message = "invalid username/password";
      break;
    case "TokenExpiredError":
      statusCode = 401;
      message = "token expired";
      break;
    case "JsonWebTokenError":
    case "unauthorized":
      statusCode = 403;
      message = "unauthorized activity";
      break;
    case "forbidden":
      statusCode = 403;
      message = "forbidden activity";
      break;
    case "user_not_found":
      statusCode = 404;
      message = "user not found";
      break;
  }

  res.status(statusCode).json({
    code: statusCode,
    message,
  });

  Logging.error(err);
};

module.exports = errorHandler;
