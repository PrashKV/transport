const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema
const Schema = mongoose.Schema;

const busRecSchema = new Schema({
    _id: {
        type: ObjectId,
        ref: "Bus",
        
    },
    seats: Number,
    booked: Number,
})

const recordSchema = new Schema({
    _id : Date,
    buses: [busRecSchema]
});

const Record = mongoose.model("Record", recordSchema)
module.exports = Record
