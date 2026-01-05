const { parseRequest } = require("./request");
const { handleError } = require("./errors/error-handler");

function createRouter() {
  const routes = [];

  function register(method, path, handler) {
    routes.push({ method, path, handler });
  }

  function findRoute(method, path) {
    return routes.find(
      (route) => route.method === method && route.path === path
    );
  }

  function handle(req, res) {
    try {
      const { method, pathname } = parseRequest(req);
      const route = findRoute(method, pathname);

      if (!route) {
        throw new Error("Route not found");
      }

      route.handler(req, res);
    } catch (err) {
      handleError(err, req, res);
    }
  }

  return {
    get: (path, handler) => register("GET", path, handler),
    post: (path, handler) => register("POST", path, handler),
    handle,
  };
}

module.exports = { createRouter };
