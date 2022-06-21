const mongoose = require("mongoose")

const roleSchema = new mongoose.Schema({
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    roleName: String,
    roleDesc: String,
})

module.exports = mongoose.model("Role", roleSchema)
