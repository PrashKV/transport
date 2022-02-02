const Record = require("../models/record");
const { Ticket, transportSchema } = require("../models/ticket");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const _ = require("lodash");
const User = require("../models/user");

exports.getAllTickets = (req, res) => {
    Ticket.find({}, [], { sort: { doj: 1 } }, (err, tickets) => {
        if (err) {
            return res.status(400).json(err);
        }
        if (!tickets[0]) {
            return res.status(400).json({
                message: "Users haven't booked any tickets so far!",
            });
        }
        return res.send(tickets);
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

exports.checkSeats = (req, res, next) => {
    console.log("in check");

    req.routedBusId = [];
    req.final = [];
    req.safe = 1;
    req.bus_full = [];
    req.bus_NA = [];
    let temp = {};
    _.forEach(req.body.final, (value) => {
        if (value.name === "taxi") {
            req.final.push(value);
        } else {
            temp = value;
            req.routedBusId.push(value._id);
            temp.destination = value.destination.address;
            temp.source = value.source.address;
            temp.source_to_source = temp._id = temp.seats = undefined;
            req.final.push(temp);
        }
    });

    const first = () => {
        console.log("In first");
        return Promise.all(
            req.routedBusId.map((id) => {
                return Record.find(
                    {
                        _id: req.body.doj + "T00:00:00.000Z",
                        "buses._id": id,
                    },
                    "buses.$"
                ).then((data) => {
                    if (data.length) {
                        const { seats, booked, name } = data[0].buses[0];
                        if (booked + Number(req.body.seats) > seats) {
                            req.bus_full.push(name);
                            req.safe = 2;
                        }
                    } else {
                        req.safe = 0;

                        console.log("timess");
                    }
                });
            })
        );
    };

    const second = async () => {
        await first();
        next();
    };

    second();
};

exports.updateRecord = (req, res, next) => {
    console.log("update record");
    if (req.safe === 0) {
        return res.status(400).json({
            error: "Sorry, there aren't any buses available on selected date! Please select another day",
        });
    }
    if (req.safe === 2) {
        res.status(400).json({
            error: `Insufficient seats in ${req.bus_full}`,
        });
    }
    if (req.safe === 1) {
        let myOperations = req.routedBusId.map((id) => {
            return {
                updateOne: {
                    filter: {
                        _id: req.body.doj + "T00:00:00.000Z",
                        "buses._id": id,
                    },
                    update: {
                        $inc: { "buses.$.booked": +Number(req.body.seats) },
                    },
                },
            };
        });
        Record.bulkWrite(myOperations, {}, (err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Record update failed!",
                });
            }
            next();
        });
    }
};

exports.createTicket = (req, res) => {
    const { _id } = req.profile;
    let ticket = new Ticket({
        user: _id,
        doj: req.body.doj,
        seats: req.body.seats,
        final: req.final,
        total: req.body.total,
        source: req.body.source,
        destination: req.body.destination,
    });

    ticket.save((err, ticket) => {
        if (err) {
            res.status(400).json({
                error: "cannot create ticket",
            });
        } else {
            User.findByIdAndUpdate(
                { _id: _id },
                { $push: { tickets: ticket._id } },
                (err, user) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log(user.tickets);
                }
            );
            res.send(ticket);
        }
    });
};
