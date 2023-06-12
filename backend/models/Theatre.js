const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    seats: {
        type: String,
        required: true
    },
   
   
    movies: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Movie",
        }
    ],
    owner: 
        {
            type: mongoose.Types.ObjectId,
            ref: "Owner",
        },
    
  
    showTimings: [
        {
            startTime: {
                type: String,
                required: true
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Theatre", theatreSchema);
