const express = require("express");

const app = express();

app.use((req, res) => {
  res.json({ taworkin: true });
});

module.exports = app;
