const Discussion = require("../models/Discussion.js");

exports.createDiscussion = async (discussionData) => {
    const discussion = new Discussion(discussionData);
    return await discussion.save();
}

exports.getAllDiscussions = async () => {
    return await Discussion.find().sort({ createdAt: -1 });
}

exports.getUserDiscussions = async (phoneNumber) => {
    return await Discussion.find({ author: phoneNumber }).sort({ createdAt: -1 });
}

exports.addVote = async (discussionId, userId, voteType, reason) => {
    const discussion = await Discussion.findById(discussionId);
    if (!discussion) {
        throw new Error('Discussion not found');
    }

    // Check if user already voted
    const existingVoteIndex = discussion.userVotes.findIndex(v => v.userId === userId);
    const existingVote = existingVoteIndex !== -1 ? discussion.userVotes[existingVoteIndex] : null;

    // If clicking the same vote type, remove it
    if (existingVote && existingVote.voteType === voteType) {
        // Remove vote
        discussion.userVotes.splice(existingVoteIndex, 1);
        if (voteType === 'up') {
            discussion.upvotes = Math.max(0, discussion.upvotes - 1);
            // Remove reason if exists
            discussion.upvoteReasons = discussion.upvoteReasons.filter(r => r.author !== userId);
        } else {
            discussion.downvotes = Math.max(0, discussion.downvotes - 1);
            // Remove reason if exists
            discussion.downvoteReasons = discussion.downvoteReasons.filter(r => r.author !== userId);
        }
    } else {
        // Remove previous vote if exists
        if (existingVote) {
            if (existingVote.voteType === 'up') {
                discussion.upvotes = Math.max(0, discussion.upvotes - 1);
                discussion.upvoteReasons = discussion.upvoteReasons.filter(r => r.author !== userId);
            } else {
                discussion.downvotes = Math.max(0, discussion.downvotes - 1);
                discussion.downvoteReasons = discussion.downvoteReasons.filter(r => r.author !== userId);
            }
            discussion.userVotes.splice(existingVoteIndex, 1);
        }

        // Add new vote
        discussion.userVotes.push({ userId, voteType });
        if (voteType === 'up') {
            discussion.upvotes += 1;
            if (reason) {
                discussion.upvoteReasons.push({ reason, author: userId });
            }
        } else {
            discussion.downvotes += 1;
            if (reason) {
                discussion.downvoteReasons.push({ reason, author: userId });
            }
        }
    }

    return await discussion.save();
}

exports.getUserVote = async (discussionId, userId) => {
    const discussion = await Discussion.findById(discussionId);
    if (!discussion) {
        return null;
    }
    const userVote = discussion.userVotes.find(v => v.userId === userId);
    return userVote ? userVote.voteType : null;
}