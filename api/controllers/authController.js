import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//register

export const register=(req,res)=>{
  const q="select * from users where username=?";

  db.query(q, [req.body.username],(err,data)=>{
    if(err){
      return res.status(500).json({message:err })
    }
    
    if(data.length) return res.status(409).json("User already exists!")

    //if user does not exist, create one
    const query = "INSERT INTO users (`username`, `email`, `password`, `firstname`, `lastname`) VALUES (?, ?, ?, ?, ?)";

    const salt=bcrypt.genSaltSync(10)
    const hash=bcrypt.hashSync(req.body.password)

    const values=[req.body.username,
        req.body.email,
        hash,
        req.body.firstname,
        req.body.lastname,
    ]
    console.log(query);
      db.query(query, values ,(err,data)=>{

        if (err){
          return res.status(500).json({message:"User not created", error:err})
        }

      return res.status(200).json("Congrats! Your account has been successfully created.")     
      })
    })
}


//login 
export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Database connection error" });
    }

    
      if (data.length === 0) {
        return res.status(404).json("User not found");
      }

      const user = data[0];

      console.log("Password: ", data[0].password);
      
      const checkPassword=bcrypt.compareSync(req.body.password,data[0].password)
    
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
          secure: false,         
          sameSite: "lax",       
        }).status(200).json({"accesToken":token, others, "password1":user.password, "password2":req.body.password, checkPassword:checkPassword});
      });
   
};

export const logout = (req,res) => {

  res.clearCookie("accessToken", {
    secure: false,
    sameSite: "none"
  }).status(200).json("User has been logged out.")
}
