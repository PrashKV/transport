const formidable = require("formidable");
const Bus = require("../models/bus");

//middleware
exports.getBusById = (req, res, next, id) => {
    Bus.findById(id).exec((err, bus) => {
        if (err) {
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
        .select("-_id")
        .exec((err, data) => {
            if (err) {
                return res.status(400).json(error);
            }
            res.send(data);
        });
};



exports.updateBusRoute = (req, res) => {
    Bus.findByIdAndUpdate(
        { _id: req.bus._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, bus) => {
            if (err || !bus) {
                return res.status(400).json({
                    error: "You are not authorized to update"
                })
            }
            // user.salt = undefined;
            // user.encry_password = undefined;
            // user.createdAt = user.updatedAt = undefined;
            res.json(bus)
        }
    )
}
exports.deleteBus = (req, res) => {
    
}