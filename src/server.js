const cors = require("cors")
const express = require("express")

const routes = require("./routes")
const mongooseService = require("./services/mongooseService")

const app = express()
const port = 8000 // default port to listen

const corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true, // <-- REQUIRED backend setting
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongooseService.connectToMongoDBWithMongoose()

app.use("/", routes)

// start the Express server
app.listen(process.env.PORT ?? port, () => {
    console.log(`Server started @http://localhost:${port}`)
})
