const morgan = require("morgan");
const logger = require("../utils/logger");
const stream = {
  write: (message) => logger.http(message),
};
const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};
const morganMiddleware = morgan(
  { stream, skip }
);

module.exports = morganMiddleware;