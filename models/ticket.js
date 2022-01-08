var mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
var Schema = mongoose.Schema;

var bookingSchema = new Schema({
    bus: {
        type: ObjectId,
        ref : 'Bus'
    },
    count: Number,
    price: Number,
})



const Booking = mongoose.model("Booking", bookingSchema)

const ticketSchema = new Schema({
    booked: [bookingSchema],
    amount: Number,
    user: {
        type: ObjectId,
        ref: "User"
    }


}, { timestamps: true })

const Ticket = mongoose.model("Ticket", ticketSchema)

module.exports = { Ticket, Booking }


const _1 = new bookingSchema({
    
})

const tick = new ticketSchema({
    booked:[]
})