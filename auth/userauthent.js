const jwt = require('jsonwebtoken');
 require("dotenv").config();
 const authenticate = (req, res, next) => {
  // Get the authorization header from the request
  const authHeader = req.headers.authorization;

  // Check if authorization header exists
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  // Extract the token from the authorization header
  const token = authHeader.split(' ')[1];
   console.log (token)
  try {
    // Verify the token
    const decoded = jwt.verify(token, "abc1234");

    // Set the decoded user information on the request object
    req.user = decoded;
    const userId = decoded.userId;
    const userName = decoded.name;


    // Call the next middleware in the chain
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {
  authenticate
}
