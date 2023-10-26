const mongoose = require("mongoose")
const validator = require('validator');
const Roles= require("../utiltis/usersRoles.js")
const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, validate: [validator.isEmail, "you should enter an email"] },
    password: { type: String, required: true },
    token: { type: String },
    role: { type: String, enum: [Roles.ADMIN, Roles.MANGER, Roles.USER], default: Roles.USER },
    avater: { type: String, default:"uploads/profile.jpg"}
})

module.exports =mongoose.model("User",schema)