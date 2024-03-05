exports.errorHandler = (error, req, res, next) => {
  if (isValidationError(error)) {
    const readableError = generateValidationError(error);
    res.status(readableError.statusCode).json({ ...readableError });
  } else {
    const statusCode = error.statusCode || 500;
    const message = error.message;
    const data = error.data;

    res.status(statusCode).json({ message, data, statusCode });
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
