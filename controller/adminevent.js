 const Event = require("../model/Event");
  const {Types} = require("mongoose");
const { Console } = require("console");
  //const objectId = new mongoose.Types.ObjectId();
  //const { ObjectId } = require("bson");
// CREATE NEW EVENT
 const createEvent = async(req,res) => {
    try{
    const eventdata = req.body;
    const newEvent = await Event.create(eventdata);
    return res.status(200).json({event:newEvent});
} 
catch(error){
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
}
 };

     //UPDATE AN EVENT
        const updateEvent = async(req,res) =>{
            try{
     const eventId = req.params.eventId;
     console.log(eventId)
     const Eventdata = req.body;

    //  const EventId = new Types.ObjectId(Id);
     const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        Eventdata,
        { new: true }
      );
      //Console.log(updateEvent);
      return res.status(200).json({events : updatedEvent})
    }
     catch(error){
        console.log(error)
        res.status(401).json({error:"internal server error"})
     }
     };
    
   //delete an event 

     const deleteEvent = async (req,res) =>{
     const EventId = req.params.EventId;
        await Event.findByIdAndDelete(EventId);
        return res.status(200).json({message: "event deleted succesfully"})
    };


     module.exports={
        createEvent,
        updateEvent,
        deleteEvent
    }

