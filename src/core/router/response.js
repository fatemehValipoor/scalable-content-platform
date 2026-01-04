function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data));
}

function notFound(res, path) {
  sendJson(res, 404, {
    error: "Not Found",
    path,
  });
}

function internalError(res) {
  sendJson(res, 500, {
    error: "Internal Server Error",
  });
}

module.exports = {
  sendJson,
  notFound,
  internalError,
};
