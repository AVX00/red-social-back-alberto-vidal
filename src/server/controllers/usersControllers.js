const User = require("../../database/models/User");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getFriends = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { friends } = await User.findById(id).populate("friends");
    res.json(friends);
  } catch (error) {
    next(error);
  }
};

const getEnemies = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { enemies } = await User.findById(id).populate("enemies");
    res.json(enemies);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, getFriends, getEnemies };
