const { Router } = require("express")
const dotenv = require("dotenv")

const bcrypt = require("bcrypt")

const models = require("../models")
const { validateEmail } = require("../utils")

const configs = require("../configs")

dotenv.config()

const router = Router()

const BASE_URL = "/api/v1"

router.get("/", async (req, res) => {
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

        await models.Posts.updateMany(
            { userId: user_id },
            {
                firstName: firstName || "Anonymous",
                lastName: lastName || "User",
                emailId: email,
                profilePicture,
            }
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
                dateTime: Date.now(),
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

router.delete(BASE_URL + "/posts", async (req, res) => {
    const response = {
        body: null,
        message: null,
        error: null,
    }

    let { post_id, user_id } = req.query

    try {
        const post = await models.Posts.findById(post_id)

        if (
            !post.userId.equals(user_id) &&
            configs.adminConfig.userId !== user_id
        ) {
            const e = new Error("Unauthorized")
            e.code = 99991
            throw e
        }

        response.body = await models.Posts.findByIdAndDelete(post_id)
    } catch (error) {
        console.log(error)
        response.message = "Something went wrong"

        if (error.code === 99991) {
            response.message = "Unauthorized"
        }

        response.error = error
    }

    res.send(response)
})

module.exports = router
