require("dotenv").config();
const chalk = require("chalk");
const serverSays = require("debug")("social:server:");

const raiseServer = async (app, port) =>
  new Promise((resolve, reject) => {
    app.use((req, res) => {
      res.json({ taworkin: true });
    });

    const server = app.listen(port, () => {
      serverSays(
        chalk.bgGreen.black(`server listening at http://localhost:${port}`)
      );
      resolve();
    });

    server.on("error", (error) => {
      reject(error);
    });
  });

module.exports = raiseServer;
