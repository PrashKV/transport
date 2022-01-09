const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema
const Schema = mongoose.Schema;

const busRecSchema = new Schema({
    _id: {
        type: ObjectId,
        ref: "Bus",
        
    },
    name:String,
    seats: Number,
    booked: { type: Number, default: 0 },
})

const recordSchema = new Schema({
    _id : Date,
    buses: [busRecSchema]
});

const Record = mongoose.model("Record", recordSchema)
module.exports = Record
