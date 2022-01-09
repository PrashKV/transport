var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var locationSchema = new Schema({
    address: {
        type: String,
        trim:true
    },
    lat: mongoose.Decimal128,
    lng: mongoose.Decimal128,
});

var busSchema = new Schema(
    {
        name: {
            type: String,
            unique:true,
            required: true,
            trim: true,
        },
        source: {
            type: locationSchema,
            required: true,
        },
        destination: {
            type: locationSchema,
            required: true
        },
        price: {
            type: Number,
            required: true,
        },
        seats: {
            type: Number,
            default:30
        },
        // booked: {
        //     type: Number,
        //     default:0
        // }
    },
    { timestamps: true }
);

const Bus = mongoose.model("Bus", busSchema);

module.exports = Bus;



