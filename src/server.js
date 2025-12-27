const { createServer } = require("node:http");
const serverConfig = require("./config/server.config");
const app = require("./app");
const server = createServer(app);
server.listen(serverConfig.port, serverConfig.host, () => {
  console.log(
    `🚀 Server running at http://${serverConfig.host}:${serverConfig.port}/`
  );
});
