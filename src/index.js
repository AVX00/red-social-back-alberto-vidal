require("dotenv").config();
const serverSays = require("debug")("social:root:");
const chalk = require("chalk");
const raiseServer = require("./server/raiseServer");
const app = require("./server/index");

const port = process.env.PORT || 3000;

(async () => {
  try {
    await raiseServer(app, port);
  } catch (error) {
    serverSays(
      chalk.red(error.code === "EADDRINUSE" ? "port busy" : error.message)
    );
  }
})();
