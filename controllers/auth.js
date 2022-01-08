const User = require("../models/user");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");


exports.signup = (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }
    const user = new User(req.body);
    console.log(user.name)
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: err,
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id,
        });
    });
};

