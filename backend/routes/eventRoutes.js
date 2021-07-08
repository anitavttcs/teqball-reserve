const express = require("express");
const router = express.Router({ mergeParams: true });
const eventController = require("../controllers/eventController");
const verifyToken = require("../middlewares/verifyToken");

router.use(verifyToken);

router.post("/", eventController.addEvent);
router.get("/", eventController.getUsersEvents);
router.get("/:id", eventController.getEvent);
router.put("/:id", eventController.modifyEvent);
router.put("/:id/participant", eventController.setParticipation);

module.exports = router;
