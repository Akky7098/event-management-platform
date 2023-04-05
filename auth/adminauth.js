 const jwt = require("jsonwebtoken");

 const authenticate = (req,res,next)=>{
     
    const authHeader = req.headers.authorization;

    if (!authHeader){
        res.status(401).json({message: 'authorization header is missing'})
    }
     
    const token = authHeader.split(' ')[1];
     console.log(token);
     
     try{

         const decoded =jwt.verify(token,"xyz12345");
        
          req.admin = decoded;

          next();
     }
     catch(error){
        console.log(error);
        res.satus(401).json({message : 'Invalid token'})
     }

 }

  module.exports = {
    authenticate
  }