const cors = require("cors");
const express = require("express");
const { default: helmet } = require("helmet");
const { notFound, generalError } = require("./middlewares/errors");
const userRouter = require("./routers/userRouter");
const usersRouter = require("./routers/usersRouter");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/user", userRouter);
app.use("/users", usersRouter);

app.use(notFound);
app.use(generalError);

module.exports = app;
