const Bus = require("../models/bus");
const Record = require("../models/record");

exports.addRecord = (req, res) => {
    date = req.body.date;
    Bus.find()
        .select("_id seats booked")
        .then((results) => {
            const rec = new Record({
                _id: date,
                buses: results,
            });

            rec.save((err, data) => {
                if (err) {
                    res.status(422).json({error: "Record already exists!"});
                }
                res.send(data);
            });
        });
};
