const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    postId: String,
    userId: String,
    description: String,
    imageIds: [mongoose.Schema.Types.ObjectId],
    likesIds: [mongoose.Schema.Types.ObjectId],
})

module.exports = mongoose.model("Comment", commentSchema)
