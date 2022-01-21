const { validationResult } = require("express-validator");
const Bus = require("../models/bus");
const Record = require("../models/record");

//create

exports.addRecord = (req, res) => {


    date = req.body.date;

    errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }
    Bus.find()
        .select("_id seats booked name")
        .then((results) => {
            const rec = new Record({
                _id: date,
                buses: results,
            });

            rec.save((err, data) => {
                if (err) {
                    res.status(422).json({error: "Error adding to record"});
                }
                res.send(data);
            });
        });
};


// read
exports.getRecordbyID = (req, res) => {
    const id = req.body._id + "T00:00:00.000Z"
    Record.find({ _id: id }).exec((err, data) => {
        if (err) {
            return res.status(400).json(err)
        }
        res.send(data)
    })
}

exports.getAllRecords = (req, res) => {
    Record.find().exec((err,data) => {
        if (err) {
            return res.status(400).json(err)
        }
        res.send
    })
}

// update
exports.updateRecord = (req, res) => {
    const { date, bus, seats, booked } = req.body
}

//delete