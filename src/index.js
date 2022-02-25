require("dotenv").config();
const serverSays = require("debug")("social:root:");
const chalk = require("chalk");
const express = require("express");
const raiseServer = require("./raiseServer");

const app = express();

(async () => {
  try {
    await raiseServer(app, 3000);
  } catch (error) {
    serverSays(
      chalk.red(error.code === "EADDRINUSE" ? "port busy" : error.message)
    );
  }
})();
