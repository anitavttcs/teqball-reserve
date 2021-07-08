const express = require("express");
const router = express.Router({ mergeParams: true });
const groupController = require("../controllers/groupController");
const verifyToken = require("../middlewares/verifyToken");

router.use(verifyToken);

router.post("/", groupController.createGroup);
router.get("/", groupController.getGroups);

router.get("/:id", groupController.getGroup);
router.delete("/:id", groupController.deleteGroup);

router.put("/:id/member", groupController.addMember);
router.delete("/:id/member", groupController.removeMember);

router.put("/:id/admin", groupController.addAdmin);

module.exports = router;
