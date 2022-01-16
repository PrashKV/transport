const User = require("../models/user");
const { Ticket } = require("../models/ticket");
exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No user was found in db",
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
            res.json(user);
        }
    );
};

exports.userTicketList = (req, res) => {
    Ticket.find({ user: req.profile._id }, (err, tickets) => {
        if (err) {
            return res.status(400).json(err);
        }
        if (!tickets[0]) {
            return res.status(400).json({
                message: "No tickets in this account!",
            });
        }
        return res.json({ tickets: tickets });
    });
};
