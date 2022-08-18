const cors = require("cors")
const express = require("express")
const path = require("path")

process.env.NODE_ENV !== "production" &&
    require("dotenv").config({
        path: path.join(__dirname, "/src/envs/staging.env"),
    })

const routes = require("./src/routes")
const mongooseService = require("./src/services/mongooseService")

const app = express()
const port = process.env.PORT || 8000 // default port to listen

const corsOptions = {
    origin:
        process.env.NODE_ENV === "production"
            ? ["https://capstone-animates.vercel.app"]
            : ["http://localhost:3000"],
    credentials: true, // <-- REQUIRED backend setting
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongooseService.connectToMongoDBWithMongoose()

app.use("/", routes)

// start the Express server
app.listen(process.env.PORT ?? port, () => {
    console.log(`Server started @${port}`)
})
