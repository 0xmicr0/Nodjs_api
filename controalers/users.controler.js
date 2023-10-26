const User= require("../models/users.schema.js");
const { validationResult } = require("express-validator")
const httpResSt = require("../utiltis/httpStatsRes.js");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const jwtGenerator = require("../utiltis/JWTgen.js")
const geltAllUsers = async (req, res) => {
    try {
        const limit = req.query.limit || 2;
        const page = req.query.page || 1;
        const skip = (page - 1) * limit
        const users = await User.find({}, { "__v": false,"password":false }).limit(limit).skip(skip)
        res.status(200).json({ status: httpResSt.SUCCESS, data: { "users": users } })
    } catch (err) {
        res.status(404).json({ status: httpResSt.FAIL, data:{
            users:null
        }})
    }
}
const register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ "status": httpResSt.ERROR, message: errors }) }

    try {
        const { firstName, lastName, email, password,role } = req.body
        const oldUSer =await User.findOne({ email: email })
        if (oldUSer) {
            return res.status(404).json({ status: httpResSt.FAIL, data: { "message": "this email already used" } })
        }
        if (role === "admin") return res.status(401).json({ status: httpResSt.FAIL, data: { "message": "you are unauthorized" } })
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ firstName, lastName, email, password: hashedPassword, role, avater:fileName })
        const token = await jwtGenerator({ email: newUser.email, id: newUser._id,role: newUser.role})
        newUser.token =token
        await newUser.save();
        res.status(201).json({ status: httpResSt.SUCCESS, data: { User:newUser } })
    } catch (err) { 
        res.status(400).json({ status: httpResSt.ERROR, message:err.message })
    }
}
const login = async (req, res) => {
    if (!req.body.email && !req.body.password) return res.status(400).json({ status: httpResSt.FAIL, message: "email and password are required" })
    try {
        const { email, password, role } = req.body
        const user = await User.findOne({ email: email })
        if (!user) return res.status(404).json({ status: httpResSt.FAIL, message: "user not found" })
        if (user.role !== role) return res.status(401).json({ status: httpResSt.FAIL, data: { "message": "you are unauthorized" } });
        const matchedPass = await bcrypt.compare(password, user.password)
        if (user && matchedPass) {
            const token = await jwtGenerator({ email:user.email, id: user._id,role:user.role })
            user.token = token
            return res.status(200).json({ "status": httpResSt.SUCCESS, data: { token: token } })
        }
    } catch (err) {
        res.status(400).json({ "status": httpResSt.FAIL, data: { message: err.message } })
    }
}


module.exports = { geltAllUsers, register,login }