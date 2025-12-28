const { createServer } = require("node:http");
console.log("1");
const serverConfig = require("./config/server.config");
console.log("2");
const app = require("./app");
console.log("3");

const server = createServer(app);

server.listen(serverConfig.port, serverConfig.host, () => {
  console.log(
    `🚀 Server running at http://${serverConfig.host}:${serverConfig.port}/`
  );
});
