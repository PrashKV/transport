var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
var Schema = mongoose.Schema;


const transportSchema = new Schema(
    {
        name: String,
        source: String,
        destination: String,
        price:Number
    }
)

const ticketSchema = new Schema(
    {
        user: {
            type: ObjectId,
            ref:"User"
        },
        doj:Date,
        seats: Number,
        final: [transportSchema],
        total: Number,
        source: String,
        destination: String
    },
    { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = { Ticket, transportSchema };
