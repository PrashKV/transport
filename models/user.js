var mongoose = require("mongoose");
var crypto = require("crypto");
var uuidv1 = require("uuid/v1");
const { ObjectId } = mongoose.Schema
const Schema = mongoose.Schema;

var userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 32,
            trim: true,
        },
       
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        userinfo: {
            type: String,
            trim: true,
        },

        encry_password: {
            type: String,
            required: true,
        },
        salt: String,
        role: {
            type: Number,
            default: 0,
        },
        tickets: [{
            type: ObjectId,
            ref: "Ticket"
        }],
    },
    { timestamps: true }
);

userSchema.methods = {
    authenticate: function (plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password;
    },

    securePassword: function (plainpassword) {
        if (!plainpassword) return "No password provided";
        try {
            // statements
            return crypto
                .createHmac("sha256", this.salt)
                .update(plainpassword)
                .digest("hex");
        } catch (e) {
            // statements
            return console.error(e.code);
        }
    },
};

userSchema
    .virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password);
    })
    .get(function () {
        return this._password;
    });

const User = mongoose.model("User", userSchema);



module.exports = User;
