const express = require("express");
const {
  getAllUsers,
  getEnemies,
  getFriends,
} = require("../controllers/usersControllers");

const router = express.Router();

router.get("/list", getAllUsers);
router.get("/friends/:id", getFriends);
router.get("/enemies/:id", getEnemies);

module.exports = router;
