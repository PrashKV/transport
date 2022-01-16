var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
var Schema = mongoose.Schema;

var bookingSchema = new Schema({
    bus: {
        type: ObjectId,
        ref: "Bus",
    },
    count: Number,
    price: Number,
});

var taxiSchema = new Schema({
    start: String,
    end: String,
    fare: Number,
});

// const Booking = mongoose.model("Booking", bookingSchema)

const ticketSchema = new Schema(
    {
        booked: [bookingSchema],
        taxis: [taxiSchema],
        amount: Number,
        user: {
            type: ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = { Ticket };
