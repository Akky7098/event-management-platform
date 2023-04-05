 
  const Admin = require("../model/adminModel");
  const jwt = require("jsonwebtoken");
   const bcrypt = require("bcrypt");

   // admin creation
   const createadmin = async(req,res)=>{
      try{ const data = req.body;
       //hashing the password
        const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(data.password,salt);
       data.password = hashedPassword;
       // create new admin
       const newadmin = await Admin.create(data)
       return res.status(201).json({Admin:newadmin})
   }
    catch (error){
        console.log(error)
        res.status(401).json({message:"error"})
    }
};
// Admin login function
  const adminLogin = async(req, res) => {
  const { email, password } = req.body;

  // Check if admin exists in database
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
    
   const isPasswordmatch = await bcrypt.compare(password,admin.password)
  // Check if password is correct
  if (!isPasswordmatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

    const payload ={
    adminId : admin._id
  }
  const token = jwt.sign(
     payload,
     "xyz12345"
  )  
  


  // Login successful
  return res.status(200).json({ message: 'Login successful',result:token});
};

  module.exports = {
    createadmin,
    adminLogin
  }