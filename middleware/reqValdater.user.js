const { body } = require("express-validator")
let bodyValdater = () => {
    return [
        body("firstName").notEmpty().withMessage("you didn't provide your first name"),
        body("lastName").notEmpty().withMessage("you didn't provide your last name"),
        body("email").notEmpty().withMessage("you didn't provide  your email"),
        body("password").notEmpty().withMessage("you didn't provide your password"),
    ]
}
module.exports =bodyValdater