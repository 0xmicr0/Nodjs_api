// const allowToD = (req, res, next)=>{
//     try {
//         const {role} = req.body
//         if (role === "admin" || role === "manger") return next()
//     } catch (e) {
//         return res.status(401).json({ status: httpResSt.FAIL, message: "you are not allowed" })
//     }
// }
const httpResSt = require("../utiltis/httpStatsRes.js");
module.exports = (...roles) => {
    return (req, res, next) => { 
        if (!roles.includes(req.role)) return res.status(401).json({ status: httpResSt.FAIL, message: "you are not allowed" })
        next()
    }
}