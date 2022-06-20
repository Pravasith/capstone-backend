const { Router } = require("express")
const dotenv = require("dotenv")

dotenv.config()

const router = Router()

router.get("/", (req, res) => {
    req
    res.send({
        hello: "Pravasith's BE Server!",
    })
})

module.exports = router
