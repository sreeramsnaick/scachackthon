const commentService = require("../services/comment.services.js");
exports.addComment = async (req, res) => {
    try {
        const body = { discussionId: req.params.discussionId, userId: req.user.phoneNumber, content: req.body.content };
        const newComment = await commentService.addComment(body);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }  
};