const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: true,
    },
    imageUrl: String,
    description: String,
    commentIds: [mongoose.Schema.Types.ObjectId],
    dateTime: {
        type: Date,
        auto: true,
    },
})

module.exports = mongoose.model("Post", postSchema)
