const express = require("express");
const { default: helmet } = require("helmet");
const userRouter = require("./routers/userRouter");

const app = express();

app.use(helmet());
app.use("/user", userRouter);

module.exports = app;
