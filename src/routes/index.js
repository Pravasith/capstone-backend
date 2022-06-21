const { Router } = require("express")
const dotenv = require("dotenv")

const mongoose = require("mongoose")

const models = require("../models")

dotenv.config()

const router = Router()

router.get("/", async (req, res) => {
    await models.Users.create({
        firstName: "Clint",
        lastName: "MacDonald",
        emailId: "clint@senecacollege.ca",
        username: "clint_macdonald",
        password: "123456",
        role: "user",
        postIds: [new mongoose.Types.ObjectId()],
        commentIds: [
            new mongoose.Types.ObjectId(),
            new mongoose.Types.ObjectId(),
        ],
    })

    await models.Users.create({
        firstName: "Pravasith",
        lastName: "Kumar",
        emailId: "pravas@senecacollege.ca",
        username: "pravas",
        password: "2431413",
        role: "admin",
        postIds: [new mongoose.Types.ObjectId()],
        commentIds: [
            new mongoose.Types.ObjectId(),
            new mongoose.Types.ObjectId(),
        ],
    })

    await models.Roles.create({
        roleId: new mongoose.Types.ObjectId(),
        roleName: "admin",
        roleDesc: "administrator",
    })
    await models.Roles.create({
        roleId: new mongoose.Types.ObjectId(),
        roleName: "user",
        roleDesc: "Regular user",
    })

    await models.Posts.create({
        postId: new mongoose.Types.ObjectId(),
        userId: new mongoose.Types.ObjectId(),
        description: "Here is a picture of Azaka from Demon Slayer",
        commentIds: [
            new mongoose.Types.ObjectId(),
            new mongoose.Types.ObjectId(),
        ],
        imageIds: [new mongoose.Types.ObjectId()],
        likesIds: [
            new mongoose.Types.ObjectId(),
            new mongoose.Types.ObjectId(),
            new mongoose.Types.ObjectId(),
        ],
    })
    await models.Posts.create({
        postId: new mongoose.Types.ObjectId(),
        userId: new mongoose.Types.ObjectId(),
        description:
            "Hojou Satoru effortlessly fighting Sukuna in the first episode",
        commentIds: [
            new mongoose.Types.ObjectId(),
            new mongoose.Types.ObjectId(),
        ],
        imageIds: [new mongoose.Types.ObjectId()],
        likesIds: [
            new mongoose.Types.ObjectId(),
            new mongoose.Types.ObjectId(),
            new mongoose.Types.ObjectId(),
        ],
    })

    await models.Logs.create({
        logId: new mongoose.Types.ObjectId(),
        imageId: new mongoose.Types.ObjectId(),
        postId: new mongoose.Types.ObjectId(),
        userId: new mongoose.Types.ObjectId(),
        commentId: null,
        roleId: new mongoose.Types.ObjectId(),
        dateTime: Date.now(),
    })
    await models.Logs.create({
        logId: new mongoose.Types.ObjectId(),
        imageId: new mongoose.Types.ObjectId(),
        postId: new mongoose.Types.ObjectId(),
        userId: new mongoose.Types.ObjectId(),
        commentId: null,
        roleId: new mongoose.Types.ObjectId(),
        dateTime: Date.now(),
    })

    await models.Images.create({
        imageId: new mongoose.Types.ObjectId(),
        postId: new mongoose.Types.ObjectId(),
        userId: new mongoose.Types.ObjectId(),
        imageTitle: "Goku fights Vegeta",
        imageUrl:
            "https://m.media-amazon.com/images/M/MV5BYzY4NzJlNTctMWFlZS00NDQ1LWJiMjYtZTJhODcyODM3NDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTk3OTMzOA@@._V1_.jpg",
        imageAlt: "Goku Fights Vegeta",
    })
    await models.Images.create({
        imageId: new mongoose.Types.ObjectId(),
        postId: new mongoose.Types.ObjectId(),
        userId: new mongoose.Types.ObjectId(),
        imageTitle: "Luffy eating",
        imageUrl: "https://i.ytimg.com/vi/M9G6Gx6i-FY/maxresdefault.jpg",
        imageAlt: "Luffy eating",
    })

    await models.Comments.create({
        commentId: new mongoose.Types.ObjectId(),
        postId: new mongoose.Types.ObjectId(),
        userId: new mongoose.Types.ObjectId(),
        description: "Nice picture bro!",
        imageIds: [new mongoose.Types.ObjectId()],
        likesIds: [
            new mongoose.Types.ObjectId(),
            new mongoose.Types.ObjectId(),
        ],
    })

    await models.Comments.create({
        commentId: new mongoose.Types.ObjectId(),
        postId: new mongoose.Types.ObjectId(),
        userId: new mongoose.Types.ObjectId(),
        description: "I think that Saitama can one shot Goku.",
        imageIds: [new mongoose.Types.ObjectId()],
        likesIds: [
            new mongoose.Types.ObjectId(),
            new mongoose.Types.ObjectId(),
        ],
    })

    res.send({
        hello: "Pravasith's BE Server!",
    })
})

module.exports = router
