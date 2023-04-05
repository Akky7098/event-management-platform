 
  const mongoose = require("mongoose");

  /*const tokenmodel = new mongoose.Schema({
    token: { type: String },
    createdAt: { type: Date, default: Date.now, expires: 3600 } // Token will expire after 1 hour
  }); */


  const userModel = mongoose.Schema({
    
      name: {
        type:String,
        require:true
    },
      email: {
      type:String,
       unique: true
      },
      password: {
        type:String,
        require:true
      }
});

    // ...
    const Users= mongoose.model('user', userModel) //user
     //const ticket = mongoose.model("token",tokenmodel)
  // Find user by email
  const findUserByEmail = async (email) => {
    const user = await Users.findOne({ email });
    return user;
  };
   
  module.exports = Users