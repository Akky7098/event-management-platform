const express = require('express');
const app = express();
const bodyParser = require('body-parser');
 const db = require("./db/mongoose");
// Importing routes
 const userRoutes = require('./routes/user');
 const adminRoutes = require('./routes/admin');
 const usereventroutes = require("./routes/userevent");
 const ticketroutes = require("./routes/ticket");
 const admineventroutes = require("./routes/adminevent");
//const eventRoutes = require("./routes/event")
// Configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Using routes
  app.use('/user', userRoutes);
  app.use('/admin', adminRoutes);
  app.use("/event",usereventroutes);
  app.use("/ticket",ticketroutes);
  app.use('/adminevent',admineventroutes)
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
