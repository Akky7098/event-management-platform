const express = require("express");
const router = express.Router();
const events = require("../controller/userevent ");
const check = require("../auth/userauthent")

router.get("/allevent",check.authenticate,events.viewAllEvent);
router.get("/eventbyid/:eventId",check.authenticate,events.viewEventById);

module.exports = router;


 