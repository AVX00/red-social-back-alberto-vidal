const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../../database/models/User");
const { registerUser } = require("../controllers/userControllers");

const router = express.Router();

router.post("/register", registerUser);
