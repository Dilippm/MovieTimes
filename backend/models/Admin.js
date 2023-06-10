const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
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
    },
    users :[
        {
            type :mongoose.Types.ObjectId,
            ref:"User"
        }
    ],

    movies:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Movie",
        }
    ]
});

module.exports = mongoose.model("Admin", adminSchema);