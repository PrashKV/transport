const { validationResult } = require("express-validator");
const formidable = require("formidable");
const Bus = require("../models/bus");
const _ = require('lodash')
//middleware
exports.getBusById = (req, res, next, id) => {
    console.log("id", id);
    Bus.findById(id).exec((err, bus) => {
        if (!bus) {
            return res.status(400).json({
                error: "bus wasn't found in db",
            });
        }
        req.bus = bus;
        next();
    });
};

//create route
exports.createBus = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }
    
    let form = new formidable.IncomingForm();
    
    form.parse(req, (err, fields) => {
        if (err) {
            return res.status(400).json(err);
        }
        console.log(fields)
        const {
            name,
            s_addr,
            s_lat,
            s_lng,
            d_addr,
            d_lat,
            d_lng,
            price,
            seats,
        } = fields;
        if (
            !(
                name &&
                s_addr &&
                s_lat &&
                s_lng &&
                d_addr &&
                d_lat &&
                d_lng &&
                price &&
                seats
            )
        ) {
            return res
                .status(400)
                .json({ error: "Please include all the fields" });
        }

        let bus = new Bus({
            name: name,
            source: { address: s_addr, lat: s_lat, lng: s_lng },
            destination: { address: d_addr, lat: d_lat, lng: d_lng },
            price: price,
            seats: seats,
        });

        bus.save((err, bus) => {
            if (err) {
                res.status(400).json(err);
            }
            res.json(bus);
        });
    });
};

exports.getBus = (req, res) => {
    return res.json(req.bus);
};
exports.getAllBusRoutes = (req, res) => {
    Bus.find()
    .exec((err, data) => {
        if (err) {
            return res.status(400).json(error);
        }
        res.send(data);
    });
};

exports.getAllBusProfiles = (req, res) => {
    Bus.find()
        .select("-_id name source.address destination.address price seats")
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: err,
                });
            }
            res.send(data);
        });
};

exports.updateBusRoute = (req, res) => {
    let form = new formidable.IncomingForm();
    
    form.parse(req, (err, fields) => {
        if (err) {
            return res.status(400).json(err);
        }
        
        const {
            name,
            s_addr,
            s_lat,
            s_lng,
            d_addr,
            d_lat,
            d_lng,
            price,
            seats,
        } = fields;
        
        
        let bus = req.bus
       
           bus = _.merge(bus,
            {
            name: name,
            source: { address: s_addr, lat: s_lat, lng: s_lng },
            destination: { address: d_addr, lat: d_lat, lng: d_lng },
            price: price,
            seats: seats,
        });
       
        bus.save((err, bus) => {
            if (err) {
                res.status(400).json(err);
            }
            res.json(bus);
        });
    })
};
exports.deleteBus = (req, res) => {

    let bus = req.bus
    bus.remove((err, deletedBus) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to delete"
            })
        }
        res.json({
            message: "Deletion was successful",
            deletedBus
        })
    })
}