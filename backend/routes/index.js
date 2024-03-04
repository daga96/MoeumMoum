const express = require("express");
const { addUser } = require("../controllers/userController");
const {
  addFormants,
  getFormants,
} = require("../controllers/formantsController");

const router = express.Router();

router.post("/addUser", addUser);
router.post("/addFormants", addFormants);
router.post("/getFormants", getFormants);

module.exports = router;
