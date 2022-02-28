const { Schema } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: {
    type: [Schema.Types.ObjectId],
    ref: "user",
  },
  enemies: {
    type: [Schema.Types.ObjectId],
    ref: "user",
  },
});

module.exports = UserSchema;
