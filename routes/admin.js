const express = require('express');
const router = express.Router();

// Importing admin controller
const adminController = require('../controller/admin');
const eventcontroller = require("../controller/adminevent");
// Admin login route
router.post('/login', adminController.adminLogin);
router.post("/admin",adminController.createadmin);
module.exports = router;
