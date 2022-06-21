const mongoose = require("mongoose")

const roleSchema = new mongoose.Schema({
    roleId: new mongoose.Types.ObjectId(),
    roleName: String,
    roleDesc: String,
})
