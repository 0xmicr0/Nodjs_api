const mongoose = require("mongoose")

const coursesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
})
module.exports =mongoose.model("Courses", coursesSchema)