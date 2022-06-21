const mongoose = require("mongoose")

const logsSchema = new mongoose.Schema({
    logId: new mongoose.Types.ObjectId(),
    imageId: String,
    postId: String,
    userId: String,
    commentId: String,
    roleId: String,
    dateTime: Date,
})
