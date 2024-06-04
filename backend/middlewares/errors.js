const logger = require("../utils/logger");
const errorHandler = (error, req, res, next) => {
  if (isValidationError(error)) {
    const readableError = generateValidationError(error);
    logger.error(error);
    res.status(readableError.statusCode).json({ ...readableError });
  } else {
    const statusCode = error.statusCode || 500;
    const message = error.message;
    const data = error.data || "internal error";
    logger.error({ message, data, statusCode });
    res.status(statusCode).json({ message, statusCode });
  }
};

function isValidationError(error) {
  return error[0] ? true : false;
}

function generateValidationError(error) {
  const readableError = [];

  for (err of error) {
    readableError.push(err.message);
  }
  return {
    data: "validation error",
    message: readableError,
    statusCode: 400,
  };
}
module.exports=errorHandler;