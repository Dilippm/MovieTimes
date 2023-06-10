const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    phone: {
        type: Number,
        required: true,
        minLength: 10
    },
    image: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model("Owner", ownerSchema);
