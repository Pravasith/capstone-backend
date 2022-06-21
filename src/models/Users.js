const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userId: new mongoose.Types.ObjectId(),
    firstName: String,
    lastName: String,
    emailId: String,
    username: String,
    password: String,
    role: String,
    postIds: [String],
    commentIds: [String],
})
