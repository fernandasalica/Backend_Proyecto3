const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 4,
    max: 36,
    unique: true,
  },
  mail: {
    type: String,
    required: true,
    min: 3,
    max: 128,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 4,
    max: 8,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  token: {
    type: String,
    default: "",
  },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
