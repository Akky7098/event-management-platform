  
   const express = require("express");
   const router = express.Router();

   const admincontroller = require("../controller/adminevent");
   const check = require("../auth/adminauth");

   router.post("/createevent",check.authenticate ,admincontroller.createEvent);
   router.put("/update/:eventId",check.authenticate,admincontroller.updateEvent);
   router.delete('/delete/:eventId',check.authenticate,admincontroller.deleteEvent);

   module.exports = router;