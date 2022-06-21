const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    commentId: new mongoose.Types.ObjectId(),
    postId: String,
    userId: String,
    description: String,
    imageIds: [String],
    likesIds: [String],
})
