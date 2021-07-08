const express = require("express");
const router = express.Router({ mergeParams: true });
const loginController = require("../controllers/loginController");

router.post("/", loginController.loginCheck);

module.exports = router;
