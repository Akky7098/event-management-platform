
      const express = require("express");
 
     const app = express();

      const UsersRole = {
        USER: "USER",
        ADMIN : "ADMIN"
      };
      const users = [
        { username: "user1", password: "password1", role: UserRoles.USER },
        { username: "user2", password: "password2", role: UserRoles.ADMIN },
        ];
         function login(username, password) {
            const user = users.find(user => user.username === username && user.password === password);
          
            if (!user) {
              return { success: false, message: "Invalid credentials" };
            }
          
             switch (user.role) {
              case UserRoles.USER:
                return { success: true, message: "Login successful (User)" };
              case UserRoles.ADMIN:
                return { success: true, message: "Login successful (Admin)" };
              default:
                return { success: false, message: "Invalid user role" };
            }
          }
     const userLogin = async function (req, res) {
     try { 
        const data = req.body 
        const { emailId, password } = data 
        const userLogin = await userModel.findOne({ emailId: data.emailId }) 
        let passwordData = await brcypt.compare(password, userLogin.password) 
     if (!passwordData) return res.status(400).send({ status: false, message: 'You have entered the wrong password' })
     const payload = { userId: userLogin._id } 
     const token = jwt.sign( payload, "logingUser", { expiresIn: '24h' } ) 
     res.status(200).send({ status: true, message: 'Token generated sucessfully', token: token }) } 
     catch (error) { console.log(error) 
        return res.status(500).send({ status: false, message: error.message }) } }

     const port =  process.env.PORT || 3000;
     app.listen(port,() =>{
        console.log(`Server Started on ${port}`);
     });