const Comment = require("../models/Comment.js");
exports.addComment = async (commentData) => {
    const comment = new Comment(commentData);
    return await comment.save();
}