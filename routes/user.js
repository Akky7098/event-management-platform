const express = require('express');
const router = express.Router();

// Importing user controller
const userController = require('../controller/user');
const auth = require("../auth/userauth");
// User login route
router.post('/login',userController.userLogin);
//
router.post("/user",userController.createuser)
module.exports = router;
