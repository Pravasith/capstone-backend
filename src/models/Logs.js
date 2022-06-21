const mongoose = require("mongoose")

const logsSchema = new mongoose.Schema({
    logId: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    imageId: mongoose.Schema.Types.ObjectId,
    postId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    commentId: mongoose.Schema.Types.ObjectId,
    roleId: mongoose.Schema.Types.ObjectId,
    dateTime: Date,
})

module.exports = mongoose.model("Log", logsSchema)
