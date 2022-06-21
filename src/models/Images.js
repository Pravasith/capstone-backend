const mongoose = require("mongoose")

const imageSchema = new mongoose.Schema({
    imageId: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    postId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    imageTitle: String,
    imageUrl: String,
    imageAlt: String,
})

module.exports = mongoose.model("Image", imageSchema)
