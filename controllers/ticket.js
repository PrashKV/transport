const User = require("../models/user");
const { Ticket } = require("../models/ticket");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");

exports.getAllTickets = (req, res) => {
    Ticket.find().exec((err, data) => {
        if (err) {
            return res.status(400).json(err);
        }
        res.send(data);
    });
};

//middleware
exports.getTicketById = (req, res, next, id) => {
    Ticket.findById(id).exec((err, data) => {
        if (err) {
            res.status(400).json(err);
        }
        req.ticket = data;
        next();
    });
};

exports.getOneTicket = (req, res) => {
    res.send(req.ticket);
};

exports.createTicket = (req, res) => {};
