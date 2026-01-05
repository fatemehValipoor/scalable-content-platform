const logger = require("../logger");

function handleError(err, req, res) {
  logger.error(
    {
      err,
      method: req.method,
      url: req.url,
    },
    "Request failed"
  );

  const statusCode = err.statusCode || 500;
  const errorCode = err.code || "INTERNAL_ERROR";

  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(
    JSON.stringify({
      error: {
        code: errorCode,
        message:
          err.isOperational && err.message
            ? err.message
            : "Internal Server Error",
      },
    })
  );
}

module.exports = { handleError };
