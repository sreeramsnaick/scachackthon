const discussionService = require("../services/discussion.services.js");
const jwt = require("jsonwebtoken");
exports.createDiscussion = async (req, res) => {
    try {
        const number = req.user.phoneNumber
        const newDiscussion = await discussionService.createDiscussion({title: req.body.title, content: req.body.content, author: number});
        res.status(201).json(newDiscussion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
