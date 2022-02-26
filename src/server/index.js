const express = require("express");
const { default: helmet } = require("helmet");
const { notFound, generalError } = require("./middlewares/errors");
const userRouter = require("./routers/userRouter");

const app = express();

app.use(helmet());
app.use("/user", userRouter);

app.use(notFound);
app.use(generalError);

module.exports = app;
