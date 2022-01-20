var express = require("express");
const { signup, signin, signout } = require("../controllers/auth");
const {check} = require("express-validator")
var router = express.Router();


router.post('/signup',[
    check("name").isLength({min : 3}).withMessage("Name should be at least 3 characters"),
    check('email').isEmail().withMessage("Email pattern is incorrect"),
    check('password').isLength({min : 5}).withMessage("Provide password with atleast 5 characters")
], signup)


router.post('/signin',[
    check('email').isEmail().withMessage("Email pattern is incorrect"),
    check('password').isLength({min : 5}).withMessage("Provide password")
], signin)

router.get("/signout", signout)


module.exports = router