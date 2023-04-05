const mongoose = require('mongoose')

const adminModel = mongoose.Schema({
      name: {
        type: String,
        require: true
      },
      email:{
        type: String,
        require: true
      },
      password: {
        type: String,
        require: true
      }

    // ...
});

 const admin = mongoose.model('Admin', adminModel) //admins
  
  // Find admin by email
  const findAdminByEmail = async (email) => {
    const Admin = await admin.findOne({ email });
    return Admin;
  };

  module.exports = admin;
  