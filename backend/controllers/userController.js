const userModel = require("../models/User");
const asyncHandler = require("express-async-handler");
const result = require("../utils/result");
const util = require("../utils/common");

exports.addUser = asyncHandler(async (req, res) => {
  const { nickname, languages } = req.body;

  if (util.isEmpty(nickname)) {
    return result.error(res, 400, "Required Fields Empty!");
  }

  const existingUser = await userModel.findOne({ nickname });
  if (existingUser) {
    return result.success(res, existingUser, "User Exists");
  }

  const user = await userModel.create({
    nickname,
    languages,
  });

  console.log(user);
  if (user) {
    return result.success(res, user, "User Created Successfully");
  } else {
    return result.error(res, 400, "Invalid User: Creation Failed");
  }
});
