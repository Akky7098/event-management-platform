const express = require("express");
const router = express.Router();

const ticket = require("../controller/ticket");
const User = require("../auth/userauth");
const check = require("../auth/userauthent")
// book a ticket

router.post("/bookticket",check.authenticate, ticket.bookTicket);

// reschedule ticket
router.put("/rescheduleticket",check.authenticate ,ticket.rescheduleTicket);

// delete ticket

router.delete("/cancelticket",check.authenticate,ticket.CancelTicket);

 module.exports = router;