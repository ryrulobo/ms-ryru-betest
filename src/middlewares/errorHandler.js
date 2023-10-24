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
    case "duplicate_username":
      statusCode = 400;
      message = "username already exists";
      break;
  }

  res.status(statusCode).json({
    code: statusCode,
    message,
  });

  Logging.error(err);
};

module.exports = errorHandler;
