/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
require("dotenv").config();
const serverSays = require("debug")("social:db:");
const chalk = require("chalk");
const { default: mongoose } = require("mongoose");

const connectdb = async (uri) => {
  mongoose.set("toJSON", {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
    },
  });
  try {
    await mongoose.connect(uri);
    serverSays(chalk.green("database connected"));
  } catch (error) {
    serverSays(chalk.red(error.message));
  }
};

module.exports = connectdb;
