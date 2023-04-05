  
  const mongoose = require("mongoose"); 
  mongoose.connect('mongodb+srv://Ticket_Booking:GGh1O99ALXhhKd6u@cluster0.ylafjfs.mongodb.net/event', 
    { useNewUrlParser: true, useUnifiedTopology: true }
    ).then((data)=>{
        console.log("database connected")
    }).catch((err)=>{
        console.log(err)
    });


    module.exports = mongoose;