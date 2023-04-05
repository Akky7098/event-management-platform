const mongoose = require("mongoose");

const ticketmodel = new mongoose.Schema({
  eventiD: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "event",
    req: true,
  },
    eventname: {
        type:String,
        req:true
    },
     username: {
        type: String,
        req:true
    },

     event_starttime :{
        type:String,
        require:true
    },
     event_endtime :{
        type:String,
        require:true
     },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    req: true,
  },

  quantity: {
    type: Number,
    req: true,
  },
  price: {
    type: Number,
    require: true,
  },
  totalprice: {
    type: Number,
    require: true,
  },
  status: {
    type: String,
    enum: ["Booked", "Cancelled", "Rescheduled"],
    default: "Booked",
  },
  bookedDate: {
    type: Date,
    default: Date.now,
  },
  scheduledDate: {
    type: Date,
  },
  cancelledDate: {
    type: Date,
  },
});

const ticket = mongoose.model("Ticket", ticketmodel);

module.exports = ticket;
