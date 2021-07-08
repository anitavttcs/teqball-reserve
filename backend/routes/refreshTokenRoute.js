const express = require('express');
const router = express.Router({ mergeParams: true });
const refreshTokenController = require("../controllers/refreshTokenController");

router.use(express.json());

router.post("/", refreshTokenController.refreshToken);

module.exports = router;