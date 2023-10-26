// to use the env variable
require("dotenv").config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./routs/routs.courses.js");
const routerUser = require("./routs/routs.users.js");
const httpResSt = require("./utiltis/httpStatsRes.js");
const path=require("path")

mongoose.connect(process.env.MONGO_URL).then(() => console.log("connect to Mongoose"))
app.use(express.json());
app.use(function (req, res, next) {
    res.removeHeader("x-powered-by");
    res.removeHeader("ETag");
    next();
});
app.get("/", (req, res) => { 
    res.status(200).json({ "message": "welcome to your api" });
})
app.use("/uploads", express.static(path.join(__dirname,"uploads")))
app.use("/api/courses", router)
app.use("/api/users",routerUser)
app.all("*", (req, res, next) => {
    res.status(404).json({ "status": httpResSt.FAIL, "data": { "title": "not found:)" } })
})
// app.use((error, req, res, next) => {
//     res.status(500).json({ "status": httpResSt.ERROR, data: { message:error } })
// })

app.listen(process.env.PORT,()=>console.log("web server listening on port " + process.env.PORT))
