const express = require("express");
const User = require("../../database/models/User");

const router = express.Router();

router.get("/list", async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});
