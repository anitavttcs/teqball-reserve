const express = require("express");
const router = express.Router({ mergeParams: true });
const gCalController = require("../controllers/gCalController");
// const verifyToken = require("../middlewares/verifyToken");

// router.use(verifyToken);

router.get("/", gCalController.getEvents);


module.exports = router;