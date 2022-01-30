const User = require("../models/user");
const { Ticket } = require("../models/ticket");
const { validationResult } = require("express-validator");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User wasn't found in DB",
            });
        }
        req.profile = user;
        next();
    });
};

exports.getUser = (req, res) => {
    //hide sensitive contents
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = req.profile.updatedAt = undefined;

    return res.json(req.profile);
};

exports.updateUser = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }
    console.log("update user body",req.body)
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: "You are not authorized to update",
                });
            }
            user.salt = undefined;
            user.encry_password = undefined;
            user.createdAt = user.updatedAt = undefined;
            console.log("updated user",user)
            res.json(user);
        }
    );
};

exports.userTicketList = (req, res) => {
    Ticket.find({ user: req.profile._id },[], { sort: { "doj": 1 }
}, (err, tickets) => {
        if (err) {
            return res.status(400).json(err);
        }
        if (!tickets[0]) {
            return res.status(400).json({
                message: "User haven't booked any tickets so far!",
            });
        }
        return res.json({ tickets: tickets });
    });
};
