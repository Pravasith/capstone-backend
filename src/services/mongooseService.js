const mongoose = require("mongoose")
const configs = require("../configs")

const { uri } = configs.mongodbConfig

const connectToMongoDBWithMongoose = () => {
    mongoose
        .connect(uri)
        .then(res => {
            console.log("Connected to MongoDB!")
        })
        .catch(err => console.error(err))
}

const mongooseService = { connectToMongoDBWithMongoose }

module.exports = mongooseService
