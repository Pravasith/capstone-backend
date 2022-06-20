const USERNAME = "pravasith"
const PASSWORD = "animates"

const URI = `mongodb+srv://${USERNAME}:${PASSWORD}@animates-db.9vzdm.mongodb.net/?retryWrites=true&w=majority`

const mongodbConfig = {
    uri: URI,
}

module.exports = mongodbConfig
