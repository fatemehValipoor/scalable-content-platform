const { parseRequest } = require("./request");
const { notFound, internalError } = require("./response");

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
    const { method, pathname } = parseRequest(req);
    const route = findRoute(method, pathname);

    if (!route) {
      return notFound(res, pathname);
    }

    try {
      route.handler(req, res);
    } catch (error) {
      internalError(res);
    }
  }

  return {
    get: (path, handler) => register("GET", path, handler),
    post: (path, handler) => register("POST", path, handler),
    handle,
  };
}

module.exports = { createRouter };
