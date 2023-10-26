const { body } = require("express-validator")
let bodyValdater = () => {
    return [
        body("title").notEmpty().withMessage("you didn't provide the name"),
        body("price").notEmpty().withMessage("you didn't provide the price")
    ]
}
module.exports =bodyValdater