const jwt = require("jsonwebtoken");
const httpResSt = require("../utiltis/httpStatsRes.js");
const varfiyJWT = (req, res, next) => {
    try {
        const authH = req.headers['Authroization'] || req.headers['authroization']
        if (!authH) return res.status(400).json({ status: httpResSt.FAIL, message:"token is required"})
        const token = authH.split(' ')[1];
        const cureentUser = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.role = cureentUser.role
        return next()
    } catch (e) { 
        return res.status(401).json({ status:httpResSt.FAIL,message:"invalid token" })
    }
}

module.exports = varfiyJWT