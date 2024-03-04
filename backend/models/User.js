const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    unique: true,
  },
  languages: {
    type: Array,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
