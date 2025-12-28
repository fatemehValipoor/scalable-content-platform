const { error } = require("node:console");
const { parse } = require("node:url");
function createRouter() {
  const routes = [];
  console.log("I'm hear at createRouter Function");

  function register(method, path, handler) {
    console.log("Now I'm at register Function");
    routes.push({
      method,
      path,
      handler,
    });
  }

  function handel(req, res) {
    console.log("finally I'm at handel function");
    const method = req.method;
    const { pathname } = parse(req.url, true);

    const route = routes.find(
      (route) => route.method === method && route.path === pathname
    );

    if (!route) {
      res.statusCode = 404;
      res.setHeader("content_type", "application/json");
      res.end(
        JSON.stringify({
          error: "not found",
          path: pathname,
        })
      );
      return;
    }

    try {
      route.handler(req, res);
    } catch (err) {
      res.statusCode = 500;
      res.end(
        JSON.stringify({
          error: "Internal Server Error",
        })
      );
    }
  }

  return {
    get: (path, handler) => register("GET", path, handler),
    post: (path, handler) => register("POST", path, handler),
    handel,
  };
}

module.exports = { createRouter };
