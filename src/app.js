const { createRouter } = require("./core/router/router");
const { sendJson } = require("./core/router/response");

const router = createRouter();

/**
 * Register routes (LOAD time)
 */
router.get("/health", (req, res) => {
  throw new Error("Test error");
  // sendJson(res, 200, {
  //   status: "ok",
  //   uptime: process.uptime(),
  //   timestamp: Date.now(),
  // });
});

/**
 * Application entry (REQUEST time)
 */
function app(req, res) {
  router.handle(req, res);
}

module.exports = app;
