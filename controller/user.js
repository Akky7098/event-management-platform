 const Users = require("../model/userModel");
  const jwt = require("jsonwebtoken");
  const bcrypt = require("bcrypt");
 // require('dotenv').config({path:".env"})
 const createuser = async (req, res) => {
   const data = req.body;

   // hashing the password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(data.password, salt);
   data.password = hashedPassword;
   //console.log(hashedPassword);
  //const { name,email} = data;
  const newUsers = await Users.create(data);
  return res.status(201).json({ user : newUsers });
};

// User login function
   const userLogin = async(req, res) => {
  const { email, password } = req.body;

  // Check if user exists in database
  const user = await Users.findOne({email : email});
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Check if password is correct

    const isPasswordmatch = await bcrypt.compare(password,user.password);

  if (!isPasswordmatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  // generating a token to authorise a user.
  const payload = {
    userId: user._id,
    name: user.name
  }
const token = jwt.sign(
    payload,
    // process.env.JWT_SECRET
    "abc1234"
)
  // Login successful
  return res.status(200).json({ message: "Login successful",result: token });
};

module.exports = {
    createuser,userLogin 
}
