const express = require("express");
const router = express.Router();
const cont = require("../controalers/controlers.js")
const bodyValdater = require("../middleware/reqValdater.js")
const varfiyJWT = require("../middleware/varfiyJWT.js");
const allowToD = require("../middleware/allowtoD.js");
const Roles = require("../utiltis/usersRoles.js");

router.route("/")
    .get(cont.getAllCourses)
    .post(varfiyJWT,bodyValdater(),cont.postCourse)
router.route("/:id")
    .get(cont.getOneCourse)
    .patch(cont.patchCourse)
    .delete(varfiyJWT,allowToD(Roles.ADMIN,Roles.MANGER),cont.DeleteAcourse)
module.exports = router