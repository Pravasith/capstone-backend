const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    userId: mongoose.Schema.Types.ObjectId,
    description: String,
    commentIds: [mongoose.Schema.Types.ObjectId],
    imageIds: [mongoose.Schema.Types.ObjectId],
    likesIds: [mongoose.Schema.Types.ObjectId],
})

module.exports = mongoose.model("Post", postSchema)
