const { Router } = require("express")
const dotenv = require("dotenv")

const bcrypt = require("bcrypt")

const models = require("../models")
const { validateEmail } = require("../utils")
const Users = require("../models/Users")

dotenv.config()

const router = Router()

const BASE_URL = "/api/v1"

router.get("/", async (req, res) => {
    // await models.Users.create({
    //     firstName: "Clint",
    //     lastName: "MacDonald",
    //     emailId: "clint@senecacollege.ca",
    //     username: "clint_macdonald",
    //     password: "123456",
    //     role: "user",
    //     postIds: [new mongoose.Types.ObjectId()],
    //     commentIds: [
    //         new mongoose.Types.ObjectId(),
    //         new mongoose.Types.ObjectId(),
    //     ],
    // })

    // await models.Users.create({
    //     firstName: "Pravasith",
    //     lastName: "Kumar",
    //     emailId: "pravas@senecacollege.ca",
    //     username: "pravas",
    //     password: "2431413",
    //     role: "admin",
    //     postIds: [new mongoose.Types.ObjectId()],
    //     commentIds: [
    //         new mongoose.Types.ObjectId(),
    //         new mongoose.Types.ObjectId(),
    //     ],
    // })

    // await models.Roles.create({
    //     roleId: new mongoose.Types.ObjectId(),
    //     roleName: "admin",
    //     roleDesc: "administrator",
    // })
    // await models.Roles.create({
    //     roleId: new mongoose.Types.ObjectId(),
    //     roleName: "user",
    //     roleDesc: "Regular user",
    // })

    // await models.Posts.create({
    //     postId: new mongoose.Types.ObjectId(),
    //     userId: new mongoose.Types.ObjectId(),
    //     description: "Here is a picture of Azaka from Demon Slayer",
    //     commentIds: [
    //         new mongoose.Types.ObjectId(),
    //         new mongoose.Types.ObjectId(),
    //     ],
    //     imageIds: [new mongoose.Types.ObjectId()],
    //     likesIds: [
    //         new mongoose.Types.ObjectId(),
    //         new mongoose.Types.ObjectId(),
    //         new mongoose.Types.ObjectId(),
    //     ],
    // })
    // await models.Posts.create({
    //     postId: new mongoose.Types.ObjectId(),
    //     userId: new mongoose.Types.ObjectId(),
    //     description:
    //         "Hojou Satoru effortlessly fighting Sukuna in the first episode",
    //     commentIds: [
    //         new mongoose.Types.ObjectId(),
    //         new mongoose.Types.ObjectId(),
    //     ],
    //     imageIds: [new mongoose.Types.ObjectId()],
    //     likesIds: [
    //         new mongoose.Types.ObjectId(),
    //         new mongoose.Types.ObjectId(),
    //         new mongoose.Types.ObjectId(),
    //     ],
    // })

    // await models.Logs.create({
    //     logId: new mongoose.Types.ObjectId(),
    //     imageId: new mongoose.Types.ObjectId(),
    //     postId: new mongoose.Types.ObjectId(),
    //     userId: new mongoose.Types.ObjectId(),
    //     commentId: null,
    //     roleId: new mongoose.Types.ObjectId(),
    //     dateTime: Date.now(),
    // })
    // await models.Logs.create({
    //     logId: new mongoose.Types.ObjectId(),
    //     imageId: new mongoose.Types.ObjectId(),
    //     postId: new mongoose.Types.ObjectId(),
    //     userId: new mongoose.Types.ObjectId(),
    //     commentId: null,
    //     roleId: new mongoose.Types.ObjectId(),
    //     dateTime: Date.now(),
    // })

    // await models.Images.create({
    //     imageId: new mongoose.Types.ObjectId(),
    //     postId: new mongoose.Types.ObjectId(),
    //     userId: new mongoose.Types.ObjectId(),
    //     imageTitle: "Goku fights Vegeta",
    //     imageUrl:
    //         "https://m.media-amazon.com/images/M/MV5BYzY4NzJlNTctMWFlZS00NDQ1LWJiMjYtZTJhODcyODM3NDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTk3OTMzOA@@._V1_.jpg",
    //     imageAlt: "Goku Fights Vegeta",
    // })
    // await models.Images.create({
    //     imageId: new mongoose.Types.ObjectId(),
    //     postId: new mongoose.Types.ObjectId(),
    //     userId: new mongoose.Types.ObjectId(),
    //     imageTitle: "Luffy eating",
    //     imageUrl: "https://i.ytimg.com/vi/M9G6Gx6i-FY/maxresdefault.jpg",
    //     imageAlt: "Luffy eating",
    // })

    // await models.Comments.create({
    //     commentId: new mongoose.Types.ObjectId(),
    //     postId: new mongoose.Types.ObjectId(),
    //     userId: new mongoose.Types.ObjectId(),
    //     description: "Nice picture bro!",
    //     imageIds: [new mongoose.Types.ObjectId()],
    //     likesIds: [
    //         new mongoose.Types.ObjectId(),
    //         new mongoose.Types.ObjectId(),
    //     ],
    // })

    // await models.Comments.create({
    //     commentId: new mongoose.Types.ObjectId(),
    //     postId: new mongoose.Types.ObjectId(),
    //     userId: new mongoose.Types.ObjectId(),
    //     description: "I think that Saitama can one shot Goku.",
    //     imageIds: [new mongoose.Types.ObjectId()],
    //     likesIds: [
    //         new mongoose.Types.ObjectId(),
    //         new mongoose.Types.ObjectId(),
    //     ],
    // })

    res.send({
        hello: "Pravasith's BE Server!",
    })
})

