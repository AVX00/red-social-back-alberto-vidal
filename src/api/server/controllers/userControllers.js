require("dotenv").config();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../../../database/models/User");

const registerUser = async (req, res, next) => {
  const { username, name, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, name, password: hashedPassword });
    res.status(201).json({ user: `${username} created` });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const { id, password: savedPassword } = (await User.findOne({
      username,
    })) || { id: null, password: null };
    const isValidPassword = await bcrypt.compare(
      password || "",
      savedPassword || ""
    );
    if (isValidPassword) {
      const token = jsonwebtoken.sign({ username, id }, process.env.SECRET);
      res.json({ token });
      return;
    }
    res.status(409).json({ error: "invalid username or password" });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser };
