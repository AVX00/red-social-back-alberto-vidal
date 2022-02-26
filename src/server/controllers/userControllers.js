const bcrypt = require("bcrypt");
const User = require("../../database/models/User");

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

module.exports = { registerUser };