// Users
router.post(BASE_URL + "/users/register", async (req, res) => {
    const response = {
        body: null,
        message: null,
        error: null,
    }

    let { firstName, lastName, email, password } = req.body

    try {
        if (!validateEmail(email)) {
            const e = new Error("Email not valid")
            e.code = 99999
            throw e
        }

        password = await bcrypt.hash(password, 10)

        response.body = await models.Users.create({
            firstName: firstName || "Anonymous",
            lastName: lastName || "User",
            emailId: email,
            password,
            role: "user",
            postIds: [],
            commentIds: [],
        })
    } catch (error) {
        console.log(error)
        response.message = "Something went wrong"

        if (error.code === 11000) {
            response.message = "Email already taken"
        } else if (error.code === 99999) {
            response.message = "Email not valid"
        }
        response.error = error
    }

    res.send(response)
})

router.put(BASE_URL + "/users", async (req, res) => {
    const response = {
        body: null,
        message: null,
        error: null,
    }

    let { user_id } = req.query

    let { firstName, lastName, email, profilePicture } = req.body

    try {
        const user = await models.Users.findById(user_id)

        if (!user) {
            const e = new Error("User not found")
            e.code = 99990
            throw e
        }

        if (!validateEmail(email)) {
            const e = new Error("Email not valid")
            e.code = 99999
            throw e
        }

        response.body = await models.Users.findByIdAndUpdate(
            user_id,
            {
                firstName: firstName || "Anonymous",
                lastName: lastName || "User",
                emailId: email,
                profilePicture,
            },
            { new: true }
        )
    } catch (error) {
        console.log(error)
        response.message = "Something went wrong"

        if (error.code === 11000) {
            response.message = "Email already taken"
        } else if (error.code === 99999) {
            response.message = "Email not valid"
        } else if (error.code === 99990) {
            response.message = "User email not found"
        }

        response.error = error
    }

    res.send(response)
})

router.post(BASE_URL + "/users/login", async (req, res) => {
    const response = {
        body: null,
        message: null,
        error: null,
    }

    let { email, password } = req.body

    try {
        if (!validateEmail(email)) {
            const e = new Error("Email not valid")
            e.code = 99999
            throw e
        }

        const user = await models.Users.findOne({ emailId: email })

        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                response.body = user
            } else {
                const e = new Error("Password not correct")
                e.code = 99998
                throw e
            }
        } else {
            const e = new Error("User email not found")
            e.code = 99990
            throw e
        }
    } catch (error) {
        console.log(error)
        response.message = "Something went wrong"

        if (error.code === 99990) {
            response.message = "User email not found"
        } else if (error.code === 99999) {
            response.message = "Email not valid"
        } else if (error.code === 99998) {
            response.message = "Password not correct"
        }
        response.error = error
    }

    res.send(response)
})

router.post(BASE_URL + "/posts", async (req, res) => {
    const response = {
        body: null,
        message: null,
        error: null,
    }

    let { imageUrl, description, email } = req.body

    try {
        if (!validateEmail(email)) {
            const e = new Error("Email not valid")
            e.code = 99999
            throw e
        }

        const user = await models.Users.findOne({ emailId: email })

        if (user) {
            const newPost = {
                imageUrl,
                description,
                userId: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                profilePicture: user.profilePicture,
                commentIds: [],
            }

            response.body = await models.Posts.create(newPost)

            await models.Users.findOneAndUpdate(
                { emailId: email },
                { postIds: [...user.postIds, response.body._id] }
            )
        } else {
            const e = new Error("User email not found")
            e.code = 99990
            throw e
        }
    } catch (error) {
        console.log(error)
        response.message = "Something went wrong"

        if (error.code === 99990) {
            response.message = "User email not found"
        } else if (error.code === 99999) {
            response.message = "Email not valid"
        }
        response.error = error
    }

    res.send(response)
})

router.get(BASE_URL + "/posts", async (req, res) => {
    const response = {
        body: null,
        message: null,
        error: null,
    }

    let { user_id } = req.query

    try {
        const user = await models.Users.findById(user_id)

        if (!user) {
            const e = new Error("User not found")
            e.code = 99990
            throw e
        }

        response.body = await models.Posts.find({ userId: user_id }, null, {
            sort: { dateTime: -1 },
        })
    } catch (error) {
        console.log(error)
        response.message = "Something went wrong"

        if (error.code === 99990) {
            response.message = "User email not found"
        }

        response.error = error
    }

    res.send(response)
})

router.get(BASE_URL + "/posts/all", async (req, res) => {
    const response = {
        body: null,
        message: null,
        error: null,
    }

    try {
        response.body = await models.Posts.find({}, null, {
            sort: { dateTime: -1 },
        })
    } catch (error) {
        console.log(error)
        response.message = "Something went wrong"

        response.error = error
    }

    res.send(response)
})

module.exports = router
