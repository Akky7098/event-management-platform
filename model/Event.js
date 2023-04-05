const mongoose = require("mongoose");

 const eventschema = new mongoose.Schema({
    //id: mongoose.Schema.Types.ObjectId,
    
    event_name : {
        type:String,
        require:true
    },

    start_time : {
        type:String,
        require:true
    },
    end_time : {
        type:String,
        require:true
    },
    shows : {
        type:String,
        require:true
    },
    price: {
        type:Number,
        req:true
    },
    capacity : {
        type:Number,
        require:true
    }
    
 });
   
   const Event = mongoose.model('Event', eventschema);

    
 /*const findEventById = async (eventId) => {
    try {
      const event = await Event.findById(eventId);
      return event;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
*/  

  module.exports = Event;