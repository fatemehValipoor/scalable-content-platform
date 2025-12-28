const { createRouter } = require("./core/router");

const router = createRouter();

router.get("/health", (req, res) => {
  res.statusCode = 200;
  res.end(
    JSON.stringify({
      status: "ok",
      uptime: process.uptime(),
      timestamp: Date.now(),
    })
  );
});

function app(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  router.handel(req, res);
}

module.exports = app;
