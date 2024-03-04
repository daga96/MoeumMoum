const formantsModel = require("../models/Formants");
const asyncHandler = require("express-async-handler");
const result = require("../utils/result");
const util = require("../utils/common");

exports.addFormants = asyncHandler(async (req, res) => {
  const { nickname, languages, formants } = req.body;

  console.log(nickname, languages, formants);
  const newFormants = await formantsModel.create({
    nickname,
    languages,
    formants,
  });

  await newFormants.save();

  return result.success(res, newFormants, "Formants Added Successfully");
});

exports.getFormants = asyncHandler(async (req, res) => {
  const { nickname } = req.body;
  console.log(nickname);

  const formantsList = await formantsModel.find({ nickname: nickname });
  console.log(formantsList);

  if (formantsList) {
    result.success(res, formantsList, "Formants List Called Successfully");
  } else {
    result.error(res, 400, "Failed To Find Formants List ");
  }
});
