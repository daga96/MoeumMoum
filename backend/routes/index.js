const express = require("express");
const { addUser } = require("../controllers/userController");
const {
  addFormants,
  getFormants,
  getFormantsByLanguage,
} = require("../controllers/formantsController");

const router = express.Router();

router.post("/addUser", addUser);
router.post("/addFormants", addFormants);
router.post("/getFormants", getFormants);
router.post("/getFormantsLang", getFormantsByLanguage);

module.exports = router;
