const { validationResult } = require("express-validator");
const Bus = require("../models/bus");
const Record = require("../models/record");


exports.getRecordById = (req, res, next, id) => {
    
    Record.findById(id).exec((err, record) => {
        if (!record) {
            return res.status(400).json({
                error: "record wasn't found in db",
            });
        }
        req.record = record;
        next();
    });
};

//create

exports.addRecord = (req, res) => {
    date = req.body.date;

    errors = validationResult(req);
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
                    res.status(422).json({ error: "Record already exists!" });
                }
                res.send(data);
            });
        });
};

// read


exports.getAllRecordID = (req, res) => {
    Record.find().select('-buses').sort([['_id',1]]).exec((err, data) => {
        if (err) {
            return res.status(400).json(err);
        }
        res.send(data);
    });
};


exports.getARecord = (req,res)=>{
    return res.json(req.record.buses);
}
