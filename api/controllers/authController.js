
import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//register

export const register=(req,res)=>{
  
}


//login 
export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Database connection error" });
    }

    
      if (data.length === 0) {
        return res.status(404).json("User not found");
      }

      const user = data[0];

      
      const checkPassword=(req.body.password=== data[0].password)
    
      if(err){
          return res.status(500).json({ message: "Password comparison error" });
        }

        if (!checkPassword) {
          return res.status(400).json({message:"Incorrect password", data:user, password1: req.body.password, password2:data[0].password ,checkPassword:checkPassword});
        }

        const token = jwt.sign({ id: user.id },"secretKey", {
          expiresIn: "1h"});
      

        const { password, ...others } = user;

        res.cookie("accessToken", token, {
          httpOnly: true,
        }).status(200).json({"accesToken":token,others, "password1":user.password, "password2":req.body.password, "checkPassword":checkPassword});
      });
   
};
