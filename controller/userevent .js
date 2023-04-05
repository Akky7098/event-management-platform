
//  const { modelName } = require("../Event/event_model/eventschema");
 const Event = require("../model/Event");
 
       
 // view all event

 const viewAllEvent = async (req,res) =>{
    const events = await Event.find();
    return res.status(200).json({events})
 };
 // view element by id
   const viewEventById = async (req, res) => {
    const eventId = req.params.eventId;
     console.log(eventId);

   const event = await Event.findById(eventId);
   if(!event){
    return res.status(401).json({message:"event not found"})
  }
   
  return res.status(200).json({event});
}
 
  module.exports = {
    viewAllEvent,
    viewEventById
};

