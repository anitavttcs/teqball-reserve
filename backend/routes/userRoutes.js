const express = require("express");
const router = express.Router({ mergeParams: true });
const userController = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");

router.use(verifyToken);

router.post("/enable-cal-export/:sub", userController.enableCalExport);
router.post("/disable-cal-export/:sub", userController.disableCalExport);

module.exports = router;