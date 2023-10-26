const Course = require("../models/courses.schema.js");
const { validationResult } = require("express-validator")
const httpResSt = require("../utiltis/httpStatsRes.js");
// const asyncWrapper = require("../middleware/asyncWrapper")
// const appError=require("../utiltis/appError.js")

const getAllCourses =async (req, res) => {
    const limit = req.query.limit || 2;
    const page = req.query.page || 1;
    const skip=(page-1)*limit
    const courses = await Course.find({}, { "__v": false }).limit(limit).skip(skip)
    res.json({
        status: httpResSt.SUCCESS, data: {
        "courses":courses
    } })
}
const getOneCourse = async (req, res, next) => {
    const course = await Course.findById(req.params.id, { "__v": false });
    if(!course) res.status(404).json({status: httpResSt.FAIL,data:null})
        return res.json({ status: httpResSt.SUCCESS, data: { "course": course } })
}
const postCourse = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ "status": httpResSt.ERROR, message: errors })
    }
    const newCourse = new Course(req.body)
    await newCourse.save();
    res.json({ status: httpResSt.SUCCESS, data: {messge: "your coures add sucssful"} })
}
const patchCourse = async (req, res) => {
    const courseId = req.params.id
    await Course.findByIdAndUpdate(courseId, { $set: { ...req.body } })
    res.json({ status: httpResSt.SUCCESS, data: {message: "edit secssfuly"} })
}

const DeleteAcourse = async (req, res) => {
    try {
        await Course.deleteOne({ _id: req.params.id })
        res.status(201).json({ status: httpResSt.SUCCESS, data:{message:null}  })
    } catch (err) {
        res.status(404).json({ "status": httpResSt.FAIL, "data": { message: "course not found" } })
    }
}
module.exports = { getAllCourses, getOneCourse,postCourse,patchCourse,DeleteAcourse}