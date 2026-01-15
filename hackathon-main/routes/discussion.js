const express = require("express");
const router = express.Router();
const discussionController = require("../controllers/discussion.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
router.post("/creatediscussions", authMiddleware.authMiddleware, discussionController.createDiscussion);


module.exports = router;
