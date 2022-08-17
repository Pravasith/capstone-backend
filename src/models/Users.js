const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    firstName: String,
    lastName: String,
    emailId: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    role: String,
    postIds: [mongoose.Schema.Types.ObjectId],
    commentIds: [mongoose.Schema.Types.ObjectId],
})

module.exports = mongoose.model("User", userSchema)
