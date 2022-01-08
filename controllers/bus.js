const Bus = require("../models/bus")

exports.getAllBusRoutes = (req, res) => {
    Bus.find().select("-_id source destination").exec((err, data) => {
        if (err) {
            return res.status(422).json({
                error:err
            })
        }
        ///JSON.parse(data,(key, value)=>{console.log(key)})
        
        res.send(data)
    })
}


exports.getBusId = (req, res) => {
    Bus.find().select("_id seats").exec((err, data) => {
        if (err) {
            console.log(err)
        }
        res.send(data)
    })
}



