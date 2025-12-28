const { parse } = require("node:url");

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
function app(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  const method = req.method;
  const { pathname } = parse(req.url, true);

  if (method === "GET" && pathname === "/health") {
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        status: "ok",
        uptime: process.uptime(),
        timestamp: Date.now(),
      })
    );
    return;
  }
  res.statusCode = 404;
  res.end(
    JSON.stringify({
      error: "Not Found",
      path: pathname,
    })
  );
}

module.exports = app;
