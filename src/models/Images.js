const mongoose = require("mongoose")

const imageSchema = new mongoose.Schema({
    imageId: new mongoose.Types.ObjectId(),
    postId: String,
    userId: String,
    imageTitle: String,
    imageUrl: String,
    imageAlt: String,
})
