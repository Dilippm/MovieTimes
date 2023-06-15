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
  movies: {
    type: String,
    required: true
  },
  price:{
    type:String,
    required:true
  },
  owner: {
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
});

module.exports = mongoose.model("Theatre", theatreSchema);
