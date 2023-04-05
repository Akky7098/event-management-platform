 const Ticket = require("../model/ticketModel");
 const Event = require("../model/Event");
 const User = require("../model/userModel")
  const ObjectId = require('mongoose').Types.ObjectId;
 // book a ticket for a event

   const bookTicket = async(req,res)=>{
    try{
        const{eventId,quantity} = req.body;
        
        
      const event = await Event.findById(new ObjectId(eventId));
        if(!event){
        return res.status(404).json({ message: "event not found"});
     }
     const bookedTickets = await Ticket.find({
        event: event._id,
        status: 'Booked'
      });
      const totalBookedQuantity = bookedTickets.reduce((acc, ticket) => {
        return acc + ticket.quantity;
      }, 0);
      const availableCapacity = event.capacity - totalBookedQuantity;
      if(quantity > availableCapacity){
        return res.status(400).json({ message: `Event has not much capacity. Please check the same event in another slot.`});
      } 
            const decoded = req.user;
            const userId = decoded.userId;
            const userName = decoded.name;
          const price = event.price;
          const totalprice = quantity*price;
          const newTicket = new Ticket({
             eventiD: event._id,
             eventname: event.event_name,
             event_starttime: event.start_time,
             event_endtime: event.end_time,
             quantity,
             eventdate:event.
             price,
             totalprice,
             status: 'Booked',
             bookedDate: new Date(),
             userId: userId,
             username: userName
      });
      //    await newTicket.populate('Event', 'event_name start_Time end_Time ').execPopulate();

            
       const saveTicket = await newTicket.save();
         // Update the available capacity of the event
          event.capacity -= quantity;
          const updatedCapacity = event.capacity;
         await event.save();

      return res.status(201).json({ticket: saveTicket,message:`Ticket booked successfully. the left ticket are : ${updatedCapacity}`});
     }

       catch(error){
        console.log(error)

        return res.status(501).json({message:" server error"})
       }
   } ;


 //****************************reschedule ticket *******************************************/

     const rescheduleTicket = async(req,res) =>{
        try{
            const{Ticket_id,rescheduledate} =req.body;
         
            const ticket = await Ticket.findById(Ticket_id);
            if(!ticket){
                return res.status(401).json({message:"Ticket not found"});
            }
             
            const user = await User.findById(ticket.userId);
              if(!user){
              return res.status(401).json({message:"User not found"});
              }
             //Check if user is authorized to reschedule the ticket
             const decoded = req.user;
             const userId = decoded.userId;
             //console.log(userId, ticket.userId);
             if(userId.toString() !== ticket.userId.toString()){
                return res.status(404).json({message:"No authorisation to this user"})
            }
             
            //################update ticket##########
           
             ticket.bookedDate = rescheduledate;
             ticket.status = "Rescheduled";

            // save update ticket

            const updatedTicket = await ticket.save();
            return res.status(200).json({ticket:updatedTicket});
        }
         catch(error){
            console.log(error);
             return res.status(500).json({ message: 'Internal server error' });
          }
         
     };


     // ################## cancel ticket########


     const CancelTicket = async (req, res) => {
        try {
         const { ticketId, cancelledQuantity } = req.body;
          console.log(ticketId)
          const ticket = await Ticket.findById(ticketId);
          if (!ticket) {
         return res.status(404).json({ message: 'Ticket not found' });
    }
          
          if (ticket.status === "Cancelled") {
          return res.status(400).json({ message: "This ticket has already been cancelled" });
          }
         
          const user = await User.findById(ticket.userId);
          if (!user) {
          return res.status(404).json({ message: 'User not found' });
         }  
            const decoded = req.user;
           const userId = decoded.userId;
           //console.log(userId, ticket.userId);
         if(userId.toString() !== ticket.userId.toString()){
         return res.status(404).json({message:"No authorisation to this user"})
         }
               if (cancelledQuantity > ticket.quantity) {
            return res.status(400).json({ message: 'Cannot cancel more tickets than booked' });
             }
         
             const event = await Event.findById(ticket.eventiD);
             ticket.quantity -= cancelledQuantity;
             event.capacity += cancelledQuantity;
             const updatedCapacity = event.capacity;
             const [updatedTicket, updatedEvent] = await Promise.all([ticket.save(), event.save()]);

             return res.status(200).json({ ticket: updatedTicket,message:`Ticket Cancelled successfully. the left ticket are : ${updatedCapacity}` });
             } catch (error) {
          console.log(error);
          return res.status(500).json({ message: 'Internal server error' });
         }
      };
      

    module.exports = {
        bookTicket,
        rescheduleTicket,
        CancelTicket
    }