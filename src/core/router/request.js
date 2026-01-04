const { parse } = require("node:url");

function parseRequest(req) {
  const { pathname, query } = parse(req.url, true);

  return {
    method: req.method,
    pathname,
    query,
  };
}

module.exports = { parseRequest };
