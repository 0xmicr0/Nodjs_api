const express = require("express");
const router = express.Router();
const controalers=require("../controalers/users.controler.js")
const bodyValdater = require("../middleware/reqValdater.user.js")
const varfiyJWT = require("../middleware/varfiyJWT.js")
const multer = require('multer')
const diskStorge = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        ext=file.mimetype.split('/')[1]
        fileName=`user-${Date.now()}.${ext}`
        cb(null,fileName)
    }
})

const fileFilter = (req, file, cb) => {
    const fileType = file.mimetype.split('/')[0]
    if (fileType == "image") return cb(null, true)
    else {
        return cb("message your upload should be an image",false)
    }
}

const upload = multer({ storage: diskStorge ,fileFilter}) 

router.route("/")
    .get(varfiyJWT,controalers.geltAllUsers)
router.route("/register")
    .post(upload.single('avater'),bodyValdater(), controalers.register)
router.route("/login")
    .post(controalers.login)
module.exports = router