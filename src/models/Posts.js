const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    postId: new mongoose.Types.ObjectId(),
    userId: String,
    description: String,
    commentIds: [String],
    imageIds: [String],
    likesIds: [String],
})
