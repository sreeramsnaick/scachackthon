const Discussion = require("../models/Discussion.js");

exports.createDiscussion = async (discussionData) => {
    const discussion = new Discussion(discussionData);
    return await discussion.save();
}