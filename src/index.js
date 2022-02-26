require("dotenv").config();
const serverSays = require("debug")("social:root:");
const chalk = require("chalk");
const raiseServer = require("./server/raiseServer");
const app = require("./server/index");
const connectdb = require("./database/connectdb");

const port = process.env.PORT || 3000;
const uri = process.env.URI;

(async () => {
  try {
    await connectdb(uri);
    await raiseServer(app, port);
  } catch (error) {
    serverSays(
      chalk.red(error.code === "EADDRINUSE" ? "port busy" : error.message)
    );
  }
})();
