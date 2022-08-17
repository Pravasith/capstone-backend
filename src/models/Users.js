const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    profilePicture: {
        type: String,
        default:
            "https://res.cloudinary.com/dyvki0hhn/image/upload/v1660778426/user_f4vklt.png",
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
